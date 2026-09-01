# Gangnam Beauty Guide — Review Trust Card

MVP for [Gangnam Beauty Guide](https://gangnambeautyguide.com): turn Korean
clinic reviews into normalised English **Trust Cards** with clinic, procedure,
surgeon, and trust/red-flag signals.

## Stack

- React 19 + TypeScript (strict)
- Vite (`rolldown-vite`) + React Compiler
- TanStack Router + TanStack Query
- Effect Schema + Effects + `@effect-atom/atom-react`
- Tailwind CSS v4
- Vercel serverless (`api/extract-review`) for live AI extraction

## Getting started

```bash
pnpm install
pnpm dev
```

Curated sample reviews work in `pnpm dev` without an API key. For live
extraction of pasted Korean text, run `vercel dev` (or deploy to Vercel with
`OPENAI_API_KEY` set).

Copy `.env.example` to `.env` and set `OPENAI_API_KEY` for server-side
extraction. Only `VITE_` vars are exposed to the browser.

## Scripts

| Script          | Description                                   |
| --------------- | --------------------------------------------- |
| `pnpm dev`      | Local development (samples + UI)              |
| `pnpm validate` | Typecheck + lint + format check + test        |
| `pnpm build`    | `validate` + production build + bundle budget |
| `pnpm test`     | Run tests once                                |

## Project structure

```
src/
├── features/trust-card/   # Review Trust Card feature
├── api/                   # Vercel serverless (extract-review)
├── app/                   # Bootstrap, providers, router
├── pages/                 # Thin page composition
└── routes/                # TanStack Router wiring
```

See `src/features/trust-card/` for the reference feature: Effect Schema → API
Effect → Query mutation, curated samples, and `selectedSampleAtom` for UI state.

## Deploy

```bash
pnpm validate
# Push to Vercel; set OPENAI_API_KEY in project env
```

`vercel.json` configures SPA rewrites and `/api/*` serverless routes.

## Quality gates

- `pnpm validate` = `tsc` + lint + Prettier check + tests
- Husky pre-commit: lint-staged; pre-push: `pnpm validate`
- ESLint: `--max-warnings 0`

See `AGENTS.md` for AI agent conventions.
