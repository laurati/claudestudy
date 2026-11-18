# ClaudeStudy

Site de estudos responsivo, em português, no estilo "tutorial passo a passo", sobre **Engenharia de Software com IA** em 11 disciplinas.

Cada página traz:

- objetivos da disciplina;
- uma ficha por tópico: objetivo, para que serve, quando usar e quando evitar;
- explicação de cada tópico da grade, com tabelas comparativas e diagramas;
- exemplos de código (Python, TypeScript, YAML, SQL) usando a API do Claude, Claude Code, MCP, ADK, LangChain etc.;
- links para a documentação oficial do Claude (platform.claude.com e code.claude.com), artigos de engenharia da Anthropic, vídeos específicos do YouTube e cursos;
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
  plano-estudos.html       ritmos intensivo, regular e tranquilo
  d01 … d11-*.html         uma página por disciplina
  preparacao-cca-f.html    preparação para a certificação Claude Certified Architect – Foundations
  recursos.html            todos os links (docs, cursos, vídeos, specs)
  glossario.html           glossário com filtro
```

Para adicionar uma página, crie o HTML em `pages/` (copie o cabeçalho de uma existente) e registre-a no array `SITE_PAGES` em `js/site.js`. As seções `<h2 id="...">` aparecem automaticamente no menu lateral.

## Aviso

Os textos explicativos foram escritos para este site. Ferramentas de IA mudam rápido: confira sempre a documentação oficial linkada em cada página.
