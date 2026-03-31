// Initialize Lucide icons
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}

// ... (Lucide initialization remains at the top)

const translations = {
    PT: {
        nav: ['início', 'social', 'projetos', 'contato'],
        brand: 'caosdev',
        terminal: {
            loading: 'carregando perfil: ',
            status: 'status: ',
            online: 'online',
            whoami: 'whoami',
            about: 'Desenvolvedor de Software focado em IA, pesquisa de segurança e design de sistemas. A maior parte do meu trabalho envolve a construção de plataformas, ferramentas de segurança e projetos experimentais em torno de sistemas web modernos e superfícies de ataque emergentes.',
            hint: '[ Dica: Digite \'help\' para ver os comandos disponíveis. ]'
        },
        index: {
            viewProjects: 'Ver Projetos',
            getInTouch: 'Entre em Contato',
            explore: 'Explore meus projetos e veja o que eu tenho feito.',
            talk: 'Vamos conversar! Envie uma mensagem para discutirmos como posso ajudar.',
            btnProjects: '[ VER PROJETOS ]',
            btnContact: '[ ENTRAR EM CONTATO ]'
        },
        projects: {
            security: 'Segurança',
            webTools: 'Ferramentas Web',
            landingPages: 'Landing Pages',
            softwares: 'Softwares',
            dataAnalytics: 'Dados & Análises',
            btnWebsite: 'WEBSITE',
            btnGithub: 'GITHUB',
            descriptions: {
                axion: 'Base de conhecimento local-first construída em Next.js 15 e TypeScript. Edição rich-text via Tiptap v3, canvas infinito com TLDRAW e Datagrids estilo Notion a partir de Markdown puro. Zero cloud, zero banco de dados — seus arquivos ficam como .md no disco.',
                animecaos: 'App desktop em Python com PySide6. Usa Selenium para scraping de páginas dinâmicas e BeautifulSoup para parsing de HTML. Agrega múltiplas fontes brasileiras com busca fuzzy via FuzzyWuzzy e integração com a API do AniList para metadados.',
                xmlrpc: 'Script Python para ataques de força bruta no WordPress via XML-RPC. Ferramenta eficiente e multi-thread para testes de segurança.',
                winopt: 'Ferramenta segura de otimização do Windows para ambientes corporativos. Ajustes de privacidade e desempenho via CLI.',
                dashboard: 'Dashboard first-party para medir visitas, cliques e instalações — sem Google Analytics nem Firebase. Stack: Next.js · TypeScript · Recharts · armazenamento NDJSON append-only · API Route Handlers para ingestão e consultas.',
                caoshub: 'Um hub de ferramentas que rodam direto no navegador. Todo o processamento acontece no lado do cliente, sem uploads, sem servidor, sem API. Seus arquivos nunca saem do seu dispositivo.',
                studioschulze: 'Landing page responsiva e moderna para um estúdio de arquitetura. UX minimalista e elegante.'
            }
        },
        contact: {
            title: 'Entre em Contato',
            labelName: 'Nome:',
            labelEmail: 'Email:',
            labelMessage: 'Mensagem:',
            btnSubmit: 'Enviar'
        }
    },
    EN: {
        nav: ['home', 'social', 'projects', 'contact'],
        brand: 'caosdev',
        terminal: {
            loading: 'loading profile: ',
            status: 'status: ',
            online: 'online',
            whoami: 'whoami',
            about: 'Software Developer focused on AI, security research and system design. Most of my work involves building platforms, security tools and experimental projects around modern web systems and emerging attack surfaces.',
            hint: '[ Hint: Type \'help\' to see available commands. ]'
        },
        index: {
            viewProjects: 'View Projects',
            getInTouch: 'Get in Touch',
            explore: 'Explore my projects and see what I have been doing.',
            talk: 'Let\'s talk! Send a message to discuss how I can help.',
            btnProjects: '[ VIEW PROJECTS ]',
            btnContact: '[ GET IN TOUCH ]'
        },
        projects: {
            security: 'Security',
            webTools: 'Web Tools',
            landingPages: 'Landing Pages',
            softwares: 'Softwares',
            dataAnalytics: 'Data & Analytics',
            btnWebsite: 'WEBSITE',
            btnGithub: 'GITHUB',
            descriptions: {
                axion: 'Local-first knowledge base built on Next.js 15 and TypeScript. Rich-text editing via Tiptap v3, infinite canvas with TLDRAW, Notion-style Datagrids from raw Markdown. Zero cloud, zero databases — your files stay as plain .md on disk.',
                animecaos: 'Desktop app built in Python with PySide6. Uses Selenium for dynamic scraping and BeautifulSoup for HTML parsing. Aggregates multiple Brazilian sources with fuzzy search via FuzzyWuzzy and AniList API integration for metadata.',
                xmlrpc: 'Python script for WordPress XML-RPC brute force attacks. Efficient and multi-threaded tool for security testing.',
                winopt: 'Safe Windows optimization tool for corporate environments. Privacy and performance tweaks via CLI.',
                dashboard: 'First-party dashboard to track visits, clicks and installs — no Google Analytics, no Firebase. Stack: Next.js · TypeScript · Recharts · append-only NDJSON storage · API Route Handlers for ingestion and queries.',
                caoshub: 'A hub of browser-only tools. All processing happens client-side, no uploads, no server, no API. Your files never leave your device.',
                studioschulze: 'Modern responsive landing page for an Architecture studio. Minimalist and elegant UX.'
            }
        },
        contact: {
            title: 'Get in Touch',
            labelName: 'Name:',
            labelEmail: 'Email:',
            labelMessage: 'Message:',
            btnSubmit: 'Submit'
        }
    }
};

