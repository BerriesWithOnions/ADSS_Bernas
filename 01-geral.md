# Regras de Negócio e Requisitos do Produto - Autentificador de Galeria de Arte

Plataforma de autenticidade e proveniência de obras de arte via blockchain.

---

## Índice de rastreabilidade

```text
RN-001 → RF-004
RN-002 → RF-006
RN-003 → RF-007
RN-004 → RF-003
RN-005 → RF-002
RN-006 → RF-004, RF-005
RN-007 → RF-008
RN-008 → RF-006, RF-008
```

---

## 1. Regras de Negócio (RN)

### RN-001 — Emissão de chave de autenticidade

**Título:** Condições para emissão de chave de autenticidade.  
**Descrição:** Uma chave de autenticidade só pode ser emitida para obras que possuam registro completo e certificação válida.  
**Origem:** Processo de autenticação da plataforma.  
**Stakeholders envolvidos:** Artista, Certificador, Colecionador, Galeria.  
**Condição:** Aplicada sempre que uma obra passar pelo fluxo de emissão de chave de autenticidade.  
**Regra:** A chave só pode ser gerada quando a obra estiver registrada (RF-002 concluído) e possuir certificação emitida por certificador credenciado (RN-004).  
**Exceções:** Galerias com selo de certificadora própria podem dispensar certificação externa mediante averiguação da validade da certificação própria.  
**Dados envolvidos:** Dados da obra, dados de certificação, registro de titularidade.  
**Prioridade:** Crítica  
**Status:** Proposto  
**Requisitos relacionados:** RF-002, RF-003, RF-004  

---

### RN-002 — Transferência de titularidade

**Título:** Validação de titular na transferência.  
**Descrição:** Uma obra só pode ser transferida se o proprietário atual constar como titular no registro vigente da plataforma.  
**Origem:** Regra de proveniência.  
**Stakeholders envolvidos:** Colecionador, Galeria, Artista.  
**Condição:** Aplicada sempre que uma solicitação de transferência é registrada.  
**Regra:** O sistema deve confirmar que o solicitante é o titular corrente antes de gerar nova transação de transferência.  
**Exceções:** Transferências judiciais ou por herança podem ser realizadas pelo Administrador mediante documentação comprobatória anexada.  
**Dados envolvidos:** Dados de titularidade, dados de transação.  
**Prioridade:** Crítica  
**Status:** Proposto  
**Requisitos relacionados:** RF-006  

---

### RN-003 — Privacidade em consultas públicas

**Título:** Restrição de exibição de dados pessoais na proveniência.  
**Descrição:** Dados de identidade dos envolvidos não podem ser exibidos em consultas públicas de proveniência.  
**Origem:** Requisito de conformidade (LGPD).  
**Stakeholders envolvidos:** Artista, Galeria, Colecionador, Certificador.  
**Condição:** Aplicada em toda consulta de proveniência realizada por qualquer ator.  
**Regra:** A consulta pode exibir dados da obra e histórico de transações, mas não pode expor nome, documento ou carteira digital de nenhum envolvido.  
**Exceções:** O Administrador pode visualizar dados completos para fins de auditoria.  
**Dados envolvidos:** Dados de identidade, dados da obra, dados de transação.  
**Prioridade:** Crítica  
**Status:** Proposto  
**Requisitos relacionados:** RF-007  

---

### RN-004 — Credenciamento de certificadores

**Título:** Exigência de credenciamento para emissão de laudos.  
**Descrição:** Somente certificadores previamente credenciados pela plataforma podem emitir certificações válidas.  
**Origem:** Processo de governança da plataforma.  
**Stakeholders envolvidos:** Certificador, Administrador.  
**Condição:** Aplicada sempre que um laudo de certificação é submetido.  
**Regra:** O sistema deve rejeitar certificações emitidas por usuários sem status de "certificador credenciado".  
**Exceções:** Nenhuma.  
**Dados envolvidos:** Dados de identidade, dados de certificação, dados de acesso.  
**Prioridade:** Alta  
**Status:** Proposto  
**Requisitos relacionados:** RF-003  

---

### RN-005 — Unicidade de hash da obra

