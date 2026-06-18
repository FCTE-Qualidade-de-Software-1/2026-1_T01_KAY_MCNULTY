# Levantamento de Pendências — EU3 (Entrega Final)
> **Grupo:** Kay McNulty | **Software avaliado:** AcheiUnB  
> **Data do levantamento:** 18/06/2026  
> **Integrantes:** Júlia Massuda · Luiz Faria · Tiago Antunes · Samuel · João Pedro Rodrigues · Marjorie

---

## Estado atual do repositório

| Item | Status | Onde está |
|------|--------|-----------|
| Fase 1 — objetivo.md | ✅ Em main | `docs/fases/fase1/objetivo.md` |
| Fase 1 — resultados.md | ✅ Em main | `docs/fases/fase1/resultados.md` |
| Fase 1 — entregas.md (EU1) | ✅ Em main | `docs/fases/fase1/entregas.md` |
| Fase 1 — dados brutos (SAST + DAST) | ⚠️ Branch não mergeada | branch `add-dados-brutos-fase1` |
| Fase 2 — gqm-objetivos.md (G1, G2, Q, H, diagrama) | ⚠️ Branch não mergeada | branch `feat/fase2-gqm-objetivos` |
| Fase 2 — metricas-criterios.md (C4 + C5) | ❌ Não existe | — |
| Fase 3 — plano de avaliação completo | ❌ Não existe | — |
| Fase 4 — execução e dados brutos organizados | ❌ Não existe | — |
| Fase 4 — análise GQM e respostas às questões | ❌ Não existe | — |
| Fase 4 — julgamento e conclusões | ❌ Não existe | — |
| mkdocs.yml — nav das Fases 2, 3 e 4 | ❌ Faltando | `mkdocs.yml` só tem Fase 1 |
| GitPage — rodapé com versão/data e crosslinks | ❌ Faltando | — |
| Tabela de contribuição EU3 (com % por pessoa) | ❌ Faltando | — |
| Declaração de IA atualizada para EU2/EU3 | ❌ Faltando | — |
| Release EU3 no GitHub | ❌ Faltando | — |
| Relatório técnico PDF para Moodle | ❌ Faltando | — |

---

## O que cada pessoa precisa fazer

### Júlia Massuda — Integração + Fase 2 completa (C4, C5) + mkdocs

**1. Merges urgentes (fazer PRIMEIRO)**

Abrir dois PRs e mergear para `main`:

- `add-dados-brutos-fase1` → `main`
- `feat/fase2-gqm-objetivos` → `main`

**2. Criar `docs/fases/fase2/metricas-criterios.md`**

Este arquivo é referenciado no `gqm-objetivos.md` mas não existe. Ele cobre os critérios **C4** e **C5** do rubrico da Fase 2.

Conteúdo obrigatório:
- Tabela com as 5 métricas definidas (M1.1 a M2.3) com: nome, definição operacional, unidade, ferramenta de coleta
- Para cada métrica: escala de pontuação (ex: Excelente / Bom / Satisfatório / Insuficiente com valores numéricos)
- Critério de julgamento: como o valor medido se converte em decisão sobre a qualidade
- Histórico de versões

Métricas já identificadas no `gqm-objetivos.md`:

| ID | Métrica | Questão | Ferramenta |
|----|---------|---------|------------|
| M1.1 | Quantidade de alertas ZAP de risco Médio ou Alto | Q1.1 | OWASP ZAP |
| M1.2 | Quantidade de issues BLOCKER de segurança | Q1.2 | SonarCloud |
| M2.1 | Módulos com Complexidade Cognitiva > 15 | Q2.1 | SonarCloud |
| M2.2 | Dívida Técnica total (minutos) | Q2.1 | SonarCloud |
| M2.3 | Quantidade de issues MAJOR de acessibilidade HTML | Q2.2 | SonarCloud |

**3. Atualizar `mkdocs.yml` — adicionar nav de Fases 2, 3 e 4**

```yaml
nav:
  - Início: index.md
  - Equipe: equipe.md
  - EU1 - Fase 1:
      - Objetivo: fases/fase1/objetivo.md
      - Resultados Esperados: fases/fase1/resultados.md
      - Dados Brutos: fases/fase1/dados-brutos.md
      - Entregas: fases/fase1/entregas.md
  - EU2 - Fase 2:
      - Objetivos GQM: fases/fase2/gqm-objetivos.md
      - Métricas e Critérios: fases/fase2/metricas-criterios.md
  - EU3 - Fase 3:
      - Plano de Avaliação: fases/fase3/plano-avaliacao.md
      - Cronograma: fases/fase3/cronograma.md
  - EU3 - Fase 4:
      - Execução: fases/fase4/execucao.md
      - Análise GQM: fases/fase4/analise-gqm.md
      - Julgamento e Conclusões: fases/fase4/julgamento.md
  - Entregas EU3: fases/fase4/entregas-eu3.md
```

