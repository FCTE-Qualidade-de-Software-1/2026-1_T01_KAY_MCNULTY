# Fase 3: Plano de Avaliação

## Visão Geral

Esta fase formaliza o método de avaliação que conecta as métricas definidas na [Fase 2 — Objetivos de Medição GQM](../fase2/gqm-objetivos.md) e na [Fase 2 — Métricas e Critérios](../fase2/metricas-criterios.md) à execução prática prevista para a Fase 4, etapa em que as medições serão coletadas e registradas. O objetivo é garantir que a avaliação de Segurança e Manutenibilidade do AcheiUnB possa ser repetida por um avaliador externo, com os mesmos recursos, mesmas etapas e mesmo tipo de evidência bruta.

O plano adota dois métodos complementares:

- **DAST (Dynamic Application Security Testing)** com OWASP ZAP para observar vulnerabilidades expostas durante a execução da aplicação web.
- **SAST (Static Application Security Testing)** com SonarCloud para medir exposição de segredos, complexidade cognitiva, dívida técnica e falhas de acessibilidade diretamente na base de código.

Essa combinação mantém coerência com o propósito da Fase 1, que priorizou Segurança e Manutenibilidade como atributos críticos para um sistema acadêmico que processa dados pessoais e depende de manutenção contínua por equipes com alta rotatividade.

---

## Organização da Fase 3

A Fase 3 foi organizada em duas páginas complementares para facilitar navegação e revisão:

| Página | Conteúdo principal | Critério |
| --- | --- | --- |
| **Esta página** | Visão geral, método, rastreabilidade e recursos de avaliação | **F3-C1** e **F3-C2** |
| [Cronograma, Consistência e Referências](cronograma-avaliacao.md) | Sequência de atividades, justificativa metodológica e bibliografia | **F3-C3** e **F3-C8** |

---

## 1. Método de Avaliação e Reprodutibilidade (F3-C1)

### 1.0. Pré-requisitos do avaliador

Antes de iniciar a execução, o avaliador deve garantir que possui:

| Pré-requisito | Detalhe |
| --- | --- |
| **Acesso ao repositório fork** | Conta no GitHub com permissão para acionar workflows via `workflow_dispatch` no repositório `samuelncaetano/2024-2-acheiunb` |
| **Token do SonarCloud** | Conta no SonarCloud com o projeto `samuelncaetano/2024-2-acheiunb` acessível; token gerado em `My Account > Security > Generate Token` |
| **Ambiente local** | Git, Python 3.10+, Docker e Docker Compose instalados e funcionais |
| **Variáveis de ambiente** | Arquivo `.env` local contendo `SONAR_TOKEN`, `PROJECT_KEY`, `SONAR_BASE_URL` e `SONAR_ORG` preenchidos com os valores do projeto |
| **Bibliotecas Python** | `requests` e `python-dotenv` instalados (`pip install requests python-dotenv`) |

### 1.1. Rastreabilidade entre métricas, métodos e saídas brutas

| Métrica | Método | Ferramenta | Saída bruta |
| --- | --- | --- | --- |
| **M1.1** — Densidade de alertas DAST de risco Médio/Alto | DAST | OWASP ZAP | `zap_report_fase1.html` |
| **M1.2** — Taxa de exposição de segredos (BLOCKERs/KLOC) | SAST | SonarCloud + `extrator_sonar.py` | `sonar_issues_fase1.json` |
| **M2.1** — Módulos com Complexidade Cognitiva > 15 | SAST | SonarCloud + `extrator_sonar.py` | `sonar_issues_fase1.json` |
| **M2.2** — Densidade de Dívida Técnica (min/LOC) | SAST | SonarCloud + `extrator_sonar.py` | `sonar_issues_fase1.json` |
| **M2.3** — Proporção de componentes com falhas de acessibilidade | SAST | SonarCloud + `extrator_sonar.py` | `sonar_issues_fase1.json` |

