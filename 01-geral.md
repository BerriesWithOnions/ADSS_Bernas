# Regras de Negócio e Requisitos do Produto — Autentificador de Galeria de Arte

Plataforma de registro, certificação, autenticidade e proveniência de obras de arte, com rastreabilidade por blockchain.

> **Versão:** 0.1 — documentação proposta, sujeita a validação pelo grupo. Este arquivo consolida `02-regras_negocio.md`, `03-requisitos_funcionais.md`, `04-requisitos_nao_funcionais.md` e `05-casos_de_uso.md`. As descrições individuais foram preservadas.

## Visão geral da documentação

| Tipo | Quantidade | Identificadores |
|---|---:|---|
| Regras de negócio (RN) | 13 | RN-001 a RN-013 |
| Requisitos funcionais (RF) | 16 | RF-001 a RF-016 |
| Requisitos não funcionais (RNF) | 11 | RNF-001 a RNF-011 |
| Casos de uso (UC) | 18 | UC-01 a UC-18 |

## Índice de rastreabilidade

As tabelas abaixo reproduzem as relações declaradas nos arquivos de origem. Associações nos dois sentidos (RN ↔ RF) ainda precisam de revisão, pois nem todas são recíprocas.

### Regras de negócio → requisitos funcionais

| Regra | Requisitos funcionais relacionados |
|---|---|
| RN-001 — Emissão de chave de autenticidade | RF-002, RF-003, RF-004 |
| RN-002 — Transferência de titularidade | RF-006, RF-012 |
| RN-003 — Privacidade da pessoa consultada | RF-007, RF-011 |
| RN-004 — Credenciamento de certificadores | RF-003, RF-008, RF-014 |
| RN-005 — Identificação e unicidade do registro | RF-002 |
| RN-006 — Validade da chave e verificação de autenticidade | RF-004, RF-005 |
| RN-007 — Perfis, permissões e acesso público | RF-001, RF-008, RF-009, RF-011, RF-016 |
| RN-008 — Auditoria de operações sensíveis | RF-002, RF-004, RF-006, RF-008, RF-010, RF-015 |
| RN-009 — Privacidade da pessoa que consulta | RF-007, RF-011, RF-015 |
| RN-010 — Certificação vitalícia e renovação do registro | RF-013, RF-014 |
| RN-011 — Vínculo de autoria e portfólio | RF-002, RF-016 |
| RN-012 — Desativação/exclusão de contas | RF-010, RF-015 |
| RN-013 — Solicitação de aquisição | RF-006, RF-012 |

### Requisitos funcionais → casos de uso

| Requisito funcional | Casos de uso relacionados |
|---|---|
| RF-001 — Cadastrar conta e autenticar usuários | UC-01, UC-02 |
| RF-002 — Registrar obra | UC-03 |
| RF-003 — Emitir laudo de certificação | UC-04 |
| RF-004 — Emitir chave de autenticidade | UC-05 |
| RF-005 — Validar autenticidade da obra | UC-06 |
| RF-006 — Transferir titularidade | UC-07 |
| RF-007 — Consultar proveniência | UC-08 |
| RF-008 — Administrar plataforma, credenciamentos e permissões | UC-09, UC-10 |
| RF-009 — Validar identidade de usuário | UC-12 |
| RF-010 — Desativar ou excluir conta | UC-13 |
| RF-011 — Consultar catálogo público | UC-14 |
| RF-012 — Solicitar aquisição de obra | UC-15 |
| RF-013 — Renovar registro de obra | UC-16 |
| RF-014 — Solicitar certificação vitalícia | UC-17 |
| RF-015 — Consultar trilha de auditoria | UC-11 |
| RF-016 — Gerenciar portfólio da galeria | UC-18 |

### Requisitos não funcionais → requisitos funcionais e casos de uso

| Requisito não funcional | Requisitos funcionais | Casos de uso |
|---|---|---|
| RNF-001 — Proteção de dados pessoais | RF-001, RF-009, RF-010 | UC-02, UC-12, UC-13 |
| RNF-002 — Imutabilidade dos eventos auditáveis | RF-015, RF-006 | UC-07, UC-11 |
| RNF-003 — Desempenho da consulta de proveniência | RF-007 | UC-08 |
| RNF-004 — Confirmação de eventos em blockchain | RF-002, RF-004, RF-006 | UC-03, UC-05, UC-07 |
| RNF-005 — Retenção e permanência da auditoria | RF-010, RF-015 | UC-11, UC-13 |
| RNF-006 — Disponibilidade da plataforma | RF-001, RF-007, RF-011 | UC-01, UC-08, UC-14 |
| RNF-007 — Restrição de acesso de usuários não cadastrados | RF-011, RF-007 | UC-08, UC-14 |
| RNF-008 — Proteção de dados sensíveis sem login | RF-007, RF-011 | UC-08, UC-14 |
| RNF-009 — Integridade e backup dos arquivos | RF-002, RF-003 | UC-03, UC-04 |
| RNF-010 — Auditoria de alterações de permissões | RF-008, RF-015 | UC-09, UC-10, UC-11 |
| RNF-011 — Proteção de credenciais e sessão | RF-001, RF-010 | UC-01, UC-13 |

