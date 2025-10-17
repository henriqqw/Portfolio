// Efeitos leves para o tema terminal
(function () {
    // Animar "caosdev" no header
    const brandText = document.getElementById('brand-text');
    if (brandText) {
        brandText.innerHTML = '<a href="/" style="text-decoration: none; color: inherit;"></a>';
        const brandLink = brandText.querySelector('a');
        typeText(brandLink, 'caosdev', 100);
    }

    const pre = document.querySelector('.prompt');
    if (!pre) return;

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

    // Função para digitar texto com efeito terminal (modificada para Promise)
    function typeText(element, text, speed = 50) {
        let i = 0;
        element.textContent = ''; // Clear content before typing
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

document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel-container');
    if (!carouselContainer) return;

    let currentIndex = 0;
    const track = document.getElementById('carouselTrack');
    const cards = document.querySelectorAll('.project-card');
    const totalProjects = cards.length;
    const dotsContainer = document.getElementById('carouselDots');
    const prevButton = document.querySelector('.carousel-btn.prev');
    const nextButton = document.querySelector('.carousel-btn.next');
    const animatedCards = new Set();

    // Create dots
    for (let i = 0; i < totalProjects; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function typeText(element, text, speed = 30) { // Default speed 30ms
        let i = 0;
        element.innerHTML = '';
        return new Promise(resolve => {
            const type = () => {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else {
                    resolve();
                }
            };
            type();
        });
    }

    function showFinalState(cardIndex) {
        const card = cards[cardIndex];
        const originalPrompt = card.querySelector('.project-prompt');
        const typedCommandElement = originalPrompt.querySelector(`#typed-command-${cardIndex}`);
        const techStackElement = card.querySelector(`#tech-stack-${cardIndex}`);
        const contentArea = originalPrompt.parentElement;

        // --- Cleanup previous dynamic elements ---
        contentArea.querySelectorAll('.project-description-output, .new-prompt').forEach(el => el.remove());
        
        // --- Get project data ---
        const descriptionText = card.querySelector('.project-description-hidden').textContent.trim();
        const techLabelText = card.querySelector('.tech-label-hidden').textContent.trim();
        const techTagsHtml = card.querySelector('.tech-tags-hidden').innerHTML;
        const projectUrl = card.querySelector('.project-links a[href*="://"]')?.href || 'local';

        // --- Display final state of command 1 ---
        typedCommandElement.textContent = 'echo $DESCRIPTION';
        const projectDescriptionOutput = document.createElement('div');
        projectDescriptionOutput.classList.add('project-description-output');
        projectDescriptionOutput.textContent = descriptionText;
        originalPrompt.insertAdjacentElement('afterend', projectDescriptionOutput);

        // --- Display final state of command 2 ---
        const newPrompt = document.createElement('pre');
        newPrompt.className = 'project-prompt new-prompt';
        newPrompt.style.marginBottom = '15px';
        newPrompt.innerHTML = `<code><span class="caret-line">caos@root:~#</span> <span class="typed-command">curl -I "${projectUrl}"</span><span class="blink">▊</span></code>`;
        projectDescriptionOutput.insertAdjacentElement('afterend', newPrompt);

        // --- Display technologies ---
        techStackElement.style.display = 'block';
        techStackElement.querySelector('.tech-label').textContent = techLabelText;
        techStackElement.querySelector('.tech-tags').innerHTML = techTagsHtml;
        newPrompt.insertAdjacentElement('afterend', techStackElement);
    }

    // Function to type text with terminal effect (for project cards)
    async function typeProjectCommand(cardIndex) {
        const card = cards[cardIndex];
        const originalPrompt = card.querySelector('.project-prompt');
        const typedCommandElement = originalPrompt.querySelector(`#typed-command-${cardIndex}`);
        const blinkCursor = originalPrompt.querySelector(`#blink-${cardIndex}`);
        const techStackElement = card.querySelector(`#tech-stack-${cardIndex}`);
        const contentArea = originalPrompt.parentElement;

        // --- Cleanup previous dynamic elements ---
        contentArea.querySelectorAll('.project-description-output, .new-prompt').forEach(el => el.remove());
        
        // --- Reset original prompt and tech stack ---
        typedCommandElement.innerHTML = '';
        techStackElement.style.display = 'none';
        blinkCursor.style.opacity = '1';

        // --- Get project data ---
        const descriptionText = card.querySelector('.project-description-hidden').textContent.trim();
        const techLabelText = card.querySelector('.tech-label-hidden').textContent.trim();
        const hiddenTags = Array.from(card.querySelectorAll('.tech-tags-hidden .tech-tag'));
        const projectUrl = card.querySelector('.project-links a[href*="://"]')?.href || 'local';

        // --- Command 1: echo $DESCRIPTION ---
        await typeText(typedCommandElement, 'echo $DESCRIPTION', 50);
        blinkCursor.style.opacity = '0';

        // --- Display description with typing animation ---
        const projectDescriptionOutput = document.createElement('div');
        projectDescriptionOutput.classList.add('project-description-output');
        originalPrompt.insertAdjacentElement('afterend', projectDescriptionOutput);
        await typeText(projectDescriptionOutput, descriptionText, 15);
        
        await sleep(200);

        // --- Create and animate Command 2: curl ---
        const newPrompt = document.createElement('pre');
        newPrompt.className = 'project-prompt new-prompt';
        newPrompt.style.marginBottom = '15px';
        newPrompt.innerHTML = `<code><span class="caret-line">caos@root:~#</span> <span class="typed-command"></span><span class="blink">▊</span></code>`;
        projectDescriptionOutput.insertAdjacentElement('afterend', newPrompt);
        
        const newTypedCommandElement = newPrompt.querySelector('.typed-command');
        const newBlinkCursor = newPrompt.querySelector('.blink');

        await typeText(newTypedCommandElement, `curl -I "${projectUrl}"`, 50);
        newBlinkCursor.style.opacity = '0';

        // --- Display technologies with animation ---
        techStackElement.style.display = 'block';
        const techLabelElement = techStackElement.querySelector('.tech-label');
        const techTagsContainer = techStackElement.querySelector('.tech-tags');
        
        techLabelElement.innerHTML = '';
        techTagsContainer.innerHTML = '';

        newPrompt.insertAdjacentElement('afterend', techStackElement);
        
        // Animate tags
        for (const tag of hiddenTags) {
            const tagClone = tag.cloneNode(true);
            tagClone.style.opacity = 0;
            techTagsContainer.appendChild(tagClone);
            techTagsContainer.append(' '); // Add space
        }

        const tagsToAnimate = techTagsContainer.querySelectorAll('.tech-tag');
        for (const tag of tagsToAnimate) {
            await sleep(150);
            tag.style.transition = 'opacity 0.3s';
            tag.style.opacity = 1;
        }

        // Set final cursor state
        newBlinkCursor.style.opacity = '1';
    }

    function moveCarousel(direction) {
        currentIndex += direction;
        
        if (currentIndex < 0) {
            currentIndex = totalProjects - 1;
        } else if (currentIndex >= totalProjects) {
            currentIndex = 0;
        }
        
        updateCarousel();
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    function updateCarousel() {
        const offset = -currentIndex * 100;
        track.style.transform = `translateX(${offset}%)`;
        
        // Update dots
        const dots = document.querySelectorAll('.carousel-dots .dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Update counter
        document.getElementById('currentProject').textContent = currentIndex + 1;
        document.getElementById('totalProjects').textContent = totalProjects;

        // Trigger animation only once
        if (animatedCards.has(currentIndex)) {
            showFinalState(currentIndex);
        } else {
            typeProjectCommand(currentIndex);
            animatedCards.add(currentIndex);
        }
    }

    prevButton.addEventListener('click', () => moveCarousel(-1));
    nextButton.addEventListener('click', () => moveCarousel(1));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') moveCarousel(-1);
        if (e.key === 'ArrowRight') moveCarousel(1);
    });

    updateCarousel(); // Initial call to set up carousel and animate first card
});

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('.nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }
});

