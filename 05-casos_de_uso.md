# Casos de Uso — Autentificador de Galeria de Arte

Documento de trabalho para revisão. Baseado em `geral.md` (Regras de Negócio / Requisitos Não Funcionais) e no `diagrama_mermaid.mmd` (mapa de dados dos fluxos) já desenvolvidos.

---

## 1. Identificação dos atores

Critério aplicado: um ator é qualquer artefato (pessoa ou sistema) **externo** ao sistema que interage **diretamente** com ele para atingir um objetivo, sem intermediação de outro ator. Elementos que vivem *dentro* do sistema (blockchain, storage descentralizado, base off-chain, trilha de auditoria) não são atores — são armazenamento/infraestrutura que o sistema usa, não usuários do sistema.

| Ator | Papel no negócio | Por que é ator |
|---|---|---|
| **Artista** | Cadastra obras, comprova titularidade, acompanha autenticidade | Pessoa externa que aciona o sistema para registrar/consultar suas obras |
| **Galeria** | Cadastra/gerencia obras de terceiros, intermedia transferências | Pessoa jurídica externa que opera obras em nome de artistas/colecionadores |
| **Certificador** | Emite laudos técnicos de autenticidade | Pessoa/entidade externa credenciada que fornece certificação ao sistema |
| **Colecionador** | Adquire obras, consulta proveniência, solicita transferências | Pessoa externa que consome e movimenta as obras registradas |
| **Administrador** | Credencia certificadores, gerencia acessos, audita operações | Pessoa externa responsável pela governança da plataforma |

**Observação:** blockchain, storage descentralizado e base privada (off-chain) **não são atores** — são destinos/repositórios internos que os fluxos do sistema escrevem. O sistema consome esses serviços; eles não usam o sistema (relação inversa, conforme regra do professor).

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

### UC-01 — Autenticar-se na plataforma

**Ator:** Artista, Galeria, Certificador, Colecionador, Administrador

**Objetivo:** Obter acesso ao sistema para poder disparar qualquer outro caso de uso.

**Pré-condições:** Ator possui cadastro prévio (UC-02) na plataforma.

**Fluxo principal:**
1. Ator acessa a plataforma e informa suas credenciais.
2. Sistema valida as credenciais.
3. Sistema identifica o papel do ator (Artista, Galeria, Certificador, Colecionador ou Administrador).
4. Sistema libera as funcionalidades correspondentes ao papel do ator.

**Fluxos alternativos/exceções:**
- 2a. Credenciais inválidas → sistema recusa o acesso e solicita nova tentativa.

**Pós-condições:** Ator autenticado e com sessão ativa na plataforma.

**Regras de negócio relacionadas:** RN-007 (o papel do ator define quais operações ele pode disparar em seguida).

---

### UC-02 — Cadastrar dados de identidade

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

### UC-03 — Registrar obra

**Ator:** Artista, Galeria

**Objetivo:** Cadastrar uma obra de arte na plataforma, gerando seu registro de proveniência.

**Pré-condições:** Ator autenticado (UC-01); ator comprova titularidade da obra.

**Fluxo principal:**
1. Artista/Galeria inicia o registro de uma nova obra.
2. Sistema solicita os dados da obra (título, autor, técnica, dimensões, data, imagens) e os dados de titularidade (proprietário, contrato, nota fiscal, direitos).
3. Artista/Galeria informa os dados solicitados.
4. Sistema gera o hash de identificação da obra.
5. Sistema verifica se o hash já existe na blockchain.
6. Sistema registra a obra na blockchain e armazena os arquivos no storage descentralizado.
7. Sistema confirma o registro ao ator.

**Fluxos alternativos/exceções:**
- 5a. Hash já existe na blockchain → sistema recusa o registro por duplicidade (RN-005).
- 5b. Registro duplicado justificado por decisão administrativa → Administrador realiza reemissão mediante justificativa em auditoria (fora deste caso de uso, tratado em UC-11).

**Pós-condições:** Obra registrada na blockchain, apta a receber certificação e chave de autenticidade.

**Regras de negócio relacionadas:** RN-005 (unicidade de hash).

---

### UC-04 — Emitir certificação (laudo)

**Ator:** Certificador

**Objetivo:** Emitir um laudo técnico de autenticidade para uma obra registrada.

**Pré-condições:** Ator autenticado (UC-01) e credenciado como certificador (UC-09); obra já registrada (UC-03).

