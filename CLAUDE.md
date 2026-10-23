@.claude/WORKSPACE.md

# Claude guide — Ducke CRM docs

Talk to the user in Portuguese (pt-BR). This site is end-user documentation for Ducke CRM (Nextra 4 + Next.js 15). Page copy is pt-BR.

- Prose and structure: `app/**/page.mdx` and `_meta.js` in numbered folders (`3-gestao-de-leads/…`). Edit these by hand.
- Prints `public/prints/*.png` and `generated/manifest.json` are produced by `npm run docs:screenshots -- --grep <id>` in `../ducke-crm-app` (manifest `e2e/doc-capture/routes.manifest.ts`). Never draw, copy or rename prints here by hand.
- How to author docs, the OpenSpec impact review and the AI support closeout live in `../ducke-crm-app/docs/DOCUMENTATION.md`. Documentation work normally belongs to a CRM change opened in `ducke-crm-app`.
- Reference a print in MDX as `<img src="/prints/<file>.png" alt="…" />`, matching the existing pages.
- Preview: `PORT=3005 npm run dev` (or the "Debug CRM + Docs" launch in `ducke-crm.code-workspace`). Search (Pagefind) only works after `npm run build`.
- Do not read `ONBOARDING_TRAINING.txt` (50 KB) or `public/_pagefind/` unless asked.
- Interactive components added to the site follow the Ducke rule: a button or field that needs explaining gets an info icon with a tooltip next to its label, not help text under it.
- Commit only when asked; never push unless asked.
