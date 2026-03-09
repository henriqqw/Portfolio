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
            about: 'Desenvolvedor de Software focado em IA, pesquisa de segurança e design de sistemas. A maior parte do meu trabalho envolve a construção de plataformas, ferramentas de segurança e projetos experimentais em torno de sistemas web modernos e superfícies de ataque emergentes.'
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
            webTools: 'Ferramentas',
            landingPages: 'Landing Pages',
            softwares: 'Softwares',
            btnWebsite: 'WEBSITE',
            btnGithub: 'GITHUB',
            descriptions: {
                axion: 'A evolução do Markdown. Seu cérebro digital, 100% privado e extremamente rápido. Zero bancos de dados, telas gráficas nativas.'
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
            about: 'Software Developer focused on AI, security research and system design. Most of my work involves building platforms, security tools and experimental projects around modern web systems and emerging attack surfaces.'
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
            btnWebsite: 'WEBSITE',
            btnGithub: 'GITHUB',
            descriptions: {
                axion: 'The evolution of Markdown. Your digital brain, 100% private and blazingly fast. Zero databases, native graphical canvases.'
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

    // Projects Page
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        const txt = title.textContent.trim();
        if (txt === 'Security' || txt === 'Segurança') title.textContent = t.projects.security;
        if (txt === 'Web Tools' || txt === 'Ferramentas Web' || txt === 'Ferramentas') title.textContent = t.projects.webTools;
        if (txt === 'Landing Pages' || txt === 'Páginas de Destino') title.textContent = t.projects.landingPages;
        if (txt === 'Softwares') title.textContent = t.projects.softwares;
    });

    const descAxion = document.querySelector('.project-card:first-child .project-description');
    if (descAxion) descAxion.textContent = t.projects.descriptions.axion;

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

    await sleep(200);
    const npm1 = document.getElementById('npm-1');
    if (npm1) {
        npm1.classList.add('visible');
        await typeText(npm1, 'npm start', 60);
    }

    await sleep(200);
    const npm2 = document.getElementById('npm-2');
    if (npm2) {
        npm2.textContent = '> portfolio@1.0.0 start';
        npm2.classList.add('visible');
    }

    await sleep(400);
    const npm3 = document.getElementById('npm-3');
    if (npm3) {
        npm3.textContent = '> node server.js';
        npm3.classList.add('visible');
    }

    await sleep(500);

    const bootSequence = ['text-1', 'text-2', 'text-3', 'text-4', 'text-5', 'text-6'];
    const okElements = pre.querySelectorAll('.ok');

    for (let i = 0; i < bootSequence.length; i++) {
        if (okElements[i]) {
            okElements[i].classList.add('visible');
        }
        const textElement = document.getElementById(bootSequence[i]);
        if (textElement) textElement.classList.add('visible');

        if (i === 0) {
            await sleep(200);
            const profileName = document.getElementById('profile-name');
            if (profileName) {
                profileName.textContent = 'Henrique Lanzoni';
                profileName.classList.add('visible');
            }
        }

        if (i === bootSequence.length - 1) {
            await sleep(200);
            const statusText = document.getElementById('status-text');
            if (statusText) statusText.classList.add('visible');
        }

        await sleep(300);
    }

    await sleep(300);

    const promptLine = document.getElementById('prompt-line');
    if (promptLine) promptLine.classList.add('visible');

    await sleep(200);
    const whoamiCmd = document.getElementById('whoami-cmd');
    if (whoamiCmd) {
        whoamiCmd.classList.add('visible');
        await typeText(whoamiCmd, translations[currentLang].terminal.whoami, 80);
    }

    const blinkCursor = pre.querySelector('.blink');
    if (blinkCursor) blinkCursor.classList.add('visible');

    await sleep(200);
    const typedTarget = document.getElementById('typed');
    if (typedTarget) {
        typedTarget.classList.add('visible');
        await typeText(typedTarget, '\n' + translations[currentLang].terminal.about, 18);
    }
}