**Fluxo principal:**
1. Certificador seleciona a obra a ser laudada.
2. Sistema verifica se o certificador possui status de "credenciado".
3. Certificador informa os dados da certificação (laudo, data, validade, assinatura).
4. Sistema armazena o laudo no storage descentralizado.
5. Sistema vincula a certificação à obra.
6. Sistema confirma a emissão ao certificador.

**Fluxos alternativos/exceções:**
- 2a. Certificador não credenciado → sistema rejeita a submissão da certificação.

**Pós-condições:** Obra passa a possuir certificação válida, apta à emissão de chave de autenticidade.

**Regras de negócio relacionadas:** RN-004 (exigência de credenciamento).

---

### UC-05 — Emitir chave de autenticidade

**Ator:** Artista, Galeria

**Objetivo:** Gerar a chave de autenticidade de uma obra, formalizando-a como autêntica na plataforma.

**Pré-condições:** Ator autenticado (UC-01); obra registrada (UC-03) e com certificação válida (UC-04) — exceto galerias com selo próprio averiguado.

**Fluxo principal:**
1. Artista/Galeria solicita a emissão da chave de autenticidade para uma obra.
2. Sistema verifica se a obra está registrada.
3. Sistema verifica se a certificação vinculada está dentro do prazo de validade.
4. Sistema gera a chave de autenticidade e grava o evento na blockchain.
5. Sistema confirma a emissão ao ator.

**Fluxos alternativos/exceções:**
- 2a. Obra não registrada → sistema recusa a emissão.
- 3a. Certificação expirada → sistema bloqueia a emissão e solicita nova certificação (RN-006).
- 3b. Galeria com selo de certificadora própria → sistema dispensa a certificação externa mediante averiguação da validade da certificação própria (exceção da RN-001).

**Pós-condições:** Obra possui chave de autenticidade ativa registrada na blockchain.

**Regras de negócio relacionadas:** RN-001 (condições de emissão), RN-006 (validade temporal da certificação).

---

### UC-06 — Validar autenticidade

**Ator:** Colecionador, Certificador

**Objetivo:** Verificar se uma obra possui autenticidade válida na plataforma.

**Pré-condições:** Ator autenticado (UC-01); obra possui chave de autenticidade emitida (UC-05).

**Fluxo principal:**
1. Colecionador/Certificador solicita a validação de uma obra.
2. Sistema consulta a obra, a certificação vinculada e o registro na blockchain.
3. Sistema verifica a validade temporal da certificação.
4. Sistema informa o resultado da validação ao ator.
5. Sistema registra o resultado na trilha de auditoria.

**Fluxos alternativos/exceções:**
- 3a. Certificação expirada → sistema bloqueia a validação e indica necessidade de nova certificação (RN-006).
- 1a. Certificador solicita revalidação de uma obra já validada anteriormente → sistema repete o fluxo a partir do passo 2.

**Pós-condições:** Resultado da validação disponibilizado ao ator; evento registrado em auditoria.

**Regras de negócio relacionadas:** RN-006 (expiração de laudo), RN-008 (auditoria obrigatória).

---

### UC-07 — Transferir titularidade

**Ator:** Colecionador, Galeria

**Objetivo:** Transferir a titularidade de uma obra para um novo proprietário.

**Pré-condições:** Ator autenticado (UC-01) e é o titular corrente da obra no registro vigente.

**Fluxo principal:**
1. Colecionador/Galeria solicita a transferência de uma obra, informando o destino.
2. Sistema confirma que o solicitante é o titular corrente.
3. Sistema registra a nova transação (origem, destino, preço, data).
4. Sistema grava o hash da transação na blockchain.
5. Sistema atualiza o registro de titularidade.
6. Sistema armazena os dados comerciais na base off-chain.
7. Sistema registra o evento na trilha de auditoria.
8. Sistema confirma a transferência ao ator.

**Fluxos alternativos/exceções:**
- 2a. Solicitante não é o titular corrente → sistema recusa a transferência.
- 2b. Transferência judicial ou por herança → Administrador realiza a transferência mediante documentação comprobatória anexada (tratado em UC-10/UC-11).

**Pós-condições:** Titularidade da obra atualizada; evento registrado em auditoria.

**Regras de negócio relacionadas:** RN-002 (validação de titular), RN-008 (auditoria obrigatória).

---

### UC-08 — Consultar proveniência

**Ator:** Colecionador, Galeria, Artista

**Objetivo:** Consultar o histórico e a proveniência de uma obra.

**Pré-condições:** Ator autenticado (UC-01). *(a definir se esta consulta será pública/sem login — ver observação abaixo)*

