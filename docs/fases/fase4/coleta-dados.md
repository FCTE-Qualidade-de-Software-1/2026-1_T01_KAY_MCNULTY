# Fase 4: Execução e Coleta de Dados Brutos

Este documento formaliza a execução prática da avaliação de qualidade do software AcheiUnB. O objetivo desta etapa é demonstrar a obtenção das medidas empíricas, documentar o ambiente de execução e fornecer o acesso centralizado aos dados brutos que darão suporte às conclusões do GQM (Goal, Question, Metric).

## 1. Execução das Medições (F4-C1)

A execução das análises seguiu integralmente o método de avaliação passo a passo estipulado no Plano de Avaliação da Fase 3. O integrante da equipe Samuel foi o responsável por conduzir os procedimentos a partir do repositório _fork_ (`samuelncaetano/2024-2-acheiunb`).

### 1.1. Procedimento de Análise Dinâmica (DAST)

A execução da análise dinâmica de segurança foi realizada de forma centralizada e automatizada através da esteira de Integração Contínua (CI/CD) na plataforma GitHub Actions, utilizando infraestrutura baseada em nuvem para garantir o isolamento do ecossistema e a repetibilidade do teste.

- **Ferramenta Utilizada:** OWASP ZAP (ZED Attack Proxy), integrado via especificação oficial `zaproxy/action-full-scan@v0.12.0`.
- **Esteira de Automação:** Workflow denominado `OWASP ZAP Security Audit`, disparado de forma manual através do mecanismo de controle `workflow_dispatch` na aba de Actions do repositório _fork_.
- **Alvo do Escaneamento:** Instância temporária e isolada do front-end parametrizada no runner virtualizado sob o endereço `http://localhost:5173`.
- **Mecanismo de Execução e Orquestração Tecnológica:**
  1.  **Isolamento de Ambiente:** A esteira alocou um runner operando sob o sistema operacional `ubuntu-latest` e efetuou o checkout do código-fonte do projeto AcheiUnB.
  2.  **Aprovisionamento de Configurações:** O ambiente gerou automaticamente o arquivo de credenciais simuladas (`API/.env`) contendo mapeamentos fictícios para serviços como base de dados PostgreSQL, Redis, Celery e Cloudinary, blindando credenciais de produção.
  3.  **Levantamento do Back-end:** A infraestrutura de API em Django foi inicializada em segundo plano a partir do diretório `/API` por meio do comando estruturado `docker compose up -d`.
  4.  **Construção do Front-end:** O runner configurou o ambiente Node. Js na versão estável 20, realizou o download de dependências e disparou o servidor local em Vue. Js por meio da rotina assíncrona `npm run dev &`.
  5.  **Sincronização de Portas:** Foi injetada a ferramenta utilitária global `wait-on`, parametrizada com um teto de tolerância de 120.000 milissegundos, para travar o fluxo até que as portas lógicas HTTP de rede `8000` (API) e `5173` (Vue. Js) estivessem plenamente ativas e respondendo na interface de loopback local.
  6.  **Varredura Ativa:** Com os ecossistemas integrados, a Action executou o escaneamento ativo total (_Full Scan_) apontando para a interface web, utilizando os argumentos de comando `-a` para forçar o rastreamento via _spider_ de todas as rotas de formulário expostas no front-end.
- **Resultado da Execução:** O pipeline foi finalizado com sucesso e exportou os relatórios técnicos gerados diretamente para os artefatos de build integrados da plataforma, sob o rótulo consolidado `ZAP-Security-Report`. O diagnóstico estático comprovou a total ausência de vulnerabilidades de severidade Alta na camada de interface, assinalando três vulnerabilidades estruturais de nível Médio relacionadas à ausência de políticas rígidas de cabeçalhos HTTP (CORS, CSP e anti-clickjacking).
- **Desvios:** Nenhum. O fluxo de ataque e teste dinâmico simulou perfeitamente as interações de rede planejadas nas fases conceituais anteriores.

### 1.2. Procedimento de Análise Estática (SAST)

A extração dos dados relativos à manutenibilidade e segurança estrutural foi realizada de forma totalmente automatizada, consumindo os resultados analíticos previamente consolidados pela plataforma web do SonarCloud na branch principal do repositório fork.

