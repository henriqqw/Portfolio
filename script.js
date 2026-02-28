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
            about: 'Estudante de Ciência da Computação. Foco em Defesa Cibernética: Ethical Hacking, Forense e DevSecOps. Apaixonado por Pentest — RED TEAM.'
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
            landingPages: 'Páginas de Destino',
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
            about: 'Computer Science Student. Focus on Cyber Defense: Ethical Hacking, Forensics, and DevSecOps. Passionate about Pentest — RED TEAM.'
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
    // Replace text in elements if they exist
    const loadText = document.querySelector('.boot-text[id="text-1"]');
    if (loadText) loadText.textContent = t.loading;

    const statusLabel = document.querySelector('.boot-text[id="text-6"]');
    if (statusLabel) statusLabel.textContent = t.status;

    const statusText = document.getElementById('status-text');
    if (statusText) statusText.textContent = t.online;

    const whoamiCmd = document.getElementById('whoami-cmd');
    if (whoamiCmd) {
        // Only re-type if needed, or just set text
        if (!whoamiCmd.textContent) whoamiCmd.textContent = t.whoami;
    }

    const typedTarget = document.getElementById('typed');
    if (typedTarget) {
        // If it's already typed, update it directly
        typedTarget.textContent = '\n' + t.about;
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
        if (txt === 'Web Tools' || txt === 'Ferramentas Web') title.textContent = t.projects.webTools;
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
        const okLines = pre.querySelectorAll('.ok');
        const bootTexts = pre.querySelectorAll('.boot-text');
        okLines.forEach(el => el.style.opacity = '0');
        bootTexts.forEach(el => el.style.opacity = '0');

        const bootSequence = [
            { delay: 1500, textId: 'text-1' },
            { delay: 1900, textId: 'text-2' },
            { delay: 2300, textId: 'text-3' },
            { delay: 2700, textId: 'text-4' },
            { delay: 3100, textId: 'text-5' },
            { delay: 3500, textId: 'text-6' }
        ];

        bootSequence.forEach((item, idx) => {
            setTimeout(() => {
                const okElements = pre.querySelectorAll('.ok');
                const textElement = document.getElementById(item.textId);
                if (okElements[idx]) {
                    okElements[idx].style.opacity = '1';
                    okElements[idx].style.color = 'var(--ok)';
                }
                if (textElement) textElement.style.opacity = '1';
            }, item.delay);
        });

        setTimeout(() => {
            const npm1 = document.getElementById('npm-1');
            if (npm1) typeText(npm1, 'npm start', 60);
        }, 200);

        setTimeout(() => {
            const npm2 = document.getElementById('npm-2');
            if (npm2) npm2.textContent = '> portfolio@1.0.0 start';
        }, 600);

        setTimeout(() => {
            const npm3 = document.getElementById('npm-3');
            if (npm3) npm3.textContent = '> node server.js';
        }, 1000);

        setTimeout(() => {
            const profileName = document.getElementById('profile-name');
            if (profileName) profileName.textContent = 'Henrique Lanzoni';
        }, 1700);

        // Whoami animation
        setTimeout(() => {
            const promptLine = document.getElementById('prompt-line');
            if (promptLine) promptLine.style.opacity = '1';
            setTimeout(() => {
                const whoamiCmd = document.getElementById('whoami-cmd');
                if (whoamiCmd) {
                    whoamiCmd.style.opacity = '1';
                    typeText(whoamiCmd, translations[currentLang].terminal.whoami, 80);
                }
                setTimeout(() => {
                    const blinkCursor = pre.querySelector('.blink');
                    if (blinkCursor) blinkCursor.style.opacity = '1';

                    // Typed target (sobre mim)
                    const typedTarget = document.getElementById('typed');
                    if (typedTarget) {
                        const text = translations[currentLang].terminal.about;
                        let i = 0;
                        typedTarget.textContent = '\n';
                        const type = () => {
                            if (i < text.length) {
                                typedTarget.textContent += text.charAt(i);
                                i++;
                                setTimeout(type, 18);
                            }
                        };
                        type();
                    }
                }, 480);
            }, 200);
        }, 4000);
    }
});

function typeText(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    return new Promise(resolve => {
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }
        type();
    });
}

