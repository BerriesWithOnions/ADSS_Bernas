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
