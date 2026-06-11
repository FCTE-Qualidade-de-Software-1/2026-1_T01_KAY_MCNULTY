# Fase 3: Plano de Avaliação

## Visão Geral

Esta fase formaliza o método de avaliação que conecta as métricas definidas na [Fase 2 — Objetivos de Medição GQM](../fase2/gqm-objetivos.md) e na [Fase 2 — Métricas e Critérios](../fase2/metricas-criterios.md) à execução prática documentada na [Fase 4 — Execução e Coleta de Dados Brutos](../fase4/coleta-dados.md). O objetivo é garantir que a avaliação de Segurança e Manutenibilidade do AcheiUnB possa ser repetida por um avaliador externo, com os mesmos recursos, mesmas etapas e mesmo tipo de evidência bruta.

O plano adota dois métodos complementares:

- **DAST (Dynamic Application Security Testing)** com OWASP ZAP para observar vulnerabilidades expostas durante a execução da aplicação web.
- **SAST (Static Application Security Testing)** com SonarCloud para medir exposição de segredos, complexidade cognitiva, dívida técnica e falhas de acessibilidade diretamente na base de código.

Essa combinação mantém coerência com o propósito da Fase 1, que priorizou Segurança e Manutenibilidade como atributos críticos para um sistema acadêmico que processa dados pessoais e depende de manutenção contínua por equipes com alta rotatividade.

---

## 1. Método de Avaliação e Reprodutibilidade (F3-C1)

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

O método dinâmico deve ser executado de forma automatizada por meio de GitHub Actions, reproduzindo o mesmo fluxo utilizado para coletar as evidências posteriormente registradas na Fase 4.

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
4. Executar o script `extrator_sonar.py` em ambiente local ou controlado. Na evidência registrada pela equipe, o script foi executado com Poetry, mas o uso de Poetry não é obrigatório para repetir o método.
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

## 3. Cronograma de Avaliação (F3-C3)

O cronograma abaixo consolida as datas reais já evidenciadas na documentação e no histórico do projeto, alinhando a Fase 3 com a execução efetiva da Fase 4.

| Atividade | Responsável | Data real | Evidência |
| --- | --- | --- | --- |
| Coleta original SAST no SonarCloud | Samuel Caetano | 09/05/2026 | Dados brutos da Fase 1 |
| Coleta original DAST com OWASP ZAP | Samuel Caetano | 09/05/2026 | Dados brutos da Fase 1 |
| Organização e publicação dos dados brutos no repositório | Júlia Massuda | 01/06/2026 | Histórico da Fase 1 |
| Formalização dos objetivos GQM | Júlia Massuda | 05/06/2026 | Histórico de `gqm-objetivos.md` |
| Consolidação das métricas e critérios de julgamento | Luiz Faria | 07/06/2026 | Histórico de `metricas-criterios.md` |
| Documentação da execução e coleta da Fase 4 | Samuel Caetano | 09/06/2026 | Histórico de `coleta-dados.md` |
| Redação e revisão do Plano de Avaliação da Fase 3 | Tiago Antunes | 11/06/2026 | Histórico de `plano-avaliacao.md` |

---

## 4. Consistência entre as Fases 2 e 3 (F3-C8)

O método definido nesta fase é diretamente coerente com as métricas, níveis de pontuação e critérios de julgamento da Fase 2. A métrica **M1.1** depende de alertas observáveis em execução, por isso o uso de **OWASP ZAP** como método DAST é o mais adequado para identificar falhas como ausência de cabeçalhos HTTP e problemas de exposição externa. Já as métricas **M1.2**, **M2.1**, **M2.2** e **M2.3** dependem de severidade de issue, regra aplicada, complexidade cognitiva e dívida técnica calculadas sobre a base de código, o que torna o **SonarCloud** a fonte coerente para essas medições.

Além disso, a escolha de **GitHub Actions** para a varredura dinâmica e de um **script parametrizado** para extração da API do SonarCloud reforça a reprodutibilidade, a auditabilidade e a aderência direta às evidências registradas na Fase 4. Em vez de depender de observações manuais ou interpretação subjetiva, o plano privilegia mecanismos automatizados e saídas brutas versionáveis, o que sustenta a rastreabilidade entre a definição conceitual da Fase 2, a execução da Fase 4 e o julgamento final do produto avaliado.

---

## Referências Bibliográficas

1. ZAP by Checkmarx. **ZAP Documentation**. Disponível em: <https://www.zaproxy.org/docs/>. Acesso em: 11 jun. 2026.
2. ZAP by Checkmarx. **ZAP - Full Scan**. Disponível em: <https://www.zaproxy.org/docs/docker/full-scan/>. Acesso em: 11 jun. 2026.
3. SonarSource. **Web API | SonarQube Cloud | Sonar Documentation**. Disponível em: <https://docs.sonarsource.com/sonarqube-cloud/appendices/web-api>. Acesso em: 11 jun. 2026.
4. GitHub. **GitHub Actions documentation**. Disponível em: <https://docs.github.com/en/actions>. Acesso em: 11 jun. 2026.
5. Requests Developers. **Quickstart — Requests documentation**. Disponível em: <https://requests.readthedocs.io/en/latest/user/quickstart/>. Acesso em: 11 jun. 2026.
6. Kumar, S.; Bonnefoy-Claudet, B. **python-dotenv**. Disponível em: <https://bbc2.github.io/python-dotenv/>. Acesso em: 11 jun. 2026.

---

## Histórico de Versões

| Versão | Descrição | Data | Responsável |
| --- | --- | --- | --- |
| `0.1` | Criação do documento de Plano de Avaliação da Fase 3 com método reprodutível, recursos, cronograma real e consistência com as Fases 2 e 4. | 11/06/2026 | [Tiago Antunes](https://github.com/TiagoAntunesBalieiro) |
| `0.2` | Adição da seção de referências bibliográficas com documentação oficial das ferramentas e bibliotecas utilizadas no método de avaliação. | 11/06/2026 | [Tiago Antunes](https://github.com/TiagoAntunesBalieiro) |