// Language logic
const urlParams = new URLSearchParams(window.location.search);
const langParam = urlParams.get('lang')?.toUpperCase();
let currentLang = (langParam === 'PT' || langParam === 'EN') ? langParam : (localStorage.getItem('preferred-lang') || 'PT');

// Persists if coming from URL
if (langParam) localStorage.setItem('preferred-lang', currentLang);

// Terminal animation logic (simplified to support dynamic re-triggering if needed, but mostly stays the same)
function initTerminal(lang) {
    const t = translations[lang].terminal;

    setTextOrType(document.querySelector('.boot-text[id="text-1"]'), t.loading);
    setTextOrType(document.querySelector('.boot-text[id="text-6"]'), t.status);
    setTextOrType(document.getElementById('status-text'), t.online);

    const whoamiCmd = document.getElementById('whoami-cmd');
    if (whoamiCmd && whoamiCmd.classList.contains('visible')) {
        setTextOrType(whoamiCmd, t.whoami);
    }

    const typedTarget = document.getElementById('typed');
    if (typedTarget && typedTarget.classList.contains('visible')) {
        setTextOrType(typedTarget, '\n' + t.about);
    }
}

function updateLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('preferred-lang', lang);
    if (window.trackEvent) trackEvent("language_change", { metadata: { lang } });
    document.documentElement.lang = currentLang === 'EN' ? 'en' : 'pt-BR';
    const t = translations[lang];

    // Navigation
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach((link, idx) => {
        if (t.nav[idx]) link.textContent = t.nav[idx];
    });

    // Home Page
    const ctaHeads = document.querySelectorAll('.cta-card h2');
    if (ctaHeads.length >= 2) {
        ctaHeads[0].textContent = t.index.viewProjects;
        ctaHeads[1].textContent = t.index.getInTouch;
    }
    const ctaTexts = document.querySelectorAll('.cta-card p');
    if (ctaTexts.length >= 2) {
        ctaTexts[0].textContent = t.index.explore;
        ctaTexts[1].textContent = t.index.talk;
    }
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        if (link.textContent.includes('VER PROJETOS') || link.textContent.includes('VIEW PROJECTS')) {
            link.textContent = t.index.btnProjects;
        }
        if (link.textContent.includes('ENTRAR EM CONTATO') || link.textContent.includes('GET IN TOUCH')) {
            link.textContent = t.index.btnContact;
        }
    });

    // Projects Page — generic data-i18n lookup
    const i18nMap = {
        'cat.softwares': t.projects.softwares,
        'cat.security': t.projects.security,
        'cat.dataAnalytics': t.projects.dataAnalytics,
        'cat.webTools': t.projects.webTools,
        'cat.landingPages': t.projects.landingPages,
        'desc.axion': t.projects.descriptions.axion,
        'desc.animecaos': t.projects.descriptions.animecaos,
        'desc.xmlrpc': t.projects.descriptions.xmlrpc,
        'desc.winopt': t.projects.descriptions.winopt,
        'desc.dashboard': t.projects.descriptions.dashboard,
        'desc.caoshub': t.projects.descriptions.caoshub,
        'desc.studioschulze': t.projects.descriptions.studioschulze
    };
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18nMap[key] !== undefined) el.textContent = i18nMap[key];
    });

    // Contact Page
    const contactTitle = document.querySelector('.contact-title');
    if (contactTitle) contactTitle.textContent = t.contact.title;

    const labels = document.querySelectorAll('.form-group label');
    if (labels.length >= 3) {
        labels[0].textContent = t.contact.labelName;
        labels[1].textContent = t.contact.labelEmail;
        labels[2].textContent = t.contact.labelMessage;
    }
    const btnSubmit = document.querySelector('.btn-submit');
    if (btnSubmit) btnSubmit.textContent = t.contact.btnSubmit;

    // Terminal
    initTerminal(lang);
}

