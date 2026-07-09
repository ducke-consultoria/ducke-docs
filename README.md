# Ducke Docs

Site de documentação do Ducke CRM (Nextra 4 + Next.js 15).

## Divisão de responsabilidades

| Tipo | Local | Quem edita |
|------|-------|------------|
| **Prosa e estrutura** | `app/**/*.mdx`, `app/_meta.js` | Humano ou agente (Cursor) |
| **Screenshots** | `public/prints/*.png` | `npm run docs:screenshots` (Playwright) |
| **Catálogo de prints** | `generated/manifest.json` | Gerado automaticamente na captura |

**`docs:screenshots` só atualiza prints** — não cria nem altera páginas MDX.

## Como documentar

Leia o guia completo: **[docs/AUTHORING.md](./docs/AUTHORING.md)**

Resumo:

1. Adicione a rota em `ducke-crm-app/e2e/doc-capture/routes.manifest.ts`
2. Rode `npm run docs:screenshots` em `ducke-crm-app`
3. Escreva ou edite MDX em `app/` referenciando `/prints/<arquivo>.png`
4. Preview: `npm run dev`

## Atualizar screenshots

```bash
# a partir de ducke-crm-app
npm run docs:screenshots
```

Isso autentica no CRM, visita cada rota do manifest e sobrescreve os PNGs em `public/prints/`.

## Desenvolvimento local

```bash
npm install
npm run dev
```

Build de produção: `npm run build`

Documentação de testes: [ducke-crm-app/docs/TESTING.md](../ducke-crm-app/docs/TESTING.md)
