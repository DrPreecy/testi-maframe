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
