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

## Troubleshooting: `@opennextjs/cloudflare requires Next >=X, project uses Next Y`

`next` was bumped from a pinned `15.0.3` to `^15.5.21` (and `eslint-config-next`
alongside it, since that package is meant to track the exact same Next.js
version) to satisfy `@opennextjs/cloudflare`'s minimum Next.js requirement.
This is a minor-version bump within the same major (`15.x`), so per semver
it should carry no breaking changes to the App Router APIs this project
uses — no UI, component, or config changes were needed alongside it.

If a future `@opennextjs/cloudflare` upgrade raises the minimum Next.js
version again, bump `next` (and `eslint-config-next` to match) the same way.

## Troubleshooting: `wrangler` version too old for `@opennextjs/cloudflare`

`wrangler` was bumped from `^3.99.0` to `^4.86.0` per the Cloudflare build
log's exact requirement. Same underlying pattern as the earlier Next.js
version issue: `@opennextjs/cloudflare` has a minimum version requirement on
one of its tools, and the fix is a straight version bump — nothing else in
this file needed to change for it.

## Troubleshooting: "invalid configuration for Cloudflare Pages"

`wrangler.jsonc` originally used the **Workers** deployment convention
(`main` pointing at `.open-next/worker.js`, plus an `assets` block). That's
correct for deploying via `wrangler deploy` as a standalone Worker, but a
**Cloudflare Pages** project (the git-connected, dashboard-managed product)
expects a different, mutually-exclusive convention: `pages_build_output_dir`.
Having `main` present told Wrangler this was a Workers project while your
Cloudflare project is actually configured as Pages — that mismatch is what
"invalid configuration" meant.

Fixed by switching to the Pages convention:

```jsonc
{
  "pages_build_output_dir": ".open-next/assets"
  // "main" removed - Pages and Workers deploy modes don't mix in one config
}
```

`cf:preview`/`cf:deploy` were updated to match — `wrangler pages dev` /
`wrangler pages deploy` instead of the Workers-oriented commands.

**One thing I'm flagging honestly rather than asserting with false
confidence:** `@opennextjs/cloudflare`'s primary, most-documented target is
Workers deployment, not Pages. I'm reasonably confident `.open-next/assets`
is the right directory for `pages_build_output_dir` (it's where OpenNext
puts the static assets + the SSR handling script), but I have not been able
to verify this against a real Cloudflare Pages build in this environment. If
Pages' build still complains after this fix, the two most likely next steps
are (a) confirming the exact file OpenNext's Cloudflare adapter emits inside
`.open-next/assets` matches Pages' `_worker.js` convention, or (b) switching
the Cloudflare project itself from "Pages" to "Workers" in the dashboard,
which is the path the adapter's own docs steer toward.

## Troubleshooting: Cloudflare still reports `next@15.0.3` after the version bump

`package.json` already correctly says `"next": "^15.5.21"` (verified by
extracting and inspecting the uploaded project directly) — the version bump
from a previous fix is intact. But **there is still no `package-lock.json`
anywhere in this project.** Without one:

- If Cloudflare's build runs `npm ci`, it would fail outright (no lockfile
  to install from) rather than silently install an old version — so that's
  probably not what's happening.
- More likely: Cloudflare's build system cached `node_modules` (or npm's
  cache) from the **first failed build**, back when `package.json` still
  said `"next": "15.0.3"`. Without a lockfile forcing a specific resolved
  version, a subsequent build can reuse that stale cached install instead of
  re-resolving against the updated `package.json`.

**The real fix requires two things I cannot do in this sandbox** (no network
access to npm's registry):

1. Run `npm install` for real, somewhere with registry access (your machine
   or Claude Code), which both generates the missing `package-lock.json`
   *and* forces a fresh resolution that will actually pick up `15.5.21+`.
   Commit the resulting lockfile.
2. If Cloudflare's dashboard has a "clear build cache" option for this
   project (Settings → Builds & deployments, or similar), use it before the
   next deploy, so it can't fall back to the stale cached `next@15.0.3`
   install regardless of what's now in `package.json`.



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