**Ponto de revisão:** os vínculos RN/RF são assimétricos em alguns registros; o índice não acrescenta relações não informadas nem altera os quatro documentos originais. Consulte também [`00-pontos_de_atencao.md`](00-pontos_de_atencao.md) para premissas do projeto.

---

## 1. Regras de Negócio (RN)


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

---

## 2. Requisitos Funcionais (RF)


### RF-001 — Cadastrar conta e autenticar usuários

**Descrição:** Permitir criar conta e entrar na plataforma com credenciais.  
**Objetivo:** Habilitar acesso identificado.  
**Stakeholders:** Todos os perfis  
**Ator principal:** Usuário  
**Pré-condições:** Para login, conta cadastrada; cadastro sem pré-condições.  
**Entradas:** Nome, e-mail, documento e senha.  
**Processamento esperado:** Validar dados, armazenar cadastro privado e autenticar credenciais.  
**Saídas/Resultados:** Conta criada ou sessão iniciada.  
**Pós-condições:** Usuário com conta/sessão válida.  
**Fluxos alternativos/exceções:** Dados inválidos, conta bloqueada ou senha incorreta.  
**Regras de negócio relacionadas:** RN-007  
**Prioridade:** Crítica  
**Status:** Proposto  
**Critérios de aceite:**
- Cadastro recusa campos obrigatórios inválidos.
- Login recusa credenciais incorretas.

**Casos de uso relacionados:** UC-01, UC-02  
**Tarefas relacionadas:** A definir no planejamento.  
**Casos de teste relacionados:** A definir na implementação.  

---

### RF-002 — Registrar obra

**Descrição:** Cadastrar uma obra com título, artista, técnica, dimensões, data, imagens e titularidade.  
**Objetivo:** Constituir registro rastreável da obra.  
**Stakeholders:** Artista, Galeria, Colecionador  
**Ator principal:** Artista ou Galeria  
**Pré-condições:** Conta ativa e vínculo de titularidade/autorização comprovado.  
**Entradas:** Dados da obra, provas de titularidade e imagens.  
**Processamento esperado:** Validar campos, gerar ID/hash e registrar metadados e arquivos nos repositórios previstos.  
**Saídas/Resultados:** ID da obra, hash e protocolo de registro.  
**Pós-condições:** Obra disponível para certificação.  
**Fluxos alternativos/exceções:** Cadastro incompleto, titularidade não comprovada ou hash/ID duplicado.  
**Regras de negócio relacionadas:** RN-005, RN-008, RN-011  
**Prioridade:** Crítica  
**Status:** Proposto  
**Critérios de aceite:**
- Bloquear duplicação do mesmo ID/hash.
- Registrar referência de integridade e armazenar anexos permitidos.

**Casos de uso relacionados:** UC-03  
**Tarefas relacionadas:** A definir no planejamento.  
**Casos de teste relacionados:** A definir na implementação.  

---

### RF-003 — Emitir laudo de certificação

**Descrição:** Permitir laudo de autenticidade de obra por certificador credenciado.  
**Objetivo:** Fundamentar autenticação técnica.  
**Stakeholders:** Certificador, Artista, Galeria  
**Ator principal:** Certificador  
**Pré-condições:** Certificador ativo e obra cadastrada.  
**Entradas:** ID da obra, parecer, documentos e assinatura.  
**Processamento esperado:** Verificar credenciamento e registrar laudo associado à obra.  
**Saídas/Resultados:** Laudo emitido com referência verificável.  
**Pós-condições:** Obra apta à emissão de chave, se aprovada.  
**Fluxos alternativos/exceções:** Certificador não credenciado ou laudo reprovado.  
**Regras de negócio relacionadas:** RN-004, RN-006  
**Prioridade:** Crítica  
**Status:** Proposto  
**Critérios de aceite:**
- Somente certificador credenciado emite laudo válido.
- Laudo fica associado à obra e à auditoria.

**Casos de uso relacionados:** UC-04  
**Tarefas relacionadas:** A definir no planejamento.  
**Casos de teste relacionados:** A definir na implementação.  

---

### RF-004 — Emitir chave de autenticidade