As medições devem ser realizadas sobre o mesmo objeto de avaliação definido desde a Fase 1: a instância do frontend do AcheiUnB em execução em `http://localhost:5173` e a base de código do repositório avaliado no SonarCloud.

### 1.2. Procedimento DAST com OWASP ZAP

O método dinâmico deve ser executado de forma automatizada por meio de GitHub Actions, de modo que a Fase 4 possa registrar evidências obtidas a partir de um fluxo previamente definido, estável e reproduzível.

#### Passo a passo

1. Garantir que o repositório avaliado possua um workflow configurado com o nome **`OWASP ZAP Security Audit`**.
2. Disparar o workflow manualmente via **`workflow_dispatch`** na aba **Actions** do GitHub.
3. Executar o pipeline em runner **`ubuntu-latest`**.
4. Realizar o checkout do código-fonte do projeto avaliado.
5. Preparar o ambiente de backend com o arquivo de variáveis necessário para a aplicação subir de forma isolada.
6. Inicializar o backend Django com:

```bash
docker compose up -d
```

7. Configurar o ambiente do frontend com **Node.js 20** e instalar as dependências necessárias.
8. Subir o frontend Vue.js com:

```bash
npm run dev &
```

9. Sincronizar a disponibilidade da aplicação aguardando as portas do backend e do frontend com a ferramenta **`wait-on`**, até que `http://localhost:8000` e `http://localhost:5173` estejam respondendo.
10. Executar a ação oficial do ZAP:

```text
zaproxy/action-full-scan@v0.12.0
```

11. Configurar como alvo da varredura a instância local do frontend:

```text
http://localhost:5173
```

12. Habilitar a varredura ativa completa para que o ZAP percorra as rotas e gere o relatório final em HTML.
13. Armazenar o relatório bruto produzido pelo processo com o nome **`zap_report_fase1.html`** para posterior auditoria e cálculo da métrica **M1.1**.

#### Resultado esperado

O avaliador deve obter um relatório HTML contendo os alertas identificados durante a navegação e varredura da aplicação, com destaque para os alertas de risco Médio e Alto que alimentam diretamente a métrica **M1.1**.

### 1.3. Procedimento SAST com SonarCloud

O método estático deve consumir a API do SonarCloud por meio do script **`extrator_sonar.py`**, gerando um arquivo JSON com os dados necessários para as métricas de Segurança e Manutenibilidade.

#### Passo a passo

1. Garantir que o repositório avaliado possua análise configurada e acessível no SonarCloud.
2. Disponibilizar localmente as variáveis de ambiente exigidas pelo script:

```text
SONAR_TOKEN
PROJECT_KEY
SONAR_BASE_URL
SONAR_ORG
```

3. Preparar um ambiente Python 3.10+ com as bibliotecas `requests` e `python-dotenv` instaladas.
4. Executar o script `extrator_sonar.py` em ambiente local ou controlado. O uso de Poetry é opcional e pode ser adotado apenas como camada de isolamento de dependências, sem alterar o método de coleta.
5. Fazer o script carregar as variáveis de ambiente e autenticar na API do SonarCloud.
6. Consultar o endpoint:

```text
/api/issues/search
```

7. Coletar os dados de issues necessários para identificar:

- ocorrências de segurança do tipo BLOCKER para **M1.2**;
- ocorrências de complexidade cognitiva acima do limite para **M2.1**;
- valor agregado de dívida técnica para **M2.2**;
- issues de acessibilidade HTML para **M2.3**.

8. Garantir tratamento explícito de falhas de autenticação, projeto inexistente e timeout de rede para evitar coleta incompleta ou inconsistente.
9. Persistir a resposta em arquivo JSON para auditoria, com organização final equivalente ao artefato **`sonar_issues_fase1.json`**.

#### Resultado esperado

O avaliador deve obter um arquivo JSON com as issues abertas do projeto e com o total de dívida técnica necessário para os cálculos das métricas **M1.2**, **M2.1**, **M2.2** e **M2.3**.

---

## 2. Recursos e Ambiente de Avaliação (F3-C2)

