## 2. Requisitos Funcionais (RF)

### RF-000 — 

**Descrição:**  
**Objetivo:**  
**Stakeholders:**   
**Ator principal:**   
**Pré-condições:**   
**Entradas:**  
**Processamento esperado:**  
**Saídas/Resultados:**  
**Pós-condições:**  
**Fluxos alternativos/exceções:**  
**Regras de negócio relacionadas:**   
**Prioridade:**  
**Status:**   
**Critérios de aceite:**
- a  
- a  

**Casos de uso relacionados:**  
**Tarefas relacionadas:**  
**Casos de teste relacionados:**  

---

### RF-XXX — Lorem ipsum

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