**Descrição:** Gerar chave vinculada a obra com certificação válida.  
**Objetivo:** Facilitar verificação de autenticidade.  
**Stakeholders:** Artista, Galeria, Colecionador  
**Ator principal:** Artista ou Galeria  
**Pré-condições:** Obra registrada e laudo válido.  
**Entradas:** ID da obra e laudo.  
**Processamento esperado:** Validar pré-requisitos, gerar chave e registrar hash/evento na blockchain.  
**Saídas/Resultados:** Chave e status da confirmação.  
**Pós-condições:** Chave verificável após confirmação.  
**Fluxos alternativos/exceções:** Laudo ausente, chave já emitida ou confirmação pendente.  
**Regras de negócio relacionadas:** RN-001, RN-006, RN-008  
**Prioridade:** Crítica  
**Status:** Proposto  
**Critérios de aceite:**
- Impedir emissão sem laudo válido.
- Não declarar confirmação antes da blockchain.

**Casos de uso relacionados:** UC-05  
**Tarefas relacionadas:** A definir no planejamento.  
**Casos de teste relacionados:** A definir na implementação.  

---

### RF-005 — Validar autenticidade da obra

**Descrição:** Verificar chave e certificação vinculadas à obra.  
**Objetivo:** Permitir consulta de autenticidade confiável.  
**Stakeholders:** Colecionador, Certificador, Galeria  
**Ator principal:** Colecionador ou Certificador  
**Pré-condições:** ID/chave informados; autenticação quando houver dados privados.  
**Entradas:** Chave ou ID da obra.  
**Processamento esperado:** Comparar vínculos, status de laudo, hash e eventos confirmados.  
**Saídas/Resultados:** Autenticidade confirmada, inválida ou pendente.  
**Pós-condições:** Resultado registrado quando operação sensível.  
**Fluxos alternativos/exceções:** Chave inexistente ou inconsistência nos registros.  
**Regras de negócio relacionadas:** RN-006, RN-007  
**Prioridade:** Alta  
**Status:** Proposto  
**Critérios de aceite:**
- Exibir resultado e motivo sucinto.
- Não validar chave revogada ou divergente.

**Casos de uso relacionados:** UC-06  
**Tarefas relacionadas:** A definir no planejamento.  
**Casos de teste relacionados:** A definir na implementação.  

---

### RF-006 — Transferir titularidade

**Descrição:** Registrar passagem de propriedade entre titulares.  
**Objetivo:** Manter proveniência correta.  
**Stakeholders:** Colecionador, Galeria, Artista  
**Ator principal:** Titular atual ou Galeria autorizada  
**Pré-condições:** Contas verificadas e consentimentos disponíveis.  
**Entradas:** ID da obra, novo titular, comprovantes e autorização.  
**Processamento esperado:** Confirmar titular e negócio, registrar evento na blockchain e atualizar base privada.  
**Saídas/Resultados:** Confirmação ou pendência da transferência.  
**Pós-condições:** Histórico preservado e titular atualizado após confirmação.  
**Fluxos alternativos/exceções:** Falta de autorização, disputa ou blockchain pendente.  
**Regras de negócio relacionadas:** RN-002, RN-008, RN-013  
**Prioridade:** Crítica  
**Status:** Proposto  
**Critérios de aceite:**
- Não transferir sem confirmação das partes.
- Manter titular anterior no histórico.

**Casos de uso relacionados:** UC-07  
**Tarefas relacionadas:** A definir no planejamento.  
**Casos de teste relacionados:** A definir na implementação.  

---

### RF-007 — Consultar proveniência

**Descrição:** Exibir histórico autorizado de origem e transferências da obra.  
**Objetivo:** Dar transparência ao histórico da obra.  
**Stakeholders:** Colecionador, Galeria, Artista, Público  
**Ator principal:** Usuário ou Visitante  
**Pré-condições:** Obra identificável; login para informação restrita.  
**Entradas:** ID ou chave da obra.  
**Processamento esperado:** Buscar histórico e filtrar dados conforme permissões.  
**Saídas/Resultados:** Linha do tempo de proveniência, com campos públicos/privados.  
**Pós-condições:** Consulta concluída sem expor dados indevidos.  
**Fluxos alternativos/exceções:** Obra não encontrada ou acesso negado.  
**Regras de negócio relacionadas:** RN-003, RN-007, RN-009  
**Prioridade:** Alta  
**Status:** Proposto  
**Critérios de aceite:**
- Visitante visualiza apenas dados públicos.
- Dados pessoais não aparecem sem permissão.

**Casos de uso relacionados:** UC-08  
**Tarefas relacionadas:** A definir no planejamento.  
**Casos de teste relacionados:** A definir na implementação.  

---

### RF-008 — Administrar plataforma, credenciamentos e permissões

