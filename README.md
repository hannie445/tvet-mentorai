# TVET MentorAI — Final Release

Digital Instructional Coach dashboard for TVET Malaysia, built with Next.js 15, React 19, TypeScript, Tailwind CSS, and a shadcn/ui-style component set.

> **Deploying to Cloudflare?** See [`DEPLOY_CLOUDFLARE.md`](./DEPLOY_CLOUDFLARE.md) for the full guide (build/deploy commands, secrets, what was added and why).

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in OPENAI_API_KEY (optional — see below)
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # ESLint (next/core-web-vitals + next/typescript)
```

## Environment variables

See `.env.example` for the full list. All are optional except `OPENAI_API_KEY` if you want live AI Coach responses:

- `OPENAI_API_KEY` — server-only, never sent to the browser. Without it, the AI Coach Engine gracefully falls back to local content and the UI shows a "Mod tempatan" badge.
- `OPENAI_MODEL` — defaults to `gpt-4o-mini`.
- `NEXT_PUBLIC_DEMO_MODE` — set to `true` to force the AI Coach Engine to always use fast, local, deterministic content (no network call), useful for demos.

## Routes

| Route | Description |
|---|---|
| `/` | Dashboard homepage |
| `/workspace/dpsk` | DPSK document workspace |
| `/workspace/nota-pembelajaran` | Nota Pembelajaran workspace |
| `/workspace/tugasan` | Tugasan workspace |
| `/workspace/latihan-amali` | Latihan Amali workspace |
| `/workspace/pb` | PB workspace |
| `/ai-coach/set-induksi` | AI Coach — Set Induksi |
| `/ai-coach/aktiviti-pdp` | AI Coach — Cadangan Aktiviti |
| `/ai-coach/semak-dokumen` | AI Coach — Semakan Dokumen |
| `/ai-coach/contoh-industri` | AI Coach — Contoh Industri |
| `POST /api/ai-coach` | Backend route — calls OpenAI server-side with local fallback |

## Project structure

```
src/
  app/                    Next.js App Router routes
  components/
    dashboard/            Homepage shell, header, sidebar, cards
    workspace/             PDF viewer + workspace page composition
    ai-coach/               AI Coach page composition + live output renderer
    ui/                    Reusable design-system primitives
  lib/
    ai-coach-engine/       Typed service layer: 4 modules + OpenAI service + validator
    *.ts                   Shared mock data (course, user, workflow items, actions)
  types/                  Shared TypeScript interfaces
```

## Notes on this build

- No database, no authentication — all course/user data is static mock data in `src/lib/`.
- The AI Coach Engine (`src/lib/ai-coach-engine/`) is a standalone, typed service layer. It calls OpenAI through `POST /api/ai-coach` (the only server-side code that touches `OPENAI_API_KEY`), and gracefully degrades to local, deterministic content on any failure so the UI never shows a dead end.
- PDF preview supports local files only (client-side `Blob` URLs via `react-pdf`) — nothing is uploaded anywhere.
- Verified by hand in this environment (no registry access available to run a real `npm install`): every `@/` import resolves, every route's data lookup is consistent, all component prop contracts match their call sites, no placeholder/stub content remains, and brace/paren balance is sane across all files. Run `npm install && npm run build` in an environment with registry access as the final gate before deploying.
