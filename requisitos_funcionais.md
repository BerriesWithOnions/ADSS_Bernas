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
**Ator principal:** Sistema (acionado após RF-002 e RF-003).  
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
