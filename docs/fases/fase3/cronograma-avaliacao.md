# Fase 3: Cronograma, Consistência e Referências

Esta página reúne o cronograma, a justificativa metodológica que conecta as Fases 2 e 3 e a bibliografia utilizada para sustentar o plano.

## 1. Cronograma (F3-C3)

O cronograma abaixo organiza as atividades em uma sequência coerente entre Fase 2, Fase 3 e Fase 4.

| Atividade | Responsável | Data | Referência |
| --- | --- | --- | --- |
| Formalização dos objetivos GQM e das hipóteses de medição | Júlia Massuda | 05/06/2026 | Documento de objetivos GQM da Fase 2 |
| Consolidação das métricas, fórmulas e critérios de julgamento | Luiz Faria | 07/06/2026 | Documento de métricas e critérios da Fase 2 |
| Redação do método, dos recursos e do cronograma do plano de avaliação | Tiago Antunes | 08/06/2026 | Documento da Fase 3 |
| Revisão da coerência entre métricas, respostas GQM esperadas e estrutura de análise | João Pedro Rodrigues | 08/06/2026 | Preparação da análise da Fase 4 |
| Preparação do ambiente, do fork e dos mecanismos de coleta SAST/DAST | Samuel Caetano | 09/06/2026 | Preparação da execução da Fase 4 |
| Atualização da GitPage, integração da navegação e organização das entregas da EU2 | Marjorie Mitzi | 10/06/2026 | Estrutura de publicação da EU2 |
| Execução planejada da coleta de dados brutos e consolidação das evidências da Fase 4 | Samuel Caetano | 11/06/2026 | Coleta de dados brutos da Fase 4 |

---

## 2. Consistência entre as Fases 2 e 3 (F3-C8)

O método definido nesta fase é diretamente coerente com as métricas, níveis de pontuação e critérios de julgamento da Fase 2. A métrica **M1.1** depende de alertas observáveis em execução, por isso o uso de **OWASP ZAP** como método DAST é o mais adequado para identificar falhas como ausência de cabeçalhos HTTP e problemas de exposição externa. Já as métricas **M1.2**, **M2.1**, **M2.2** e **M2.3** dependem de severidade de issue, regra aplicada, complexidade cognitiva e dívida técnica calculadas sobre a base de código, o que torna o **SonarCloud** a fonte coerente para essas medições.

Além disso, a escolha de **GitHub Actions** para a varredura dinâmica e de um **script parametrizado** para extração da API do SonarCloud reforça a reprodutibilidade, a auditabilidade e a aderência direta às evidências que deverão ser registradas na Fase 4. Em vez de depender de observações manuais ou interpretação subjetiva, o plano privilegia mecanismos automatizados e saídas brutas versionáveis, o que sustenta a rastreabilidade entre a definição conceitual da Fase 2, a execução da Fase 4 e o julgamento final do produto avaliado.

---

## 3. Referências Bibliográficas

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
| `0.1` | Organização do cronograma da Fase 3 em página própria, com sequência lógica entre Fases 2, 3 e 4 e participação de toda a equipe. | 09/06/2026 | [Tiago Antunes](https://github.com/TiagoAntunesBalieiro) |
| `0.2` | Consolidação da consistência metodológica e das referências bibliográficas nesta segunda página da Fase 3. | 09/06/2026 | [Tiago Antunes](https://github.com/TiagoAntunesBalieiro) |