**Descrição:** Permitir ao administrador gerir usuários, perfis e certificadores.  
**Objetivo:** Controlar a governança da plataforma.  
**Stakeholders:** Administrador, Certificador, Todos os perfis  
**Ator principal:** Administrador  
**Pré-condições:** Administrador autenticado e autorizado.  
**Entradas:** Conta, perfil, justificativa e credenciais do certificador.  
**Processamento esperado:** Validar solicitação, alterar credenciamento/permissões e auditar.  
**Saídas/Resultados:** Mudança registrada ou recusada.  
**Pós-condições:** Estado de acesso atualizado.  
**Fluxos alternativos/exceções:** Credenciamento insuficiente ou tentativa não autorizada.  
**Regras de negócio relacionadas:** RN-004, RN-007, RN-008  
**Prioridade:** Crítica  
**Status:** Proposto  
**Critérios de aceite:**
- Recusar alteração por não administrador.
- Registrar autor e motivo da alteração.

**Casos de uso relacionados:** UC-09, UC-10  
**Tarefas relacionadas:** A definir no planejamento.  
**Casos de teste relacionados:** A definir na implementação.  

---

### RF-009 — Validar identidade de usuário

**Descrição:** Permitir conferência de documentos de identidade antes de operações críticas.  
**Objetivo:** Evitar operações com identificação não verificada.  
**Stakeholders:** Administrador, Artista, Galeria, Certificador, Colecionador  
**Ator principal:** Administrador  
**Pré-condições:** Conta cadastrada e documentos enviados.  
**Entradas:** Documento de identidade e dados cadastrais.  
**Processamento esperado:** Conferir coerência documental e aprovar ou rejeitar.  
**Saídas/Resultados:** Status verificado, pendente ou rejeitado.  
**Pós-condições:** Conta habilitada para atos restritos quando aprovada.  
**Fluxos alternativos/exceções:** Documento inválido ou divergência cadastral.  
**Regras de negócio relacionadas:** RN-007  
**Prioridade:** Alta  
**Status:** Proposto  
**Critérios de aceite:**
- Operações críticas exigem status verificado.
- O documento não fica exposto em catálogo.

**Casos de uso relacionados:** UC-12  
**Tarefas relacionadas:** A definir no planejamento.  
**Casos de teste relacionados:** A definir na implementação.  

---

### RF-010 — Desativar ou excluir conta

**Descrição:** Permitir tratar contas excluídas, inativas ou inadimplentes.  
**Objetivo:** Encerrar acessos preservando rastreabilidade.  
**Stakeholders:** Administrador, Usuários  
**Ator principal:** Administrador  
**Pré-condições:** Conta existente e justificativa.  
**Entradas:** ID da conta e motivo.  
**Processamento esperado:** Suspender login e aplicar política de exclusão/anonimização.  
**Saídas/Resultados:** Conta desativada e registro do evento.  
**Pós-condições:** Acessos revogados; históricos necessários preservados.  
**Fluxos alternativos/exceções:** Vínculos ou retenção obrigatória pendentes.  
**Regras de negócio relacionadas:** RN-008, RN-012  
**Prioridade:** Alta  
**Status:** Proposto  
**Critérios de aceite:**
- Conta desativada não autentica.
- Registrar operação sem apagar eventos históricos.

**Casos de uso relacionados:** UC-13  
**Tarefas relacionadas:** A definir no planejamento.  
**Casos de teste relacionados:** A definir na implementação.  

---

### RF-011 — Consultar catálogo público

**Descrição:** Listar obras públicas do acervo da galeria.  
**Objetivo:** Permitir descoberta de obras por visitantes.  
**Stakeholders:** Público não logado, Colecionador, Galeria  
**Ator principal:** Visitante ou Usuário  
**Pré-condições:** Nenhuma.  
**Entradas:** Busca, filtros e ID da obra.  
**Processamento esperado:** Pesquisar publicações e aplicar políticas de visibilidade.  
**Saídas/Resultados:** Lista/detalhes públicos das obras.  
**Pós-condições:** Catálogo apresentado.  
**Fluxos alternativos/exceções:** Obra não publicada ou dado protegido não aparece.  
**Regras de negócio relacionadas:** RN-003, RN-007, RN-009  
**Prioridade:** Alta  
**Status:** Proposto  
**Critérios de aceite:**
- Acesso sem login disponível.
- Nenhum documento privado é exibido.

**Casos de uso relacionados:** UC-14  
**Tarefas relacionadas:** A definir no planejamento.  
**Casos de teste relacionados:** A definir na implementação.  

---

### RF-012 — Solicitar aquisição de obra

**Descrição:** Permitir ao colecionador abrir pedido de compra pela plataforma.  
**Objetivo:** Formalizar interesse e encaminhar à galeria.  
**Stakeholders:** Colecionador, Galeria  
**Ator principal:** Colecionador  
**Pré-condições:** Login válido; obra disponível.  
**Entradas:** Obra e identificação do interessado.  
**Processamento esperado:** Criar pedido e informar a galeria responsável.  
**Saídas/Resultados:** Número e status do pedido.  
**Pós-condições:** Pedido aguardando resposta.  
**Fluxos alternativos/exceções:** Obra indisponível ou usuário não autorizado.  
**Regras de negócio relacionadas:** RN-013  
**Prioridade:** Média  
**Status:** Proposto  
**Critérios de aceite:**
- Pedido não altera titularidade automaticamente.
- Galeria recebe pedido com referência da obra.

