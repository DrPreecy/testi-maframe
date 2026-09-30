# Google AI Studio task template

Copy this template for each implementation request. Replace every bracketed
field; use `None` when a field does not apply.

```text
Task title:
[Short, outcome-focused title]

Objective:
[One concrete outcome]

Relevant chamber:
[Incubator | Symmetry | Laboratory | Production | Shared infrastructure]

Required behavior:
- [Observable requirement]
- [Observable requirement]

Explicit exclusions:
- [Behavior or area that must not change]
- [No unrelated redesign, dependency changes, or schema changes unless listed]

Acceptance criteria:
- [Demonstrable pass condition]
- [Demonstrable pass condition]

Database/schema changes permitted:
[No | Yes — list the permitted models or fields]

Environment assumptions:
- [Required environment-variable names only; never include values]
- [External service or local database assumptions]

Validation commands:
- npm run lint
- npm run build
- [npx prisma validate, tests, or task-specific checks]

Delivery:
1. Inspect AGENTS.md and relevant repository/package documentation first.
2. Restate the task and provide a short plan before implementation.
3. Make the smallest complete change.
4. Report changed files, validation evidence, and remaining limitations.
5. Synchronize the result to the dedicated GitHub development branch.
```

Do not combine multiple unrelated product features in one request. Complete and
validate one vertical slice before requesting the next.
