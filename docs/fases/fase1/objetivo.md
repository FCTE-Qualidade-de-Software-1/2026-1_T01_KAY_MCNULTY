# Fase 1: Definição dos Requisitos de Avaliação da Qualidade

## Objetivo da Avaliação

### Propósito Geral

A **Fase 1** do projeto de qualidade de software busca definir os requisitos de avaliação de qualidade do **AcheiUnB**, um sistema web de gestão de achados e perdidos da Universidade de Brasília. Através dessa fase, estabelecemos o fundamento metodológico, o escopo técnico e as características de qualidade que guiarão toda a avaliação do software.

### Propósito Específico da Avaliação

**Determinar o nível de qualidade e a resiliência arquitetural do sistema AcheiUnB nas dimensões críticas de *Segurança* e *Manutenibilidade*.**

A avaliação adota uma abordagem **híbrida e complementar**, combinando:

- **Testes Dinâmicos de Segurança de Aplicações (DAST)** via OWASP ZAP na camada de apresentação
- **Testes Estáticos de Segurança de Código (SAST)** via SonarCloud na base de código do repositório

### Uso Pretendido dos Resultados

Os resultados auditáveis gerados pela avaliação serão:

- **Versionados no repositório** git para garantir rastreabilidade completa
- **Consultáveis e auditáveis** por todas as partes interessadas (UnB, desenvolvimento, operação e comunidade acadêmica)
- **Embasadores de decisões técnicas** imediatas para remediação de vulnerabilidades críticas
- **Insumo para o planejamento** de refatorações estruturais e arquiteturais futuras

### Dimensões de Qualidade Avaliadas

Conforme a norma **ISO/IEC 25010 (SQuaRE)**, as duas características de qualidade escolhidas são:

#### 1. **Segurança (Security)** - Prioridade: ALTA

Avalia a capacidade do sistema em proteger dados, prevenir acessos não autorizados e resistir a ataques.

**Aplicação:**
- **SAST (Análise Estática)**: Detecção de vulnerabilidades críticas no código, como credenciais expostas (Hardcoded Secrets) e configurações inseguras
- **DAST (Análise Dinâmica)**: Testes de segurança na camada de rede, incluindo validação de headers de segurança (CSP, CORS, Anti-clickjacking)

**Justificativa:** O AcheiUnB processa dados acadêmicos sensíveis e chats privados de alunos e servidores. Falhas de segurança podem permitir sequestro de contas, extração de chaves privadas de infraestrutura e vazamento de dados pessoais em violação à LGPD.

#### 2. **Manutenibilidade (Maintainability)** - Prioridade: ALTA

Avalia a facilidade com que o sistema pode ser compreendido, modificado e testado.

**Subcaracterísticas:**
- *Analisabilidade*: Facilidade em entender o código e seu fluxo
- *Modificabilidade*: Facilidade em realizar alterações sem introduzir defeitos
- *Testabilidade*: Facilidade em validar o software através de testes

**Justificativa:** A alta complexidade da stack tecnológica (Vue.js 3, Django, WebSockets, Redis, Docker) e a rotatividade de desenvolvedores em ambiente acadêmico exigem que o sistema seja altamente compreensível e estruturado para garantir sua evolução sustentável nos próximos semestres.

### Escopo da Avaliação

- **Objeto de Avaliação**: 
  - Instância do frontend em execução (`http://localhost:5173`)
  - Base de código integral do repositório (arquivos Vue, rotas Python/Django e testes)
  - Banco de dados PostgreSQL e infraestrutura orquestrada via Docker Compose

- **Profundidade**: 
  - **Camada de Superfície e Integração (DAST)**: Validação da blindagem dos endpoints contra injeções de terceiros
  - **Camada Profunda (SAST)**: Varredura rigorosa do código-fonte, detectando falhas sistêmicas

- **Relação com Avaliações Futuras**: O sucesso da Fase 1 dita as prioridades imediatas. A remediação das vulnerabilidades críticas é requisito bloqueante antes que o projeto avance para testes funcionais ou homologação.

### Alinhamento com Objetivos de Desenvolvimento Sustentável (ODS)

A avaliação de qualidade do AcheiUnB contribui diretamente para:

- **ODS 12 - Consumo e Produção Responsáveis**: Ao facilitar a devolução de itens, a ferramenta incentiva a economia circular
- **ODS 16 - Paz, Justiça e Instituições Eficazes**: Através da auditoria proativa de segurança, protege privacidade e dados de localização acadêmica

---

## Histórico de Versões

| Versão | Descrição | Data | Responsável |
| ------ | --------- | ---- | ----------- |
| `0.1` | Criação inicial do Objetivo da Fase 1 com estrutura completa de propósito, características e alinhamento com ODS. | 12/05/2026 | [Júlia](https://github.com/juliamassuda) |
| `0.2` | Validação e consolidação do documento com dados de OWASP ZAP e SonarCloud. | 13/05/2026 | [Júlia](https://github.com/juliamassuda) |