document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('.nav');
    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    // Initialize Language Toggle
    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
        const lang = option.textContent.trim();
        // Sync active class on load
        if (lang === currentLang) option.classList.add('active');
        else option.classList.remove('active');

        option.addEventListener('click', () => {
            if (option.classList.contains('active')) return;
            langOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            updateLanguage(lang);
        });
    });

    // Apply initial language
    updateLanguage(currentLang);

    // Initial Terminal Boot Script (Only runs if elements exist)
    const brandText = document.getElementById('brand-text');
    if (brandText) {
        brandText.innerHTML = '<a href="/" style="text-decoration: none; color: inherit;"></a>';
        const brandLink = brandText.querySelector('a');
        typeText(brandLink, 'caosdev', 100);
    }

    const pre = document.querySelector('.prompt');
    if (pre) {
        playTerminalAnimation();
    }
});

const typeWriterActive = new Map();

function typeText(element, text, speed = 50) {
    return new Promise(resolve => {
        if (typeWriterActive.has(element)) {
            const old = typeWriterActive.get(element);
            clearInterval(old.interval);
            old.resolve();
        }

        element.textContent = '';
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(interval);
                typeWriterActive.delete(element);
                resolve();
            }
        }, speed);

        typeWriterActive.set(element, { interval, resolve });
    });
}

function setTextOrType(element, text) {
    if (!element) return;
    if (typeWriterActive.has(element)) {
        const old = typeWriterActive.get(element);
        clearInterval(old.interval);
        old.resolve();
        typeWriterActive.delete(element);
    }
    element.textContent = text;
}

