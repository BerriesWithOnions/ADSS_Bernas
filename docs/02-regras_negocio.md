## 1. Regras de Negócio (RN)

> **Versão:** 0.1 (proposta para validação). Termos e referências padronizados a partir dos diagramas enviados. Consulte `00-pontos_de_atencao.md` para decisões em aberto.

### RN-001 — Emissão de chave de autenticidade

**Título:** Emissão de chave de autenticidade.  
**Descrição:** Chaves representam a autenticidade de obras já registradas e certificadas.  
**Origem:** Processo de autenticação.  
**Stakeholders envolvidos:** Artista, Galeria, Certificador, Colecionador.  
**Condição:** Solicitação de emissão de chave.  
**Regra:** Emitir somente após registro completo e laudo válido de certificador credenciado; registrar o evento e o hash em blockchain.  
**Exceções:** Galeria pode usar certificação própria somente se também possuir credenciamento ativo de certificador.  
**Dados envolvidos:** Obra, laudo, chave, hash e titularidade.  
**Prioridade:** Crítica  
**Status:** Proposto  
**Requisitos relacionados:** RF-002, RF-003, RF-004  

---

### RN-002 — Transferência de titularidade

**Título:** Transferência de titularidade.  
**Descrição:** A titularidade deve refletir o proprietário legítimo da obra.  
**Origem:** Gestão de aquisição e propriedade.  
**Stakeholders envolvidos:** Colecionador, Galeria, Artista.  
**Condição:** Solicitação de transferência.  
**Regra:** Transferir apenas com titular atual validado, consentimento das partes e identificação da obra; registrar histórico imutável.  
**Exceções:** Pendências ou ausência de consentimento bloqueiam a operação.  
**Dados envolvidos:** Titular anterior, novo titular, consentimentos, data e hash.  
**Prioridade:** Crítica  
**Status:** Proposto  
**Requisitos relacionados:** RF-006, RF-012  

---

### RN-003 — Privacidade da pessoa consultada

**Título:** Privacidade da pessoa consultada.  
**Descrição:** O titular controla quais dados privados da obra e de sua identidade são visíveis.  
**Origem:** Política de privacidade.  
**Stakeholders envolvidos:** Colecionador, Artista, Galeria.  
**Condição:** Consulta de obra ou de titular.  
**Regra:** Exibir publicamente apenas metadados autorizados; ocultar documentos, identificação pessoal e informações contratuais sem permissão.  
**Exceções:** Autoridades ou administradores com autorização formal podem acessar dados estritamente necessários.  
**Dados envolvidos:** Preferências de visibilidade, perfil, obra e documentos.  
**Prioridade:** Alta  
**Status:** Proposto  
**Requisitos relacionados:** RF-007, RF-011  

---

### RN-004 — Credenciamento de certificadores

**Título:** Credenciamento de certificadores.  
**Descrição:** Somente profissionais ou galerias credenciados podem validar tecnicamente uma obra.  
**Origem:** Governança de certificação.  
**Stakeholders envolvidos:** Administrador, Certificador, Galeria.  
**Condição:** Emissão de laudo ou uso de certificação própria.  
**Regra:** Administrador verifica credenciais e ativa o perfil certificador; apenas credenciados ativos emitem laudos válidos.  
**Exceções:** Credenciamento suspenso invalida novas emissões, sem apagar laudos históricos.  
**Dados envolvidos:** Identidade, credenciais, situação e laudos.  
**Prioridade:** Crítica  
**Status:** Proposto  
**Requisitos relacionados:** RF-003, RF-008, RF-014  

---

### RN-005 — Identificação e unicidade do registro

**Título:** Identificação e unicidade do registro.  
**Descrição:** Cada obra cadastrada possui identificador próprio e integridade verificável por hash.  
**Origem:** Registro de obras.  
**Stakeholders envolvidos:** Artista, Galeria, Certificador.  
**Condição:** Criação de registro.  
**Regra:** Gerar ID único, calcular hash do registro e impedir repetição do mesmo identificador/hash; alertar sobre possíveis duplicidades da obra.  
**Exceções:** Obras fisicamente distintas com metadados semelhantes não são automaticamente tratadas como iguais.  
**Dados envolvidos:** ID da obra, atributos, arquivos e hash.  
**Prioridade:** Crítica  
**Status:** Proposto  
**Requisitos relacionados:** RF-002  

---

### RN-006 — Validade da chave e verificação de autenticidade

**Título:** Validade da chave e verificação de autenticidade.  
**Descrição:** Uma chave deve ser verificável e vinculada ao registro e à certificação corretos.  
**Origem:** Validação de autenticidade.  
**Stakeholders envolvidos:** Colecionador, Certificador, Artista, Galeria.  
**Condição:** Verificação de chave ou laudo.  
**Regra:** Conferir existência, vínculo da chave à obra, integridade do hash e situação do laudo; sinalizar revogações e inconsistências.  
**Exceções:** Sem confirmação blockchain, informar verificação pendente, nunca autenticidade confirmada.  
**Dados envolvidos:** Chave, hash, ID da obra, laudo, eventos.  
**Prioridade:** Crítica  
**Status:** Proposto  
**Requisitos relacionados:** RF-004, RF-005  

---

### RN-007 — Perfis, permissões e acesso público

