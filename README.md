# ADSS — Regras de Negócio e Requisitos

Documentação do projeto **Autentificador de Galeria de Arte**, desenvolvida na disciplina de **Análise e Desenvolvimento de Sistemas de Software (ADSS)**, ministrada pelo professor **João Choma Neto**, na **Universidade Estadual de Maringá (UEM)**.

## Sobre o projeto

A proposta é uma plataforma para o gerenciamento de registros de obras de arte, com cadastro, emissão e validação de certificações de autenticidade, consulta de proveniência, transferência de titularidade e administração de usuários e permissões. O modelo prevê blockchain para registros de integridade e eventos, armazenamento descentralizado para arquivos permitidos e uma base privada para dados pessoais e informações restritas.

**Atores considerados:** Administrador, Colecionador, Certificador, Galeria, Artista e Público não logado.

## Estrutura da documentação

| Arquivo | Conteúdo | Quantidade |
|---|---|---:|
| [`01-geral.md`] | Documento consolidado com índice de rastreabilidade | 58 itens |
| [`02-regras_negocio.md`] | Regras de negócio (RN-001 a RN-013) | 13 |
| [`03-requisitos_funcionais.md`] | Requisitos funcionais (RF-001 a RF-016) | 16 |
| [`04-requisitos_nao_funcionais.md`] | Requisitos não funcionais (RNF-001 a RNF-011) | 11 |
| [`05-casos_de_uso.md`] | Atores, índice e detalhamento dos casos de uso (UC-01 a UC-18) | 18 |

Para uma leitura completa, comece pelo **`01-geral.md`**. Para editar ou consultar um único tipo de artefato, use o respectivo arquivo numerado de 02 a 05.

## Situação da documentação

Os registros estão em **status Proposto** e devem ser validados pelo grupo antes da implementação. Permanecem pontos de decisão relativos a certificações vitalícias, credenciamento, privacidade, coautoria, retenção de auditoria e processo de aquisição; veja [`00-pontos_de_atencao.md`](00-pontos_de_atencao.md).

**Observação sobre rastreabilidade:** algumas associações entre regras de negócio (RN) e requisitos funcionais (RF) não aparecem de forma recíproca nos dois documentos. O consolidado preserva as associações originais; é recomendável revisar essa correspondência antes da entrega definitiva.

## Integrantes do grupo

Discentes do segundo ano do Bacharelado em Ciência da Computação da Universidade Estadual de Maringá:

- Arthur Henrique da Silva
- Bernardo Wilchen de Oliveira
- Cintia da Silva Bulcão
- Giovana da Silva Bulcão
