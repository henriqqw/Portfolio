// Efeitos leves para o tema terminal
(function () {
    const pre = document.querySelector('.prompt');
    if (!pre) return;

    // Animar "caosdev" no header
    const brandText = document.getElementById('brand-text');
    if (brandText) {
        typeText(brandText, 'caosdev', 100);
    }

    // Inicialmente ocultar [OK] e textos de boot
    const okLines = pre.querySelectorAll('.ok');
    const bootTexts = pre.querySelectorAll('.boot-text');
    
    okLines.forEach((el) => {
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.3s ease, color 0.4s ease';
    });
    
    bootTexts.forEach((el) => {
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.3s ease';
    });

    // Mostrar linhas de boot sequencialmente (após npm carregar)
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
            // Mostrar [OK] e texto juntos
            const okElements = pre.querySelectorAll('.ok');
            const textElement = document.getElementById(item.textId);
            
            if (okElements[idx]) {
                okElements[idx].style.opacity = '1';
                okElements[idx].style.color = 'var(--ok)';
            }
            
            if (textElement) {
                textElement.style.opacity = '1';
            }
            
        }, item.delay);
    });

    // Função para digitar texto com efeito terminal
    function typeText(element, text, speed = 50) {
        let i = 0;
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        type();
    }

    // Animar linhas do npm start
    setTimeout(() => {
        const npm1 = document.getElementById('npm-1');
        if (npm1) {
            typeText(npm1, 'npm start', 60);
        }
    }, 200);

    setTimeout(() => {
        const npm2 = document.getElementById('npm-2');
        if (npm2) {
            npm2.textContent = '> portfolio@1.0.0 start';
        }
    }, 600);

    setTimeout(() => {
        const npm3 = document.getElementById('npm-3');
        if (npm3) {
            npm3.textContent = '> node server.js';
        }
    }, 1000);

    // Mostrar nome do perfil (após "loading profile: " aparecer)
    setTimeout(() => {
        const profileName = document.getElementById('profile-name');
        if (profileName) {
            profileName.textContent = 'Henrique Lanzoni';
        }
    }, 1700);

    // Mostrar status online (após "status: " aparecer)
    setTimeout(() => {
        const statusText = document.getElementById('status-text');
        if (statusText) {
            statusText.textContent = 'online';
        }
    }, 3700);

    // Criar e mostrar ícone online após status "online" aparecer
    setTimeout(() => {
        const statusIconContainer = document.getElementById('status-icon-container');
        if (statusIconContainer) {
            statusIconContainer.innerHTML = '<span class="status-icon" aria-label="online">●</span>';
        }
    }, 3800);

    // Mostrar prompt caos@root:~# e digitar whoami após ícone aparecer
    setTimeout(() => {
        const promptLine = document.getElementById('prompt-line');
        if (promptLine) {
            promptLine.style.opacity = '1'; // Apenas aparecer, sem digitação
        }
        
        // Digitar "whoami" após prompt aparecer
        setTimeout(() => {
            const whoamiCmd = document.getElementById('whoami-cmd');
            if (whoamiCmd) {
                whoamiCmd.style.opacity = '1';
                typeText(whoamiCmd, 'whoami', 80);
            }
            
            // Mostrar cursor piscante após whoami terminar de digitar
            setTimeout(() => {
                const blinkCursor = pre.querySelector('.blink');
                if (blinkCursor) {
                    blinkCursor.style.opacity = '1';
                }
            }, 480); // 6 letras * 80ms = 480ms
        }, 200); // Pequeno delay após prompt aparecer
    }, 4000);

    // Digitação do "sobre mim" após whoami
    const typedTarget = document.getElementById('typed');
    if (typedTarget) {
        const text = 'Estudante de Ciência da Computação. Foco em Defesa Cibernética: Ethical Hacking, Forense e DevSecOps. Apaixonado por Pentest — RED TEAM.';
        let i = 0;
        const typeSpeed = 18; // ms por char
        const startDelay = 4680; // após "whoami" terminar de digitar (4000 + 200 + 480)

        setTimeout(() => {
            // Começar na linha debaixo
            typedTarget.textContent = '\n';
            const type = () => {
                if (i < text.length) {
                    typedTarget.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, typeSpeed);
                }
            };
            type();
        }, startDelay);
    }
})();