**Fluxo principal:**
1. Ator solicita a consulta de proveniência de uma obra.
2. Sistema recupera os dados da obra, certificação, eventos na blockchain e trilha de auditoria relacionados.
3. Sistema oculta dados de identidade (nome, documento, carteira digital) dos envolvidos.
4. Sistema apresenta o histórico de transações e a situação de autenticidade da obra.

**Fluxos alternativos/exceções:**
- 1a. Ator é Administrador → sistema exibe também os dados completos de identidade, para fins de auditoria (exceção da RN-003).

**Pós-condições:** Resultado da consulta apresentado ao ator, respeitando a restrição de privacidade.

**Regras de negócio relacionadas:** RN-003 (restrição de dados pessoais em consultas públicas).

**Observação para revisão:** o RN-003 diz "consulta pública" — vale decidir se este caso de uso exige login (UC-01) ou se é acessível sem autenticação. Se for público, o Colecionador/Galeria/Artista deixam de ser pré-condição obrigatória e a consulta pode ser feita por qualquer visitante.

---

### UC-09 — Credenciar certificador

**Ator:** Administrador

**Objetivo:** Conceder a um certificador o status de "credenciado", habilitando-o a emitir laudos válidos.

**Pré-condições:** Ator autenticado (UC-01) como Administrador.

**Fluxo principal:**
1. Administrador seleciona o certificador a ser credenciado.
2. Sistema verifica o papel do ator solicitante.
3. Administrador confirma o credenciamento.
4. Sistema atualiza o status do certificador para "credenciado".
5. Sistema registra o evento na trilha de auditoria.

**Fluxos alternativos/exceções:**
- 2a. Ator solicitante não é Administrador → sistema recusa a operação.

**Pós-condições:** Certificador habilitado a emitir laudos válidos (pré-condição de UC-04).

**Regras de negócio relacionadas:** RN-004 (credenciamento de certificadores), RN-007 (permissões administrativas).

---

### UC-10 — Gerenciar acessos de usuários

**Ator:** Administrador

**Objetivo:** Administrar permissões e papéis de acesso dos usuários da plataforma.

**Pré-condições:** Ator autenticado (UC-01) como Administrador.

**Fluxo principal:**
1. Administrador seleciona o usuário a ser gerenciado.
2. Sistema verifica o papel do ator solicitante.
3. Administrador define/altera o papel ou permissões do usuário.
4. Sistema aplica a alteração de acesso.
5. Sistema registra o evento na trilha de auditoria.

**Fluxos alternativos/exceções:**
- 2a. Ator solicitante não é Administrador → sistema recusa a operação.

**Pós-condições:** Permissões do usuário atualizadas; evento registrado em auditoria.

**Regras de negócio relacionadas:** RN-007 (permissões administrativas).

---

### UC-11 — Consultar trilha de auditoria

**Ator:** Administrador

**Objetivo:** Consultar o histórico completo e imutável de operações sensíveis realizadas na plataforma.

**Pré-condições:** Ator autenticado (UC-01) como Administrador.

**Fluxo principal:**
1. Administrador solicita a consulta da trilha de auditoria.
2. Sistema verifica o papel do ator solicitante.
3. Sistema recupera os registros de auditoria (autor, data/hora, tipo de operação, resultado).
4. Sistema apresenta os registros ao Administrador, incluindo dados completos de identidade.

**Fluxos alternativos/exceções:**
- 2a. Ator solicitante não é Administrador → sistema recusa a operação.

**Pós-condições:** Registros de auditoria apresentados ao Administrador.

**Regras de negócio relacionadas:** RN-003 (exceção de visualização completa para Administrador), RN-008 (auditoria obrigatória), RNF-004 (imutabilidade da trilha).

---

## 4. Pontos em aberto para a próxima revisão

1. **UC-08 (Consultar proveniência):** definir se exige login ou é pública/anônima.
2. **UC-05:** confirmar se a exceção de "selo de certificadora própria" (RN-001) deve virar um fluxo alternativo explícito ou um caso de uso à parte (ex.: "Averiguar certificação própria de galeria").
3. **UC-03/UC-07 exceções administrativas** (reemissão de registro, transferência judicial/por herança): avaliar se merecem virar casos de uso próprios do Administrador, já que hoje estão apenas citados como exceção dentro de UC-03 e UC-07.
4. Confirmar a numeração final dos RF-001 a RF-008 junto ao restante da equipe/documento de requisitos funcionais, já que este arquivo (`geral.md`) trouxe apenas RN e RNF — os RF foram inferidos a partir do índice de rastreabilidade e do diagrama.