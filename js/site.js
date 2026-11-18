/* ==========================================================
   ClaudeStudy — navegação, menu lateral, quiz e progresso
   Sem dependências: basta abrir os .html no navegador.
   ========================================================== */

const SITE_PAGES = [
  { file: "index.html", title: "Início", group: "Comece aqui" },
  { file: "pages/plano-estudos.html", title: "Plano de estudos", group: "Comece aqui" },
  { file: "pages/d01-fundamentos-ia-generativa.html", title: "01 · Fundamentos de IA Generativa", group: "Disciplinas", track: true },
  { file: "pages/d02-prompt-engineering.html", title: "02 · Prompt Engineering", group: "Disciplinas", track: true },
  { file: "pages/d03-arquitetura-era-ia.html", title: "03 · Arquitetura na era da IA", group: "Disciplinas", track: true },
  { file: "pages/d04-design-docs.html", title: "04 · Design Docs com IA", group: "Disciplinas", track: true },
  { file: "pages/d05-dev-software-ia.html", title: "05 · Desenvolvimento de Software com IA", group: "Disciplinas", track: true },
  { file: "pages/d06-modo-agente.html", title: "06 · Desenvolvimento em modo Agente", group: "Disciplinas", track: true },
  { file: "pages/d07-aplicacoes-ia.html", title: "07 · Desenvolvimento de aplicações com IA", group: "Disciplinas", track: true },
  { file: "pages/d08-agentes.html", title: "08 · Desenvolvimento de Agentes", group: "Disciplinas", track: true },
  { file: "pages/d09-protocolos.html", title: "09 · Protocolos de comunicação", group: "Disciplinas", track: true },
  { file: "pages/d10-devops-sre.html", title: "10 · DevOps e SRE com IA", group: "Disciplinas", track: true },
  { file: "pages/d11-carreira.html", title: "11 · Marketing Pessoal, Equipe e Empreendedorismo", group: "Disciplinas", track: true },
  { file: "pages/preparacao-cca-f.html", title: "Preparação para a CCA-F", group: "Certificação" },
  { file: "pages/recursos.html", title: "Recursos, cursos e vídeos", group: "Referência" },
  { file: "pages/glossario.html", title: "Glossário", group: "Referência" },
];

const STORE_KEY = "claudestudy:done";

function getDone() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch { return {}; }
}
function setDone(file, value) {
  const d = getDone();
  if (value) d[file] = true; else delete d[file];
  localStorage.setItem(STORE_KEY, JSON.stringify(d));
}

