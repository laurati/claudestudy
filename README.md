# ClaudeStudy

Site de estudos responsivo, em português, no estilo "tutorial passo a passo", que cobre todo o conteúdo programático do **MBA em Engenharia de Software com IA** (11 disciplinas).

Cada página traz:

- objetivos da disciplina;
- explicação de cada tópico da grade, com tabelas comparativas e diagramas;
- exemplos de código (Python, TypeScript, YAML, SQL) usando a API do Claude, Claude Code, MCP, ADK, LangChain etc.;
- links para a documentação oficial do Claude (platform.claude.com e code.claude.com), artigos de engenharia da Anthropic, vídeos e cursos;
- quiz interativo e botão "marcar como concluída" (progresso salvo no `localStorage`).

## Como abrir

É HTML/CSS/JS puro, sem build e sem dependências.

```bash
# opção 1: abrir direto
xdg-open index.html        # Linux  (ou: explorer.exe index.html no WSL)

# opção 2: servidor local
python3 -m http.server 8000
# acesse http://localhost:8000
```

A página da Disciplina 04 carrega o Mermaid via CDN para renderizar diagramas; sem internet, o código-fonte dos diagramas continua visível.

## Estrutura

```
index.html                 página inicial (pilares, disciplinas, progresso)
css/style.css              estilos (tema claro/escuro, responsivo)
js/site.js                 menu lateral, navegação, quiz, progresso, copiar código
pages/
  mba.html                 visão geral do MBA (formato, pilares, certificado)
  plano-estudos.html       planos de 6, 8 e 12 meses
  d01 … d11-*.html         uma página por disciplina
  recursos.html            todos os links (docs, cursos, vídeos, specs)
  glossario.html           glossário com filtro
```

Para adicionar uma página, crie o HTML em `pages/` (copie o cabeçalho de uma existente) e registre-a no array `SITE_PAGES` em `js/site.js`. As seções `<h2 id="...">` aparecem automaticamente no menu lateral.

## Aviso

Material de estudo independente baseado na grade publicada do curso. Os textos explicativos foram escritos para este site; a grade do MBA pode mudar com a evolução da IA.
