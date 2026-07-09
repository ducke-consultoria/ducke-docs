# Como documentar o Ducke CRM

Este guia define como **autores humanos** e **agentes (Cursor)** escrevem a documentação de uso. O comando `docs:screenshots` **não** gera texto — apenas atualiza screenshots.

## Divisão de responsabilidades

| Quem | O quê | Onde |
|------|-------|------|
| `npm run docs:screenshots` | Captura PNGs do CRM em execução | `public/prints/*.png`, `generated/manifest.json` |
| Humano ou agente | Prosa, estrutura, navegação | `app/**/*.mdx`, `app/_meta.js` |

## Fluxo recomendado

1. **Manifest** — adicione ou atualize a rota em `ducke-crm-app/e2e/doc-capture/routes.manifest.ts` com `printFile` estável (ex.: `lista-leads.png`).
2. **Captura** — rode `npm run docs:screenshots` em `ducke-crm-app` para atualizar o PNG.
3. **Autoria** — crie ou edite a página MDX em `ducke-docs/app/<secao>/page.mdx`.
4. **Navegação** — registre a seção em `app/_meta.js` se for página nova.
5. **Preview** — `npm run dev` em `ducke-docs`.

## Estrutura de uma página MDX

```mdx
---
title: 'Título visível no menu'
order: 1
---

# Título da página

Texto introdutório em português, claro e orientado ao usuário final.

<img src="/prints/lista-leads.png" style={{ borderRadius: '0.5rem' }} />

## Subseção

Explique o que o usuário vê no print e quais ações pode tomar.

- **Item:** descrição breve
```

### Regras de conteúdo

- Escreva em **português**, tom direto, para usuários do CRM (não para desenvolvedores).
- Cada print deve ter **contexto em prosa** antes ou depois da imagem — nunca só a screenshot.
- Use `##` para passos ou áreas da tela; evite documentar implementação interna.
- Referencie prints com caminho `/prints/<arquivo>.png` (arquivo em `public/prints/`).
- Mantenha `printFile` no manifest **igual** ao nome usado no MDX para que `docs:screenshots` atualize a imagem certa.

### Frontmatter

| Campo | Obrigatório | Descrição |
|-------|-------------|-----------|
| `title` | Sim | Rótulo no menu lateral Nextra |
| `order` | Opcional | Ordem dentro da pasta/seção |

### Componentes Nextra (opcional)

```mdx
import { Callout } from 'nextra/components'

<Callout type="info">
  Dica ou aviso importante para o usuário.
</Callout>
```

## Organização de pastas

Espelhe a estrutura pedagógica existente:

```
app/
├── 1-introducao-ao-ducke-crm/
├── 3-gestao-de-leads/
│   └── page.mdx          ← referencia /prints/lista-leads.png
├── _meta.js              ← mapa do menu
```

Nomes de pasta usam kebab-case com prefixo numérico quando a ordem importa.

## Adicionar documentação de uma tela nova

1. Entrada no manifest (`routes.manifest.ts`):

```typescript
{
  id: 'minha-tela',
  module: 'meu-modulo',
  title: 'Minha Tela',
  crmRoute: '/minha-rota',
  printFile: 'minha-tela.png',
}
```

2. Rode `npm run docs:screenshots` em `ducke-crm-app`.

3. Crie `app/<secao>/page.mdx` referenciando `/prints/minha-tela.png`.

4. Atualize `app/_meta.js`:

```javascript
export default {
  // ...
  'minha-secao': 'Minha Seção',
}
```

## Manifest JSON (`generated/manifest.json`)

Catálogo somente leitura após cada captura — use para saber quais prints existem e qual rota CRM gerou cada um. **Não** edite MDX a partir do manifest; ele é referência para autores.

## O que nunca fazer

- Não commitar placeholders em `public/prints/` — sempre capturar via Playwright.
- Não esperar que `docs:screenshots` escreva ou atualize MDX.
- Não remover páginas humanas ao adicionar novas rotas ao manifest.

## Referências

- Exemplo real: `app/` páginas existentes e prints em `public/prints/`
- Testes e captura: [ducke-crm-app/docs/TESTING.md](../../ducke-crm-app/docs/TESTING.md)