async function playTerminalAnimation() {
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const pre = document.querySelector('.prompt');
    if (!pre) return;

    await sleep(50);
    const npm1 = document.getElementById('npm-1');
    if (npm1) {
        npm1.classList.add('visible');
        await typeText(npm1, 'npm start', 30);
    }

    await sleep(100);
    const npm2 = document.getElementById('npm-2');
    if (npm2) {
        npm2.textContent = '> portfolio@1.0.0 start';
        npm2.classList.add('visible');
    }

    await sleep(150);
    const npm3 = document.getElementById('npm-3');
    if (npm3) {
        npm3.textContent = '> node server.js';
        npm3.classList.add('visible');
    }

    await sleep(200);

    const bootSequence = ['text-1', 'text-2', 'text-3', 'text-4', 'text-5', 'text-6'];
    const okElements = pre.querySelectorAll('.ok');

    for (let i = 0; i < bootSequence.length; i++) {
        if (okElements[i]) {
            okElements[i].classList.add('visible');
        }
        const textElement = document.getElementById(bootSequence[i]);
        if (textElement) textElement.classList.add('visible');

        if (i === 0) {
            await sleep(50);
            const profileName = document.getElementById('profile-name');
            if (profileName) {
                profileName.textContent = 'Henrique Lanzoni';
                profileName.classList.add('visible');
            }
        }

        if (i === bootSequence.length - 1) {
            await sleep(50);
            const statusText = document.getElementById('status-text');
            if (statusText) statusText.classList.add('visible');
        }

        await sleep(100);
    }

    await sleep(100);

    const promptLine = document.getElementById('prompt-line');
    if (promptLine) promptLine.classList.add('visible');

    await sleep(100);
    const whoamiCmd = document.getElementById('whoami-cmd');
    if (whoamiCmd) {
        whoamiCmd.classList.add('visible');
        await typeText(whoamiCmd, translations[currentLang].terminal.whoami, 40);
    }

    const blinkCursor = pre.querySelector('.blink');
    if (blinkCursor) blinkCursor.classList.add('visible');

    await sleep(50);
    const typedTarget = document.getElementById('typed');
    if (typedTarget) {
        typedTarget.classList.add('visible');
        await typeText(typedTarget, '\n' + translations[currentLang].terminal.about + '\n', 5);
    }

    await sleep(100);
    const hintTextElement = document.getElementById('hint-text');
    if (hintTextElement) {
        const hintText = translations[currentLang].terminal.hint || "[ Dica: Digite 'help' para ver os comandos disponíveis. ]";
        await typeText(hintTextElement, '\n' + hintText, 10);
    }

    await sleep(50);
    const mainBlink = document.getElementById('main-blink');
    if (mainBlink) {
        mainBlink.style.display = 'none'; // Hide the fake blinker
    }
    const interactiveTerminal = document.getElementById('interactive-terminal');
    const terminalInput = document.getElementById('terminal-input');
    if (interactiveTerminal && terminalInput) {
        interactiveTerminal.classList.remove('hidden');
        terminalInput.focus();
    }
}

// -------------------------------------------------------------
// Interactive Terminal Engine
// -------------------------------------------------------------
const terminalInput = document.getElementById('terminal-input');
const terminalHistory = document.getElementById('terminal-history');

if (terminalInput) {
    // Keep focus on terminal when clicking inside the window
    const terminalWindow = document.querySelector('.terminal');
    if (terminalWindow) {
        terminalWindow.addEventListener('click', () => {
            if (!getSelection().toString()) {
                terminalInput.focus();
            }
        });
    }

    terminalInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            const cmd = this.value.trim();
            this.value = '';
            if (cmd !== '') {
                processCommand(cmd);
            }
        }
    });
}

