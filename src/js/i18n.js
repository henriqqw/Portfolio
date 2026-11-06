/* ============================================================
   caosdev — i18n (PT / EN)
   Attribute-driven translation: data-i18n swaps innerHTML,
   data-i18n-<attr> swaps a given attribute (aria-label, title,
   alt, content). No build step, no framework — matches the
   rest of the site's vanilla JS approach.
   ============================================================ */

var DICT = {
  'nav.about':        { pt: 'SOBRE',    en: 'ABOUT' },
  'nav.projects':      { pt: 'PROJETOS', en: 'PROJECTS' },
  'nav.security':      { pt: 'SECURITY', en: 'SECURITY' },
  'nav.articles':      { pt: 'ARTIGOS',  en: 'ARTICLES' },
  'nav.stack':         { pt: 'STACK',    en: 'STACK' },
  'nav.journey':       { pt: 'JORNADA',  en: 'JOURNEY' },
  'nav.contact':       { pt: 'CONTATO',  en: 'CONTACT' },
  'nav.toggleAria':    { pt: 'Abrir menu', en: 'Open menu' },
  'nav.langAria':      { pt: 'Idioma', en: 'Language' },
  'float.top':         { pt: 'Voltar ao topo', en: 'Back to top' },
  'common.more':       { pt: '+ ver mais', en: '+ see more' },
  'common.less':       { pt: '− ver menos', en: '− see less' },
  'float.contact':     { pt: 'Ir para contato', en: 'Go to contact' },

  'hero.kicker': { pt: '// SOFTWARE · AUTOMAÇÃO · SECURITY', en: '// SOFTWARE · AUTOMATION · SECURITY' },
  'hero.intro': {
    pt: 'Engenheiro de Software Full Stack especializado no desenvolvimento de aplicações web escaláveis, sistemas de automação ponta a ponta, APIs REST, agentes de IA e infraestrutura Linux.',
    en: 'Full Stack Software Engineer specialized in building scalable web applications, end-to-end automation systems, REST APIs, AI agents, and Linux infrastructure.'
  },
  'hero.ctaProjects': { pt: 'ver projetos', en: 'view projects' },
  'hero.ctaContact':  { pt: 'contato', en: 'get in touch' },
  'hero.terminalAria': { pt: 'Resumo do perfil em um terminal', en: 'Profile summary in a terminal' },

  'win.minimize': { pt: 'Minimizar', en: 'Minimize' },
  'win.maximize': { pt: 'Ampliar', en: 'Maximize' },
  'win.close':    { pt: 'Fechar', en: 'Close' },

  'about.kicker': { pt: '// 01. SOBRE', en: '// 01. ABOUT' },
  'about.title':  { pt: 'Engenharia de software<br>com foco em resultado.', en: 'Software engineering<br>focused on results.' },
  'about.intro': {
    pt: 'Engenheiro de Software Full Stack com experiência no desenvolvimento de soluções completas para e-commerce, logística, analytics e automação de processos. Meu foco é unir backend robusto (Clean Architecture & SOLID), integrações de IA/LLMs e práticas de desenvolvimento seguro.',
    en: 'Full Stack Software Engineer with experience building complete solutions for e-commerce, logistics, analytics, and process automation. My focus is combining a solid backend (Clean Architecture & SOLID), AI/LLM integrations, and secure development practices.'
  },
  'about.muted': {
    pt: 'Experiência na construção de microsserviços, web scraping avançado, infraestrutura self-hosted em Linux/Docker e pipelines de dados first-party.',
    en: 'Experienced in building microservices, advanced web scraping, self-hosted Linux/Docker infrastructure, and first-party data pipelines.'
  },
  'about.statusCurrent': { pt: 'status atual', en: 'current status' },
  'about.groupLangWeb': { pt: 'Linguagens & Web', en: 'Languages & Web' },
  'about.groupDb':      { pt: 'Banco de Dados', en: 'Database' },
  'about.groupInfra':   { pt: 'Infraestrutura & DevOps', en: 'Infrastructure & DevOps' },

  'projects.kicker': { pt: '// 02. PROJETOS', en: '// 02. PROJECTS' },
  'projects.title':  { pt: 'Projetos com um<br><em>problema para resolver.</em>', en: 'Projects with a<br><em>problem to solve.</em>' },
  'projects.description': {
    pt: 'Aplicações, utilitários e experimentos que representam o que tenho estudado e colocado em prática.',
    en: 'Applications, utilities, and experiments that reflect what I have been studying and putting into practice.'
  },
  'projects.filterAria': { pt: 'Filtrar projetos', en: 'Filter projects' },
  'projects.empty': { pt: 'Nenhum projeto encontrado para esse filtro.', en: 'No projects found for this filter.' },

  'filter.all':      { pt: 'todos', en: 'all' },
  'filter.product':  { pt: 'produto', en: 'product' },
  'filter.security': { pt: 'security', en: 'security' },
  'filter.tool':     { pt: 'ferramenta', en: 'tool' },
  'filter.data':     { pt: 'data', en: 'data' },
  'filter.web':      { pt: 'web', en: 'web' },

  'proj.linkSite': { pt: 'site ↗', en: 'website ↗' },

  'proj.proxy0x.alt':      { pt: 'Logo do Proxy0x com o mascote encapuzado', en: 'Proxy0x logo with its hooded mascot' },
  'proj.proxy0x.category': { pt: '01 / FERRAMENTA', en: '01 / TOOL' },
  'proj.proxy0x.desc': {
    pt: 'Gerenciador de proxies HTTP/SOCKS5 para Windows, com rotação de IP por sessão, speed test, geolocalização em tempo real e servidor MCP para agentes de IA.',
    en: 'HTTP/SOCKS5 proxy manager for Windows, with per-session IP rotation, speed tests, real-time geolocation, and an MCP server for AI agents.'
  },

  'proj.animecaos.alt':      { pt: 'Tela inicial do AnimeCaos v3', en: 'AnimeCaos v3 home screen' },
  'proj.animecaos.category': { pt: '02 / PRODUTO', en: '02 / PRODUCT' },
  'proj.animecaos.desc': {
    pt: 'Aplicativo desktop open source para animes e mangás, com backend em Go/Wails e interface React + TypeScript.',
    en: 'Open-source desktop app for anime and manga, with a Go/Wails backend and a React + TypeScript interface.'
  },

  'proj.khaos.alt': { pt: 'Capa do KhaosMCP com o mascote sobre um terminal', en: 'KhaosMCP cover with its mascot over a terminal' },
  'proj.khaos.category': { pt: '03 / SECURITY', en: '03 / SECURITY' },
  'proj.khaos.desc': {
    pt: 'Plataforma local-first de pentest via MCP, com execução supervisionada, evidências revisáveis e relatórios.',
    en: 'Local-first pentesting platform over MCP, with supervised execution, reviewable evidence, and reports.'
  },

  'proj.emporio.alt': { pt: 'Conversa demonstrativa do assistente virtual do Empório da Música', en: 'Demo conversation with Empório da Música’s virtual assistant' },
  'proj.emporio.category': { pt: '04 / PRODUTO', en: '04 / PRODUCT' },
  'proj.emporio.desc': {
    pt: 'Agente de atendimento para loja de instrumentos, com consulta de preços e estoque, acompanhamento de pedidos e suporte via WhatsApp.',
    en: 'Customer-service agent for a musical-instrument store, with price and stock lookup, order tracking, and WhatsApp-ready support.'
  },

  'proj.dashboard.category': { pt: '05 / DATA', en: '05 / DATA' },
  'proj.dashboard.desc': {
    pt: 'Dashboard first-party para rastrear visitas, cliques e instalações sem depender de terceiros.',
    en: 'First-party dashboard for tracking visits, clicks, and installs without relying on third parties.'
  },

  'proj.ego.alt':      { pt: 'Site Ego Criativo', en: 'Ego Criativo website' },
  'proj.ego.category': { pt: '06 / WEB', en: '06 / WEB' },
  'proj.ego.desc': {
    pt: 'Landing page institucional da Ego Criativo, agencia de publicidade, tecnologia e eventos. Site estatico em Astro + Tailwind v4, com deploy continuo na Vercel.',
    en: 'Institutional landing page for Ego Criativo, an advertising, technology, and events agency. Static site built with Astro + Tailwind v4, with continuous deployment on Vercel.'
  },

  'proj.axion.alt':      { pt: 'Tela do Axion', en: 'Axion screenshot' },
  'proj.axion.category': { pt: '08 / PRODUTO', en: '08 / PRODUCT' },
  'proj.axion.desc': {
    pt: 'Base de conhecimento local-first: edicao rica, canvas e dados persistidos como Markdown no disco.',
    en: 'Local-first knowledge base: rich editing, canvas, and data persisted as Markdown on disk.'
  },

  'proj.xmlrpc.alt':      { pt: 'Projeto XMLRPC Bruteforce', en: 'XMLRPC Bruteforce project' },
  'proj.xmlrpc.category': { pt: '07 / SECURITY', en: '07 / SECURITY' },
  'proj.xmlrpc.desc': {
    pt: 'Ferramenta de estudo para testes autorizados no endpoint XML-RPC de instalações WordPress.',
    en: 'Study tool for authorized testing against the XML-RPC endpoint of WordPress installations.'
  },

  'proj.winopt.alt':      { pt: 'Projeto WinOPT Core', en: 'WinOPT Core project' },
  'proj.winopt.category': { pt: '09 / FERRAMENTA', en: '09 / TOOL' },
  'proj.winopt.desc': {
    pt: 'Utilitário para ajustes de privacidade e desempenho em ambientes Windows corporativos.',
    en: 'Utility for privacy and performance tweaks in corporate Windows environments.'
  },

  'proj.auditflow.alt':      { pt: 'Tela do AuditFlow', en: 'AuditFlow screenshot' },
  'proj.auditflow.category': { pt: '10 / FERRAMENTA', en: '10 / TOOL' },
  'proj.auditflow.desc': {
    pt: 'Audita um site inteiro com um comando e devolve um relatório só: performance, SEO, acessibilidade, responsividade, crawling e stress test consolidados em seis blocos com nota e evidência.',
    en: 'Audits an entire website with one command and returns a single report: performance, SEO, accessibility, responsiveness, crawling, and stress testing consolidated into six scored blocks with evidence.'
  },

  'proj.caoshub.alt':      { pt: 'Tela do CaosHub', en: 'CaosHub screenshot' },
  'proj.caoshub.category': { pt: '11 / FERRAMENTA', en: '11 / TOOL' },
  'proj.caoshub.desc': {
    pt: 'Hub de ferramentas que executa processamento no navegador, sem uploads ou dependência de servidor.',
    en: 'Tool hub that runs processing entirely in the browser, with no uploads or server dependency.'
  },

  'lab.kicker': { pt: '// 03. SECURITY LAB & CERTIFICAÇÕES', en: '// 03. SECURITY LAB & CERTIFICATIONS' },
  'lab.title':  { pt: 'Segurança é parte<br>da construção.', en: 'Security is part<br>of the build.' },
  'lab.description': {
    pt: 'Pratico desenvolvimento seguro, hardening de servidores e análise ofensiva. Certificações verificáveis em Pentesting, Cibersegurança e Python para OffSec.',
    en: 'I practice secure development, server hardening, and offensive analysis. Verifiable certifications in Pentesting, Cybersecurity, and Python for OffSec.'
  },
  'lab.certLink': { pt: 'verificar ↗', en: 'verify ↗' },

  'articles.kicker': { pt: '// 04. ARTIGOS', en: '// 04. ARTICLES' },
  'articles.title':  { pt: 'O que estou<br><em>escrevendo.</em>', en: "What I'm<br><em>writing about.</em>" },
  'articles.description': {
    pt: 'Writeups técnicos sobre o que construo e estudo, publicados no Medium.',
    en: 'Technical writeups about what I build and study, published on Medium.'
  },
  'articles.read': { pt: 'ler no medium ↗', en: 'read on medium ↗' },

  'art.proxymanager.alt':  { pt: 'Capa do artigo com o logo do Proxy0x', en: 'Article cover with the Proxy0x logo' },
  'art.proxymanager.date': { pt: '06 NOV 2026', en: 'NOV 06, 2026' },
  'art.proxymanager.read': { pt: '5 min de leitura', en: '5 min read' },
  'art.proxymanager.desc': {
    pt: 'O que construir o Proxy0x ensinou sobre HTTP, CONNECT e SOCKS5: conexões keep-alive que ninguém rastreava, um guard de SSRF e um servidor MCP pensado para um cliente que não é humano.',
    en: 'What building Proxy0x taught me about HTTP, CONNECT, and SOCKS5: untracked keep-alive connections, an SSRF guard, and an MCP server designed for a client that isn\'t human.'
  },

  'art.animescraper.alt':  { pt: 'Capa do artigo com a tela inicial do AnimeCaos', en: 'Article cover showing the AnimeCaos home screen' },
  'art.animescraper.date': { pt: '03 NOV 2026', en: 'NOV 03, 2026' },
  'art.animescraper.read': { pt: '8 min de leitura', en: '8 min read' },
  'art.animescraper.desc': {
    pt: 'Por que a versão em Python do AnimeCaos tinha que morrer e como a reescrita em Go virou um único executável, com scrapers validados, auto-update e lógica compartilhada com Android.',
    en: 'Why the Python version of AnimeCaos had to die, and how the Go rewrite became a single executable with validated scrapers, auto-update, and logic shared with Android.'
  },

  'art.bugbounty.alt':  { pt: 'Capa do artigo com o mascote do KhaosMCP', en: 'Article cover featuring the KhaosMCP mascot' },
  'art.bugbounty.date': { pt: '03 NOV 2026', en: 'NOV 03, 2026' },
  'art.bugbounty.read': { pt: '4 min de leitura', en: '4 min read' },
  'art.bugbounty.desc': {
    pt: 'Por que agentes de IA ingênuos falham em segurança e como o KhaosMCP resolve isso com operador externo, evidence gate e controle de escopo.',
    en: 'Why naive AI agents fail at security work, and how KhaosMCP fixes it with an external operator model, an evidence gate, and scope control.'
  },

  'stack.kicker': { pt: '// 05. STACK', en: '// 05. STACK' },
  'stack.title':  { pt: 'Tecnologias para<br><em>soluções de impacto.</em>', en: 'Technologies for<br><em>impactful solutions.</em>' },
  'stack.groupLang': { pt: 'linguagens', en: 'languages' },
  'stack.llmRag':    { pt: 'Agentes LLM & RAG', en: 'LLM Agents & RAG' },

  'journey.kicker': { pt: '// 06. JORNADA', en: '// 06. JOURNEY' },
  'journey.title':  { pt: 'Experiência e<br>evolução contínua.', en: 'Experience and<br>continuous growth.' },
  'journey.job1.title': { pt: 'Engenheiro de Software — Coutinho Companhia', en: 'Software Engineer — Coutinho Companhia' },
  'journey.job1.desc': {
    pt: 'Desenvolvimento de aplicações web, sistemas de automação escaláveis, integrações com marketplaces (Mercado Livre, Amazon), agentes de IA e gestão de infraestrutura Linux/Docker em produção.',
    en: 'Development of web applications, scalable automation systems, marketplace integrations (Mercado Livre, Amazon), AI agents, and production Linux/Docker infrastructure management.'
  },
  'journey.job2.title': { pt: 'Certificacoes & OffSec', en: 'Certifications & OffSec' },
  'journey.job2.desc': {
    pt: 'Especialização em desenvolvimento seguro, Pentest e Cibersegurança com certificações Solyd, Desec, IBM e Red Team Leaders.',
    en: 'Specialization in secure development, Pentesting, and Cybersecurity with certifications from Solyd, Desec, IBM, and Red Team Leaders.'
  },
  'journey.job3.title': { pt: 'Projetos Open Source', en: 'Open Source Projects' },
  'journey.job3.desc': {
    pt: 'Criação de ferramentas como Analytics First-Party, AnimeCaos-dlp e XMLRPC-Bruteforce com foco em alta performance e utilidade real.',
    en: 'Built tools like Analytics First-Party, AnimeCaos-dlp, and XMLRPC-Bruteforce, focused on high performance and real-world usefulness.'
  },

  'contact.kicker': { pt: '// 07. CONTATO', en: '// 07. CONTACT' },
  'contact.title':  { pt: 'Vamos conversar<br>entre em <em>contato.</em>', en: "Let's talk<br>about <em>good ideas.</em>" },
  'contact.description': {
    pt: 'Disponível para oportunidades, colaborações e projetos interessantes.',
    en: 'Available for opportunities, collaborations, and interesting projects.'
  },
  'contact.linkedinCta': { pt: 'conectar no LinkedIn', en: 'connect on LinkedIn' },

  'meta.description': {
    pt: 'Portfolio de Henrique Lanzoni — software, automação e pesquisa de segurança.',
    en: "Henrique Lanzoni's portfolio — software, automation, and security research."
  }
};

(function () {
  'use strict';

  var ATTRS = ['aria-label', 'title', 'alt', 'content'];
  var STORAGE_KEY = 'lang';

  function getInitialLang() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'pt' || saved === 'en') return saved;
    return (navigator.language || '').toLowerCase().indexOf('en') === 0 ? 'en' : 'pt';
  }

  function applyLanguage(lang) {
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var entry = DICT[el.getAttribute('data-i18n')];
      if (entry && entry[lang] != null) el.innerHTML = entry[lang];
    });

    ATTRS.forEach(function (attr) {
      document.querySelectorAll('[data-i18n-' + attr + ']').forEach(function (el) {
        var entry = DICT[el.getAttribute('data-i18n-' + attr)];
        if (entry && entry[lang] != null) el.setAttribute(attr, entry[lang]);
      });
    });

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      var active = btn.dataset.lang === lang;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });

    localStorage.setItem(STORAGE_KEY, lang);
  }

  var currentLang = getInitialLang();
  applyLanguage(currentLang);

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var lang = btn.dataset.lang;
      if (lang === currentLang) return;
      currentLang = lang;
      applyLanguage(lang);
    });
  });

})();
