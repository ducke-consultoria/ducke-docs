# Ducke Docs

End-user documentation site for Ducke CRM (Nextra 4 + Next.js 15).

**This repository is for product users only** (`app/**/*.mdx`). How to author docs, OpenSpec impact review, and screenshot capture belong in **`ducke-crm-app/docs/`** — not here.

| Type | Location | Who edits |
|------|----------|-----------|
| **User prose & structure** | `app/**/*.mdx`, `app/_meta.js` | Human or agent |
| **Screenshots** | `public/prints/*.png` | `npm run docs:screenshots` from `ducke-crm-app` |
| **Print catalog** | `generated/manifest.json` | Generated on capture |

Authoring / OpenSpec / screenshots: [ducke-crm-app/docs/DOCUMENTATION.md](../ducke-crm-app/docs/DOCUMENTATION.md) · [TESTING.md](../ducke-crm-app/docs/TESTING.md)

## Local preview

```bash
npm install
npm run dev
```

Production build: `npm run build`
