---
description: Update project documentation when plans, decisions, or requirements change. Identifies affected docs, resolves conflicts, and preserves existing structure.
argument-hint: [what changed and why]
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# Update Docs

You are helping a developer update their project documentation after something changed. A requirement shifted, a tech decision was reversed, scope changed, or implementation revealed something that needs to be reflected in the docs.

The trigger is always: **something changed.**

## Workflow

### Step 1: Understand What Changed

If the developer provided context: $ARGUMENTS

Ask clarifying questions if needed. Understand both *what* changed and *why* it changed. The "why" matters for determining whether this warrants an ADR.

### Step 2: Identify Affected Docs

Read `tandem.json` and match the change against `scope`, `purpose`, and `tags` of each doc entry. Suggest which docs are affected:

> "Based on this change, I think these docs need updating:"
> - `dev-docs/PRD.md` (scope change)
> - `dev-docs/ARCHITECTURE.md` (component affected)
>
> "Does that look right, or should I check others too?"

Wait for confirmation before making changes.

### Step 3: Check for Conflicts

Use domain-based authority to resolve conflicts across docs:

| Domain | Authoritative doc |
|---|---|
| **What to build and why** | PRD |
| **How to build it** | Architecture |
| **What order to build it** | Roadmap |
| **Why a specific technical choice was made** | ADRs |

If a conflict exists (e.g., the PRD requires something the architecture can't support), flag it:

> "The PRD says [X] but the architecture doc describes [Y]. The requirement stands (PRD owns what/why), so the architecture needs to evolve to meet it. Here's how I'd update the architecture: [proposal]. Sound right?"

**Never silently resolve a conflict.** Always explain which domain each side falls in and confirm with the developer.

### Step 4: Update Each Doc

For each affected doc:

1. **Read it as it actually is.** Understand its current structure, headings, and format.
2. **Make changes within that structure.** Do not impose Tandem templates on existing docs. Do not add sections that aren't there. Do not expect a version header if there isn't one.
3. **Preserve everything you didn't change.**
4. **If the doc has a Tandem version header** (the two-line HTML comment at the top), update it:

```markdown
<!-- Last updated: [today's date] -->
<!-- Last change: [brief description of what changed, with ADR reference if applicable] -->
```

5. **If a roadmap step is invalidated**, mark it clearly (strikethrough or note) rather than deleting it.

### Step 5: GitHub Issue Sync

If a roadmap step has a linked GitHub issue (e.g., "GitHub Issue: #12") and the step was modified:

> "Step 3 changed and it's linked to issue #12. Want me to update the issue description to match?"

If `gh` is available, update the issue via `gh issue edit`. If not, note which issues need manual updating.

### Step 6: Architecture Enrichment

For greenfield projects where the architecture doc was created in design mode (no Codebase Map or Entry Points sections), check if significant code now exists. If so, offer:

> "The architecture doc doesn't have a Codebase Map or Entry Points section yet, and there's now a real codebase to document. Want me to add those sections?"

If the developer agrees, scan the codebase and add these sections following the same approach as reverse-engineer mode in `/create-architecture`.

### Step 7: Suggest ADR (If Significant)

If the change is a significant architectural decision, suggest creating an ADR:

> "This seems like a significant decision. Want me to create an ADR for it with `/create-adr`?"

## Important Reminders

- This is one skill, not separate "update-prd" / "update-roadmap" commands. The trigger is always "something changed."
- Updates should be visible. Don't silently rewrite. The version header captures the latest change, and the developer can see what was modified in the diff.
- Creation skills are opinionated (they use Tandem templates). This skill is respectful (it preserves existing structure).
- Never use em dashes in any written content. Use commas, periods, colons, or semicolons instead.