(function init() {
  const root = document.body.dataset.root || ".";
  const url = (f) => (root === "." ? f : `${root}/${f}`);
  const path = location.pathname.replace(/\\/g, "/");
  const here = SITE_PAGES.findIndex((p) =>
    p.file === "index.html"
      ? root === "." && (path.endsWith("/index.html") || path.endsWith("/"))
      : path.endsWith("/" + p.file)
  );
  const current = SITE_PAGES[here];

  // ---- tema ----
  const savedTheme = localStorage.getItem("claudestudy:theme");
  if (savedTheme) document.documentElement.dataset.theme = savedTheme;

  // ---- barra superior ----
  const top = document.createElement("header");
  top.className = "topbar";
  top.innerHTML = `
    <button class="icon-btn menu-toggle" aria-label="Abrir menu">☰</button>
    <a class="logo" href="${url("index.html")}">Claude<span>Study</span></a>
    <nav>
      <a href="${url("index.html")}">Início</a>
      <a href="${url("index.html")}#disciplinas">Disciplinas</a>
      <a href="${url("pages/preparacao-cca-f.html")}">CCA-F</a>
      <a href="${url("pages/recursos.html")}">Recursos</a>
      <a href="${url("pages/glossario.html")}">Glossário</a>
    </nav>
    <div class="spacer"></div>
    <input type="search" placeholder="Buscar no menu…" aria-label="Buscar tópicos">
    <button class="icon-btn theme-toggle" title="Alternar tema claro/escuro">◐</button>`;
  document.body.prepend(top);

  // ---- menu lateral ----
  const side = document.createElement("aside");
  side.className = "sidebar";
  let html = "";
  let group = "";
  const done = getDone();
  SITE_PAGES.forEach((p, i) => {
    if (p.group !== group) { group = p.group; html += `<h3>${group}</h3>`; }
    const mark = p.track && done[p.file] ? `<span class="done" title="Concluída">✓</span>` : "";
    html += `<a href="${url(p.file)}" class="${i === here ? "current" : ""}" data-title="${p.title.toLowerCase()}">${p.title}${mark}</a>`;
    if (i === here) html += `<div class="subnav" id="subnav"></div>`;
  });
  side.innerHTML = html;
  top.after(side);
  const backdrop = document.createElement("div");
  backdrop.className = "sidebar-backdrop";
  side.after(backdrop);

  // subnavegação com as seções (h2) da página atual
  const subnav = document.getElementById("subnav");
  const h2s = [...document.querySelectorAll(".content h2[id]")];
  if (subnav) {
    subnav.innerHTML = h2s.map((h) => `<a href="#${h.id}" data-title="${h.textContent.toLowerCase()}">${h.textContent}</a>`).join("");
  }

  top.querySelector(".menu-toggle").addEventListener("click", () => document.body.classList.toggle("sidebar-open"));
  backdrop.addEventListener("click", () => document.body.classList.remove("sidebar-open"));
  side.addEventListener("click", (e) => { if (e.target.tagName === "A") document.body.classList.remove("sidebar-open"); });

  top.querySelector(".theme-toggle").addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("claudestudy:theme", next);
  });

  // busca: filtra itens do menu lateral
  top.querySelector("input[type=search]").addEventListener("input", (e) => {
    const q = e.target.value.trim().toLowerCase();
    side.querySelectorAll("a").forEach((a) => {
      a.classList.toggle("hidden", q && !a.dataset.title.includes(q));
    });
  });

  // ---- anterior / próximo ----
  const article = document.querySelector(".content");
  if (article && here >= 0) {
    const prev = SITE_PAGES[here - 1];
    const next = SITE_PAGES[here + 1];
    const pager = () => {
      const d = document.createElement("div");
      d.className = "pager";
      d.innerHTML =
        (prev ? `<a class="btn" href="${url(prev.file)}">❮ Anterior</a>` : "") +
        (next ? `<a class="btn" href="${url(next.file)}">Próximo ❯</a>` : "");
      return d;
    };
    article.prepend(pager());
    article.append(pager());
  }

  // ---- marcar como concluída ----
  if (article && current && current.track) {
    const bar = document.createElement("div");
    bar.className = "complete-bar";
    const render = () => {
      const isDone = !!getDone()[current.file];
      bar.innerHTML = `<span>${isDone ? "✅ Você marcou esta disciplina como concluída." : "Terminou de estudar esta disciplina?"}</span>
        <button class="btn ${isDone ? "secondary" : ""}">${isDone ? "Desmarcar" : "Marcar como concluída"}</button>`;
      bar.querySelector("button").onclick = () => { setDone(current.file, !isDone); render(); };
    };
    render();
    article.lastElementChild.before(bar);
  }

  // ---- links externos abrem em nova aba ----
  document.querySelectorAll(".content a[href^='http']").forEach((a) => {
    a.target = "_blank";
    a.rel = "noopener noreferrer";
  });

  // ---- botão copiar + realce simples de comentários ----
  document.querySelectorAll("pre").forEach((pre) => {
    const code = pre.querySelector("code");
    if (code && !pre.classList.contains("plain")) {
      code.innerHTML = code.innerHTML
        .split("\n")
        .map((line) => line.replace(/^(\s*)(#(?!include)|\/\/)(.*)$/, '$1<span class="tok-c">$2$3</span>'))
        .join("\n");
    }
    const b = document.createElement("button");
    b.className = "copy-btn";
    b.textContent = "Copiar";
    b.onclick = () => {
      navigator.clipboard.writeText((code || pre).innerText).then(() => {
        b.textContent = "Copiado!";
        setTimeout(() => (b.textContent = "Copiar"), 1500);
      });
    };
    pre.append(b);
  });

  // ---- quiz ----
  document.querySelectorAll(".quiz").forEach((quiz) => {
    const answer = quiz.dataset.answer;
    quiz.querySelectorAll("button.opt").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (quiz.classList.contains("answered")) return;
        quiz.classList.add("answered");
        quiz.querySelectorAll("button.opt").forEach((b) => {
          if (b.dataset.opt === answer) b.classList.add("right");
        });
        if (btn.dataset.opt !== answer) btn.classList.add("wrong");
      });
    });
  });

  // ---- progresso na home ----
  const prog = document.getElementById("progress");
  if (prog) {
    const tracked = SITE_PAGES.filter((p) => p.track);
    const n = tracked.filter((p) => done[p.file]).length;
    prog.querySelector(".progress > div").style.width = `${(n / tracked.length) * 100}%`;
    prog.querySelector(".progress-text").textContent = `${n} de ${tracked.length} disciplinas concluídas`;
    document.querySelectorAll(".card[data-file]").forEach((c) => {
      if (done[c.dataset.file]) c.insertAdjacentHTML("afterbegin", `<span class="progress-tag">✓ concluída</span>`);
    });
  }

  // ---- destaque da seção atual no submenu ----
  if (subnav && "IntersectionObserver" in window) {
    const links = [...subnav.querySelectorAll("a")];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + en.target.id));
        }
      });
    }, { rootMargin: "-60px 0px -70% 0px" });
    h2s.forEach((h) => obs.observe(h));
  }

  // ---- rodapé e voltar ao topo ----
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `ClaudeStudy — material de estudo sobre Engenharia de Software com IA.
    Conteúdo explicativo próprio, com links para a <a href="https://platform.claude.com/docs/en/get-started" target="_blank" rel="noopener">documentação oficial do Claude</a> e outras fontes públicas.`;
  document.body.append(footer);

  const toTop = document.createElement("button");
  toTop.id = "to-top";
  toTop.className = "btn";
  toTop.title = "Voltar ao topo";
  toTop.textContent = "↑";
  toTop.onclick = () => window.scrollTo({ top: 0 });
  document.body.append(toTop);
  window.addEventListener("scroll", () => { toTop.style.display = window.scrollY > 600 ? "block" : "none"; });
})();
