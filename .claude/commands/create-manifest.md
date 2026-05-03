---
description: Generate or update the tandem.json project manifest. Scans for existing docs (brownfield) or creates a minimal manifest (greenfield).
argument-hint: [scan|init] (optional)
allowed-tools: Read, Write, Bash, Glob, Grep
---

# Create Manifest

You are helping a developer set up or update their `tandem.json` project manifest. This file is the table of contents for all project documentation: what docs exist, what they cover, and where they live.

## Detect Mode

First, determine which mode to use:

1. **Check if `tandem.json` already exists** in the project root.
   - If it exists, offer to **update** it by scanning for new docs that aren't already in the manifest. Do not overwrite existing entries.

2. **Check if the project has existing documentation files** (markdown files in `docs/`, `wiki/`, `.claude/rules/`, project root, etc.; README files; ADR directories).
   - If yes, use **scan mode**.
   - If the project is empty or brand new with no documentation, use **initialize mode**.

3. If the user provided an argument ($ARGUMENTS), respect it: "scan" forces scan mode, "init" forces initialize mode.

## Scan Mode (Brownfield/Bluefield)

The project already has documentation. Your job is to find it, categorize it, and build the manifest.

### Step 1: Scan for documentation files


Search the repo for documentation files. Do NOT use a single unscoped recursive glob like `**/*.md` from the project root, as results will be dominated and truncated by dependency directories.

**Search strategy (in this order):**

1. **Project root first:** `Glob("*.md", path=projectRoot)` to catch top-level docs like README.md, DEPLOY.md, CONTRIBUTING.md, etc. These are the most commonly missed.
2. **Known doc directories:** Glob `**/*.md` scoped within each of: `docs/`, `wiki/`, `dev-docs/`, `.github/`, `.claude/rules/`, and any `adr/` or `adrs/` directory.
3. **Catch-all with exclusions:** Use Bash with `find` to locate remaining markdown files while excluding dependency and build directories. Exclude paths containing: `node_modules`, `.git`, `vendor`, `build`, `dist`, `__pycache__`, `.venv`, `venv`, and `.claude/commands`. Compare against files already found in steps 1-2 to identify docs in unexpected locations.

**Look for:**
- README files, contributing guides, style guides, convention docs
- Architecture and design documents
- Config documentation, deployment guides
- ADR (Architecture Decision Record) files

**Be conservative.** Exclude:
- Files inside `node_modules/`, `.git/`, `vendor/`, `build/`, `dist/`, `__pycache__/`, `.venv/`, `venv/`
- LICENSE files
- Changelog/release notes (unless specifically about architecture or conventions)
- Auto-generated docs
- Package README files that aren't project documentation
- Tandem skill/command templates (`.claude/commands/`)

For large repos with many markdown files, prioritize: architecture docs, API docs, convention/style guides, ADRs, READMEs, and contribution guides. If you find more than 20 documentation files, ask the developer: "I found [N] markdown files. Want me to include all of them, or should I focus on the most important ones?"

### Step 2: Categorize each file

For each file found, infer these fields by reading the filename, directory, and first few lines or headings:

- **`path`**: Relative path from project root
- **`scope`**: Which domain this doc covers. Common values: `general` (applies to everything), `frontend`, `backend`, `database`, `api`, `infrastructure`. Use whatever values fit the project.
- **`purpose`**: A human-readable description of what the doc contains. This is what other Tandem commands read to decide relevance without opening the file.
- **`tags`**: Finer-grained matching keywords. Conventional tags that other Tandem commands search for: `prd`, `architecture`, `roadmap`, `adr`, `conventions`.

### Step 3: Present for review

Show the developer the draft manifest:

> "I found these docs in your repo. Here's how I'd categorize them. Want to adjust anything?"

Display the full JSON so they can see every entry. Wait for feedback and revise before writing.

### Step 4: Write the manifest

Write `tandem.json` to the project root with the reviewed entries:

```json
{
  "version": 1,
  "config": {
    "understandingChecks": true
  },
  "docs": [
    {
      "path": "path/to/doc.md",
      "scope": "general",
      "purpose": "Description of what this doc contains",
      "tags": ["relevant", "tags"]
    }
  ]
}
```

## Initialize Mode (Greenfield)

The project is new with no documentation. Create a minimal manifest:

```json
{
  "version": 1,
  "config": {
    "understandingChecks": true
  },
  "docs": []
}
```

Write this to `tandem.json` in the project root and let the developer know:

> "Created `tandem.json` with default config and an empty docs array. As you create documentation with `/create-prd`, `/create-architecture`, etc., each command will register its output in the manifest automatically."

## Update Mode (Existing Manifest)

If `tandem.json` already exists:

1. Read the current manifest.
2. Scan the repo for documentation files (same as scan mode).
3. Compare against existing entries. Identify new files not yet in the manifest.
4. Present only the new files to the developer: "I found these docs that aren't in your manifest yet. Want to add any of them?"
5. Add confirmed entries without modifying existing ones.

## Important Reminders

- The manifest is a table of contents, not a format enforcer. It tells Tandem where docs are and what they're about. It says nothing about how they're structured inside.
- The developer can always edit `tandem.json` manually. This command is a convenience, not a requirement.
- Never use em dashes in any written content. Use commas, periods, colons, or semicolons instead.
