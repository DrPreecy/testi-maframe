# AI workflow and event conventions

## When to use LangGraph

Use a graph when work has named stages, branching, retry behavior, approval
interrupts, resumability, or auditable transitions. A single stateless model
request does not need a graph.

Each room graph should define:

- validated input and output contracts
- the minimum serializable workflow state
- named nodes with one responsibility
- explicit transition conditions
- bounded retry and failure paths
- human approval points where consequences require them
- events emitted at meaningful state changes

Keep prompts, workflow definitions, provider adapters, persistence, and UI
separate. UI code starts or resumes a workflow and renders its public state; it
does not decide transitions.

## Chamber workflow expectations

### Incubator

Capture input, identify missing context, ask bounded clarification questions,
and emit a refined candidate or an explicit incomplete result.

### Symmetry

Load the candidate, generate distinct perspectives, identify conflicts,
evaluate trade-offs, and emit structured options with evidence and uncertainty.

### Laboratory

Accept an approved option, define checks, execute bounded generation or
experiments, retain validation evidence, and emit a passed or failed result.

### Production

Verify required evidence, request explicit approval when needed, publish only
an approved artifact, and record the outcome or rollback reference.

## Event-writing rules

Write an event after a meaningful accepted input, state transition, durable AI
output, approval decision, failure, or external side effect. Do not emit events
for rendering, polling, token chunks, or internal thoughts.

Event types use uppercase snake case and describe completed facts. Initial
examples include:

- `USER_INPUT_RECORDED`
- `CLARIFICATION_REQUESTED`
- `IDEA_REFINED`
- `OPTIONS_COMPARED`
- `LAB_VALIDATION_PASSED`
- `LAB_VALIDATION_FAILED`
- `PRODUCTION_APPROVED`
- `PRODUCTION_REJECTED`
- `PUBLICATION_COMPLETED`
- `PUBLICATION_FAILED`

Every payload should include an explicit schema version and only the data
needed to reconstruct relevant state. Use identifiers or summaries instead of
duplicating large artifacts. Never persist secrets, hidden reasoning, raw
authorization data, or unnecessary personal data.

## Failure and retry behavior

- Validate before invoking a model or writing an event.
- Bound retries and make retry eligibility explicit.
- Distinguish validation, provider, workflow, persistence, and external-action
  failures.
- Record durable failures once with sanitized context.
- Make externally visible side effects idempotent before retrying them.
- Never report success unless the corresponding operation and event write
  succeeded according to the workflow contract.

## Verification

For workflow changes, verify:

1. valid and invalid inputs
2. expected transitions and terminal states
3. retry limits and failure paths
4. emitted event type and sanitized payload
5. server-only handling of credentials and privileged clients
6. lint, build, Prisma validation, and task-specific tests

Introduce Promptfoo when model-output regressions need automated acceptance
thresholds. Introduce Langfuse or Phoenix when production traces and evaluation
are needed. Neither is required for the initial vertical slice.
