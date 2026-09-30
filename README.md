# Operator Workspace

Foundation for a Next.js App Router workspace using TypeScript, Tailwind CSS,
the Vercel AI SDK, LangGraph, and Prisma with PostgreSQL.

## Setup

```sh
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --use-npm --yes
npm install ai @ai-sdk/openai @langchain/langgraph @prisma/client
npm install --save-dev prisma
npx prisma init --datasource-provider postgresql
```

Set `DATABASE_URL` in `.env`, then run:

```sh
npx prisma generate
npm run dev
```

Copy `.env.example` to `.env` and replace its placeholder values locally.

## Google AI Studio workflow

GitHub is the source of truth and Google AI Studio is the implementation
environment. Use a dedicated development branch, import the latest repository
state before substantial work, and synchronize completed changes back to
GitHub.

- Paste `docs/google-ai-studio-custom-instructions.md` into Studio's persistent
  custom-instruction field.
- Start each implementation request from
  `docs/google-ai-studio-task-template.md`.
- Read `AGENTS.md`, `docs/architecture.md`, and `docs/ai-workflows.md` before
  changing application behavior.
- Use `.github/pull_request_template.md` as the final quality gate.

## Structure

```text
app/
├── api/chat/route.ts
└── rooms/
    ├── 1-incubator/page.tsx
    ├── 2-symmetry/page.tsx
    ├── 3-laboratory/page.tsx
    └── 4-production/page.tsx
prisma/
└── schema.prisma
```
