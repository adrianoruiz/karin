# Napkin Runbook

## Curation Rules
- Re-prioritize on every read.
- Keep recurring, high-value notes only.
- Max 10 items per category.
- Each item includes date + "Do instead".

## Execution & Validation (Highest Priority)
1. **[2026-04-24] Full lint/typecheck currently fail on legacy issues**
   Do instead: run focused tests for touched behavior and report existing lint/typecheck failures separately unless the task is to clean the whole codebase.

## Shell & Command Reliability
1. **[2026-04-24] Repo root is one level above the Nuxt app**
   Do instead: use `/Users/adrianoboldarini/7clicks/karin` for Git-root operations and `/Users/adrianoboldarini/7clicks/karin/karin-site` for Nuxt app commands.

## Domain Behavior Guardrails
1. **[2026-04-24] WhatsApp CTA analytics use `utm_content` inside message text**
   Do instead: add a distinct `WhatsAppSource` value for each CTA that needs separate click attribution.

## User Directives
1. **[2026-04-24] Prefer pragmatic review fixes**
   Do instead: apply actionable low-risk review items and leave awareness-only or subjective housekeeping notes unchanged unless requested.
