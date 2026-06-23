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

A tabela abaixo demonstra a rastreabilidade direta entre cada métrica definida na Fase 2 e o método, ferramenta, critério de julgamento e saída bruta especificados nesta Fase 3:

| Métrica (Fase 2) | Questão GQM | Método (Fase 3) | Ferramenta | Critério de Julgamento (Fase 2) | Saída bruta (Fase 4) |
| --- | --- | --- | --- | --- | --- |
| **M1.1** Densidade de alertas DAST (Médio/Alto) | Q1.1 | DAST via GitHub Actions (`workflow_dispatch`) | OWASP ZAP `action-full-scan@v0.12.0` | Excelente ≤ 0,00 · Bom 0,01–0,05 · Satisfatório 0,06–0,15 · **Insuficiente > 0,15** | `zap_report_fase1.html` |
| **M1.2** BLOCKERs de segurança | Q1.2 | SAST via script `extrator_sonar.py` | SonarCloud API (`/api/issues/search`) | **Qualquer valor > 0 = Insuficiente** (tolerância zero) | `sonar_issues_fase1.json` |
| **M2.1** Módulos com complexidade cognitiva > 15 | Q2.1 | SAST via script `extrator_sonar.py` | SonarCloud API | Excelente = 0 · Bom 1–2 · Satisfatório 3–5 · Insuficiente > 5 | `sonar_issues_fase1.json` |
| **M2.2** Densidade de dívida técnica (min/LOC) | Q2.1 | SAST via script `extrator_sonar.py` (`effortTotal` / `ncloc`) | SonarCloud API | Excelente ≤ 0,10 · **Bom 0,11–0,25** · Satisfatório 0,26–0,50 · Insuficiente > 0,50 | `sonar_issues_fase1.json` |
| **M2.3** Proporção de componentes Vue com falha de acessibilidade | Q2.2 | SAST via script `extrator_sonar.py` (regra `Web:S6853`) | SonarCloud API | Excelente = 0,00 · **Bom 0,01–0,10** · Satisfatório 0,11–0,25 · Insuficiente > 0,25 | `sonar_issues_fase1.json` |

A escolha de **GitHub Actions** para o DAST e de um **script parametrizado** para o SAST foi diretamente motivada pelos critérios de julgamento da Fase 2, que exigem dados auditáveis e reproduzíveis: mecanismos automatizados eliminam variação humana na coleta e geram saídas brutas versionáveis, garantindo que os resultados da Fase 4 possam ser verificados por qualquer avaliador externo.

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
| `0.3` | Correção EU3: substituição da seção F3-C8 por tabela explícita de rastreabilidade Fase 2 → Fase 3, mapeando cada métrica ao seu método, ferramenta, critério de julgamento e saída bruta. | 23/06/2026 | [Júlia Massuda](https://github.com/JuliaReis18) |
