# Implementação de um caso de uso idealizado durante o planejamento do projeto  

De acordo com o solicitado na implementação prática de um dos casos de uso do nosso projeto de Análise e Desenvolvimento de Sistemas de Software, optamos por implementar a seguinte funcionalidade:

---

### UC-06 — Validar autenticidade

**Ator:** Colecionador, Certificador.

**Objetivo:** Conferir autenticidade de obra.

**Pré-condições:** Chave/obra identificável.

**Fluxo principal:**
1. Ator informa chave ou ID da obra.
2. Sistema confere laudo, hash e confirmação.
3. Sistema apresenta status e motivo resumido.

**Fluxos alternativos/exceções:**
- Chave inválida, revogada ou pendente: indicar estado correto.

**Pós-condições:** Resultado da validação exibido.

**Regras de negócio relacionadas:** RN-006, RN-007.
  
  
# Regras de Negócio relacionadas:  

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

# Separação das tasks

1. Implementação CRUD Certificador
2. Implementação CRUD Colecionador
3. Implementação CRUD obra 
    - Deve constar o id (chave) da obra para consulta no Block Chain
4. Implementação da GUI do UC06