**Título:** Impedimento de registro duplicado.  
**Descrição:** Uma obra não pode ser registrada duas vezes com o mesmo conjunto de dados que gere o mesmo hash de identificação.  
**Origem:** Integridade do registro em blockchain.  
**Stakeholders envolvidos:** Artista, Galeria.  
**Condição:** Aplicada no momento do registro da obra.  
**Regra:** O sistema deve verificar se o hash gerado já existe na blockchain antes de concluir o registro; se existir, o registro deve ser recusado.  
**Exceções:** Reemissão de registro por decisão administrativa, mediante justificativa registrada em trilha de auditoria.  
**Dados envolvidos:** Dados da obra, hash na blockchain.  
**Prioridade:** Crítica  
**Status:** Proposto  
**Requisitos relacionados:** RF-002  

---

### RN-006 — Validade temporal da certificação

**Título:** Expiração de laudos de certificação.  
**Descrição:** Uma certificação possui prazo de validade; após expirar, não pode mais ser usada para emitir ou validar autenticidade.  
**Origem:** Regulamento de certificação de obras de arte.  
**Stakeholders envolvidos:** Certificador, Colecionador.  
**Condição:** Aplicada na emissão de chave de autenticidade e na validação de autenticidade.  
**Regra:** O sistema deve verificar a data de validade da certificação; se expirada, a operação deve ser bloqueada e uma nova certificação deve ser solicitada.  
**Exceções:** Certificações vitalícias emitidas por certificadores de nível máximo, se essa categoria existir.  
**Dados envolvidos:** Dados de certificação (data, validade).  
**Prioridade:** Alta  
**Status:** Proposto  
**Requisitos relacionados:** RF-004, RF-005  

---

### RN-007 — Permissões administrativas

**Título:** Controle de acesso às funções administrativas.  
**Descrição:** Apenas usuários com papel de Administrador podem executar operações de administração da plataforma (gestão de acessos, credenciamento, auditoria).  
**Origem:** Política de segurança da plataforma.  
**Stakeholders envolvidos:** Administrador.  
**Condição:** Aplicada em qualquer tentativa de acesso a funções administrativas.  
**Regra:** O sistema deve validar o papel do usuário antes de permitir qualquer operação de administração.  
**Exceções:** Nenhuma.  
**Dados envolvidos:** Dados de acesso.  
**Prioridade:** Crítica  
**Status:** Proposto  
**Requisitos relacionados:** RF-008  

---

### RN-008 — Auditoria obrigatória de operações sensíveis

**Título:** Registro de trilha de auditoria.  
**Descrição:** Toda operação de transferência de titularidade, validação de autenticidade e administração deve gerar um registro na trilha de auditoria.  
**Origem:** Requisito de rastreabilidade e conformidade.  
**Stakeholders envolvidos:** Todos os atores.  
**Condição:** Aplicada a qualquer execução dos fluxos de Transferência, Validação e Administração.  
**Regra:** O sistema deve registrar autor, data/hora, tipo de operação e resultado em log de auditoria imutável.  
**Exceções:** Nenhuma.  
**Dados envolvidos:** Dados de transação, dados de acesso, dados da obra.  
**Prioridade:** Crítica  
**Status:** Proposto  
**Requisitos relacionados:** RF-005, RF-006, RF-008  

---

### RN-009 — Emissão de certificações vitalícias

**Título:** Condições para expedição de certificações sem data de expiração.  
**Descrição:** Uma certificação emitida por certificadores de nível máximo, caso solicitadas pelo contratante, pode ter duração vitalícia.  
**Origem:** Regulamento de certificação de obras de arte.  
**Stakeholders envolvidos:** Certificador, Colecionador.  
**Condição:** Aplicada na emissão de chave de autenticidade e na validação de autenticidade.  
**Regra:** O sistema deve verificar a data de validade da certificação; se vitalícia, a operação deve ser autorizada.  
**Exceções:** Caso a obra possua certificação exterior permanente, o certificado deve ser passado por auditoria para posterior emissão de certificação vitalícia na plataforma.  
**Dados envolvidos:** Dados de certificação.
**Prioridade:** Alta  
**Status:** Proposto  
**Requisitos relacionados:** RF-004, RF-005  

---

## 2. Requisitos Funcionais (RF)

### RF-001 — Cadastrar dados de identidade