**Casos de uso relacionados:** UC-15  
**Tarefas relacionadas:** A definir no planejamento.  
**Casos de teste relacionados:** A definir na implementação.  

---

### RF-013 — Renovar registro de obra

**Descrição:** Permitir atualizar os dados e as evidências do registro sem perder o histórico.  
**Objetivo:** Manter informações de obra atualizadas.  
**Stakeholders:** Colecionador, Artista, Galeria  
**Ator principal:** Titular atual ou Galeria autorizada  
**Pré-condições:** Obra existente e autorização validada.  
**Entradas:** Dados ou documentos atualizados.  
**Processamento esperado:** Criar versão e evento de atualização, preservando dados anteriores.  
**Saídas/Resultados:** Nova versão do registro.  
**Pós-condições:** Histórico e vínculos de autenticidade mantidos.  
**Fluxos alternativos/exceções:** Divergência de titularidade ou atualização inválida.  
**Regras de negócio relacionadas:** RN-008, RN-010  
**Prioridade:** Média  
**Status:** Proposto  
**Critérios de aceite:**
- Exibir versão atual do registro.
- Não apagar versão anterior.

**Casos de uso relacionados:** UC-16  
**Tarefas relacionadas:** A definir no planejamento.  
**Casos de teste relacionados:** A definir na implementação.  

---

### RF-014 — Solicitar certificação vitalícia

**Descrição:** Permitir solicitar e emitir certificado de validade não limitada por prazo.  
**Objetivo:** Disponibilizar certificação vitalícia verificável.  
**Stakeholders:** Colecionador, Artista, Galeria, Certificador  
**Ator principal:** Titular/solicitante e Certificador  
**Pré-condições:** Obra registrada, identidade verificada e laudo válido.  
**Entradas:** ID da obra e laudo/certificação.  
**Processamento esperado:** Verificar pré-requisitos e registrar certificado vitalício.  
**Saídas/Resultados:** Certificado ou indeferimento.  
**Pós-condições:** Certificação ativa sem vencimento automático.  
**Fluxos alternativos/exceções:** Certificação inexistente ou revogada.  
**Regras de negócio relacionadas:** RN-004, RN-010  
**Prioridade:** Alta  
**Status:** Proposto  
**Critérios de aceite:**
- Somente certificações aprovadas são emitidas.
- A renovação do cadastro não cancela o certificado.

**Casos de uso relacionados:** UC-17  
**Tarefas relacionadas:** A definir no planejamento.  
**Casos de teste relacionados:** A definir na implementação.  

---

### RF-015 — Consultar trilha de auditoria

**Descrição:** Permitir ao administrador buscar eventos de operações críticas.  
**Objetivo:** Viabilizar fiscalização e rastreabilidade.  
**Stakeholders:** Administrador  
**Ator principal:** Administrador  
**Pré-condições:** Acesso administrativo autorizado.  
**Entradas:** Filtros por evento, ator, obra e data.  
**Processamento esperado:** Consultar registros preservados e conferir referências de integridade.  
**Saídas/Resultados:** Lista de eventos consultáveis.  
**Pós-condições:** Nenhuma alteração no histórico.  
**Fluxos alternativos/exceções:** Acesso negado ou ausência de resultados.  
**Regras de negócio relacionadas:** RN-008, RN-009  
**Prioridade:** Alta  
**Status:** Proposto  
**Critérios de aceite:**
- Somente perfil autorizado consulta trilha completa.
- Eventos não podem ser editados nessa função.

**Casos de uso relacionados:** UC-11  
**Tarefas relacionadas:** A definir no planejamento.  
**Casos de teste relacionados:** A definir na implementação.  

---

### RF-016 — Gerenciar portfólio da galeria

**Descrição:** Adicionar ou retirar obras autorizadas do catálogo da galeria.  
**Objetivo:** Organizar acervo e publicações.  
**Stakeholders:** Galeria, Artista  
**Ator principal:** Galeria  
**Pré-condições:** Obra registrada e autorização de vínculo.  
**Entradas:** ID da obra, autorização e status de publicação.  
**Processamento esperado:** Verificar vínculo, associar ou desassociar obra e atualizar catálogo.  
**Saídas/Resultados:** Portfólio atualizado.  
**Pós-condições:** Obra visível conforme configuração de privacidade.  
**Fluxos alternativos/exceções:** Autorização ausente ou obra inexistente.  
**Regras de negócio relacionadas:** RN-003, RN-007, RN-011  
**Prioridade:** Média  
**Status:** Proposto  
**Critérios de aceite:**
- Somente obras autorizadas entram no portfólio.
- Retirada do catálogo não exclui registro da obra.

