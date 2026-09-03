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
**Status:** Proposto  
**Requisitos relacionados:** RF-005, RF-006, RF-008  
**Casos de teste relacionados:** --  

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
