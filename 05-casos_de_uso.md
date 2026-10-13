# Casos de Uso — Autentificador de Galeria de Arte


## 1. Identificação dos atores

Critério aplicado: um ator é qualquer artefato (pessoa ou sistema) **externo** que interage **diretamente** com o sistema para atingir um objetivo, sem interagir consigo e sem intermediação de outro ator. Elementos que vivem *dentro* do sistema (blockchain, storage descentralizado, base off-chain, trilha de auditoria) não são atores — são armazenamento/infraestrutura que o sistema usa, não usuários do sistema.

| Ator | Papel no negócio | Por que é ator |
|---|---|---|
| **Artista** | Cadastra obras, comprova titularidade, acompanha autenticidade | Pessoa externa que aciona o sistema para registrar/consultar suas obras |
| **Galeria** | Cadastra/gerencia obras de terceiros, intermedia transferências | Pessoa jurídica externa que opera obras em nome de artistas/colecionadores |
| **Certificador** | Emite laudos técnicos de autenticidade | Entidade externa que credenciada e fornece certificação ao sistema |
| **Colecionador** | Adquire obras, consulta proveniência, solicita transferências | Pessoa externa que consome e movimenta as obras registradas |
| **Administrador** | Credencia certificadores, gerencia acessos, audita operações | Pessoa externa responsável pela governança da plataforma |

**Observação:** blockchain, storage descentralizado e base privada (off-chain) **não são atores** — são destinos/repositórios internos que os fluxos do sistema escrevem. O sistema consome esses serviços; eles não usam o sistema.

---

## 2. Índice de casos de uso

| ID | Nome | Ator principal | RF relacionado | RN relacionada(s) |
|---|---|---|---|---|
| UC-01 | Autenticar-se na plataforma | Todos os atores | RF-001 | RN-007 |
| UC-02 | Cadastrar dados de identidade | Todos os atores | RF-001 | RNF-001 |
| UC-03 | Registrar obra | Artista / Galeria | RF-002 | RN-005 |
| UC-04 | Emitir certificação (laudo) | Certificador | RF-003 | RN-004 |
| UC-05 | Emitir chave de autenticidade | Artista / Galeria | RF-004 | RN-001, RN-006 |
| UC-06 | Validar autenticidade | Colecionador / Certificador | RF-005 | RN-006, RN-008 |
| UC-07 | Transferir titularidade | Colecionador / Galeria | RF-006 | RN-002, RN-008 |
| UC-08 | Consultar proveniência | Colecionador / Galeria / Artista | RF-007 | RN-003 |
| UC-09 | Credenciar certificador | Administrador | RF-008 | RN-004, RN-007 |
| UC-10 | Gerenciar acessos de usuários | Administrador | RF-008 | RN-007 |
| UC-11 | Consultar trilha de auditoria | Administrador | RF-008 | RN-008 |

---

## 3. Detalhamento dos casos de uso

### UC-00 — 

**Ator:** 

**Objetivo:**

**Pré-condições:**

**Fluxo principal:**
1. A
2. S
3. S
4. S

**Fluxos alternativos/exceções:**
- 2a. Credenciais inválidas → sistema recusa o acesso e solicita nova tentativa.

**Pós-condições:** 

**Regras de negócio relacionadas:** 

---

### UC- XX — Lorem ipsum

**Ator:** Artista, Galeria, Certificador, Colecionador, Administrador

**Objetivo:** Registrar-se na plataforma para futuramente autenticar-se e operar.

**Pré-condições:** Nenhuma.

**Fluxo principal:**
1. Ator solicita cadastro na plataforma.
2. Sistema solicita dados de identidade (nome, e-mail, documento, carteira digital).
3. Ator informa os dados solicitados.
4. Sistema armazena os dados de identidade na base privada off-chain.
5. Sistema confirma o cadastro ao ator.

**Fluxos alternativos/exceções:**
- 3a. Dados incompletos ou inválidos → sistema recusa o cadastro e indica o campo pendente.

**Pós-condições:** Ator cadastrado e apto a autenticar-se (UC-01).

**Regras de negócio relacionadas:** RNF-001 (dados de identidade nunca vão para blockchain ou storage público).

---
