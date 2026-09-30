# Operator Workspace architecture

## System boundary

The Operator Workspace is a Next.js App Router application. GitHub is the
canonical repository, and Google AI Studio may implement changes through its
GitHub integration. PostgreSQL stores durable application history through
Prisma.

Browser-facing components render state and collect input. Route handlers and
server-only modules validate input, invoke room workflows, access the database,
and call model providers. Credentials and privileged SDK clients never cross
the server boundary.

## Chambers

### 1. Incubator

**Purpose:** capture an unstructured idea and refine it into a clear candidate.

Owns raw input, clarification, assumptions, open questions, and refined idea
artifacts. It must not present an idea as validated or production-ready.

### 2. Symmetry

**Purpose:** examine a candidate from multiple perspectives and produce a
structured decision basis.

Owns comparisons, challenges, trade-offs, contradictions, risks, and option
ranking. It consumes an Incubator output rather than silently rewriting the
original input.

### 3. Laboratory

**Purpose:** turn an approved direction into an implementation and validation
result in a controlled environment.

Owns generation plans, experiments, implementation attempts, checks, and
failure evidence. Laboratory output is not released without Production
approval.

### 4. Production

**Purpose:** approve and publish an artifact that has passed the required
checks.

Owns release decisions, approval or rejection reasons, publication results,
and rollback references. It must not bypass missing Laboratory evidence.

## Dependency direction

Each chamber may depend on shared server infrastructure, shared types, and
validated artifacts from the previous chamber. A chamber must not import
another chamber's UI or mutate another chamber's internal state.

Shared code must represent a genuine cross-chamber capability, such as database
access, event recording, authentication, model-provider configuration, input
validation, or workflow primitives. Do not move room behavior into shared code
merely to reduce file count.

## Server and client boundaries

- Client components may collect input and call application endpoints.
- Route handlers validate requests and invoke application workflows.
- Server-only modules own Prisma and model-provider clients.
- LangGraph owns deterministic workflow progression.
- Prisma persists durable events.
- Responses expose only the minimum data required by the browser.

## Event-sourcing boundary

`EventLog` is the current durable history:

- `roomId` identifies the chamber or room instance.
- `eventType` is a stable uppercase action name.
- `payload` contains versioned, JSON-safe event data.
- `createdAt` establishes event order with `id` as a tie-breaker.

Application code appends events rather than editing historical meaning. Derived
room state should be reproducible from ordered events. Corrections are new
events that supersede earlier information.

Do not include credentials, authorization headers, database URLs, or
unnecessary sensitive prompt content in an event payload.

## Deferred capabilities

Add these only in response to a concrete requirement:

- Promptfoo for prompt and model regression tests
- Langfuse or Phoenix for traces and evaluation
- MCP for external tools unavailable through native integrations
- Playwright after user-facing workflows exist

OpenHands, Aider, and generic agent-skill bundles duplicate the chosen Google AI
Studio builder workflow and are not default dependencies.
