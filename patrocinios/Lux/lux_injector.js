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
                from { opacity: 0; transform: translateX(-20px) translateY(-50%); }
                to { opacity: 1; transform: translateX(0) translateY(-50%); }
            }

            @keyframes neonPulse {
                0% { filter: drop-shadow(0 0 5px #d4a373); transform: scale(1.02); }
                50% { filter: drop-shadow(0 0 15px rgba(212, 163, 115, 0.6)); transform: scale(1.05); }
                100% { filter: drop-shadow(0 0 5px #d4a373); transform: scale(1.02); }
            }

            /* TÓTEM PC - DISEÑO CÁPSULA PREMIUM (REEMPLAZO DE SUBCATEGORÍAS) */
            .banner-lux-pc {
                display: none;
                position: fixed !important;
                left: 20px !important;
                top: 50% !important;
                transform: translateY(-50%);
                width: 95px;
                height: 480px; 
                background: linear-gradient(180deg, #000 0%, #1a1a1a 100%);
                border: 1.5px solid #d4a373;
                border-radius: 50px;
                z-index: 10000 !important;
                box-shadow: 0 20px 40px rgba(0,0,0,0.9), inset 0 0 20px rgba(212, 163, 115, 0.1);
                font-family: 'Montserrat', sans-serif;
                animation: luxFadeIn 0.8s ease-out forwards;
                cursor: pointer;
                overflow: hidden;
                transition: all 0.3s ease;
            }

            .banner-lux-pc:hover {
                border-color: #fff;
                box-shadow: 0 25px 50px rgba(0,0,0,1), inset 0 0 25px rgba(212, 163, 115, 0.2);
            }

            .lux-pc-container {
                display: flex;
                flex-direction: column;
                height: 100%;
                text-align: center;
            }

            /* Cabezal de la cápsula */
            .lux-pc-header-tag {
                background: #d4a373;
                color: #000;
                font-size: 8px;
                font-weight: 900;
                padding: 18px 0 10px 0;
                letter-spacing: 1.5px;
                text-transform: uppercase;
                clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);
            }

            .lux-pc-content {
                flex-grow: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                padding: 30px 0;
            }

            .lux-pc-logo {
                width: 70px;
                filter: drop-shadow(0 0 10px rgba(212, 163, 115, 0.3));
                transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }

            .banner-lux-pc:hover .lux-pc-logo {
                transform: scale(1.1) rotate(3deg);
            }

            /* Texto Vertical "VIDA NOCTURNA LUX" */
            .lux-pc-text-vertical {
                writing-mode: vertical-rl;
                color: #fff;
                font-size: 14px;
                letter-spacing: 5px;
                font-weight: 300;
                text-transform: uppercase;
                opacity: 0.8;
                margin: 15px 0;
            }

            .lux-pc-text-vertical b {
                color: #d4a373;
                font-weight: 800;
            }

            /* Botón Circular de Acción Inferior */
            .lux-pc-scroll-indicator {
                width: 45px;
                height: 45px;
                background: rgba(212, 163, 115, 0.1);
                border: 1px solid #d4a373;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #d4a373;
                font-size: 18px;
                margin-bottom: 20px;
                transition: all 0.3s ease;
            }

            .banner-lux-pc:hover .lux-pc-scroll-indicator {
                background: #d4a373;
                color: #000;
                transform: translateY(-5px);
            }

            /* BANNER MÓVIL (MANTENIDO EXACTAMENTE IGUAL) */
            .banner-lux-mobile {
                display: none;
                position: sticky !important;
                width: 100%;
                background: #000;
                border-bottom: 1px solid #d4a373;
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
                font-size: 9px;
                color: #fff;
                letter-spacing: 1px;
                text-transform: uppercase;
                font-weight: 600;
            }

            .lux-m-text b { color: #d4a373; margin-left: 4px; }

            .lux-m-logo-neon {
                height: 65px;
                margin: -10px 0;
                animation: neonPulse 3s infinite ease-in-out;
                object-fit: contain;
            }
        `;
        document.head.appendChild(style);
    },

    createBanners: function() {
        if (document.getElementById('banner-pc-lux')) return;

        // PC - Estructura de Cápsula
        const bannerPC = document.createElement('div');
        bannerPC.id = 'banner-pc-lux';
        bannerPC.className = 'banner-lux-pc';
        bannerPC.innerHTML = `
            <div class="lux-pc-container">
                <div class="lux-pc-header-tag">PATROCINIO</div>
                <div class="lux-pc-content">
                    <img src="patrocinios/Lux/lux-discoteca.png" class="lux-pc-logo">
                    <div class="lux-pc-text-vertical">VIDA NOCTURNA <b>LUX</b></div>
                    <div class="lux-pc-scroll-indicator">↓</div>
                </div>
            </div>
        `;

        // Móvil - Sin cambios (Lógica original)
        const bannerMobile = document.createElement('div');
        bannerMobile.id = 'banner-mobile-lux';
        bannerMobile.className = 'banner-lux-mobile';
        bannerMobile.innerHTML = `
            <div class="lux-m-container">
                <div class="lux-m-text">VIDA NOCTURNA<b>• PATROCINADO POR</b></div>
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
