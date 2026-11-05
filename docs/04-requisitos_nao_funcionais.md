## 3. Requisitos Não Funcionais (RNF)

> **Versão:** 0.1 (proposta para validação). Termos e referências padronizados a partir dos diagramas enviados. Consulte `00-pontos_de_atencao.md` para decisões em aberto.

### RNF-001 — Proteção de dados pessoais

**Categoria:** Segurança e privacidade  
**Descrição:** Dados pessoais, identidades e contratos devem ficar em base privada com acesso restrito; a blockchain guarda apenas evidências sem dados pessoais em claro.  
**Justificativa:** Reduzir exposição e apoiar conformidade com a LGPD.  
**Métrica/Critério mensurável:** Testes mostram 0 documentos pessoais públicos e 100% dos acessos privados autorizados.  
**Escopo:** Cadastro, identidade e auditoria  
**Prioridade:** Crítica  
**Status:** Proposto  
**Requisitos relacionados:** RF-001, RF-009, RF-010  
**Casos de uso relacionados:** UC-02, UC-12, UC-13  

---

### RNF-002 — Imutabilidade dos eventos auditáveis

**Categoria:** Integridade  
**Descrição:** Eventos concluídos de auditoria não podem ser alterados ou apagados por usuários da aplicação.  
**Justificativa:** Garantir rastreabilidade.  
**Métrica/Critério mensurável:** Em testes, 100% das alterações tentadas via aplicação são bloqueadas; integridade verificável.  
**Escopo:** Auditoria e operações críticas  
**Prioridade:** Crítica  
**Status:** Proposto  
**Requisitos relacionados:** RF-015, RF-006  
**Casos de uso relacionados:** UC-07, UC-11  

---

### RNF-003 — Desempenho da consulta de proveniência

**Categoria:** Desempenho  
**Descrição:** Exibir resultado de proveniência em até 2 segundos em 95% das requisições, sob carga de teste acordada.  
**Justificativa:** Consultas frequentes precisam ser rápidas.  
**Métrica/Critério mensurável:** p95 ≤ 2 s em cenário de carga definido antes da homologação.  
**Escopo:** Consulta de proveniência  
**Prioridade:** Alta  
**Status:** Proposto  
**Requisitos relacionados:** RF-007  
**Casos de uso relacionados:** UC-08  

---

### RNF-004 — Confirmação de eventos em blockchain

**Categoria:** Integração e confiabilidade  
**Descrição:** Informar o estado pendente/confirmado de registro, chave e transferência, sem tratar transação pendente como concluída.  
**Justificativa:** Evitar inconsistências por latência da rede.  
**Métrica/Critério mensurável:** 100% dos eventos exibem status consistente; testes com confirmação atrasada não concluem operação antes do retorno da rede.  
**Escopo:** Registro, emissão e transferência  
**Prioridade:** Crítica  
**Status:** Proposto  
**Requisitos relacionados:** RF-002, RF-004, RF-006  
**Casos de uso relacionados:** UC-03, UC-05, UC-07  

---

### RNF-005 — Retenção e permanência da auditoria

**Categoria:** Retenção de dados  
**Descrição:** Preservar evidências de integridade em armazenamento persistente por prazo indeterminado; dados pessoais de logs devem observar política de retenção e exclusão aplicável.  
**Justificativa:** Atender rastreabilidade sem presumir retenção irrestrita de dados pessoais.  
**Métrica/Critério mensurável:** 100% dos eventos persistem após reinício e restauração; política de retenção documentada antes da produção.  
**Escopo:** Trilhas e bases de auditoria  
**Prioridade:** Alta  
**Status:** Proposto  
**Requisitos relacionados:** RF-010, RF-015  
**Casos de uso relacionados:** UC-11, UC-13  

---

### RNF-006 — Disponibilidade da plataforma

**Categoria:** Disponibilidade  
**Descrição:** Manter serviços principais disponíveis com meta inicial de 99,5% por mês, excluindo janelas programadas comunicadas.  
**Justificativa:** Dar continuidade ao uso da galeria.  
**Métrica/Critério mensurável:** Disponibilidade mensal ≥ 99,5% registrada por monitoramento.  
**Escopo:** Serviços web e API  
**Prioridade:** Alta  
**Status:** Proposto  
**Requisitos relacionados:** RF-001, RF-007, RF-011  
**Casos de uso relacionados:** UC-01, UC-08, UC-14  

---

### RNF-007 — Restrição de acesso de usuários não cadastrados

**Categoria:** Segurança  
**Descrição:** Usuários sem conta podem acessar somente catálogo público e dados liberados para publicação.  
**Justificativa:** Proteger recursos restritos.  
**Métrica/Critério mensurável:** 100% das chamadas protegidas rejeitam sessões não cadastradas em testes de autorização.  
**Escopo:** Catálogo e serviços privados  
**Prioridade:** Crítica  
**Status:** Proposto  
**Requisitos relacionados:** RF-011, RF-007  
**Casos de uso relacionados:** UC-08, UC-14  

---

### RNF-008 — Proteção de dados sensíveis sem login

**Categoria:** Privacidade  
**Descrição:** Visitantes não podem consultar identidade, contratos, documentos nem informações confidenciais da obra ou das partes.  
**Justificativa:** Resguardar pessoas e negociações.  
**Métrica/Critério mensurável:** 0 campos sensíveis retornados por endpoints públicos nos testes.  
**Escopo:** Consulta de obra, proveniência e catálogo  
**Prioridade:** Crítica  
**Status:** Proposto  
**Requisitos relacionados:** RF-007, RF-011  
**Casos de uso relacionados:** UC-08, UC-14  

---

### RNF-009 — Integridade e backup dos arquivos

**Categoria:** Confiabilidade  
**Descrição:** Documentos, laudos e imagens devem possuir verificação por hash e cópia recuperável; armazenamento descentralizado recebe somente conteúdo autorizado.  
**Justificativa:** Evitar perda ou adulteração de evidências.  
**Métrica/Critério mensurável:** Conferência de hash em 100% dos downloads auditados e teste de recuperação trimestral bem-sucedido.  
**Escopo:** Arquivos de obra e certificação  
**Prioridade:** Alta  
**Status:** Proposto  
**Requisitos relacionados:** RF-002, RF-003  
**Casos de uso relacionados:** UC-03, UC-04  

---

### RNF-010 — Auditoria de alterações de permissões

**Categoria:** Segurança  
**Descrição:** Toda criação, elevação ou revogação de privilégios deve registrar autoria, justificativa e horário.  
**Justificativa:** Detectar uso indevido de contas privilegiadas.  
**Métrica/Critério mensurável:** 100% das alterações de permissão geram evento consultável.  
**Escopo:** Administração de usuários  
**Prioridade:** Crítica  
**Status:** Proposto  
**Requisitos relacionados:** RF-008, RF-015  
**Casos de uso relacionados:** UC-09, UC-10, UC-11  

---

### RNF-011 — Proteção de credenciais e sessão

**Categoria:** Segurança  
**Descrição:** Senhas devem ser armazenadas com hash seguro e sessões devem expirar e permitir revogação.  
**Justificativa:** Reduzir acessos não autorizados.  
**Métrica/Critério mensurável:** 0 senhas em texto claro na base; testes verificam expiração e bloqueio após desativação.  
**Escopo:** Cadastro e login  
**Prioridade:** Crítica  
**Status:** Proposto  
**Requisitos relacionados:** RF-001, RF-010  
**Casos de uso relacionados:** UC-01, UC-13  

---
