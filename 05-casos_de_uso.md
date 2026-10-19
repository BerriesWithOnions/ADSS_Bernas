# Casos de Uso — Autentificador de Galeria de Arte

> **Versão:** 0.1 (proposta para validação). Termos e referências padronizados a partir dos diagramas enviados. Consulte `00-pontos_de_atencao.md` para decisões em aberto.

## 1. Identificação dos atores

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

## 2. Índice de casos de uso

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

## 3. Detalhamento dos casos de uso

### UC-01 — Autenticar-se na plataforma

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

### UC-02 — Cadastrar dados de identidade

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

### UC-03 — Registrar obra

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

### UC-04 — Emitir certificação (laudo)

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

### UC-05 — Emitir chave de autenticidade

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

---

### UC-07 — Transferir titularidade

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

### UC-08 — Consultar proveniência

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

### UC-09 — Credenciar certificador

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

### UC-10 — Gerenciar acessos de usuários

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

### UC-11 — Consultar trilha de auditoria

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

### UC-12 — Validar identidade de usuário

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

### UC-13 — Desativar ou excluir conta

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

### UC-14 — Consultar catálogo público

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

### UC-15 — Solicitar aquisição de obra

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

### UC-16 — Renovar registro da obra

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

### UC-17 — Solicitar certificação vitalícia

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

### UC-18 — Gerenciar portfólio da galeria

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