---

### Luiz Faria — Fase 3: Plano de Avaliação (F3-C1 e F3-C2)

**Criar `docs/fases/fase3/plano-avaliacao.md`**

Este arquivo cobre os critérios **F3-C1** (Método e Repetibilidade) e **F3-C2** (Recursos e Ambiente).

Conteúdo obrigatório:

**Seção 1 — Método de Avaliação (F3-C1)**
- Descrever o método para cada métrica: passo a passo de como um avaliador externo consegue reproduzir exatamente a mesma coleta
- Para SonarCloud: configurar projeto, rodar análise, exportar issues por tipo/severidade
- Para OWASP ZAP: configurar spider, iniciar scan ativo, exportar relatório em HTML/JSON
- O nível de detalhe deve ser suficiente para alguém sem conhecimento prévio reproduzir

**Seção 2 — Recursos e Ambiente (F3-C2)**
- Hardware mínimo necessário para rodar o AcheiUnB localmente
- Software: versões das ferramentas (Node, Python, Docker, ZAP, SonarScanner)
- Massa de dados: indicar que é necessário rodar a aplicação localmente com o `docker-compose up`
- Credenciais/tokens: descrever que o SonarCloud exige token de projeto (sem expor o valor)

**Rastreabilidade:** adicionar ao final um link para as métricas na Fase 2 (`../fase2/metricas-criterios.md`)

---

### Tiago Antunes — Fase 3: Cronograma + Fase 4: Execução

**1. Criar `docs/fases/fase3/cronograma.md` (F3-C3)**

- Tabela com atividades, datas e responsáveis para a execução da Fase 4
- Deve ser realista e alinhada com as datas reais que a equipe executou
- Incluir: configuração do ambiente, execução do ZAP, execução do SonarCloud, coleta e organização dos dados, análise, julgamento, preparação do relatório

Exemplo de estrutura:

| Atividade | Data | Responsável |
|-----------|------|-------------|
| Configurar ambiente Docker localmente | DD/MM | Tiago |
| Executar varredura OWASP ZAP | DD/MM | Tiago |
| Exportar relatório ZAP em HTML/JSON | DD/MM | Tiago |
| Executar análise SonarCloud | DD/MM | Luiz |
| Exportar issues SonarCloud por categoria | DD/MM | Luiz |
| Calcular métricas M1.1 a M2.3 | DD/MM | Samuel |
| ... | ... | ... |

**2. Criar `docs/fases/fase4/execucao.md` (F4-C1 e F4-C2)**

- Documentar a execução real de cada ferramenta (evidências de que foram rodadas)
- Descrever o que foi feito passo a passo (seguindo o plano da Fase 3)
- Para cada métrica, indicar onde estão os dados brutos (link direto para o arquivo no repositório)
- Se existirem novos dados brutos (re-execução para EU3), subi-los em `docs/fases/fase4/dados-brutos/`
- Rastreabilidade: tabela cruzando dado bruto × métrica

| Métrica | Dado bruto | Link |
|---------|-----------|------|
| M1.1 | zap_report.html | [link] |
| M1.2 | sonar_issues.json | [link] |
| ... | ... | ... |

> **Atenção:** os dados brutos existentes na branch `add-dados-brutos-fase1` foram a coleta da Fase 1. Para a Fase 4 é preciso verificar se são os mesmos dados que serão analisados ou se é necessária uma nova rodada das ferramentas.

---

### Samuel — Fase 4: Análise GQM e Coerência (F4-C3 e F4-C4)

**Criar `docs/fases/fase4/analise-gqm.md`**

Este arquivo cobre **F4-C3** (Análise e Respostas GQM) e **F4-C4** (Coerência com Propósito da Fase 1).

**Seção 1 — Cálculo das métricas (F4-C3)**

Para cada métrica (M1.1 a M2.3):
- Valor bruto coletado
- Comparação com a escala de pontuação definida na Fase 2 (`metricas-criterios.md`)
- Pontuação resultante

Usar tabelas e gráficos simples (pode ser em Mermaid ou uma imagem).

Exemplo:

| Métrica | Valor coletado | Escala (Fase 2) | Pontuação |
|---------|---------------|-----------------|-----------|
| M1.1 — Alertas ZAP risco Médio/Alto | 3 | 0=Excelente · 1-2=Bom · 3-5=Satisfatório · >5=Insuficiente | Satisfatório |
| M1.2 — Issues BLOCKER Segurança | 11 | ... | ... |
| ... | ... | ... | ... |

**Seção 2 — Respostas às questões do GQM**

Para cada questão (Q1.1, Q1.2, Q2.1, Q2.2): escrever um parágrafo respondendo objetivamente com base nos números, e se a hipótese foi confirmada ou refutada.

