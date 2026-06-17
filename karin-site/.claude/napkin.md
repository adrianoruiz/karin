# Napkin Runbook

## Curation Rules
- Re-prioritize on every read.
- Keep recurring, high-value notes only.
- Max 10 items per category.
- Each item includes date + "Do instead".

## Execution & Validation (Highest Priority)
1. **[2026-06-16] Shell commands must use `rtk`**
   Do instead: prefix shell commands with `rtk` unless a tool or command is explicitly incompatible.

## Shell & Command Reliability
1. **[2026-06-16] `rtk find` has limited predicate support**
   Do instead: use simpler `rtk find` calls or raw `find` only when compound predicates/actions are required.

## Domain Behavior Guardrails
1. **[2026-06-16] Blog posts support `cover` frontmatter**
   Do instead: save blog cover assets under `public/images/blog/` and reference them with root-relative `/images/blog/...` paths.

## User Directives
1. **[2026-06-16] Follow repo RTK instruction**
   Do instead: apply `/Users/adrianoboldarini/.codex/RTK.md` and use `rtk` for shell execution.