**Título:** Perfis, permissões e acesso público.  
**Descrição:** Ações dependem do perfil e da autenticação.  
**Origem:** Controle de acesso.  
**Stakeholders envolvidos:** Todos os atores.  
**Condição:** Tentativa de acessar função ou dado.  
**Regra:** Visitantes apenas consultam catálogo público; funções de gestão, certificação e dados sensíveis exigem conta ativa e permissão apropriada.  
**Exceções:** Administrador pode conceder/revogar permissões com registro de auditoria.  
**Dados envolvidos:** Perfil, permissões, sessão e recurso.  
**Prioridade:** Crítica  
**Status:** Proposto  
**Requisitos relacionados:** RF-001, RF-008, RF-009, RF-011, RF-016  

---

### RN-008 — Auditoria de operações sensíveis

**Título:** Auditoria de operações sensíveis.  
**Descrição:** Operações críticas devem permanecer rastreáveis.  
**Origem:** Governança e rastreabilidade.  
**Stakeholders envolvidos:** Administrador, Galeria, Colecionador, Certificador.  
**Condição:** Registro, emissão, transferência, exclusão ou alteração de permissão.  
**Regra:** Registrar ator, ação, obra/conta afetada, data, resultado e referência de integridade; proibir edição do evento original.  
**Exceções:** Corrigir eventos por lançamentos adicionais; nunca sobrescrever o histórico.  
**Dados envolvidos:** Eventos de auditoria, timestamps, referências e hashes.  
**Prioridade:** Crítica  
**Status:** Proposto  
**Requisitos relacionados:** RF-002, RF-004, RF-006, RF-008, RF-010, RF-015  

---

### RN-009 — Privacidade da pessoa que consulta

**Título:** Privacidade da pessoa que consulta.  
**Descrição:** Consultas não expõem a identidade do consulente a outros usuários.  
**Origem:** Política de privacidade.  
**Stakeholders envolvidos:** Colecionador, Artista, Galeria, Visitante.  
**Condição:** Consulta de proveniência ou catálogo.  
**Regra:** Não divulgar ao titular ou ao público a identidade do consulente; dados técnicos da consulta ficam acessíveis só à auditoria autorizada.  
**Exceções:** Consulta anônima não concede acesso a informações privadas.  
**Dados envolvidos:** Identificador da sessão, logs de consulta e permissões.  
**Prioridade:** Alta  
**Status:** Proposto  
**Requisitos relacionados:** RF-007, RF-011, RF-015  

---

### RN-010 — Certificação vitalícia e renovação do registro

**Título:** Certificação vitalícia e renovação do registro.  
**Descrição:** O certificado vitalício não vence automaticamente; o cadastro da obra pode ser atualizado.  
**Origem:** Política de certificação e manutenção.  
**Stakeholders envolvidos:** Colecionador, Artista, Galeria, Certificador.  
**Condição:** Solicitação de registro vitalício ou renovação.  
**Regra:** Emitir certificação vitalícia somente com laudo válido; renovação atualiza dados/evidências e gera novo evento, sem apagar certificação anterior.  
**Exceções:** Fraude, revogação fundamentada ou mudança de titularidade podem exigir revalidação, não vencimento automático.  
**Dados envolvidos:** Certificado, laudo, versões do cadastro e histórico.  
**Prioridade:** Alta  
**Status:** Proposto  
**Requisitos relacionados:** RF-013, RF-014  

---

### RN-011 — Vínculo de autoria e portfólio

**Título:** Vínculo de autoria e portfólio.  
**Descrição:** Cada obra possui um artista principal cadastrado e pode integrar o catálogo de uma galeria.  
**Origem:** Cadastro e acervo.  
**Stakeholders envolvidos:** Artista, Galeria.  
**Condição:** Cadastro ou vinculação de obra ao portfólio.  
**Regra:** Exigir um único artista principal por obra e autorização para inclusão no portfólio da galeria.  
**Exceções:** Coautoria não está modelada nesta versão e depende de decisão do negócio.  
**Dados envolvidos:** Artista principal, obra, autorização e galeria.  
**Prioridade:** Média  
**Status:** Proposto  
**Requisitos relacionados:** RF-002, RF-016  

---

### RN-012 — Desativação/exclusão de contas

**Título:** Desativação/exclusão de contas.  
**Descrição:** Contas inativas ou inadimplentes podem ter o acesso encerrado sem destruir rastreabilidade.  
**Origem:** Gestão de usuários e conformidade.  
**Stakeholders envolvidos:** Administrador, Usuários.  
**Condição:** Solicitação de exclusão ou medida administrativa.  
**Regra:** Desativar acesso; excluir ou anonimizar dados pessoais elimináveis conforme política de retenção; preservar apenas registros obrigatórios de integridade/auditoria.  
**Exceções:** Pendências e obrigações legais podem impedir exclusão imediata de determinados dados.  
**Dados envolvidos:** Conta, motivo, dados pessoais, logs.  
**Prioridade:** Alta  
**Status:** Proposto  
**Requisitos relacionados:** RF-010, RF-015  

---

### RN-013 — Solicitação de aquisição

**Título:** Solicitação de aquisição.  
**Descrição:** A aquisição inicia um pedido, mas não substitui comprovação de compra nem transferência de propriedade.  
**Origem:** Processo comercial.  
**Stakeholders envolvidos:** Colecionador, Galeria.  
**Condição:** Interesse em adquirir obra disponível.  
**Regra:** Criar pedido e notificar a galeria; registrar aceitação/rejeição; transferir titularidade somente após confirmação do negócio e RN-002.  
**Exceções:** Pagamento e integração financeira não fazem parte do escopo desta versão.  
**Dados envolvidos:** Pedido, obra, interessado, decisão e comprovante.  
**Prioridade:** Alta  
**Status:** Proposto  
**Requisitos relacionados:** RF-006, RF-012  

---
