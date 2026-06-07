# Fase 4: Análise de Resultados, Respostas GQM e Conclusões

Este documento consolida o processamento dos dados brutos obtidos de forma automatizada (via script integrado à API do SonarCloud) e dinâmica (via OWASP ZAP local), estabelecendo a comparação com os limiares definidos na Fase 2 e emitindo o julgamento técnico sobre a qualidade do software AcheiUnB.

## 1. Processamento e Avaliação das Métricas (F4-C3)

Os dados extraídos foram tabulados e calculados com base nas fórmulas estabelecidas no plano de medição. A comparação com os Níveis de Pontuação gerou o seguinte diagnóstico:

|**Métrica**|**Dados Processados**|**Nível de Pontuação Alcançado**|
|---|---|---|
|**M1.1 (Alertas ZAP Médio/Alto)**|Foram identificados 3 alertas de severidade Média (_CORS Misconfiguration_, ausência de _CSP_ e de _Anti-clickjacking_), distribuídos de forma sistémica e cobrindo os _endpoints_ avaliados. Densidade: $0,27$.|**Insuficiente** ($> 0,15$)|
|**M1.2 (Blockers de Segurança)**|A exportação da API do SonarCloud confirmou a deteção de chaves privadas (`localhost.key`) e credenciais expostas nos ficheiros de teste (`test_views.py` e `test_models.py`). Quantidade: $> 0$.|**Insuficiente** ($> 0$)|
|**M2.1 (Módulos Complexos)**|Identificaram-se 3 módulos ultrapassando o limite (15) de Complexidade Cognitiva: `Form-Found.vue` (27), `Form-Lost.vue` (27) e `Chats.vue` (19).|**Satisfatório** (3 a 5 módulos)|
|**M2.2 (Dívida Técnica Total)**|O atributo de esforço extraído automaticamente (`effortTotal`) indica 2270 minutos (aproximadamente 37,8 horas). Considerando o volume de linhas de código do projeto, a densidade encontra-se na faixa aceitável.|**Bom**|
|**M2.3 (Acessibilidade HTML)**|Constatou-se ausência de _labels_ adequadas (violação da regra `Web:S6853`) em 3 ficheiros críticos de interface: `UserProfile.vue`, `ListItem.vue` e `Header-Message.vue`.|**Insuficiente**|

## 2. Respostas às Questões e Objetivos GQM (F4-C3)

Com base nas métricas avaliadas, as perguntas operacionais formuladas na Fase 2 podem ser respondidas formalmente:

### 2.1. Objetivo G1 (Segurança)

- **Q1.1: O sistema possui uma postura resiliente contra ataques comuns em aplicações web?**

    - **Resposta:** Não. A aplicação carece de defesas fundamentais nos cabeçalhos HTTP, estando suscetível a consultas AJAX não autorizadas e ataques de _Clickjacking_ devido a configurações permissivas de CORS e falta de políticas CSP.

- **Q1.2: Existem falhas nas práticas de codificação segura que exponham o sistema?**

    - **Resposta:** Sim. O repositório contém segredos fixados no código (senhas de utilizadores de teste e chaves SSL), o que é categorizado como risco crítico de segurança, comprometendo a base da aplicação.

- **Conclusão do Objetivo G1:** O Objetivo de prover um ambiente seguro falhou. As métricas de segurança encontram-se em níveis insuficientes.

### 2.2. Objetivo G2 (Manutenibilidade)

- **Q2.1: A arquitetura e a escrita dos módulos facilitam a compreensão e a modificação?**

    - **Resposta:** Parcialmente. Embora a dívida técnica global não seja alarmante (2270 minutos), o _frontend_ possui gargalos severos de legibilidade. Componentes principais de formulário concentram carga cognitiva altíssima (índice 27), prejudicando o entendimento do fluxo de dados por novos membros da equipa.

- **Q2.2: A interface do utilizador está construída seguindo as diretrizes de acessibilidade web?**

    - **Resposta:** Não. Componentes essenciais de navegação e perfil carecem de marcações HTML estruturais, impedindo a navegação correta por tecnologias assistivas.

- **Conclusão do Objetivo G2:** O Objetivo de garantir a manutenibilidade foi parcialmente atingido, possuindo ressalvas graves quanto à acessibilidade e à complexidade lógica das vistas principais.

## 3. Coerência com o Propósito da Avaliação (F4-C4)

O julgamento da qualidade reflete diretamente o Propósito da Avaliação estabelecido na Fase 1.

Primeiramente, a falha na segurança (exposição de senhas e falta de cabeçalhos de proteção) afeta drasticamente a conformidade com a legislação de proteção de dados (LGPD). Como o AcheiUnB lida com dados que identificam estudantes da universidade e os seus pertences, a vulnerabilidade atual coloca em risco a privacidade da comunidade académica.

Em segundo lugar, as falhas de manutenibilidade (alta complexidade cognitiva em formulários) colidem com a realidade do desenvolvimento de software em ambiente universitário. Como a equipa de desenvolvimento é renovada a cada semestre letivo, um código com funções de altíssima complexidade e sem padronização de acessibilidade criará uma barreira de entrada severa para os próximos alunos, elevando o tempo de integração e paralisando a adição de novas funcionalidades.

## 4. Julgamento Final e Plano de Ação Recomendado (F4-C5)

O software AcheiUnB recebe o julgamento final de **Insuficiente no Foco de Segurança** e **Satisfatório com Ressalvas no Foco de Manutenibilidade**.

Para que o projeto atinja o padrão exigido de engenharia de software e esteja apto para adoção em produção, as seguintes ações concretas são recomendadas aos mantenedores do repositório:

1. **Saneamento de Segredos (Urgente):** Remover imediatamente o ficheiro `localhost.key` do controlo de versões e substituir todas as senhas em texto claro localizadas nos ficheiros `test_views.py` e `test_models.py` por injeção de variáveis de ambiente (`.env`) ou bibliotecas de simulação de objetos.

2. **Refatoração de Frontend:** Modularizar o código dos componentes `Form-Found.vue` e `Form-Lost.vue`. As funções que atualmente atingem o grau 27 de complexidade devem ser divididas em blocos menores e de responsabilidade única, visando um limite máximo de 15 pontos de índice cognitivo.

3. **Implementação de Cabeçalhos de Segurança:** Configurar os _middlewares_ do Django (backend) para forçar a entrega dos cabeçalhos HTTP necessários para mitigar os alertas do ZAP: `Content-Security-Policy`, `X-Frame-Options` e restringir rigorosamente a diretiva `Access-Control-Allow-Origin`.

4. **Correção de Acessibilidade:** Rever a estrutura de todos os formulários da aplicação no repositório _fork_ e posterior _upstream_, adicionando os atributos `alt` ausentes e associando corretamente as _tags_ `<label>` aos seus respetivos _inputs_.

---

## Histórico de Versões

| Versão | Descrição | Data | Responsável |
| ------ | --------- | ---- | ----------- |
| `0.1` | Análise dos resultados brutos das métricas (M1.1 a M2.3) servindo de base para o documento. | 05/06/2026 | [Samuel Caetano](https://github.com/samuelncaetano) |
| `0.2` | Criação do documento `analise-resultados.md` na estrutura do MkDocs, redação das respostas formais ao GQM, da conexão com o propósito da Fase 1, do julgamento final e do plano de ação, revisão e aprovação do conteúdo como responsável pelo escopo, correção de encoding e adição da tabela de Histórico de Versões. | 07/06/2026 | [João Pedro Rodrigues Gomes da Silva](https://github.com/JpRodrigues2) |
