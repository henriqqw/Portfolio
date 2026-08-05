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
  'nav.stack':         { pt: 'STACK',    en: 'STACK' },
  'nav.journey':       { pt: 'JORNADA',  en: 'JOURNEY' },
  'nav.contact':       { pt: 'CONTATO',  en: 'CONTACT' },
  'nav.toggleAria':    { pt: 'Abrir menu', en: 'Open menu' },
  'nav.langAria':      { pt: 'Idioma', en: 'Language' },

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

  'proj.animecaos.alt':      { pt: 'Tela do AnimeCaos', en: 'AnimeCaos screenshot' },
  'proj.animecaos.category': { pt: '01 / PRODUTO', en: '01 / PRODUCT' },
  'proj.animecaos.desc': {
    pt: 'Aplicação desktop que agrega fontes brasileiras, pesquisa conteúdo e consulta metadados do AniList.',
    en: 'Desktop app that aggregates Brazilian sources, searches content, and looks up metadata from AniList.'
  },

  'proj.dashboard.category': { pt: '02 / DATA', en: '02 / DATA' },
  'proj.dashboard.desc': {
    pt: 'Dashboard first-party para rastrear visitas, cliques e instalações sem depender de terceiros.',
    en: 'First-party dashboard for tracking visits, clicks, and installs without relying on third parties.'
  },

  'proj.ego.alt':      { pt: 'Site Ego Criativo', en: 'Ego Criativo website' },
  'proj.ego.category': { pt: '03 / WEB', en: '03 / WEB' },
  'proj.ego.desc': {
    pt: 'Landing page institucional da Ego Criativo, agencia de publicidade, tecnologia e eventos. Site estatico em Astro + Tailwind v4, com deploy continuo na Vercel.',
    en: 'Institutional landing page for Ego Criativo, an advertising, technology, and events agency. Static site built with Astro + Tailwind v4, with continuous deployment on Vercel.'
  },

  'proj.axion.alt':      { pt: 'Tela do Axion', en: 'Axion screenshot' },
  'proj.axion.category': { pt: '04 / PRODUTO', en: '04 / PRODUCT' },
  'proj.axion.desc': {
    pt: 'Base de conhecimento local-first: edicao rica, canvas e dados persistidos como Markdown no disco.',
    en: 'Local-first knowledge base: rich editing, canvas, and data persisted as Markdown on disk.'
  },

  'proj.xmlrpc.alt':      { pt: 'Projeto XMLRPC Bruteforce', en: 'XMLRPC Bruteforce project' },
  'proj.xmlrpc.category': { pt: '05 / SECURITY', en: '05 / SECURITY' },
  'proj.xmlrpc.desc': {
    pt: 'Ferramenta de estudo para testes autorizados no endpoint XML-RPC de instalações WordPress.',
    en: 'Study tool for authorized testing against the XML-RPC endpoint of WordPress installations.'
  },

  'proj.winopt.alt':      { pt: 'Projeto WinOPT Core', en: 'WinOPT Core project' },
  'proj.winopt.category': { pt: '06 / FERRAMENTA', en: '06 / TOOL' },
  'proj.winopt.desc': {
    pt: 'Utilitário para ajustes de privacidade e desempenho em ambientes Windows corporativos.',
    en: 'Utility for privacy and performance tweaks in corporate Windows environments.'
  },

  'proj.auditflow.alt':      { pt: 'Tela do AuditFlow', en: 'AuditFlow screenshot' },
  'proj.auditflow.category': { pt: '07 / FERRAMENTA', en: '07 / TOOL' },
  'proj.auditflow.desc': {
    pt: 'Audita um site inteiro com um comando e devolve um relatório só: performance, SEO, acessibilidade, responsividade, crawling e stress test consolidados em seis blocos com nota e evidência.',
    en: 'Audits an entire website with one command and returns a single report: performance, SEO, accessibility, responsiveness, crawling, and stress testing consolidated into six scored blocks with evidence.'
  },

  'proj.caoshub.alt':      { pt: 'Tela do CaosHub', en: 'CaosHub screenshot' },
  'proj.caoshub.category': { pt: '08 / FERRAMENTA', en: '08 / TOOL' },
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

  'stack.kicker': { pt: '// 04. STACK', en: '// 04. STACK' },
  'stack.title':  { pt: 'Tecnologias para<br><em>soluções de impacto.</em>', en: 'Technologies for<br><em>impactful solutions.</em>' },
  'stack.groupLang': { pt: 'linguagens', en: 'languages' },
  'stack.llmRag':    { pt: 'Agentes LLM & RAG', en: 'LLM Agents & RAG' },

  'journey.kicker': { pt: '// 05. JORNADA', en: '// 05. JOURNEY' },
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

  'contact.kicker': { pt: '// 06. CONTATO', en: '// 06. CONTACT' },
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
