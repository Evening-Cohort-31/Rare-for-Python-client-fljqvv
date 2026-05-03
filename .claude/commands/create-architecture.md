---
description: Generate or reverse-engineer a technical architecture document. Works for new projects (design), existing codebases (reverse-engineer), or migrations (current + target state).
argument-hint: [design|reverse-engineer|migration] (optional)
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, AskUserQuestion
---

# Create Architecture

You are helping a developer create a technical architecture document. This skill works in three modes depending on the project situation.

**Use AskUserQuestion for structured decisions.** When the conversation reaches a decision point with discrete options (which mode to use, component trade-offs, infrastructure choices, "include this section or not?"), use the AskUserQuestion tool to present labeled options with descriptions. This is clearer than free-text for architectural trade-off discussions. Keep open-ended exploration as regular conversation.

## Detect Mode

Determine which mode to use:

1. **Check `tandem.json`** for a doc tagged `prd`. Check if the project has existing code (source files, not just config).
2. If there's a PRD but no existing code: **design mode** (greenfield).
3. If there's an existing codebase: **reverse-engineer mode** (brownfield).
4. If there's both existing code and a PRD or target state description: **migration mode** (bluefield).
5. If ambiguous, ask: "Are we designing something new, mapping an existing system, or planning a migration?"
6. If the developer provided an argument ($ARGUMENTS), respect it.

## Mode 1: Design (Greenfield)

The developer has a PRD and needs to design a system.

1. **Read the PRD** (found via manifest, tagged `prd`).
2. **Read `~/.claude/CLAUDE.md`** if it has a Developer Profile. Use experience level to calibrate discussion depth. Do NOT let the developer's existing stack influence recommendations; design for the project's needs.
3. **Discuss the architecture.** Walk through major components, data model, API design, and infrastructure. This is collaborative; the developer should understand and agree with the decisions.
4. **Draft the architecture doc** (default: `dev-docs/ARCHITECTURE.md`, or wherever the developer specifies).
5. **Register in manifest** and review with the developer.

**Important:** In design mode, do NOT include the Codebase Map or Entry Points sections (there's no code yet). These get added later via `/update-docs` once development is underway.

## Mode 2: Reverse-Engineer (Brownfield)

The developer has an existing codebase they need to understand.

1. **Scan the codebase.** Adapt depth based on project size:
   - **Small (<20 files):** Scan into individual files. Read route handlers, model definitions, key utility functions. The full picture fits in context.
   - **Medium (20-100 files):** Scan directory structure fully. Read entry points and config in full. Read key files (models, routes, main modules) but summarize rather than reproduce. Skim utility files and tests for patterns.
   - **Large (100+ files):** Start with directory structure and package manifests only. Read entry points, config, and README. Identify major modules and read their top-level files. Go deeper only where the developer asks.
   - When in doubt, start broad: "This is a large codebase. Want me to go deeper into any specific area?"
2. **Draft the architecture doc.** Include Codebase Map and Entry Points sections from the start.
3. **Add Unanswered Questions** if you encounter things you can't determine from the code alone (why a pattern was chosen, what a cryptic config does, whether code is still in use). Keep this minimal: only questions that materially affect the developer's ability to work in the codebase.
4. **Register in manifest** and review with the developer. Review is especially important here: the developer can correct misunderstandings about how the system works.

## Mode 3: Migration (Bluefield)

The developer has an existing codebase that needs to evolve.

1. **Reverse-engineer the current state** (same as Mode 2).
2. **Understand the target state** from the developer's description or PRD.
3. **Draft the architecture doc** with additional sections:
   - "Current State" and "Target State" for each component that's changing.
   - A "Migration Path" section: what changes in what order.
4. **Add Unanswered Questions** (same as Mode 2).
5. **Register in manifest** and review with the developer.

## Architecture Doc Template

Use this as a flexible starting point. Adapt sections based on the project.

```markdown
<!-- Last updated: [date] -->
<!-- Last change: Initial architecture document -->

# [Project Name] - Technical Architecture

## System Overview
[High-level description of the system]

[Mermaid system diagram showing major components and how they communicate]

## Codebase Map
[Annotated directory structure: what each directory and key file is responsible for.
Only include in reverse-engineer/migration modes, or added later via /update-docs.]

## Entry Points
[How the app starts, what gets called first, where the request lifecycle begins.
Only include in reverse-engineer/migration modes, or added later via /update-docs.]

## Component Breakdown
[Each component, its responsibility, how it communicates with others]

## Data Model
[Full schema: tables/collections, columns/fields with types, relationships,
constraints, indexes.]

[Mermaid ERD showing entities, attributes with types, and relationships]

## API Design
[Endpoints overview, patterns, auth approach]

## Infrastructure & Deployment
[Hosting, CI/CD, environments]

## Key Technical Decisions
[Brief summary; detailed rationale lives in ADRs]

## Project Conventions (optional)
[Cross-cutting rules for how code is written in this project.
Keep this short: if it doesn't fit on one page, something belongs elsewhere.]

### Development Philosophy
[Project-specific principles. Overrides or extends the developer's global
philosophy from their Developer Profile.]

### Testing
[Strategy, framework, what gets tested, coverage expectations]

### Code Style
[Type hints, import style, naming conventions, patterns to prefer/avoid]

### Error Handling
[Structured responses, logging, what never to swallow silently]

### Commits & PRs
[Conventional commits, PR requirements, review process]

### AI Rules
[Any rules specific to how AI agents should behave in this codebase]
```

## Diagrams

- **System Overview** always includes a Mermaid diagram showing major components (frontend, backend, database, external services) and how they connect.
- **Data Model** includes a Mermaid ERD showing the full schema: entities, attributes with types, and relationships. This should reflect the actual database schema, not just a conceptual model.
- Generate diagrams in Mermaid syntax so they render in GitHub, VS Code, and most markdown viewers.

## Register in Manifest

After writing the doc, update `tandem.json`:

```json
{
  "path": "dev-docs/ARCHITECTURE.md",
  "scope": "general",
  "purpose": "System design, component breakdown, data model, API design, project conventions",
  "tags": ["architecture", "system-design", "conventions", "data-model"]
}
```

## Important Reminders

- The architecture doc owns **how to build it**. What to build and why belongs in the PRD.
- The goal is always a useful mental model, not an exhaustive catalog. A Codebase Map that's 10 pages long is worse than one that's 1 page with the right information.
- The Unanswered Questions section is temporary. It gets resolved and removed over time.
- Never use em dashes in any written content. Use commas, periods, colons, or semicolons instead.
