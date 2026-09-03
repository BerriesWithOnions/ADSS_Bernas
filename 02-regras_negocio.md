## 1. Regras de Negócio (RN)

### RN-001 — Emissão de chave de autenticidade

**Título:** Condições para emissão de chave de autenticidade.  
**Descrição:** Uma chave de autenticidade só pode ser emitida para obras que possuam registro completo e certificação válida.  
**Origem:** Processo de autenticação da plataforma.  
**Stakeholders envolvidos:** Artista, Certificador, Colecionador.  
**Condição:** Aplicada sempre que uma obra passar pelo fluxo de emissão de chave de autenticidade.  
**Regra:** A chave só pode ser gerada quando a obra estiver registrada (RF-002 concluído) e possuir certificação emitida por certificador credenciado (RN-004).  
**Exceções:** Galerias com selo de certificadora própria podem dispensar certificação externa.  
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