**Casos de uso relacionados:** UC-18  
**Tarefas relacionadas:** A definir no planejamento.  
**Casos de teste relacionados:** A definir na implementação.  

---

---

## 3. Requisitos Não Funcionais (RNF)


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

---

## 4. Casos de Uso (UC)

### 4.1 Identificação dos atores

Um ator é uma pessoa ou organização externa que interage diretamente com a plataforma. Blockchain, armazenamento descentralizado, base privada e auditoria são componentes internos, não atores.

| Ator | Papel no negócio | Por que é ator |
|---|---|---|
| **Artista** | Registra obras e comprova autoria/titularidade | Solicita cadastro, registro e atualização de obras |
| **Galeria** | Gerencia portfólio e intermedia movimentações | Opera cadastro, publicação e transferência autorizados |
| **Certificador** | Emite laudos de autenticidade | Avalia obras e emite certificações após credenciamento |
| **Colecionador** | Consulta, solicita compra e transfere obras | Usa os serviços de proveniência e titularidade |
| **Administrador** | Credencia, controla acessos e audita | Governa os usuários e operações da plataforma |
| **Público não logado** | Consulta catálogo público | Acessa informações publicadas sem autenticação |

**Observação:** uma galeria pode atuar também como certificadora apenas quando possuir credenciamento vigente (RN-004). Isso é uma permissão adicional, não um novo ator obrigatório.

---

### 4.2 Índice de casos de uso

| ID | Nome | Ator principal | RF relacionado | RN relacionada(s) |
|---|---|---|---|---|
| UC-01 | Autenticar-se na plataforma | Artista, Galeria, Certificador, Colecionador, Administrador | RF-001 | RN-007 |
| UC-02 | Cadastrar dados de identidade | Artista, Galeria, Certificador, Colecionador, Administrador | RF-001 | RN-007 |
| UC-03 | Registrar obra | Artista, Galeria | RF-002 | RN-005, RN-011 |
| UC-04 | Emitir certificação (laudo) | Certificador, Galeria credenciada | RF-003 | RN-004, RN-006 |
| UC-05 | Emitir chave de autenticidade | Artista, Galeria | RF-004 | RN-001, RN-006 |
| UC-06 | Validar autenticidade | Colecionador, Certificador | RF-005 | RN-006, RN-007 |
| UC-07 | Transferir titularidade | Colecionador, Galeria | RF-006 | RN-002, RN-008 |
| UC-08 | Consultar proveniência | Colecionador, Galeria, Artista, Público não logado | RF-007 | RN-003, RN-009 |
| UC-09 | Credenciar certificador | Administrador | RF-008 | RN-004, RN-007 |
| UC-10 | Gerenciar acessos de usuários | Administrador | RF-008 | RN-007, RN-008 |
| UC-11 | Consultar trilha de auditoria | Administrador | RF-015 | RN-008, RN-009 |
| UC-12 | Validar identidade de usuário | Administrador | RF-009 | RN-007 |
| UC-13 | Desativar ou excluir conta | Administrador | RF-010 | RN-012, RN-008 |
| UC-14 | Consultar catálogo público | Público não logado, Colecionador | RF-011 | RN-003, RN-007 |
| UC-15 | Solicitar aquisição de obra | Colecionador | RF-012 | RN-013 |
| UC-16 | Renovar registro da obra | Colecionador, Artista, Galeria | RF-013 | RN-010, RN-008 |
| UC-17 | Solicitar certificação vitalícia | Colecionador, Artista, Galeria, Certificador | RF-014 | RN-010, RN-004 |
| UC-18 | Gerenciar portfólio da galeria | Galeria | RF-016 | RN-011, RN-007 |

---

### 4.3 Detalhamento dos casos de uso

#### UC-01 — Autenticar-se na plataforma

**Ator:** Artista, Galeria, Certificador, Colecionador, Administrador.

**Objetivo:** Entrar no sistema.

**Pré-condições:** Conta ativa.

**Fluxo principal:**
1. Ator informa e-mail e senha.
2. Sistema valida credenciais e status da conta.
3. Sistema abre sessão com permissões do perfil.

**Fluxos alternativos/exceções:**
- Credenciais inválidas ou conta bloqueada: negar acesso.

**Pós-condições:** Sessão autenticada.

**Regras de negócio relacionadas:** RN-007.

---

#### UC-02 — Cadastrar dados de identidade

**Ator:** Artista, Galeria, Certificador, Colecionador, Administrador.

**Objetivo:** Criar conta.

**Pré-condições:** Nenhuma.

**Fluxo principal:**
1. Ator solicita cadastro e informa dados básicos.
2. Sistema valida os campos e cria cadastro privado.
3. Sistema confirma o cadastro e informa eventual pendência de identidade.