function processCommand(cmd) {
    const args = cmd.split(' ');
    const mainCmd = args[0].toLowerCase();

    // Add command to history
    addHistoryEntry(`caos@root:~# ${cmd}`);
    if (window.trackEvent) trackEvent("terminal_command", { metadata: { command: mainCmd } });

    // Handle commands
    switch (mainCmd) {
        case 'help':
            const helpText = `Comandos disponíveis:
<div class="cmd-table">
    <span class="cmd-name">about</span><span>Resumo sobre mim e minha missão</span>
    <span class="cmd-name">skills</span><span>Minha stack (Off-sec, AI, Web)</span>
    <span class="cmd-name">contact</span><span>Links e formas de me encontrar</span>
    <span class="cmd-name">projects</span><span>Ver meus repositórios em destaque</span>
    <span class="cmd-name">whois</span><span>Listar dados do meu domínio ativo</span>
    <span class="cmd-name">nmap</span><span>Escaneamento de portas ativas/serviços</span>
    <span class="cmd-name">ls / dir</span><span>Listar arquivos e diretórios do host</span>
    <span class="cmd-name">cat</span><span>Ler o conteúdo de um arquivo em texto</span>
    <span class="cmd-name">clear</span><span>Limpa o terminal</span>
    <span class="cmd-name">sudo</span><span>?????</span>
</div>`;
            addOutput(helpText);
            break;

        case 'about':
            addOutput("Software Engineer focado em Inteligência Artificial, pesquisa de segurança, engenharia de prompts e arquitetura de sistemas. Construo plataformas robustas focadas em segurança ofensiva e RAG.");
            break;

        case 'skills':
            const skillsText = `
[❖] Security: Penetration Testing, Vuln Analysis, Attk Surface
[❖] AI & GenAI: Prompt Engineering, RAG Systems, LLM Sec
[❖] Engineering: Python, TypeScript, Architecture, Clean Code, SOLID`;
            addOutput(skillsText);
            break;

        case 'contact':
            const contactText = `<div class="cmd-table">
    <span class="cmd-name">Email</span><a href="mailto:henriqqw1@gmail.com" class="cmd-link">henriqqw1@gmail.com</a>
    <span class="cmd-name">GitHub</span><a href="https://github.com/henriqqw" target="_blank" class="cmd-link">github.com/henriqqw</a>
    <span class="cmd-name">LinkedIn</span><a href="https://www.linkedin.com/in/henrique-lanzoni-ab0828371/" target="_blank" class="cmd-link">linkedin.com/in/henrique-lanzoni</a>
</div>`;
            addOutput(contactText);
            break;

        case 'projects':
            const projectsText = `Redirecionando para as plataformas...
<a href="/projetos.html" class="cmd-link">> Clique aqui para acessar a página de Projetos</a>`;
            addOutput(projectsText);
            break;

        case 'clear':
        case 'cls':
            terminalHistory.innerHTML = '';
            break;

        case 'sudo':
        case 'su':
            addOutput("Permission denied: incident reported. User 'guest' is not in the sudoers file.", "error");
            break;

        case 'rm':
            if (args.includes('-rf') && args.includes('/')) {
                addOutput("Nice try... mas eu conteinerizei isso aqui. 🛡️", "success");
            } else {
                addOutput(`rm: missing operand`);
            }
            break;

        case 'whois':
            const whoisText = `Domain Name: CAOSDEV
Registry Domain ID: 0x1337-SEC
Registrar: Local First Knowledge
Creation Date: [Since 2024]
Tech Stack: Python, AI, Off-Sec
Status: ACTIVE_AND_LEARNING`;
            addOutput(whoisText);
            break;

        case 'nmap':
            addOutput(`PORT     STATE  SERVICE
22/tcp   open   Python (v3.12)
80/tcp   open   Web Architecture
443/tcp  open   CyberSecurity_Knowledge
8080/tcp open   RAG_Systems
MAC Address: 00:00:00:00:00:00 (Human)`);
            break;

        case 'ls':
        case 'dir':
            addOutput(`<span style="color: #0fb2fb;">drwxr-xr-x</span>  projects/   <span style="color: #0fb2fb;">drwxr-xr-x</span>  skills/   <span style="color: var(--muted)">-rw-r--r--</span>  resume.pdf   <span style="color: #ff5f57;">-rwxrwxrwx</span>  DO_NOT_RUN.sh   <span style="color: var(--muted)">-rw-r--r--</span>  secret.txt`);
            break;

        case 'cat':
            if (args[1] === 'secret.txt') {
                addOutput(`Acessando arquivo confidencial confidencial... <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" class="cmd-link">[ENCRYPTED] Click to Decrypt</a>`);
            } else if (args[1] === 'resume.pdf') {
                addOutput(`Acesse os detalhes no meu <a href="https://www.linkedin.com/in/henrique-lanzoni-ab0828371/" target="_blank" class="cmd-link">LinkedIn</a>.`, 'success');
            } else if (!args[1]) {
                // Wait for input (we just exit here for simplicity)
            } else {
                addOutput(`cat: ${args[1]}: No such file or directory`, 'error');
            }
            break;

        default:
            addOutput(`bash: ${mainCmd}: command not found. Digite 'help' para ver os comandos.`, 'error');
    }

    // Auto-scroll to bottom
    const terminalWindow = document.querySelector('.terminal-inner');
    if (terminalWindow) {
        terminalWindow.scrollTop = terminalWindow.scrollHeight;
        // fallback robust scroll
        setTimeout(() => {
            terminalInput.scrollIntoView({ behavior: "smooth", block: "end" });
        }, 50);
    }
}

function addHistoryEntry(text) {
    const line = document.createElement('div');
    line.className = 'history-entry';
    line.innerHTML = `<span class="caret-line">${text}</span>`;
    terminalHistory.appendChild(line);
}

function addOutput(html, type = '') {
    const line = document.createElement('div');
    line.className = `cmd-output ${type}`;
    line.innerHTML = html;
    terminalHistory.appendChild(line);
}
