# Plano de trabalho — UC-03 Registrar Obra

> As chaves `GAL-nn` são exemplos. O Jira gera os números reais; ao criar cada item, copie a chave dele para o nome da branch. Troque `GAL` pela chave do seu projeto.

## 1. Hierarquia

| Nível Jira | O que é aqui | Branch GitHub |
|---|---|---|
| **Epic** | UC-03 Registrar Obra | `dev` |
| **Story** | Entrega com valor para o usuário | `gal-0NN-nome-da-story` (sai de `dev`) |
| **Task / Bug** | Trabalho de uma pessoa, de 2 a 6 horas | `gal-0NN-nome-da-task` (sai da story) |

Regra de ouro: **uma task = uma pessoa = uma branch = um Pull Request.** O merge vai sempre de baixo para cima: task → story → dev → main.

## 2. Backlog

### Epic GAL-1 — UC-03 Registrar Obra

#### Story A — Fundação do projeto
Objetivo: todo mundo roda o projeto vazio na própria máquina.

| Task | Descrição | Pronto quando |
|---|---|---|
| A1 | Criar repositório, branches `main` e `dev`, proteção de `main`, `.gitignore` | Ninguém consegue dar push direto na `main` |
| A2 | Scaffold do backend (NestJS) com rota `/health` | `GET /health` responde 200 |
| A3 | Scaffold do frontend (React + Vite + TS) | Página inicial abre no navegador |
| A4 | Projeto Supabase, `schema.sql`, `seed.sql`, bucket `obras` | Tabelas e usuários de teste existem |
| A5 | Conexão backend ↔ Supabase com `.env.example` | Rota de teste lê usuários do banco |

#### Story B — Registrar obra na API (núcleo do UC-03)
Objetivo: `POST /obras` funcionando com todas as regras.

| Task | Descrição | Pronto quando |
|---|---|---|
| B1 | DTO de entrada e validação dos campos obrigatórios (RF-002) | Campo faltando devolve 400 com mensagem clara |
| B2 | `HashService`: SHA-256 de JSON canônico e hash de arquivo | Teste unitário: mesma entrada gera mesmo hash |
| B3 | Geração de UUID e protocolo `REG-AAAA-NNNNNN` | Protocolo sequencial e único |
| B4 | Regra de titularidade: prova obrigatória e ator autorizado | Sem prova devolve 422; ator sem permissão devolve 403 |
| B5 | Persistir a obra e bloquear duplicidade (`UNIQUE` no hash) | Segundo registro igual devolve 409 |
| B6 | Alerta de semelhança (mesmo artista + título normalizado) | Resposta traz `alertas` sem bloquear |
| B7 | `AuditoriaService` e evento `OBRA_REGISTRADA` | Cada registro cria um evento; não há rota para alterá-lo |
| B8 | Testes do fluxo principal e dos três fluxos de exceção | Testes passam no CI local |

#### Story C — Arquivos da obra
Objetivo: imagens e prova de titularidade enviadas e verificáveis.

| Task | Descrição | Pronto quando |
|---|---|---|
| C1 | Upload multipart (imagens e prova) para o Supabase Storage | Arquivos aparecem no bucket |
| C2 | Calcular e gravar hash de cada arquivo (RNF-009) | `hash_arquivo` salvo na tabela |
| C3 | Validar tipo e tamanho (ex.: JPG/PNG/PDF, até 10 MB) | Arquivo inválido devolve 400 |

#### Story D — Consultar, editar e excluir obras (CRUD restante)

| Task | Descrição | Pronto quando |
|---|---|---|
| D1 | `GET /obras` com filtros | Lista filtra por artista, título e status |
| D2 | `GET /obras/:id` com arquivos e eventos | 404 para id inexistente |
| D3 | `PATCH /obras/:id` com novo evento de auditoria | Hash recalculado e evento `OBRA_ATUALIZADA` gravado |
| D4 | `DELETE /obras/:id` (exclusão lógica) | Registro some da lista, histórico permanece |

#### Story E — Interface web

| Task | Descrição | Pronto quando |
|---|---|---|
| E1 | Layout base, rotas e seletor de usuário de teste (simula o ator) | Header mostra o ator escolhido |
| E2 | Serviço de API (`services/obras.ts`) com tratamento de erros | Erros da API viram mensagens para o usuário |
| E3 | Tela **Registrar obra**: formulário e validação no cliente | Campos obrigatórios sinalizados antes de enviar |
| E4 | Upload na tela (pré-visualização das imagens) | Usuário vê as imagens escolhidas |
| E5 | Tela de **resultado do registro**: ID, hash, protocolo, alertas | Dados exibidos após o 201 |
| E6 | Tela **Lista de obras** com filtros | Lista carrega da API |
| E7 | Tela **Detalhe da obra** com arquivos e eventos | Mostra histórico de auditoria |
| E8 | Telas de **editar** e **excluir** com confirmação | CRUD completo pela interface |

#### Story F — Qualidade e entrega

