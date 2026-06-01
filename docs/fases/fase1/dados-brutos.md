# Fase 1: Dados Brutos e Consolidados

## Visão Geral

Esta seção disponibiliza os **dados brutos e consolidados** coletados durante a Fase 1 da avaliação de qualidade do AcheiUnB. Os arquivos estão versionados neste repositório para garantir **rastreabilidade e auditabilidade** completas por todas as partes interessadas.

---

## Arquivos Disponíveis

### 1. Análise Estática — SonarCloud (SAST)

| Atributo       | Valor                                   |
| -------------- | --------------------------------------- |
| **Ferramenta** | SonarCloud                              |
| **Data**       | 09/05/2026                              |
| **Formato**    | JSON (API SonarCloud)                   |
| **Arquivo**    | `dados-brutos/sonar_issues_fase1.json`  |

**Sumário dos dados coletados:**

| Métrica                        | Valor           |
| ------------------------------ | --------------- |
| Total de issues identificados  | **184**         |
| Dívida técnica total           | **2.270 min (~37,8 h)** |
| Issues BLOCKER (Segurança)     | **11**          |
| Issues CRITICAL                | **8**           |
| Issues MAJOR                   | Maioria restante |

**Arquivo:** [`sonar_issues_fase1.json`](https://github.com/FCTE-Qualidade-de-Software-1/2026-1_T01_KAY-McNULTY/blob/main/docs/fases/fase1/dados-brutos/sonar_issues_fase1.json)

---

### 2. Análise Dinâmica — OWASP ZAP (DAST)

| Atributo       | Valor                                  |
| -------------- | -------------------------------------- |
| **Ferramenta** | OWASP ZAP 2.17.0                       |
| **Alvo**       | `http://localhost:5173`                |
| **Data**       | 09/05/2026                             |
| **Formato**    | HTML (Relatório ZAP)                   |
| **Arquivo**    | `dados-brutos/zap_report_fase1.html`   |

**Sumário dos alertas coletados:**

| Nível de Risco   | Quantidade |
| ---------------- | :--------: |
| Alto             | **0**      |
| Médio            | **3**      |
| Baixo            | **5**      |
| Informacional    | **10**     |
| Falsos Positivos | **0**      |

**Alertas de Risco Médio:**

- CORS Misconfiguration (sistêmico)
- Content Security Policy (CSP) Header Not Set
- Missing Anti-clickjacking Header

**Alertas de Risco Baixo:**

- Cross-Origin-Embedder-Policy Header Missing or Invalid
- Cross-Origin-Opener-Policy Header Missing or Invalid
- Cross-Origin-Resource-Policy Header Missing or Invalid (sistêmico)
- Permissions Policy Header Not Set (5 instâncias)
- X-Content-Type-Options Header Missing (sistêmico)

**Arquivo:** [`zap_report_fase1.html`](https://github.com/FCTE-Qualidade-de-Software-1/2026-1_T01_KAY-McNULTY/blob/main/docs/fases/fase1/dados-brutos/zap_report_fase1.html)

---

## Como Auditar os Dados

Os arquivos brutos estão disponíveis diretamente no repositório em:

```
docs/fases/fase1/dados-brutos/
├── sonar_issues_fase1.json   ← Dados brutos SAST (SonarCloud API)
└── zap_report_fase1.html     ← Relatório DAST (OWASP ZAP)
```

Qualquer parte interessada pode:

1. Clonar o repositório e abrir os arquivos localmente
2. Acessar os arquivos diretamente pelo GitHub
3. Cruzar os dados com os [Resultados Esperados](resultados.md) para verificar a consistência da análise

---

## Histórico de Versões

| Versão | Descrição | Data | Responsável |
| ------ | --------- | ---- | ----------- |
| `0.1` | Coleta e geração dos dados brutos de SAST (SonarCloud) e DAST (OWASP ZAP). | 09/05/2026 | [Samuel Caetano](https://github.com/samuelncaetano) |
| `0.2` | Organização dos arquivos brutos no repositório e disponibilização na GitPages. | 01/06/2026 | [Júlia](https://github.com/juliamassuda) |