**Seção 3 — Coerência com o propósito da Fase 1 (F4-C4)**

- Referenciar o propósito declarado na Fase 1
- Mostrar que os resultados das métricas respondem diretamente ao propósito
- Demonstrar como os resultados subsidiam as decisões dos stakeholders mapeados

---

### João Pedro Rodrigues Gomes da Silva — Fase 4: Julgamento e Conclusões (F4-C5)

**Criar `docs/fases/fase4/julgamento.md`**

**Seção 1 — Julgamento Final**

- Com base nos resultados de `analise-gqm.md`, emitir um julgamento por objetivo:
  - G1 (Segurança): a qualidade é Insuficiente / Satisfatória / Boa / Excelente?
  - G2 (Manutenibilidade): idem
- Julgamento geral integrado

**Seção 2 — Conclusões**

- Confirmar ou refutar as hipóteses H1.1, H1.2, H2.1, H2.2 com os dados reais
- Resumo executivo: o que a avaliação revelou sobre o AcheiUnB?

**Seção 3 — Sugestões de Melhoria (obrigatório para nota "Excelente")**

As ações devem ser concretas e justificadas pelos dados (não genéricas):

| Problema identificado | Ação concreta | Prioridade | Métrica afetada |
|----------------------|---------------|------------|-----------------|
| 11 issues BLOCKER (hardcoded secrets) | Migrar credenciais para variáveis de ambiente com `python-decouple` ou `.env` + `.gitignore` | Alta | M1.2 |
| Ausência de CSP e X-Frame-Options | Configurar middleware Django `SecurityMiddleware` com `SECURE_CONTENT_TYPE_NOSNIFF=True` e adicionar Nginx headers | Alta | M1.1 |
| Complexidade cognitiva > 15 nos Forms Vue | Refatorar `Form-Found.vue` e `Form-Lost.vue` extraindo steps em subcomponentes | Média | M2.1 |
| ... | ... | ... | ... |

**Extra: verificar ODS**

- Revisar se há algum link entre os resultados da avaliação e os ODS 9, 12 e 16 declarados (especialmente segurança e LGPD com o ODS 16)

---

### Marjorie — GitPage, Relatório PDF, Contribuição e Release

**1. Atualizar GitPage (critérios FG-C4 / C10 / F3-C7)**

- Verificar que todos os links do menu funcionam após os merges
- Adicionar rodapé com versão e data de última atualização em cada página (pode ser no `mkdocs.yml` com `extra:`)
- Garantir crosslinks entre fases: ex. a Fase 2 deve linkar de volta para a Fase 1, a Fase 4 deve referenciar as Fases 2 e 3
- Verificar acessibilidade básica: títulos hierárquicos, alt text nas imagens

**2. Aplicar correções da Fase 1 (conforme feedback do PC2)**

- Listar as correções indicadas pelo PC2 e aplicar nos arquivos `objetivo.md` e `resultados.md`
- Registrar cada correção no histórico de versões dos arquivos

**3. Criar `docs/fases/fase4/entregas-eu3.md`**

Tabela de contribuição EU3 com percentuais (total = 100%):

| Membro | Atividades principais | % Esforço |
|--------|-----------------------|-----------|
| Júlia Massuda | Merges, Fase 2 (C4, C5), mkdocs | ~17% |
| Luiz Faria | Fase 3 (plano, método, recursos) | ~17% |
| Tiago Antunes | Fase 3 (cronograma), Fase 4 (execução, dados brutos) | ~17% |
| Samuel | Fase 4 (análise GQM, coerência) | ~17% |
| João Pedro Rodrigues | Fase 4 (julgamento, conclusões, melhorias) | ~17% |
| Marjorie | GitPage, PDF, contribuição, release, PC2 | ~17% |
| **TOTAL** | | **100%** |

**4. Atualizar declaração de uso de IA no `index.md`**

Seguir o nível "Excelente" do critério C9/FGC3: ferramenta + tarefa + como a equipe conferiu/ajustou.

Exemplo: *"Este projeto utilizou Claude Sonnet 4.6 para estruturação dos documentos das Fases 2, 3 e 4 e revisão ortográfica. Toda saída foi verificada pela equipe para garantir aderência ao contexto real dos dados coletados (SonarCloud e OWASP ZAP) e aos critérios da disciplina."*

**5. Criar Release EU3 no GitHub**

- Tag: `EU3` ou `v3.0`
- Release notes: listar fases entregues, link para GitPage, link para relatório no Moodle

**6. Compilar relatório técnico PDF para Moodle**

