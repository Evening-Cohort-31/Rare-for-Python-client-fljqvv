---
description: Generate a Product Requirements Document from a project idea. Conversational process to gather requirements, discuss trade-offs, and define scope.
argument-hint: [project idea or description] (optional)
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, AskUserQuestion
---

# Create PRD

You are helping a developer define their project through a Product Requirements Document. This is a conversational process: gather requirements, discuss trade-offs, explore scope, and produce a concise document that serves as the source of truth for what to build and why.

## Step 1: Gather Context

If the developer provided a description: $ARGUMENTS

Start by understanding the project. Ask clarifying questions. Don't ask everything at once; have a natural conversation. Key things to learn:

- What problem does this solve?
- Who are the users? (if applicable; not every project has end users)
- What are the constraints? (timeline, team size, hosting, budget, compliance)
- Is there a preferred tech stack, or is that open for discussion?
- Is this a personal/portfolio project or production/client work?

**Read `~/.claude/CLAUDE.md`** if it exists and has a `## Developer Profile` section. Use the developer's experience level to calibrate the depth of your questions and discussion.

**Tech stack neutrality is critical.** Do NOT use the developer's existing tech stack or learning goals from their Developer Profile to influence tool or language recommendations. The right stack for the project is whatever best solves the problem, not whatever the developer already knows or wants to learn. If the developer asks for guidance, recommend tools based on the project's needs, trade-offs, and constraints. Present options and let the developer decide.

**Use AskUserQuestion for structured decisions.** When the conversation reaches a decision point with discrete options (tech stack choices, scope trade-offs, "include this section or not?"), use the AskUserQuestion tool to present labeled options with descriptions. This is clearer than free-text for trade-off discussions. Keep open-ended discovery ("tell me about the problem") as regular conversation.

## Step 2: Draft the PRD

Once you have enough context, draft the PRD. Default location: `dev-docs/PRD.md`, or wherever the developer specifies.

Use this as a flexible starting point, not a rigid format. Adapt sections based on the project. A simple CLI tool doesn't need a Target Users section. A complex distributed system might need additional sections for data flow or security.

```markdown
<!-- Last updated: [date] -->
<!-- Last change: Initial PRD creation -->

# [Project Name] - Product Requirements Document

## Problem Statement
## Target Users (if applicable)
## Core Requirements
## Technical Stack
  ### Stack Decisions (with brief rationale for each)
## Scope
  ### In Scope (v1)
  ### Out of Scope (future)
## Success Criteria
## Learning Goals (optional, for personal/portfolio projects only)
```

**On the Learning Goals section:** Include it only when the developer is building something specifically to learn (a portfolio project, a personal experiment). Leave it out for production work, client projects, or anything where learning is secondary to shipping. If present, `/pair-program` uses it to inform understanding checks. It should never influence which tools or technologies are chosen for the project.

Keep the PRD concise. If it takes more than 10-15 minutes to read, it's too long.

## Step 3: Register in Manifest

After writing the PRD, update `tandem.json`:

- If `tandem.json` exists, add the new doc entry to the `docs` array.
- If `tandem.json` does not exist, create it with default config and the new doc entry.

```json
{
  "path": "dev-docs/PRD.md",
  "scope": "general",
  "purpose": "Product requirements, target users, tech stack decisions, project scope",
  "tags": ["prd", "requirements", "scope", "stack"]
}
```

## Step 4: Review with Developer

Walk through the draft with the developer. Get feedback and revise. The PRD is a living document; `/update-docs` can modify it later as things evolve.

## Important Reminders

- The PRD owns **what to build and why**. Architecture (how to build it) belongs in the architecture doc.
- Brief tech stack rationale goes here. Detailed trade-off analysis goes in ADRs.
- Never use em dashes in any written content. Use commas, periods, colons, or semicolons instead.
