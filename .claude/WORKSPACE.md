# Ducke workspace map

All repositories are siblings under `~/Workspace/Ducke/` (reach them as `../<repo>`). This file is identical in every repo; edit it in `crud-shadcn` and copy it to the repos outside the template family.

| Repo | Role | UI / stack | Dev (port) | OpenSpec | Runs with |
|---|---|---|---|---|---|
| `crud-shadcn` | Generic CRUD template. Git remote `template` of erp, opme, admin | Next 16 + vinext, shadcn/ui | `npm run dev` (3002) | own | alone |
| `ducke-erp` | Template child; home of the shared business modules: sales, NF-e/NFS-e, stock, finance, purchasing (see its `.claude/PRODUCT.md`) | same as template | 3002 | own | alone |
| `ducke-opme` | OPME product; keeps its own finance, NFe, stock and purchases until moved to ERP | same as template | 3001 | own | alone |
| `ducke-admin` | Control plane (one organization) | same as template | 3002 | own, plus infra and cross-product changes | alone |
| `ducke-crm-app` | CRM web app | Next 16, HeroUI v3, Tailwind 4 | `npm run dev` (3000); `npm run dev:all` starts app + api | owns all CRM specs, API included | `ducke-crm-api` |
| `ducke-crm-api` | CRM API | Express 5, Prisma 7, Valkey, Socket.io | `npm run dev` (4000 http, 4001 ws) | none, see `ducke-crm-app/openspec` | `ducke-crm-app` |
| `ducke-docs` | CRM end-user docs (Nextra 4) | MDX in `app/`, prints in `public/prints/` | `PORT=3005 npm run dev` | none, authored from `ducke-crm-app` | CRM, or alone |
| `ducke-crm-chat-test` | Local Meta Graph / WhatsApp mock | Express | `npm run dev` (4200) | none | any app testing WhatsApp (`META_GRAPH_BASE_URL=http://localhost:4200`) |
| `ducke-website` | Marketing site | Next 16, HeroUI v3, next-intl | `npm run dev` (3000) | own | alone |
| `ducke-infra` | CloudFormation for the AWS account | YAML, Python checks | none | none, planned in `ducke-admin/openspec` | alone |
| `ducke-agents` | ClickUp task agent: triages `ia-ok` tasks and opens PRs with Claude Code headless; reports to ducke-admin `/agents` | Node 24 + TypeScript, Docker Compose | `docker compose up` (no port) | none, planned in `ducke-admin/openspec` | ducke-admin (worker API) |

Port clashes: crud-shadcn, erp and admin all use 3002; crm-app and website both use 3000. Run one at a time or pass another port.

## VS Code workspaces

- `ducke-admin/ducke-admin.code-workspace` opens admin plus crm-app, crm-api, opme, erp, crud-shadcn, website, infra and agents (the control-plane view; docs and chat-test are not in it). Launch "Debug" runs admin `npm run dev`.
- `ducke-crm-app/ducke-crm.code-workspace` opens crm-app, crm-api, chat-test and docs. Launch "Debug All (Concurrently)" runs `npm run dev:all` (app + api); compound "Debug with chat" adds chat-test; "Debug CRM + Docs" adds docs on 3005.
- Every other repo is opened and run on its own.

A Claude session started from a workspace has the opened folders as additional directories. Work in the repo that owns the behavior.

## Where to look

| Need | Look in |
|---|---|
| Generic CRUD, auth shell, AI support core, template behavior | `crud-shadcn`, then the product that merged it |
| Shared business modules (sales, fiscal, stock, finance, purchasing) | `ducke-erp` (`openspec/specs/erp-*`); OPME-specific variants stay in `ducke-opme` |
| CRM behavior (app and API) | `ducke-crm-app/openspec`, code in `ducke-crm-app` + `ducke-crm-api` |
| AWS stacks, ALB, pipelines | `ducke-infra` (runbook: `docs/runbook.md`) |
| ClickUp task agent (worker, prompts, compose) | `ducke-agents`; its runs and worker API live in `ducke-admin` |
| Marketing site | `ducke-website` |

The four template repos share most files. Search the owner first; do not grep all four for the same hit.

## Lineage and OpenSpec ownership

- Generic platform code changes in `crud-shadcn` first (with its OpenSpec change there), then each child runs `git merge template/main`. Never edit the same generic file in each child.
- Product work gets its OpenSpec change in that product's repo. CRM changes live in `ducke-crm-app` even when only the API changes.
- Infra and cross-product work started from the admin workspace gets its change in `ducke-admin`.
- `openspec/specs/` is current truth; `openspec/changes/archive/` is history, read it only when asked.