**Descrição:** O sistema deve permitir que Artista, Galeria, Certificador e Colecionador cadastrem seus dados de identidade (nome, e-mail, documento, carteira digital).  
**Objetivo:** Habilitar os atores a interagir com os demais fluxos da plataforma.  
**Stakeholders:** Artista, Galeria, Certificador, Colecionador.  
**Ator principal:** Usuário (qualquer papel).  
**Pré-condições:** Nenhuma.  
**Entradas:** Nome, e-mail, documento, carteira digital.  
**Processamento esperado:** Validar formato dos dados e verificar duplicidade de cadastro.  
**Saídas/Resultados:** Perfil de identidade criado.  
**Pós-condições:** Dados de identidade protegidos armazenados em base privada (off-chain).  
**Fluxos alternativos/exceções:** E-mail ou documento já cadastrado; dados inválidos.  
**Regras de negócio relacionadas:** —  
**Prioridade:** Crítica  
**Status:** Proposto  
**Critérios de aceite:**
- Não permitir cadastro com documento duplicado.
- Armazenar dados sensíveis apenas na base off-chain.  
**Casos de uso relacionados:** UC-001  
**Tarefas relacionadas:** TASK-001, TASK-002  
**Casos de teste relacionados:** CT-001, CT-002  

---

### RF-002 — Registrar obra

**Descrição:** O sistema deve permitir que Artista ou Galeria registrem uma obra com título, autor, técnica, dimensões, data e imagens.  
**Objetivo:** Criar o registro base que sustenta certificação e autenticidade.  
**Stakeholders:** Artista, Galeria, Colecionador.  
**Ator principal:** Artista ou Galeria.  
**Pré-condições:** Identidade cadastrada e ativa; dados de titularidade comprovados.  
**Entradas:** Dados da obra, dados de titularidade.  
**Processamento esperado:** Gerar hash único da obra e verificar unicidade (RN-005) antes de concluir o registro.  
**Saídas/Resultados:** Obra registrada com hash gravado em blockchain e arquivos armazenados em storage descentralizado.  
**Pós-condições:** Obra disponível para emissão de certificação e chave de autenticidade.  
**Fluxos alternativos/exceções:** Hash já existente (RN-005); dados de titularidade não comprovados.  
**Regras de negócio relacionadas:** RN-005  
**Prioridade:** Crítica  
**Status:** Proposto  
**Critérios de aceite:**
- Recusar registro com hash duplicado.
- Gravar hash na blockchain e imagens no armazenamento descentralizado.  
**Casos de uso relacionados:** UC-002  
**Tarefas relacionadas:** TASK-003, TASK-004  
**Casos de teste relacionados:** CT-003, CT-004  

---

### RF-003 — Emitir certificação

**Descrição:** O sistema deve permitir que um certificador credenciado emita um laudo de certificação para uma obra registrada.  
**Objetivo:** Formalizar a avaliação técnica de autenticidade da obra.  
**Stakeholders:** Certificador, Artista, Colecionador.  
**Ator principal:** Certificador.  
**Pré-condições:** Certificador credenciado (RN-004); obra registrada (RF-002).  
**Entradas:** Laudo, data, validade, assinatura do certificador.  
**Processamento esperado:** Validar credenciamento do certificador e associar o laudo à obra.  
**Saídas/Resultados:** Certificação emitida e laudo armazenado.  
**Pós-condições:** Obra apta a receber chave de autenticidade (RF-004).  
**Fluxos alternativos/exceções:** Certificador não credenciado (RN-004); obra inexistente.  
**Regras de negócio relacionadas:** RN-004  
**Prioridade:** Alta  
**Status:** Proposto  
**Critérios de aceite:**
- Rejeitar emissão por certificador não credenciado.
- Armazenar laudo em storage descentralizado.  
**Casos de uso relacionados:** UC-003  
**Tarefas relacionadas:** TASK-005  
**Casos de teste relacionados:** CT-005, CT-006  

---

### RF-004 — Emitir chave de autenticidade

**Descrição:** O sistema deve emitir uma chave de autenticidade para obras com registro e certificação válidos.  
**Objetivo:** Fornecer prova criptográfica de autenticidade da obra.  
**Stakeholders:** Artista, Certificador, Colecionador.  
**Ator principal:** Administrador (acionado após RF-002 e RF-003).  
**Pré-condições:** Registro concluído (RF-002); certificação válida e não expirada (RN-001, RN-006).  
**Entradas:** Dados de registro, dados de certificação.  
**Processamento esperado:** Verificar validade da certificação e gerar evento de autenticidade na blockchain.  
**Saídas/Resultados:** Chave de autenticidade gerada e evento registrado em blockchain.  
**Pós-condições:** Obra disponível para validação pública de autenticidade.  
**Fluxos alternativos/exceções:** Certificação expirada (RN-006); registro incompleto.  
**Regras de negócio relacionadas:** RN-001, RN-006  
**Prioridade:** Crítica  
**Status:** Proposto  
**Critérios de aceite:**
- Bloquear emissão se certificação estiver expirada.
- Registrar evento de emissão na blockchain.  
**Casos de uso relacionados:** UC-004  
**Tarefas relacionadas:** TASK-006  
**Casos de teste relacionados:** CT-007, CT-008  