### 2.1. Requisitos mínimos de hardware local

| Recurso | Especificação mínima |
| --- | --- |
| **Arquitetura** | CPU 64-bit |
| **Processador** | 2 núcleos ou mais |
| **Memória RAM** | 8 GB |
| **Armazenamento livre** | 10 GB |
| **Rede** | Internet estável para acessar GitHub e SonarCloud |

Esses requisitos são suficientes para subir os serviços locais do projeto, executar o frontend em modo de desenvolvimento, acionar pipelines remotos e manipular os artefatos brutos gerados pela avaliação.

### 2.2. Recursos de software e infraestrutura

| Categoria | Recurso necessário | Finalidade |
| --- | --- | --- |
| **Controle de versão** | Git | Clonagem e inspeção do repositório avaliado |
| **Backend** | Docker + Docker Compose | Subida da API Django e serviços auxiliares |
| **Frontend** | Node.js 20 + npm | Execução do frontend Vue.js em `http://localhost:5173` |
| **Análise estática** | Python 3.10+ | Execução do script `extrator_sonar.py` |
| **Bibliotecas Python** | `requests`, `python-dotenv` | Consumo da API do SonarCloud e carregamento de variáveis de ambiente |
| **Navegação e auditoria** | Navegador web | Acesso ao GitHub Actions, SonarCloud e artefatos publicados |
| **Infraestrutura em nuvem** | GitHub Actions (`ubuntu-latest`) | Execução reproduzível do fluxo DAST |
| **Serviço de análise** | SonarCloud | Fonte dos dados de SAST |

O Poetry pode ser utilizado como camada de conveniência para isolar dependências Python, mas não constitui requisito obrigatório do método. O requisito obrigatório é a disponibilidade de um ambiente Python funcional com as bibliotecas declaradas.

### 2.3. Massa de dados e artefatos necessários

Esta avaliação não depende de uma massa sintética grande ou de uma base de dados de teste dedicada. Para repetir o método, basta que:

- o projeto consiga subir corretamente em ambiente controlado;
- o frontend esteja acessível em `http://localhost:5173`;
- o backend esteja operacional para sustentar a navegação da interface durante o escaneamento;
- o repositório analisado possua análise acessível no SonarCloud;
- os artefatos gerados sejam preservados para auditoria (`zap_report_fase1.html` e JSON equivalente a `sonar_issues_fase1.json`).

### 2.4. Perfil do avaliador

O método foi desenhado para um avaliador com perfil de desenvolvedor em nível intermediário, capaz de:

- utilizar terminal para executar comandos e revisar logs;
- configurar variáveis de ambiente com segurança;
- operar Docker, Docker Compose, Node.js e Python;
- interpretar relatórios JSON e HTML;
- acionar e acompanhar workflows no GitHub Actions;
- navegar no SonarCloud para validar projeto, organização e autenticação.

---

## Histórico de Versões

| Versão | Descrição | Data | Responsável |
| --- | --- | --- | --- |
| `0.1` | Criação do documento de Plano de Avaliação da Fase 3 com método reprodutível, recursos, cronograma real e consistência com as Fases 2 e 4. | /09/2026 | [Tiago Antunes](https://github.com/TiagoAntunesBalieiro) |
| `0.2` | Adição da seção de referências bibliográficas com documentação oficial das ferramentas e bibliotecas utilizadas no método de avaliação. | 09/06/2026 | [Tiago Antunes](https://github.com/TiagoAntunesBalieiro) |
| `0.4` | Reorganização da Fase 3 em múltiplas páginas para melhorar a navegação e separar método, ambiente, cronograma e fechamento metodológico. | 12/06/2026 | [Tiago Antunes](https://github.com/TiagoAntunesBalieiro) |
| `0.5` | Correção EU3: adição da seção de pré-requisitos do avaliador (1.0) para tornar o método auto-suficiente sem exigir conhecimento prévio implícito. | 23/06/2026 | [Júlia Massuda](https://github.com/JuliaReis18) |