- **Ferramenta Utilizada:** API REST do SonarCloud consumida via script de automação personalizado (`extrator_sonar.py`).
- **Gerenciador de Dependências e Ambiente:** Poetry (Garantindo o isolamento das bibliotecas e reprodutibilidade do ambiente de execução).
- **Alvo do Escaneamento:** Repositório `samuelncaetano/2024-2-acheiunb` (abrangendo o escopo completo de código-fonte do backend em Django e do frontend em Vue.js).
- **Mecanismo de Execução e Orquestração Tecnológica:**
  1.  **Isolamento de Credenciais:** Foi criado um arquivo local de configuração `.env` na raiz do projeto, responsável por armazenar de forma segura as variáveis de ambiente `SONAR_TOKEN`, `PROJECT_KEY`, `SONAR_BASE_URL` e `SONAR_ORG`. Esse mecanismo mitigou o risco de exposição de segredos no histórico de commits do GitHub.
  2.  **Inicialização do Ambiente Isolado:** O integrante Samuel executou o interpretador através do Poetry utilizando o comando estruturado: `poetry run python extrator_sonar.py`.
  3.  **Carregamento Dinâmico:** O script utilizou a biblioteca `dotenv` via método `load_dotenv()` para injetar as chaves de configuração no dicionário de ambiente do sistema operacional, recuperando-as de forma segura por meio de chamadas `os.environ.get()`.
  4.  **Autenticação Segura via API:** A requisição HTTP realizou o consumo do endpoint de busca (`/api/issues/search`) do SonarCloud utilizando autenticação básica tratada pela classe `HTTPBasicAuth(SONAR_TOKEN, "")`, transmitindo o token criptográfico no campo de usuário com a senha vazia.
  5.  **Tratamento de Exceções de Rede:** O script foi parametrizado com um teto de tolerância (_timeout_) de 30 segundos e validou os códigos de estado HTTP da resposta, tratando de forma explícita cenários de falha de autenticação (Erro 401) e projeto não localizado (Erro 404).
- **Resultado da Execução:** O script executou com sucesso, recuperou os dados da API em formato JSON e gerou automaticamente o arquivo bruto `sonar_issues.json` (posteriormente renomeado e movido para o diretório de evidências como `sonar_issues_fase1.json`). A extração automatizada capturou um total exato de 184 issues abertas (filtradas estritamente pelos tipos _Vulnerability_ e _Code Smell_) e extraiu do nó de paginação o indicador global de dívida técnica do projeto em exatos 2270 minutos.
- **Desvios:** Nenhum. O uso de um script parametrizado por variáveis de ambiente e executado sob o ecossistema controlado do Poetry eliminou qualquer possibilidade de falha humana ou inconsistência analítica na coleta manual, cumprindo integralmente a diretriz de reprodutibilidade científica da Fase 3.

## 2. Organização dos Dados Brutos e Rastreabilidade (F4-C2)

Para garantir a transparência da execução e permitir a auditoria das métricas por terceiros, todos os dados brutos obtidos foram armazenados no repositório de documentação (`docs/fases/fase1/dados-brutos/`) e rotulados em relação direta com as métricas quantitativas (M) estabelecidas na Fase 2.

### 2.1. Arquivos de Avaliação Dinâmica

- **Arquivo de Evidência:** `zap_report_fase1.html` / `report_md.md`
- **Métrica Associada:** **M1.1 (Densidade de Alertas DAST)**.
- **Evidência Constatada:** O arquivo registra detalhadamente a presença de vulnerabilidades de risco Médio, consistindo primariamente em _CORS Misconfiguration_ de forma sistêmica na aplicação, ausência de cabeçalho CSP (_Content Security Policy_) e omissão de _Anti-clickjacking Headers_ (`X-Frame-Options`).

### 2.2. Arquivos de Avaliação Estática

- **Arquivo de Evidência:** `sonar_issues_fase1.json`
- **Métricas Associadas:**
  - **M1.2 (Taxa de Exposição de Segredos):** O arquivo comprova a detecção de _issues_ classificados como de severidade `BLOCKER` relativas à segurança cibernética (vazamento de chaves locais, como em `API/certs/localhost.key` e senhas fixadas nos testes do Django).
  - **M2.1 (Índice de Complexidade Cognitiva):** O _log_ detalha a localização exata de violações da regra de limite de complexidade. Destacam-se as ocorrências no `Form-Found.vue` e `Form-Lost.vue` (complexidade igual a 27) e no módulo `Chats.vue` (complexidade igual a 19).
  - **M2.2 (Densidade de Dívida Técnica):** O arquivo capturou na chave primária o atributo global de esforço técnico pendente (`"effortTotal": 2270`), garantindo o insumo exato para o cálculo de manutenção do sistema.
  - **M2.3 (Acessibilidade Web):** As evidências em JSON listam _issues_ de nível `MAJOR` no _frontend_ pela violação da regra _Web: S 6853_, assinalando falhas estruturais em formulários nos componentes `UserProfile.vue`, `ListItem.vue` e `Header-Message.vue`.

## 3. Evidências de Validação em Vídeo (F4-C2)

Conforme exigido pelos critérios formais de avaliação, a extração prática dos dados por meio do manuseio das ferramentas e da execução do script de automação foi devidamente documentada em formato audiovisual.

Os vídeos confirmam a autoria das medições e atestam que as extrações derivam do projeto AcheiUnB original e seu respectivo _fork_ no momento da avaliação.

- **Vídeo da Execução do Script de Extração (SonarCloud API):** https://youtu.be/jpefySo02Ik
- **Vídeo da Execução da Varredura Dinâmica (OWASP ZAP Local):** https://youtu.be/mfagHn5AnNI

## Histórico de Versões

| Versão | Descrição                                                                                                                      |    Data    | Responsável |
| :----: | :----------------------------------------------------------------------------------------------------------------------------- | :--------: | :---------: |
|  0.1   | "Registro e consolidação do processo de coleta de métricas e dados brutos necessários para a análise de resultados da Fase 4." | 09/06/2026 |   Samuel    |
