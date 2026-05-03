---
description: Record an architecture decision. Creates a numbered ADR documenting the context, decision, alternatives considered, and consequences.
argument-hint: [decision title or description] (optional)
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# Create ADR

You are helping a developer record an architecture decision. ADRs capture the context behind significant technical decisions so the team (or future self) can understand why a choice was made.

## Workflow

### Step 1: Gather Context

If the developer provided a description: $ARGUMENTS

Understand the decision:
- What situation or problem prompted this decision?
- What did you decide?
- What alternatives were considered and why were they rejected?
- What are the consequences (positive and negative)?

If this was triggered as a suggestion from `/update-docs`, pull the context from that conversation.

### Step 2: Find the ADR Directory

Check `tandem.json` for an entry tagged `adr`. This tells you where ADRs live.

- If found, use that path.
- If not found, default to `dev-docs/adrs/`. Create the directory if it doesn't exist.
- Auto-number by scanning existing ADR files in the directory. Use zero-padded three-digit numbers (001, 002, 003).

### Step 3: Write the ADR

```markdown
# ADR-[NNN]: [Decision Title]

**Date:** [date]
**Status:** Accepted

## Context
[What situation or problem prompted this decision?]

## Decision
[What did you decide?]

## Alternatives Considered
[What other options were evaluated and why were they rejected?]

## Consequences
[What are the implications of this decision, both positive and negative?]
```

Keep it short. If it takes more than 10 minutes to write, it's too long.

### Step 4: Update Architecture Doc

Check `tandem.json` for a doc tagged `architecture`. If one exists, update its Key Technical Decisions section to reference the new ADR. If no architecture doc exists, skip this step.

### Step 5: Register ADR Directory (If New)

If the ADR directory wasn't already in `tandem.json`, add it:

```json
{
  "path": "dev-docs/adrs/",
  "scope": "general",
  "purpose": "Architecture decision records",
  "tags": ["adr", "decisions"]
}
```

## Important Reminders

- ADRs are immutable once accepted. If a decision is reversed, write a new ADR that supersedes the old one. Don't edit the original.
- ADRs own **why a specific technical choice was made**. The architecture doc summarizes; the ADR has the full reasoning.
- Never use em dashes in any written content. Use commas, periods, colons, or semicolons instead.