---

### RF-005 — Validar autenticidade

**Descrição:** O sistema deve permitir que Colecionador ou Certificador validem a autenticidade de uma obra consultando registro, certificação e blockchain.  
**Objetivo:** Confirmar publicamente que uma obra é autêntica.  
**Stakeholders:** Colecionador, Certificador.  
**Ator principal:** Colecionador ou Certificador.  
**Pré-condições:** Obra possuir chave de autenticidade emitida (RF-004).  
**Entradas:** Identificador da obra.  
**Processamento esperado:** Consultar dados da obra, certificação e evento na blockchain; verificar validade da certificação (RN-006).  
**Saídas/Resultados:** Resultado da validação (autêntico/inválido/expirado) registrado em trilha de auditoria.  
**Pós-condições:** Resultado disponível para consulta.  
**Fluxos alternativos/exceções:** Certificação expirada (RN-006); chave de autenticidade inexistente.  
**Regras de negócio relacionadas:** RN-006, RN-008  
**Prioridade:** Alta  
**Status:** Proposto  
**Critérios de aceite:**
- Indicar claramente quando a certificação estiver expirada.
- Registrar todo resultado de validação na auditoria.  
**Casos de uso relacionados:** UC-005  
**Tarefas relacionadas:** TASK-007  
**Casos de teste relacionados:** CT-009, CT-010  

---

### RF-006 — Transferir titularidade

**Descrição:** O sistema deve permitir que o titular atual de uma obra transfira sua titularidade para outro usuário.  
**Objetivo:** Manter a proveniência da obra atualizada e confiável.  
**Stakeholders:** Colecionador, Galeria.  
**Ator principal:** Colecionador ou Galeria (titular atual).  
**Pré-condições:** Solicitante ser o titular vigente (RN-002).  
**Entradas:** Dados de transação (origem, destino, preço, data).  
**Processamento esperado:** Validar titularidade corrente, registrar hash da transação na blockchain e dados comerciais na base privada.  
**Saídas/Resultados:** Nova titularidade registrada; evento gravado em blockchain e auditoria.
**Pós-condições:** Novo titular passa a constar como proprietário vigente.  
**Fluxos alternativos/exceções:** Solicitante não é o titular vigente (RN-002); transferência judicial (exceção administrativa).  
**Regras de negócio relacionadas:** RN-002, RN-008  
**Prioridade:** Crítica  
**Status:** Proposto  
**Critérios de aceite:**
- Recusar transferência se solicitante não for o titular vigente.
- Gravar hash da transação na blockchain e dados comerciais na base privada.
- Registrar evento na trilha de auditoria.  
**Casos de uso relacionados:** UC-006  
**Tarefas relacionadas:** TASK-008, TASK-009  
**Casos de teste relacionados:** CT-011, CT-012  

---

### RF-007 — Consultar proveniência

**Descrição:** O sistema deve permitir que qualquer usuário consulte o histórico de proveniência de uma obra, sem expor dados pessoais dos envolvidos.  
**Objetivo:** Dar transparência pública ao histórico da obra.  
**Stakeholders:** Colecionador, Galeria, público em geral.  
**Ator principal:** Colecionador ou Galeria.  
**Pré-condições:** Obra registrada.  
**Entradas:** Identificador da obra.  
**Processamento esperado:** Buscar dados da obra, eventos na blockchain e trilha de auditoria, filtrando dados de identidade (RN-003).  
**Saídas/Resultados:** Histórico de proveniência exibido sem dados pessoais.  
**Pós-condições:** Nenhuma alteração de estado.  
**Fluxos alternativos/exceções:** Obra inexistente.  
**Regras de negócio relacionadas:** RN-003  
**Prioridade:** Alta  
**Status:** Proposto  
**Critérios de aceite:**
- Nunca exibir nome, documento ou carteira digital na consulta pública.
- Exibir apenas dados da obra e histórico de transações/eventos.  
**Casos de uso relacionados:** UC-007  
**Tarefas relacionadas:** TASK-010  
**Casos de teste relacionados:** CT-013, CT-014  

---

### RF-008 — Administrar plataforma

