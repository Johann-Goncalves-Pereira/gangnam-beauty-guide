# AGENTS.md

Guia para agentes de AI trabalhando neste repositório.

## App

**Gangnam Beauty Guide — Review Trust Card MVP**

Ferramenta que transforma reviews coreanas de clínicas em Trust Cards em inglês
com sinais de confiança e red flags. Samples funcionam offline; extração live
via `POST /api/extract-review` (OpenAI, server-only).

## Stack

- React 19 + TypeScript (strict) + `@total-typescript/ts-reset/dom`
- Vite (`rolldown-vite`) + React Compiler
- TanStack Router + TanStack Query
- Effect (`effect/Schema` + `Effect` + `@effect-atom/atom-react`)
- Tailwind CSS v4
- Vitest + Testing Library
- Vercel serverless (`api/extract-review.ts`)

## Comandos

```bash
pnpm dev           # desenvolvimento (samples + UI)
pnpm validate      # tsc + lint + format:check + test
pnpm build         # validate + build de produção + check:bundle
pnpm test          # testes
```

## Regras obrigatórias

Leia `.cursor/rules/` — especialmente `core-standards.mdc`, `code-style.mdc`,
`no-shortcuts.mdc` e `english-identifiers.mdc` (sempre ativas).

### Filosofia de qualidade

- É mais fácil fazer certo do que contornar tipagem, lint ou testes.
- Proibido: `@ts-ignore`, `eslint-disable`, pular testes, deixar dívida técnica.
- Identificadores no código só em inglês (português só em strings de UI).
- Toda tarefa termina a 100%: tipagem + lint + testes + docs afetadas +
  `pnpm validate` verde.

### Sempre faça

- Schema Effect primeiro → `type X = typeof XSchema.Type`
- Validar env (`@lib/env`) e API (`@lib/api-client`) nas fronteiras com Schema
- API como `Effect`; bridge para Query com `runApiPromise`
- Feature em `src/features/trust-card/` com `index.ts` como API pública
- Rodar `pnpm validate` após mudanças

## Estrutura

```
src/
  features/trust-card/   # domínio (api, atoms, components, hooks)
  app/                   # bootstrap, providers, router
  lib/                   # env, api-client, query-client
  pages/                 # composição fina
  routes/                # wiring TanStack Router
api/
  extract-review.ts      # Vercel serverless (OpenAI)
```

## Qualidade remota

- CI: frozen install + `pnpm validate` + `vite build` + `check:bundle`
- Husky: pre-commit = lint-staged; pre-push = `pnpm validate`
- `src/routeTree.gen.ts` é gerado e ignorado pelo ESLint