**Fluxos alternativos/exceções:**
- Documento/e-mail inválido ou já usado: solicitar correção.

**Pós-condições:** Conta criada, ainda sujeita a verificação.

**Regras de negócio relacionadas:** RN-007.

---

#### UC-03 — Registrar obra

**Ator:** Artista, Galeria.

**Objetivo:** Cadastrar obra rastreável.

**Pré-condições:** Conta ativa e autorização de registro.

**Fluxo principal:**
1. Ator informa dados da obra e titularidade.
2. Sistema valida dados, identifica duplicidades e gera ID/hash.
3. Sistema armazena arquivos autorizados e registra o evento.

**Fluxos alternativos/exceções:**
- Obra já registrada ou titularidade não comprovada: rejeitar.

**Pós-condições:** Obra cadastrada para certificação.

**Regras de negócio relacionadas:** RN-005, RN-011.

---

#### UC-04 — Emitir certificação (laudo)

**Ator:** Certificador, Galeria credenciada.

**Objetivo:** Anexar laudo válido.

**Pré-condições:** Obra existente e certificador ativo.

**Fluxo principal:**
1. Certificador acessa a obra e informa avaliação.
2. Sistema verifica credenciamento e dados.
3. Certificador assina e sistema registra o laudo.

**Fluxos alternativos/exceções:**
- Credenciamento inativo ou parecer reprovado: não emitir laudo aprovado.

**Pós-condições:** Laudo vinculado à obra.

**Regras de negócio relacionadas:** RN-004, RN-006.

---

#### UC-05 — Emitir chave de autenticidade

**Ator:** Artista, Galeria.

**Objetivo:** Gerar chave de obra certificada.

**Pré-condições:** Registro completo e laudo válido.

**Fluxo principal:**
1. Ator solicita chave para a obra.
2. Sistema verifica certificado e vínculo.
3. Sistema emite chave e acompanha confirmação em blockchain.

**Fluxos alternativos/exceções:**
- Sem laudo ou evento não confirmado: impedir conclusão.

**Pós-condições:** Chave confirmada ou operação pendente.

**Regras de negócio relacionadas:** RN-001, RN-006.

---

#### UC-06 — Validar autenticidade

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

---

#### UC-07 — Transferir titularidade

**Ator:** Colecionador, Galeria.

**Objetivo:** Trocar titular da obra.

**Pré-condições:** Identidades verificadas e acordo comprovado.

**Fluxo principal:**
1. Ator inicia transferência e informa novo titular.
2. Sistema valida titular anterior e consentimentos.
3. Sistema grava evento e confirma novo titular após validação da rede.

**Fluxos alternativos/exceções:**
- Falta de anuência ou disputa: bloquear.

**Pós-condições:** Novo titular registrado e histórico preservado.

**Regras de negócio relacionadas:** RN-002, RN-008.

---

#### UC-08 — Consultar proveniência

**Ator:** Colecionador, Galeria, Artista, Público não logado.

**Objetivo:** Consultar histórico autorizado de obra.

**Pré-condições:** Obra registrada.

**Fluxo principal:**
1. Ator informa a obra.
2. Sistema obtém eventos de origem e transferência.
3. Sistema aplica regras de privacidade e apresenta histórico.

**Fluxos alternativos/exceções:**
- Sem autorização: exibir apenas conteúdo público.

**Pós-condições:** Histórico permitido apresentado.

**Regras de negócio relacionadas:** RN-003, RN-009.

---

#### UC-09 — Credenciar certificador

**Ator:** Administrador.

**Objetivo:** Habilitar perfil de certificação.

**Pré-condições:** Administrador autenticado e documentos recebidos.

**Fluxo principal:**
1. Administrador analisa credenciais do candidato.
2. Sistema registra aprovação ou reprovação.
3. Sistema atualiza o perfil e audita a decisão.

**Fluxos alternativos/exceções:**
- Credenciais insuficientes: manter pendente/rejeitado.

**Pós-condições:** Credenciamento atualizado.

**Regras de negócio relacionadas:** RN-004, RN-007.

---

#### UC-10 — Gerenciar acessos de usuários

**Ator:** Administrador.

**Objetivo:** Ajustar perfis e permissões.

**Pré-condições:** Administrador autenticado.

**Fluxo principal:**
1. Administrador seleciona usuário e alteração.
2. Sistema valida privilégio e justificativa.
3. Sistema aplica alteração e registra auditoria.

**Fluxos alternativos/exceções:**
- Sem permissão ou dado inválido: negar mudança.

**Pós-condições:** Permissões atualizadas.

**Regras de negócio relacionadas:** RN-007, RN-008.

---

#### UC-11 — Consultar trilha de auditoria

**Ator:** Administrador.

**Objetivo:** Fiscalizar operações críticas.

