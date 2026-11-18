# CONTEXT.md — FinControl (`fin`)

> **Ponto de entrada AI-First** para orientar agentes e desenvolvedores sobre arquitetura, fluxos reais, pontos de atenção e regras de entrega deste repositório.

---

## 1. Visão Geral do Projeto

- **Aplicação:** **FinControl** (`fin`), dashboard web de finanças pessoais (receitas, despesas, categorias, gráficos e autenticação).
- **Stack principal:** React 19, TypeScript (`~5.9.3`), Vite (`7.2.2`), Redux Toolkit + React-Redux, React Router DOM v7, Styled Components v6, React Hook Form + Yup, Recharts, Axios, FontAwesome.
- **Deploy:** SPA hospedada na Vercel ([`vercel.json`](vercel.json) reescreve todas as rotas para `/`).
- **Ecossistema de APIs externas:**
  - `Auth.Api` (`VITE_API_URL_LOGIN`): login, registro, recuperação/reset de senha, refresh token e health/wake-up.
  - `Fin-API` (`VITE_API_URL`): transações, saldos, categorias, ícones, cores e dados do usuário.
  - `Email Service` (`VITE_API_EMAIL_URL`): health check no cold start da página de auth.

---

## 2. Comandos e Regras de Qualidade

```bash
npm run dev      # Servidor de desenvolvimento (Vite)
npm run build    # Type-check (tsc -b) + build de produção (vite build)
npm run lint     # ESLint em todo o projeto
npm run preview  # Preview local do build
```

**Regras estritas de TypeScript ([`tsconfig.app.json`](tsconfig.app.json)):**
- `strict: true`
- `noUnusedLocals: true` e `noUnusedParameters: true`
- `verbatimModuleSyntax: true` (use `import type { ... }` para tipos)
- **Sempre rode `npm run build` e `npm run lint` antes de abrir PR.**

---

## 3. Variáveis de Ambiente (`.env`)

| Variável | Uso | Onde é lida |
| :--- | :--- | :--- |
| `VITE_API_URL` | Base URL da `Fin-API` | [`src/Services/api.ts`](src/Services/api.ts) |
| `VITE_API_URL_LOGIN` | Base URL da `Auth.Api` | [`src/Services/apiAuth.ts`](src/Services/apiAuth.ts) |
| `VITE_API_EMAIL_URL` | Base URL do serviço de e-mail (health check) | [`src/Hooks/useHealthApi.ts`](src/Hooks/useHealthApi.ts) |
| `VITE_SYSTEM_NAME` | Identificador do sistema no `Auth.Api` (ex: `fin`) | [`src/Services/systemName.ts`](src/Services/systemName.ts) |
| `VITE_LOGIN_VISIT` | E-mail do botão "Logar como visitante" | [`src/Hooks/useAuth.ts`](src/Hooks/useAuth.ts) |
| `VITE_PASS_VISIT` | Senha do botão "Logar como visitante" | [`src/Hooks/useAuth.ts`](src/Hooks/useAuth.ts) |

---

## 4. Mapa da Arquitetura (`src/`)

```text
src/
├── App.tsx                  # ThemeProvider + FormNewProvider + GlobalStyle + BrowserRouter
├── main.tsx                 # StrictMode + Redux Provider
├── routes/                  # Rotas públicas (/auth), privadas (PrivateRoute) e DefaultLayout
├── pages/                   # Páginas lazy-loaded (Auth, Main/Dashboard, Transacao, Categoria, Reports)
├── Layouts/DefaultLayout/   # Shell autenticado: Sidebar, Header, Outlet, Modal global e bootstrap de dados
├── Store/
│   ├── index.ts             # Store Redux (auth, categories, transactions, usuarios, theme)
│   ├── middleware/          # authMiddleware (refresh token automático quando access token expira)
│   └── reducers/            # Slices + createAsyncThunk de cada domínio
├── Services/                # Instâncias Axios (api, apiAuth), authStorage (localStorage) e systemName
├── Hooks/                   # Custom hooks que encapsulam dispatch, selectors, filtros e ordenação
├── contexts/FormNew/        # Contexto global de controle do modal de criação/edição
├── components/              # Componentes de UI (Auth, Dashboards, Graficos, Tabela, FormNew, etc.)
├── validations/             # Schemas Yup para auth, categorias e transações
├── styles/                  # Tema light/dark, cores, GlobalStyle e utilitários
└── Utils/                   # Datas, formatação/normalização de texto, filtros e Enums (Tabs, TransactionType)
```

