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
                from { opacity: 0; transform: translateX(-30px) translateY(-50%); }
                to { opacity: 1; transform: translateX(0) translateY(-50%); }
            }

            @keyframes shine {
                0% { background-position: -200% center; }
                100% { background-position: 200% center; }
            }

            /* TÓTEM PC - ESTILO BOUTIQUE PREMIUM */
            .banner-lux-pc {
                display: none;
                position: fixed !important;
                left: 30px !important;
                top: 50% !important;
                transform: translateY(-50%);
                width: 85px;
                height: 380px;
                background: linear-gradient(135deg, rgba(20, 18, 15, 0.95) 0%, rgba(5, 5, 5, 1) 100%);
                backdrop-filter: blur(15px);
                border: 1px solid rgba(212, 163, 115, 0.25);
                border-radius: 60px;
                z-index: 10000 !important;
                text-align: center;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.9), inset 0 1px 1px rgba(212, 163, 115, 0.2);
                padding: 30px 10px;
                font-family: 'Montserrat', sans-serif;
                animation: luxFadeIn 1s cubic-bezier(0.19, 1, 0.22, 1) forwards;
                cursor: pointer;
                transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
            }

            .banner-lux-pc:hover {
                border-color: rgba(212, 163, 115, 0.6);
                box-shadow: 0 30px 60px -12px rgba(212, 163, 115, 0.15);
                transform: translateY(-52%);
            }

            .lux-pc-badge {
                font-size: 8px;
                color: #d4a373;
                letter-spacing: 3px;
                text-transform: uppercase;
                margin-bottom: 40px;
                font-weight: 400;
                opacity: 0.7;
            }

            .lux-pc-divider {
                width: 20px;
                height: 1px;
                background: linear-gradient(90deg, transparent, #d4a373, transparent);
                margin: 25px auto;
            }

            .lux-pc-vertical {
                writing-mode: vertical-rl;
                text-orientation: mixed;
                color: #fff;
                font-size: 13px;
                letter-spacing: 6px;
                text-transform: uppercase;
                margin: 0 auto;
                font-weight: 200;
                background: linear-gradient(to bottom, #fff 20%, #d4a373 50%, #fff 80%);
                background-size: 200% auto;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                animation: shine 4s linear infinite;
            }

            /* BANNER MÓVIL - LOGO PROTAGONISTA */
            .banner-lux-mobile {
                display: none;
                position: sticky !important;
                width: 100%;
                background: #000;
                border-bottom: 1px solid rgba(212, 163, 115, 0.3);
                padding: 8px 20px;
                z-index: 49 !important;
                font-family: 'Montserrat', sans-serif;
                cursor: pointer;
            }

            .lux-m-container {
                display: flex;
                align-items: center;
                justify-content: space-between;
                max-width: 500px;
                margin: 0 auto;
            }

            .lux-m-text {
                font-size: 10px;
                color: #fff;
                letter-spacing: 2px;
                text-transform: uppercase;
                font-weight: 300;
            }

            .lux-m-text span {
                color: #d4a373;
                font-weight: 600;
                margin-left: 5px;
            }

            .lux-m-logo {
                height: 55px;
                margin: -5px 0;
                filter: drop-shadow(0 0 10px rgba(212, 163, 115, 0.3));
                object-fit: contain;
                transition: transform 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    },

    createBanners: function() {
        if (document.getElementById('banner-pc-lux')) return;

        // PC - Tótem Vertical Refinado
        const bannerPC = document.createElement('div');
        bannerPC.id = 'banner-pc-lux';
        bannerPC.className = 'banner-lux-pc';
        bannerPC.innerHTML = `
            <div class="lux-pc-badge">Partner</div>
            <img src="patrocinios/Lux/lux-discoteca.png" style="width: 60px; filter: contrast(1.1);">
            <div class="lux-pc-divider"></div>
            <div class="lux-pc-vertical">VIDA NOCTURNA</div>
            <div style="font-size: 7px; color: #d4a373; margin-top: 30px; letter-spacing: 2px;">EXCLUSIVE</div>
        `;

        // Móvil - Franja Elegante
        const bannerMobile = document.createElement('div');
        bannerMobile.id = 'banner-mobile-lux';
        bannerMobile.className = 'banner-lux-mobile';
        bannerMobile.innerHTML = `
            <div class="lux-m-container">
                <div class="lux-m-text">PREMIUM<span>PARTNER</span></div>
                <img src="patrocinios/Lux/lux-discoteca.png" class="lux-m-logo" onerror="this.src='https://placehold.co/100x50/000/d4a373?text=LUX'">
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
