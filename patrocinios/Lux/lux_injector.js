const LuxPatrocinio = {
    init: function() {
        this.injectStyles();
        this.createBanners();
        
        window.addEventListener('scroll', () => this.syncMobilePosition());
        window.addEventListener('resize', () => this.syncMobilePosition());
        
        setInterval(() => this.checkStatus(), 300);
    },

    injectStyles: function() {
        if (document.getElementById('lux-styles')) return;
        const style = document.createElement('style');
        style.id = 'lux-styles';
        style.innerHTML = `
            @keyframes luxFadeIn {
                from { opacity: 0; transform: translateX(-30px); }
                to { opacity: 1; transform: translateX(0); }
            }

            @keyframes neonPulse {
                0% { filter: drop-shadow(0 0 5px #d4a373) drop-shadow(0 0 15px rgba(212, 163, 115, 0.6)); }
                50% { filter: drop-shadow(0 0 15px #d4a373) drop-shadow(0 0 30px rgba(212, 163, 115, 0.8)); }
                100% { filter: drop-shadow(0 0 5px #d4a373) drop-shadow(0 0 15px rgba(212, 163, 115, 0.6)); }
            }

            /* TÓTEM PC - DISEÑO CÁPSULA LUXURY */
            .banner-lux-pc {
                display: none;
                position: fixed !important;
                left: 10px !important; /* Ajustado a 10px del borde */
                top: 50% !important;
                transform: translateY(-50%);
                width: 75px;
                height: 320px;
                background: linear-gradient(180deg, rgba(20, 18, 15, 0.95) 0%, rgba(0, 0, 0, 0.98) 100%);
                backdrop-filter: blur(15px);
                border: 1.5px solid rgba(212, 163, 115, 0.5);
                border-radius: 100px;
                z-index: 10000 !important;
                text-align: center;
                box-shadow: 0 0 40px rgba(0,0,0,0.8), inset 0 0 15px rgba(212, 163, 115, 0.2);
                padding: 30px 5px;
                font-family: 'Montserrat', sans-serif;
                animation: luxFadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                cursor: pointer;
                transition: all 0.4s ease;
                overflow: hidden;
            }

            .banner-lux-pc::before {
                content: '';
                position: absolute;
                top: 0; left: 0; right: 0; height: 40px;
                background: #d4a373;
                clip-path: ellipse(60% 100% at 50% 0%);
                opacity: 0.8;
            }

            .banner-lux-pc:hover {
                border-color: #d4a373;
                box-shadow: 0 0 50px rgba(212, 163, 115, 0.4);
                transform: translateY(-52%) scale(1.02);
            }

            .lux-pc-vertical-text {
                writing-mode: vertical-rl;
                text-orientation: mixed;
                color: #fff;
                font-size: 11px;
                letter-spacing: 4px;
                text-transform: uppercase;
                margin: 20px auto;
                opacity: 0.9;
                font-weight: 400;
            }

            .lux-pc-tag-bottom {
                position: absolute;
                bottom: 35px;
                left: 0;
                right: 0;
                font-size: 8px;
                color: #d4a373;
                font-weight: 800;
                letter-spacing: 1px;
            }

            /* BANNER MÓVIL - TEXTO Y LOGO MAXIMIZADOS */
            .banner-lux-mobile {
                display: none;
                position: sticky !important;
                width: 100%;
                background: #000;
                border-bottom: 2px solid #d4a373;
                padding: 10px 15px;
                z-index: 49 !important;
                font-family: 'Montserrat', sans-serif;
                cursor: pointer;
            }

            .lux-m-container {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 15px;
            }

            .lux-m-text {
                font-size: 13px; /* Más grande */
                color: #fff;
                letter-spacing: 1.2px;
                text-transform: uppercase;
                font-weight: 700;
            }

            .lux-m-text b {
                color: #d4a373;
                font-size: 10px; /* Más grande */
                margin-left: 5px;
                text-shadow: 0 0 8px rgba(212, 163, 115, 0.5);
            }

            .lux-m-logo-neon {
                height: 55px; /* Más grande sin romper el banner */
                filter: drop-shadow(0 0 8px #d4a373);
                animation: neonPulse 2s infinite ease-in-out;
                object-fit: contain;
            }
        `;
        document.head.appendChild(style);
    },

    createBanners: function() {
        if (document.getElementById('banner-pc-lux')) return;

        // PC - Tótem Luxury
        const bannerPC = document.createElement('div');
        bannerPC.id = 'banner-pc-lux';
        bannerPC.className = 'banner-lux-pc';
        bannerPC.innerHTML = `
            <img src="patrocinios/Lux/lux-discoteca.png" style="width: 55px; margin-top: 15px; filter: drop-shadow(0 0 10px #d4a373);">
            <div class="lux-pc-vertical-text">VIDA NOCTURNA</div>
            <div class="lux-pc-tag-bottom">EXPLORA LUX</div>
        `;

        // Móvil
        const bannerMobile = document.createElement('div');
        bannerMobile.id = 'banner-mobile-lux';
        bannerMobile.className = 'banner-lux-mobile';
        bannerMobile.innerHTML = `
            <div class="lux-m-container">
                <div class="lux-m-text">
                    VIDA NOCTURNA <b>• PATROCINADO POR</b>
                </div>
                <img src="patrocinios/Lux/lux-discoteca.png" class="lux-m-logo-neon" onerror="this.src='https://placehold.co/100x50/000/d4a373?text=LUX'">
            </div>
        `;

        bannerPC.onclick = () => this.scrollToLux();
        bannerMobile.onclick = () => this.scrollToLux();

        document.body.appendChild(bannerPC);
        
        const navbar = document.querySelector('nav');
        if (navbar) {
            navbar.insertAdjacentElement('afterend', bannerMobile);
        }
    },

    syncMobilePosition: function() {
        const bannerMobile = document.getElementById('banner-mobile-lux');
        const navbar = document.querySelector('nav');
        if (bannerMobile && navbar && bannerMobile.style.display !== 'none') {
            bannerMobile.style.top = `${navbar.offsetHeight}px`;
        }
    },

    prioritizeLuxCard: function() {
        const container = document.getElementById('grid-comercios') || document.querySelector('.grid');
        if (!container) return;
        const cards = Array.from(container.children);
        const luxCard = cards.find(card => 
            card.textContent.toUpperCase().includes('LUX') && 
            (card.textContent.toUpperCase().includes('DISCOTECA') || card.textContent.toUpperCase().includes('NIGHT'))
        );
        if (luxCard && container.firstChild !== luxCard) {
            container.prepend(luxCard);
        }
    },

    checkStatus: function() {
        const params = new URLSearchParams(window.location.search);
        const esVidaNocturna = params.get('categoria') === 'vida nocturna';
        const bannerPC = document.getElementById('banner-pc-lux');
        const bannerMobile = document.getElementById('banner-mobile-lux');

        if (esVidaNocturna) {
            if (window.innerWidth > 768) {
                if(bannerPC) bannerPC.style.display = 'block';
                if(bannerMobile) bannerMobile.style.display = 'none';
            } else {
                if(bannerMobile) {
                    bannerMobile.style.display = 'block';
                    this.syncMobilePosition(); 
                }
                if(bannerPC) bannerPC.style.display = 'none';
            }
            this.prioritizeLuxCard();
        } else {
            if(bannerPC) bannerPC.style.display = 'none';
            if(bannerMobile) bannerMobile.style.display = 'none';
        }
    },

    scrollToLux: function() {
        const cards = document.querySelectorAll('.glass-card, [onclick*="abrirModal"]');
        for (let card of cards) {
            const txt = card.textContent.toUpperCase();
            if (txt.includes('LUX') && (txt.includes('DISCOTECA') || txt.includes('NIGHT'))) {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                card.style.transition = "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
                card.style.border = "2px solid #d4a373";
                card.style.boxShadow = "0 0 30px rgba(212, 163, 115, 0.4)";
                
                setTimeout(() => {
                    card.click();
                    setTimeout(() => {
                        card.style.border = "";
                        card.style.boxShadow = "";
                    }, 2500);
                }, 800);
                break;
            }
        }
    }
};

LuxPatrocinio.init();
