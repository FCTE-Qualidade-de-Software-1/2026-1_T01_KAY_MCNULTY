# AcheiUnB - Avaliação de Qualidade de Software 

Bem-vindo ao repositório de avaliação de qualidade do **AcheiUnB**, um sistema web de gestão de achados e perdidos desenvolvido para a comunidade acadêmica da Faculdade de Ciências e Tecnologias em Engenharia (FCTE) da Universidade de Brasília.

Este repositório contém os artefatos técnicos, métricas e análises produzidos durante a disciplina de Qualidade de Software (FGA/UnB).

## Documentação Oficial (GitPages)
Toda a documentação do processo de avaliação empírica, incluindo os Objetivos de Medição (GQM), o Plano de Avaliação e a Análise de Resultados, está publicada na nossa GitPage:

**[https://fcte-qualidade-de-software-1.github.io/2026-1_T01_KAY_MCNULTY/]**

## Stack Tecnológica do Projeto Avaliado
O AcheiUnB é uma aplicação Single Page (SPA) que utiliza processamento assíncrono e arquitetura conteinerizada.
* **Frontend:** Vue.js 3, Vite, Tailwind CSS
* **Backend:** Python, Django REST Framework
* **Mensageria:** WebSockets, Django Channels, Redis, Celery
* **Banco de Dados e Infraestrutura:** PostgreSQL e Docker Compose

## Escopo da Avaliação (ISO/IEC 25010)
O produto foi auditado nas seguintes características intrínsecas:
1. **Segurança (Security):** Avaliada via Testes Estáticos (SAST) com a API do **SonarCloud** e Testes Dinâmicos (DAST) via **OWASP ZAP** acionado por GitHub Actions.
2. **Manutenibilidade (Maintainability):** Focada no rastreamento de dívida técnica, complexidade cognitiva de componentes e aderência a padrões de acessibilidade.

Os dados brutos e os relatórios (`.json` e `.html`) gerados nestas análises estão versionados na pasta `/docs/fases/fase1/dados-brutos/`.

##  Como executar a documentação localmente
A documentação do projeto foi construída utilizando o MkDocs Material. Para rodar o servidor local e visualizar a GitPage:

```bash
# Instale o MkDocs e o tema Material
pip install mkdocs-material

# Inicie o servidor local
mkdocs serve

## Equipe KAY McNULTY

João Pedro Rodrigues Gomes da Silva

Júlia Massuda

Luiz Faria

Marjorie Mitzi

Samuel Caetano

Tiago Antunes