Estrutura do PDF:
1. Capa (equipe, disciplina, data)
2. Sumário com links
3. Fase 1 — Resultados Esperados (pode referenciar a GitPage)
4. Fase 2 — GQM: Objetivos, Questões, Hipóteses, Métricas, Critérios, Diagrama
5. Fase 3 — Plano de Avaliação (Método, Recursos, Cronograma)
6. Fase 4 — Execução, Análise, Coerência, Julgamento e Conclusões
7. Tabela de Contribuição EU3
8. Referências de rastreabilidade (links para GitPage, repositório, release)

---

## Critérios que precisam ser explicitamente cobertos

### Fase 2 (verificar antes de fechar o PR)

| Critério | O que verificar | Quem cobre |
|----------|----------------|------------|
| C1 — Objetivos GQM | Template completo (G1 e G2 com todos os campos) | ✅ Júlia (já feito) |
| C2 — Questões | Q1.1, Q1.2, Q2.1, Q2.2 claras e alinhadas | ✅ Júlia (já feito) |
| C3 — Hipóteses | H para cada Q | ✅ Júlia (já feito) |
| C4 — Métricas | M definidas com objetividade e validade | ❌ Júlia — `metricas-criterios.md` |
| C5 — Pontuação | Escalas numéricas + critérios de julgamento | ❌ Júlia — `metricas-criterios.md` |
| C6 — Diagrama GQM | Hierarquia completa G→Q→M | ✅ Júlia (já feito, Mermaid) |
| C11 — Rastreabilidade Fase 1 | Explicitada na documentação | ✅ Júlia (já feito) |
| C12 — Terminologia | Sem jargão irrelevante | Todos revisam |

### Fase 3

| Critério | O que verificar | Quem cobre |
|----------|----------------|------------|
| F3-C1 — Método | Instruções repetíveis passo a passo | Luiz |
| F3-C2 — Recursos/Ambiente | Hardware, software, versões, massa de dados | Luiz |
| F3-C3 — Cronograma | Realista, com datas e responsáveis | Tiago |
| F3-C8 — Coerência Fases 2→3 | Método escolhido condiz com as métricas da Fase 2 | Luiz + Júlia revisam |

### Fase 4

| Critério | O que verificar | Quem cobre |
|----------|----------------|------------|
| F4-C1 — Execução | Seguiu o método da Fase 3 | Tiago |
| F4-C2 — Dados brutos | Arquivos disponíveis, organizados, rastreáveis | Tiago |
| F4-C3 — Análise GQM | Métricas calculadas, Q e G respondidos | Samuel |
| F4-C4 — Coerência Fase 1 | Resultados vinculados ao propósito | Samuel |
| F4-C5 — Julgamento | Explícito, ações concretas e justificadas | João Pedro |

### Avaliação Geral

| Critério | O que verificar | Quem cobre |
|----------|----------------|------------|
| FGC1 — Organização | Sumário, seções, referências cruzadas | Marjorie |
| FGC2 — Português | Sem erros, figuras com legenda e numeração | Todos |
| FGC3 — Uso de IA | Declaração completa (ferramenta+tarefa+como conferiu) | Marjorie |
| FG-C4 — GitPage | Atualizada, rastreável, crosslinks, rodapé | Marjorie |
| FG-C5 — Contribuição | Percentuais somando 100%, detalhados | Marjorie |

---

## Ordem recomendada de execução

```
Semana 1
├── Júlia    → merges + metricas-criterios.md + mkdocs.yml
└── Luiz     → plano-avaliacao.md (método + recursos)

Semana 2
├── Tiago    → cronograma.md + execucao.md (rodar ferramentas, organizar dados)
└── Samuel   → analise-gqm.md (com base nos dados coletados pelo Tiago)

Semana 3
├── João P.  → julgamento.md (com base na análise do Samuel)
└── Marjorie → GitPage final, PDF, release, tabela de contribuição

Revisão final (todos)
└── Revisar PDF, testar links da GitPage, criar release EU3
```

---

## Arquivos a criar / modificar

```
docs/
├── index.md                          ← Marjorie: atualizar declaração de IA
├── fases/
│   ├── fase1/
│   │   ├── dados-brutos.md           ← merge pending (Júlia)
│   │   └── dados-brutos/             ← merge pending (Júlia)
│   ├── fase2/
│   │   ├── gqm-objetivos.md          ← merge pending (Júlia)
│   │   └── metricas-criterios.md     ← CRIAR (Júlia) ❌
│   ├── fase3/
│   │   ├── plano-avaliacao.md        ← CRIAR (Luiz) ❌
│   │   └── cronograma.md             ← CRIAR (Tiago) ❌
│   └── fase4/
│       ├── execucao.md               ← CRIAR (Tiago) ❌
│       ├── analise-gqm.md            ← CRIAR (Samuel) ❌
│       ├── julgamento.md             ← CRIAR (João Pedro) ❌
│       └── entregas-eu3.md           ← CRIAR (Marjorie) ❌
mkdocs.yml                            ← ATUALIZAR (Júlia) ❌
```