### Convenção de Camadas (Onde mexer ao implementar algo)
1. **Novo endpoint / estado global:** criar thunk e casos no slice em `src/Store/reducers/` + expor via hook em `src/Hooks/`.
2. **Nova validação de formulário:** criar/estender schema Yup em `src/validations/`.
3. **Novo modal de formulário:** registrar o tipo em `ModalTypes` ([`src/contexts/FormNew/FormNewContext.ts`](src/contexts/FormNew/FormNewContext.ts)) e mapear em [`src/components/FormNew/index.tsx`](src/components/FormNew/index.tsx).
4. **Nova página autenticada:** criar em `src/pages/`, adicionar lazy route dentro de `PrivateRoute` em [`src/routes/index.tsx`](src/routes/index.tsx), adicionar tab em [`src/Utils/Enums/Tabs.ts`](src/Utils/Enums/Tabs.ts), mapear em [`src/Layouts/DefaultLayout/index.tsx`](src/Layouts/DefaultLayout/index.tsx) e linkar em [`src/components/SideBar/index.tsx`](src/components/SideBar/index.tsx).

---

## 5. Fluxos Críticos (Resumo)

> Detalhamento completo com diagramas e endpoints em **[`docs/FLOWS.md`](docs/FLOWS.md)**.

1. **Autenticação & Refresh:** [`AuthPage`](src/pages/AuthPage.tsx) acorda as 3 APIs via [`useHealthApi`](src/Hooks/useHealthApi.ts). Login salva tokens e claims no `localStorage` via [`authStorage`](src/Services/authStorage.ts). Toda action Redux passa pelo [`authMiddleware`](src/Store/middleware/authMiddleware.ts), que verifica `authStorage.isExpired()` e dispara `refreshUsuario` ou `logout`.
2. **Bootstrap do Usuário Logado:** [`DefaultLayout`](src/Layouts/DefaultLayout/index.tsx) verifica `statusPeriodo`, `statusComparativo` e `status` (categorias) e, quando `"idle"`, carrega automaticamente transações do último mês, comparativo de 3 meses e categorias.
3. **Transações & Hidratação:** [`useTransactions`](src/Hooks/useTransactions.ts) hidrata cada transação com sua categoria (caso `item.categoria` venha vazio da API) usando `categorias.receita` / `categorias.despesa`, e aplica em memória: filtro por tipo (`todos`/`receita`/`despesa`), filtro de texto (`normalizaTexto`), filtro do modal (categorias/recorrência) e ordenação por coluna.
4. **Categorias:** [`categoriesSlice`](src/Store/reducers/categories.ts) separa `items.receita` (`TransactionType.Renda = 0`) e `items.despesa` (`TransactionType.Despesa = 1`). [`useCategory`](src/Hooks/useCategory.ts) hidrata ícones e cores via `Map`.
5. **Modais Globais:** [`FormNewProvider`](src/contexts/FormNew/FormNewProvider.tsx) controla `isOpenModal` (`"receita" | "despesa" | "categoria" | "editCategoria" | "editTransacao" | null`), renderizado dentro do `DefaultLayout`.

---

## 6. Pontos de Atenção e Débitos Conhecidos (Leitura Obrigatória para IA)

- **Token no Axios:** não há interceptor global no `api.ts`; cada thunk em `transactions.ts`, `categories.ts` e `user.ts` lê `localStorage.getItem("token")` manualmente.
- **`system` hardcoded no middleware:** [`authMiddleware.ts`](src/Store/middleware/authMiddleware.ts) envia `system: "fin"` no refresh token, enquanto [`useAuth.ts`](src/Hooks/useAuth.ts) usa `systemName` (`VITE_SYSTEM_NAME`).
- **`authStorage.clear()` parcial:** `clear()` remove `token`, `user` e `expiresIn`, mas não remove `refreshToken` (existe `clearRefresh()` separado), `claims` ou `userId`.
- **Recálculo de saldo e comparativo:**
  - `createTransaction.fulfilled` e `deleteTransactions.fulfilled` atualizam `getSaldoTotal` localmente, mas `updateTransaction.fulfilled` **não** atualiza `getSaldoTotal`.
  - Os três casos possuem `// todo recalcular valor do periodo comparativo` em [`src/Store/reducers/transactions.ts`](src/Store/reducers/transactions.ts).
- **Rotas / Funcionalidades em construção:**
  - [`ReportsPage`](src/pages/ReportsPage.tsx) (`/relatorios`) é atualmente um placeholder (`"pagina de relatórios"`) e só aparece na Sidebar quando `!isMobile`.
  - `Tabs.PLANEJAMENTO` existe em [`src/Utils/Enums/Tabs.ts`](src/Utils/Enums/Tabs.ts), mas não possui rota nem item na Sidebar.

---

## 7. Fluxo Git, Branches, Commits e PRs

> Guia completo e templates em **[`docs/GIT_WORKFLOW.md`](docs/GIT_WORKFLOW.md)**.

- **Fluxo padrão:** `branch-funcionalidade` → **PR** → `preview` → **PR** → `main`
- **Exceções diretas na `main`:** `hotfix`, `docs` ou ajustes urgentes (sempre sincronizar `main` → `preview` depois para evitar conflitos).
- **Commits:** Conventional Commits (`feat`, `fix`, `hotfix`, `docs`, `refactor`, `style`, `chore`, `test`).
- **PRs:** usar o template em [`.github/pull_request_template.md`](.github/pull_request_template.md).
