<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Operator Workspace engineering rules

## Source of truth

- GitHub is the source of truth. Work on a dedicated development branch and
  synchronize repository changes before and after each substantial task.
- Treat this as an existing application. Inspect the relevant files before
  proposing or making changes.
- Keep changes small and focused. Do not replace established libraries or add
  dependencies unless the task requires it.
- Never commit credentials or include them in prompts, fixtures, logs, or
  browser-delivered code. Use environment variables.

## Required architecture

- Preserve strict TypeScript, the Next.js App Router, Tailwind CSS, Prisma,
  PostgreSQL, the Vercel AI SDK, and LangGraph.
- Keep AI provider calls, Prisma access, and secrets in server-only modules or
  route handlers. Client components must not import them.
- Use LangGraph for deterministic, multi-step room workflows. Do not hide
  workflow state transitions inside UI components.
- Treat `EventLog` as append-only application history. Record meaningful room
  inputs, workflow transitions, AI outputs, approvals, rejections, and
  publication outcomes.
- Keep room-specific behavior within its room boundary. Put only genuinely
  shared infrastructure in shared modules.

## Chamber boundaries

- **Incubator (`1-incubator`)** captures and refines raw ideas.
- **Symmetry (`2-symmetry`)** compares, challenges, and structures ideas.
- **Laboratory (`3-laboratory`)** generates and validates implementations in a
  controlled environment.
- **Production (`4-production`)** approves and publishes validated outputs.

See `docs/architecture.md` and `docs/ai-workflows.md` before changing room or
workflow behavior.

## Required task workflow

1. Inspect the repository and relevant installed Next.js documentation.
2. Restate the objective, constraints, and explicitly excluded work.
3. Identify the smallest affected area and provide a short plan.
4. Implement one coherent unit without unrelated cleanup.
5. Run the relevant quality checks.
6. Review server/client boundaries, input handling, secrets, and event logging.
7. Report changed files, validation results, and remaining limitations.

## Quality gates

- **Architecture:** behavior belongs to the correct chamber and respects
  server/client boundaries.
- **Correctness:** acceptance criteria are demonstrated; TypeScript, lint,
  build, and Prisma validation pass when applicable.
- **Security:** inputs are validated, secrets remain server-side, and sensitive
  data is not written to logs or events.
- **Product quality:** error and empty states are intentional, and claims are
  backed by validation.

Run these commands as applicable:

```sh
npm run lint
npm run build
npx prisma validate
```

Do not install generic agent frameworks by default. Prompt evaluation,
observability, MCP integrations, and browser testing should be introduced only
when a concrete requirement justifies them.
