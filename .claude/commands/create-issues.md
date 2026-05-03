---
description: Convert roadmap steps into GitHub issues with two-way linking. Requires GitHub CLI (gh) to be installed and authenticated.
argument-hint: (no arguments)
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# Create Issues

You are helping a developer convert their roadmap steps into GitHub issues. Each issue links back to its roadmap step, and each roadmap step gets updated with a link to its issue.

## Prerequisites

1. **A roadmap must exist.** Check `tandem.json` for a doc tagged `roadmap`. If none exists:
   > "I need a roadmap to create issues from. Want to run `/create-roadmap` first?"

2. **The project must be a GitHub repo.** Check for `.git/` directory and a GitHub remote.

3. **GitHub CLI must be installed and authenticated.** Test with `gh auth status`. If not available:
   > "This command requires the GitHub CLI (`gh`) to be installed and authenticated. Install it at https://cli.github.com/ and run `gh auth login`."

## Workflow

### Step 1: Read the Roadmap

Find the roadmap via the manifest (tagged `roadmap`). Parse each step: title, description, user stories (if any).

### Step 2: Preview Issues

Present the issues that will be created:

> "I'll create these GitHub issues from your roadmap:"
>
> 1. **Step 1: [Title]** - [brief description]
> 2. **Step 2: [Title]** - [brief description]
> ...
>
> "Want to proceed, or adjust anything first?"

Wait for confirmation.

### Step 3: Create Issues

For each roadmap step, create a GitHub issue using `gh issue create`. Use the issue template from `.tandem/templates/github-issue.md` if it exists, otherwise use this format:

```markdown
## Description
[What this step implements, pulled from the roadmap step description]

## User Stories (if applicable)
[Pulled from the roadmap step, if user stories were included]
- As a [user type], I want to [action] so that [outcome].

## Roadmap Reference
Step [N] in `[roadmap path from tandem.json]`

## Acceptance Criteria
- [ ] [Key deliverable or behavior that signals this step is done]
- [ ] [Another criteria if applicable]
```

Derive acceptance criteria from the roadmap step's description and user stories. Keep them concrete and verifiable.

### Step 4: Update Roadmap with Issue Links

After creating each issue, update the corresponding roadmap step to include a link:

```markdown
- [ ] **Step 1: [Title]**
  [Description]
  GitHub Issue: #12
```

This creates true two-way references: issues link to roadmap steps, roadmap steps link to issues. When `/update-docs` modifies a roadmap step later, it can see the linked issue and flag that it may be out of date.

### Step 5: Summary

Report what was created:

> "Created [N] GitHub issues:"
> - #12: Step 1 - [Title]
> - #13: Step 2 - [Title]
> ...
>
> "Each issue links back to its roadmap step, and each roadmap step now links to its issue."

## Important Reminders

- Issues are for workflow organization, not learning classification. No learning tier labels or learning goal tags. `/pair-program` handles learning-aware guidance during implementation.
- Just issues, not a project board. The developer creates their own board if they want one.
- Never use em dashes in any written content. Use commas, periods, colons, or semicolons instead.
