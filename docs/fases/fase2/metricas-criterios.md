# Fase 2: Métricas e Critérios

## Visão Geral

Este seção detalha as métricas quantitativas que operacionalizam as questões GQM definidas para o projeto AcheiUnB. O objetivo é estabelecer uma base metodológica para a coleta de dados (Fase 3) e análise (Fase 4), garantindo que os dados extraídos das ferramentas sejam traduzidos em indicadores claros de Qualidade (Segurança e Manutenibilidade).

---

## 1. Adaptação Terminológica ao Contexto do AcheiUnB (C12)

Para garantir que a avaliação seja precisa e compreensível para os *stakeholders* e futuros mantenedores (estudantes de Arquitetura de Software), os jargões genéricos de engenharia de software foram mapeados para os elementos arquiteturais específicos do AcheiUnB:

| Termo Genérico | Aplicação no Contexto do AcheiUnB |
| --- | --- |
| **Módulos / Componentes** | Refere-se especificamente aos arquivos Vue.js (`.vue`) na camada de *frontend* (ex: formulários e views da interface) e aos arquivos Python (`.py`) estruturais do framework Django (ex: *views*, *models*, *serializers*). |
| **Alertas DAST / Infraestrutura** | Diz respeito à configuração do servidor em ambiente de produção (Nginx/Docker), englobando a ausência de cabeçalhos de proteção (como CSP) e políticas permissivas de CORS na API. |
| **Exposição de Segredos** | Refere-se ao vazamento de dados sensíveis de configuração versionados indevidamente no repositório GitHub, tais como a `Django Secret Key`, senhas de banco de dados e certificados SSL locais. |
| **Dívida Técnica / Manutenibilidade** | Representa o esforço (em minutos) necessário para adequar o código atual aos padrões limpos, mitigando a dificuldade imposta à alta rotatividade da equipe acadêmica que assumirá o sistema a cada novo semestre. |
| **Acessibilidade** | Refere-se à conformidade estrutural do HTML renderizado pelo Vue.js com as necessidades de leitores de tela e navegação por teclado, essencial para a usabilidade por toda a comunidade acadêmica (estudantes, técnicos e professores). |
| **Complexidade Cognitiva Aplicada:** | Avalia especificamente o impacto das cadeias de decisão lógicas ramificadas nos fluxos de registro e busca de itens perdidos dentro dos campi da UnB. Funções que tratam múltiplos filtros simultâneos (como categoria do objeto, prédio da perda, data e status do *match*) tendem a inflar esse índice, exigindo atenção detalhada para que o fluxo de manutenção não seja interrompido pela saída de membros do projeto. |
| **Acessibilidade na Comunidade Universitária:** | O alinhamento com as diretrizes de acessibilidade foca na garantia de que a aplicação seja democrática e utilizável por qualquer estudante ou servidor da universidade, incluindo pessoas com deficiências visuais que necessitam de interações limpas nos formulários de cadastro de pertences achados (`Form-Found.vue`) e perdidos (`Form-Lost.vue`). |
| **Endpoints no Escaneamento Dinâmico:** | Refere-se especificamente às rotas de navegação da interface construída em Vue.js e aos pontos de consumo da API em Django (como as rotas de autenticação, chat em tempo real e relatórios de administração) mapeados durante a varredura ativa local. |

## 2. Definição das Métricas (C4)

Abaixo estão detalhadas as 5 métricas que compõem a avaliação quantitativa, estruturadas com suas respectivas fórmulas, ferramentas de coleta e justificativas de validade em relação aos objetivos de medição.

### M1.1: Densidade de alertas DAST de risco Médio/Alto

* **O que mede:** A quantidade de vulnerabilidades ativas que podem ser exploradas externamente via requisições HTTP na aplicação em execução.
* **Fórmula:** 

$$
\text{M1.1} = \frac{\text{Alertas de Risco Médio} + \text{Alertas de Risco Alto}}{\text{Total de Endpoints Escaneados}}
$$

* **Fonte de Dados:** Relatório dinâmico do OWASP ZAP (`zap_report_fase1.html`).
* **Justificativa de Validade:** Avalia diretamente a postura de resiliência externa do sistema (Q1.1), focando nos riscos de maior severidade (como injeção e falhas de cabeçalhos HTTP) que expõem os usuários finais a ataques.

### M1.2: Taxa de exposição de segredos (BLOCKERs/KLOC)

* **O que mede:** A incidência de credenciais, chaves e senhas deixadas fixadas (*hardcoded*) no código-fonte do repositório em relação ao tamanho do projeto.
* **Ferramenta (Fonte de Dados):** SonarCloud (Filtro: *Security Issues* de severidade *BLOCKER*).
* **Fórmula:** 

$$
\text{M1.2} = \frac{\text{Quantidade de Issues ‘BLOCKER’ de Segurança}}{\text{Total de Linhas de Código} / 1000}
$$

* **Fonte de Dados:** Análise estática do SonarQube (`sonar_issues_fase1.json`), filtrando por severidade *Blocker* e tipo *Vulnerability*.
* **Justificativa de Validade:** Responde à Q1.2 ao quantificar falhas críticas de práticas de codificação segura. É uma métrica vital, pois a exposição de chaves do Django compromete toda a criptografia de sessões e a proteção LGPD do AcheiUnB.