**Pré-condições:** Administrador com autorização.

**Fluxo principal:**
1. Administrador filtra eventos por período, ação ou obra.
2. Sistema consulta histórico persistente.
3. Sistema apresenta registros e evidências de integridade.

**Fluxos alternativos/exceções:**
- Usuário não autorizado: negar consulta.

**Pós-condições:** Auditoria consultada sem modificações.

**Regras de negócio relacionadas:** RN-008, RN-009.

---

#### UC-12 — Validar identidade de usuário

**Ator:** Administrador.

**Objetivo:** Aprovar identidade para operações críticas.

**Pré-condições:** Conta cadastrada e documentos enviados.

**Fluxo principal:**
1. Administrador abre solicitação de verificação.
2. Sistema mostra documentos restritos.
3. Administrador aprova ou rejeita com justificativa.

**Fluxos alternativos/exceções:**
- Documento inconsistente: marcar como rejeitado.

**Pós-condições:** Status da identidade atualizado.

**Regras de negócio relacionadas:** RN-007.

---

#### UC-13 — Desativar ou excluir conta

**Ator:** Administrador.

**Objetivo:** Encerrar acesso de conta.

**Pré-condições:** Conta existente.

**Fluxo principal:**
1. Administrador seleciona conta e motivo.
2. Sistema revoga sessão e desativa acesso.
3. Sistema anonimiza/exclui dados permitidos e registra evento.

**Fluxos alternativos/exceções:**
- Pendência legal: conservar apenas dados necessários, com acesso restrito.

**Pós-condições:** Conta sem acesso; histórico necessário preservado.

**Regras de negócio relacionadas:** RN-012, RN-008.

---

#### UC-14 — Consultar catálogo público

**Ator:** Público não logado, Colecionador.

**Objetivo:** Navegar por obras publicadas.

**Pré-condições:** Nenhuma.

**Fluxo principal:**
1. Ator acessa catálogo e define filtro.
2. Sistema busca obras públicas.
3. Sistema apresenta dados e imagens autorizados.

**Fluxos alternativos/exceções:**
- Obra restrita: não exibir informações privadas.

**Pós-condições:** Catálogo exibido.

**Regras de negócio relacionadas:** RN-003, RN-007.

---

#### UC-15 — Solicitar aquisição de obra

**Ator:** Colecionador.

**Objetivo:** Demonstrar interesse na compra de obra.

**Pré-condições:** Conta ativa e obra disponível.

**Fluxo principal:**
1. Colecionador escolhe obra e solicita aquisição.
2. Sistema cria pedido e avisa a galeria.
3. Galeria aceita ou rejeita e sistema atualiza o pedido.

**Fluxos alternativos/exceções:**
- Indisponibilidade: impedir abertura do pedido.

**Pós-condições:** Pedido com estado atualizado; titularidade inalterada.

**Regras de negócio relacionadas:** RN-013.

---

#### UC-16 — Renovar registro da obra

**Ator:** Colecionador, Artista, Galeria.

**Objetivo:** Atualizar registro sem perder versões anteriores.

**Pré-condições:** Titular/autorizado e obra existente.

**Fluxo principal:**
1. Ator informa os dados a atualizar.
2. Sistema valida direito de alteração.
3. Sistema grava nova versão e evento histórico.

**Fluxos alternativos/exceções:**
- Dados inválidos ou não autorizado: recusar.

**Pós-condições:** Registro atualizado e histórico preservado.

**Regras de negócio relacionadas:** RN-010, RN-008.

---

#### UC-17 — Solicitar certificação vitalícia

**Ator:** Colecionador, Artista, Galeria, Certificador.

**Objetivo:** Emitir certificado vitalício da obra.

**Pré-condições:** Obra e laudo válido, certificador credenciado.

**Fluxo principal:**
1. Interessado solicita certificação vitalícia.
2. Sistema valida laudo e credenciamento.
3. Certificador aprova e sistema registra certificado.

**Fluxos alternativos/exceções:**
- Ausência de laudo válido: recusar solicitação.

**Pós-condições:** Certificado vitalício registrado, sujeito a revogação fundamentada.

**Regras de negócio relacionadas:** RN-010, RN-004.

---

#### UC-18 — Gerenciar portfólio da galeria

**Ator:** Galeria.

**Objetivo:** Publicar obra no acervo da galeria.

**Pré-condições:** Obra cadastrada e autorização do responsável.

**Fluxo principal:**
1. Galeria seleciona obra para seu portfólio.
2. Sistema verifica vínculo e autorização.
3. Sistema inclui ou retira obra do catálogo da galeria.

**Fluxos alternativos/exceções:**
- Sem autorização: bloquear publicação.

**Pós-condições:** Portfólio atualizado sem excluir registro original.

**Regras de negócio relacionadas:** RN-011, RN-007.

---