| Task | Descrição | Pronto quando |
|---|---|---|
| F1 | Atualizar diagrama de classes e diagrama de sequência do UC-03 | Diagramas batem com o código |
| F2 | Revisar e finalizar README e `docs/` | Outra pessoa consegue rodar só pelo README |
| F3 | Teste manual ponta a ponta e roteiro de demonstração | Roteiro executado sem erro |
| F4 | Bugs encontrados (tipo **Bug** no Jira) | Cada bug com branch e PR próprios |

Total: **6 stories e cerca de 35 tasks**. Isso é normal; o professor confirmou que um caso de uso pode ter dezenas de tasks.

## 3. Ordem de execução em 7 dias

O primeiro ciclo começou em 03/11. Se o time está atrasado, priorize pela coluna "Corte".

| Dias | Foco | Corte |
|---|---|---|
| 1 | Story A inteira. Montar o Jira com Epic, Stories, Tasks e responsáveis | Obrigatório |
| 2-3 | Story B (backend) em paralelo com E1 a E3 (frontend, com dados falsos) | Obrigatório |
| 4 | Story C e integração E3 ↔ `POST /obras` | Obrigatório |
| 5 | Story D e telas E5 a E7 | Desejável |
| 6 | E8, testes e correção de bugs | Desejável |
| 7 | Story F, README, ensaio da demonstração | Obrigatório |

**Se não couber em um ciclo:** o MVP é **A + B1 a B5 + C1 + E1 a E3 + E5 + F2**. Isso já entrega "registrar obra" ponta a ponta. D, E6 a E8 e B6 passam para o segundo ciclo. Deixe isso explícito no Jira (sprint 1 e sprint 2).

## 4. Como dividir entre pessoas

Divida por camada para reduzir conflito de merge:

- **Pessoa 1 (banco e backend):** A4, A5, B3, B5, B7, D3, D4
- **Pessoa 2 (backend):** A2, B1, B2, B4, B6, C1 a C3, D1, D2
- **Pessoa 3 (frontend):** A3, E1 a E8
- **Pessoa 4 (qualidade e docs):** A1, B8, F1 a F4, apoio em testes

Ajuste ao número real de membros. Frontend e backend combinam o **contrato da API** (README, seção 7) no dia 1, para trabalharem em paralelo.

## 5. Fluxo Git, passo a passo

```bash
# Uma vez: criar a estrutura
git checkout main
git checkout -b dev
git push -u origin dev

# Criar a branch da story (a partir de dev)
git checkout dev && git pull
git checkout -b gal-003-registrar-obra-na-api
git push -u origin gal-003-registrar-obra-na-api

# Criar a branch da task (a partir da story)
git checkout gal-003-registrar-obra-na-api && git pull
git checkout -b gal-012-hash-service

# Trabalhar e commitar
git add .
git commit -m "feat(hash): gera sha256 de json canônico [GAL-012]"
git push -u origin gal-012-hash-service
```

Depois abra um Pull Request **da task para a story** no GitHub. Quando todas as tasks da story estiverem integradas, abra PR **da story para `dev`**. Quando o UC estiver estável, PR de **`dev` para `main`**.

Antes de abrir o PR, traga as mudanças da branch pai para a sua e resolva conflitos localmente:

```bash
git checkout gal-012-hash-service
git fetch origin
git merge origin/gal-003-registrar-obra-na-api
```

### Convenções de commit

`feat`, `fix`, `docs`, `test`, `refactor`, `chore`, sempre terminando com a chave do Jira entre colchetes.

### Modelo de Pull Request

```
## O que mudou
## Item do Jira
GAL-012
## Como testar
## Checklist
- [ ] Rodei o projeto localmente
- [ ] Testes passam
- [ ] Sem .env nem chaves no commit
- [ ] Atualizei README/docs se necessário
```

## 6. Definição de pronto (DoD)

Uma task só vai para "Done" no Jira quando:

1. O código está em PR aprovado por outro membro e mergeado na branch pai.
2. Os critérios da coluna "Pronto quando" foram verificados.
3. Não há segredo ou `.env` no repositório.
4. O quadro do Jira foi movido (To Do → In Progress → In Review → Done).

## 7. Configuração do Jira (dia 1)

1. Criar projeto Scrum (chave `GAL` ou a do grupo).
2. Criar a Epic "UC-03 Registrar Obra", as 6 Stories ligadas a ela e as Tasks dentro de cada Story.
3. Criar a Sprint 1 com data de início 03/11 e duração de 7 dias; mover só o que cabe.
4. Atribuir cada task a uma pessoa.
5. Conectar o Jira ao GitHub (app *GitHub for Jira*): branches e commits com a chave aparecem no card e o professor enxerga a rastreabilidade, que é o que vale nota.
6. Bugs: criar item do tipo **Bug**, ligado à Story afetada.

## 8. Armadilhas comuns

- Trabalhar direto em `dev` ou `main`: perde a rastreabilidade.
- Branch sem a chave do Jira no nome: o card não enxerga o trabalho.
- Task grande demais (mais de 1 dia): quebre em duas.
- Frontend esperando backend: use dados falsos até a API existir.
- Commitar `.env` ou chave do Supabase: se acontecer, gere uma chave nova.
- Deixar o README para a última hora: reserve o dia 7.
