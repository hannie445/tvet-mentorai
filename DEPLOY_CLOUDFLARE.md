# Deploying to Cloudflare (Pages / Workers)

This project is built with the [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare) adapter,
which is the actively-maintained way to run a standard Next.js 15 App Router
app on Cloudflare's platform (it deploys as a Worker with a static assets
binding — Cloudflare's current unified model for what used to be "Pages
Functions"). No UI, layout, or component code was changed to do this; every
change below is build/deploy configuration only.

## One-time setup

```bash
npm install
npx wrangler login
```

`wrangler login` opens a browser to authenticate your Cloudflare account —
only needed once per machine.

## Environment variables / secrets

The AI Coach Engine calls OpenAI server-side (`src/app/api/ai-coach/route.ts`
→ `src/lib/ai-coach-engine/openai-service.ts`). It already gracefully falls
back to local content if the key is missing or the call fails, so a deploy
without a key still works — you just won't get live AI Coach responses.

**Local dev/preview** (`npm run dev` or `npm run cf:preview`):

```bash
cp .dev.vars.example .dev.vars
# then edit .dev.vars and fill in OPENAI_API_KEY
```

**Production** — set the real secret directly on Cloudflare (never commit it):

```bash
npx wrangler secret put OPENAI_API_KEY
```

`OPENAI_MODEL` and `NEXT_PUBLIC_DEMO_MODE` are non-sensitive, so they're set
as plain `vars` in `wrangler.jsonc` already (edit that file directly if you
want to change them, or override per-environment there).

## Verify the build locally

```bash
npm run cf:build      # runs `opennextjs-cloudflare build`, outputs to .open-next/
npm run cf:preview    # builds, then runs it locally via Wrangler (closest thing to production)
```

`cf:preview` serves the app through Wrangler's local Workers runtime, which
is the most accurate way to catch Cloudflare-specific issues (Node API gaps,
edge-case behavior, etc.) before deploying for real.

## Deploy

```bash
npm run cf:deploy
```

This runs `opennextjs-cloudflare build` then `opennextjs-cloudflare deploy`,
which publishes the Worker + static assets to your Cloudflare account using
the `name` set in `wrangler.jsonc` (`tvet-mentorai` — change it if you want a
different Worker/project name).

## What was added/changed for this, and why

| File | Change | Reason |
|---|---|---|
| `wrangler.jsonc` | new | Cloudflare Worker config: entry point, static assets binding, compatibility flags |
| `open-next.config.ts` | new | Minimal OpenNext config, targets the Cloudflare adapter |
| `package.json` | added `@opennextjs/cloudflare`, `wrangler` as devDependencies; added `cf:build`/`cf:preview`/`cf:deploy`/`cf:typegen` scripts | Build/deploy tooling. The original `dev`/`build`/`start`/`lint` scripts are untouched |
| `next.config.mjs` | added `images.unoptimized: true` | Cloudflare Workers has no persistent Node image-optimization server the way `next/image`'s default loader expects. This only disables server-side resizing/format conversion — the AI Hani avatar still renders via `next/image` with the exact same `object-contain` sizing/cropping in code, just serving the original file directly |
| `tsconfig.json` | added `.open-next`/`.wrangler` to `exclude` | Keeps generated build output out of the TypeScript project |
| `.gitignore` | added `.open-next`, `.wrangler`, `.dev.vars`, `cloudflare-env.d.ts` | Build artifacts and local secrets shouldn't be committed |
| `.dev.vars.example` | new | Documents the local secret needed for `wrangler dev`/preview (mirrors the existing `.env.example` pattern) |

**Nothing in `src/` was touched.** No component, page, styling, or branding
change was made — this is purely additive build tooling around the existing app.

## Troubleshooting: `npm install` peer-dependency conflicts

If `npm install` fails with an `ERESOLVE` error (without `--legacy-peer-deps`),
it's almost certainly because some package in the tree (commonly `react-pdf`,
or a transitive dependency of `@opennextjs/cloudflare`) hasn't updated its
declared `peerDependencies` range to explicitly list React 19, even though it
works fine with it in practice. This is a very common situation during a
major React version transition.

`package.json` already includes the standard fix for this — an `overrides`
block that forces every package in the tree to resolve `react`/`react-dom`
to the single root-installed version instead of trying to satisfy each
package's own (possibly outdated) declared range independently:

```json
"overrides": {
  "react": "$react",
  "react-dom": "$react-dom"
}
```

This requires npm 8.3 or newer (bundled with any reasonably current Node.js).
If you still hit a conflict after this, the error message will name the
specific package — that package likely needs a version bump, or its own
entry added under `overrides`.

## Generating `package-lock.json`

There is **no lockfile committed yet**. Run this once, for real, against the
live npm registry, and commit the result:

```bash
npm install
git add package-lock.json
```

That single run also serves as your proof that step 5 of the deploy
checklist ("`npm install` passes without `--legacy-peer-deps`") is actually
satisfied — if the `overrides` fix above isn't enough for some dependency I
don't have full visibility into, this is where you'll see it.



- **PDF viewer** (`react-pdf`) only ever runs client-side (it's dynamically
  imported with `ssr: false`), so it isn't affected by the Workers runtime.
- **The OpenAI API route** relies on `nodejs_compat` (already enabled in
  `wrangler.jsonc`) for the `openai` SDK and the `server-only` package to
  work as expected on Workers.
- This guide and config were written and manually reviewed, but **not run
  through an actual `npm install` / `npm run cf:build` / `wrangler deploy` in
  this environment** — the sandbox this was prepared in has no network access
  to npm's registry or Cloudflare's API. Please run through the "Verify the
  build locally" and `cf:deploy` steps above for real before treating this as
  production-ready, and let me know what comes up if anything fails.