**Descrição:** O sistema deve permitir que o Administrador gerencie permissões de acesso, credenciamento de certificadores e consulte a trilha de auditoria.  
**Objetivo:** Garantir governança e segurança da plataforma.  
**Stakeholders:** Administrador.  
**Ator principal:** Administrador.  
**Pré-condições:** Usuário autenticado com papel de Administrador (RN-007).  
**Entradas:** Dados de acesso, solicitações de credenciamento.  
**Processamento esperado:** Validar papel do usuário antes de qualquer operação administrativa.  
**Saídas/Resultados:** Permissões atualizadas, certificadores credenciados/descredenciados, registros de auditoria consultados.  
**Pós-condições:** Alterações refletidas em dados de acesso e trilha de auditoria.  
**Fluxos alternativos/exceções:** Usuário sem papel de Administrador (RN-007).  
**Regras de negócio relacionadas:** RN-004, RN-007, RN-008  
**Prioridade:** Alta  
**Status:** Proposto  
**Critérios de aceite:**
- Bloquear qualquer operação administrativa para usuários sem papel de Administrador.
- Registrar toda alteração administrativa na trilha de auditoria.  
**Casos de uso relacionados:** UC-008  
**Tarefas relacionadas:** TASK-011, TASK-012  
**Casos de teste relacionados:** CT-015, CT-016  

---

## 3. Requisitos Não Funcionais (RNF)

### RNF-001 — Proteção de dados pessoais

**Categoria:** Segurança  
**Descrição:** O sistema deve armazenar todos os dados pessoais (identidade) exclusivamente na base privada off-chain, nunca em blockchain ou storage descentralizado público.  
**Justificativa:** Conformidade com LGPD e prevenção de exposição irreversível de dados sensíveis.  
**Métrica/Critério mensurável:** Nenhum campo de identidade (nome, e-mail, documento, carteira digital) deve estar presente em blocos de blockchain ou arquivos públicos, verificável por auditoria de esquema.  
**Escopo:** Todo o sistema.  
**Prioridade:** Crítica  
**Status:** Proposto  
**Requisitos relacionados:** RF-001  
**Casos de teste relacionados:** --  

---

### RNF-002 — Desempenho da consulta de proveniência

**Categoria:** Desempenho  
**Descrição:** O sistema deve apresentar o resultado da consulta de proveniência em até 2 segundos para 95% das requisições, sob carga operacional definida.  
**Justificativa:** Consultas de proveniência são a principal interface pública da plataforma e precisam ser ágeis para adoção de mercado.  
**Métrica/Critério mensurável:** Tempo de resposta medido em testes de carga.  
**Escopo:** RF-007 (Consultar proveniência).  
**Prioridade:** Alta  
**Status:** Proposto  
**Requisitos relacionados:** RF-007  
**Casos de teste relacionados:** --  

---

### RNF-003 — Confirmação de eventos em blockchain

**Categoria:** Confiabilidade  
**Descrição:** O sistema deve confirmar o registro de eventos críticos (registro de obra, emissão de chave, transferência) na blockchain em até 60 segundos.  
**Justificativa:** Garantir previsibilidade de tempo para os usuários finais durante operações críticas.  
**Métrica/Critério mensurável:** Tempo entre submissão do evento e confirmação na blockchain, medido em logs.  
**Escopo:** RF-002, RF-004, RF-006.  
**Prioridade:** Alta  
**Status:** Proposto  
**Requisitos relacionados:** RF-002, RF-004, RF-006  
**Casos de teste relacionados:** --

---

### RNF-004 — Imutabilidade da trilha de auditoria

**Categoria:** Segurança  
**Descrição:** Os registros de auditoria não podem ser alterados ou removidos após sua criação, por nenhum papel de usuário, incluindo Administrador.  
**Justificativa:** Garantir integridade probatória do histórico da plataforma.  
**Métrica/Critério mensurável:** Testes de tentativa de alteração/remoção de log devem sempre falhar e gerar novo evento de auditoria.  
**Escopo:** Todo o sistema.  
**Prioridade:** Crítica  

---

### RNF-005 — Disponibilidade da plataforma

**Categoria:** Disponibilidade  
**Descrição:** O sistema deve manter disponibilidade mínima de 99,5% ao mês para as funcionalidades de consulta e validação de autenticidade.  
**Justificativa:** São as funcionalidades mais acessadas por público externo (compradores, curadores, imprensa).  
**Métrica/Critério mensurável:** Monitoramento de uptime mensal.  
**Escopo:** RF-005, RF-007.  
**Prioridade:** Alta  
**Status:** Proposto  
**Requisitos relacionados:** RF-005, RF-007  
**Casos de teste relacionados:** --  