### M2.1: Proporção de Módulos com Complexidade Cognitiva > 15

*  **O que mede:** Identificar o acúmulo de complexidade lógica em funções e componentes que prejudicam a manutenibilidade do ecossistema.
* **Fórmula:**

$$
\text{M2.1} = \text{Somatório de funções com Complexidade Cognitiva} > 15
$$

* **Fonte de Dados:** Análise estática do SonarQube (`sonar_issues_fase1.json`), localizadas em arquivos do frontend (`web/src/views/`, `web/src/components/`) e backend (`API/reports/views.py`).
* **Justificativa de Validade:** O teto de 15 pontos de complexidade cognitiva é o padrão recomendado para garantir que um desenvolvedor consiga compreender o fluxo de execução de um método sem sobrecarga mental, fator crítico para a legibilidade do código.

### M2.2: Densidade de Dívida Técnica (min/LOC)

* **O que mede:** O tempo estimado padronizado que a equipe precisará investir para corrigir todos os *code smells* e falhas de manutenibilidade do código atual.
* **Fórmula:** 

$$
\text{M2.2} = \frac{\text{Tempo Total Estimado para Correção (em minutos)}}{\text{Total de Linhas de Código (LOC)}}
$$

* **Fonte de Dados:** Indicador de esforço total (*effortTotal* / *debtTotal*) do SonarQube, que contabilizou um valor inicial de 2270 minutos.
* **Justificativa de Validade:** Padroniza a dívida técnica independente do tamanho do projeto, permitindo responder à Q2.1 com um indicador claro sobre o esforço real exigido para a evolução sustentável do sistema.

### M2.3: Proporção de componentes com falhas de acessibilidade

* **O que mede:** A porcentagem de componentes *frontend* que violam regras fundamentais de semântica web (ex: `Web:S6853` no SonarQube).
* **Fórmula:** 

$$
\text{M2.3} = \frac{\text{Issues ‘MAJOR’ de Acessibilidade HTML}}{\text{Total de Arquivos.vue Analisados}}
$$

* **Fonte de Dados:** Regras de acessibilidade do SonarQube aplicadas sobre o código do frontend (como nos arquivos `UserProfile.vue` e `Header-Message.vue`).
* **Justificativa de Validade:** Quantifica o impacto estrutural da interface na experiência de usuários que dependem de tecnologias assistivas (Q2.2), traduzindo um requisito de UX em uma falha rastreável de código.

---

## 3. Níveis de Pontuação e Critérios de Julgamento (C5)

Para que os números coletados façam sentido, foram definidos limites (*thresholds*) baseados nas melhores práticas da indústria para projetos acadêmicos e open-source.

### 3.1. Tabela de Níveis de Pontuação

|**Métrica**|**Excelente**|**Bom**|**Satisfatório**|**Insuficiente**|
|---|---|---|---|---|
|**M1.1** (Alertas/Endpoints)|$0,00$|$0,01 \text{ a } 0,05$|$0,06 \text{ a } 0,15$|$> 0,15$|
|**M1.2** (Blockers/KLOC)|$0,00$|Não Aplicável|Não Aplicável|$> 0,00$|
|**M2.1** (Módulos Complexos)|$0$|$1 \text{ a } 2$|$3 \text{ a } 5$|$> 5$|
|**M2.2** (Minutos/LOC)|$\le 0,10$|$0,11 \text{ a } 0,25$|$0,26 \text{ a } 0,50$|$> 0,50$|
|**M2.3** (Issues/Arquivos Vue)|$0,00$|$0,01 \text{ a } 0,10$|$0,11 \text{ a } 0,25$|$> 0,25$|

### 3.2. Critérios de Julgamento GQM

Os resultados obtidos na tabela acima serão agregados para responder às Questões (Q) e, consequentemente, avaliar se os Objetivos (G) foram atingidos:

* **Julgamento da Q1.1:** O sistema será considerado resiliente contra ataques externos apenas se a métrica **M1.1** atingir o nível *Excelente* ou *Bom*. Um nível *Insuficiente* confirma a Hipótese H1.1 e indica urgência na refatoração da infraestrutura.
* **Julgamento da Q1.2:** A segurança do repositório é aferida exclusivamente por **M1.2**. Qualquer resultado diferente de *Excelente* (tolerância zero para exposição de segredos) reprova este aspecto do sistema e aciona refatoração imediata.
* **Julgamento da Q2.1:** A arquitetura interna facilitará a modificação se a média ponderada entre **M2.1** e **M2.2** resultar no mínimo em *Bom*. Caso ambas estejam no nível *Satisfatório* ou *Insuficiente*, confirma-se a Hipótese H2.1 de que o código atual é insustentável para futuras equipes.
* **Julgamento da Q2.2:** A aderência às diretrizes de acessibilidade web será considerada adequada caso a **M2.3** atinja o nível *Excelente* ou *Bom*. Valores superiores indicam falha arquitetural no desenvolvimento do *frontend* em Vue.js.

---

## Histórico de Versões

| Versão | Descrição | Data | Responsável |
| --- | --- | --- | --- |
| `0,1` | Criação da versão inicial do documento de métricas e critérios de medição com adaptação terminológica ao contexto achei UnB, definições de métricas e níveis de pontuação e critérios de julgamento.| 07/06/2026 | [Luiz](https://github.com/luizfaria1989) |