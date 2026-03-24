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
                from { opacity: 0; transform: translateY(-30%) scale(0.9); }
                to { opacity: 1; transform: translateY(-50%) scale(1); }
            }

            @keyframes shine {
                0% { background-position: -100px; }
                100% { background-position: 200px; }
            }

            /* TÓTEM PC - ESTILO ELEGANTE */
            .banner-lux-pc {
                display: none;
                position: fixed !important;
                left: 15px !important;
                top: 50% !important;
                transform: translateY(-50%);
                width: 140px;
                background: #0a0808;
                border: 1px solid #d4a373;
                border-radius: 70px;
                z-index: 10000 !important;
                text-align: center;
                box-shadow: 0 0 30px rgba(212, 163, 115, 0.2);
                overflow: hidden;
                font-family: 'Montserrat', sans-serif;
                animation: luxFadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                cursor: pointer;
                padding-bottom: 20px;
            }

            .lux-pc-logo-container {
                padding: 25px 10px;
                position: relative;
            }

            .lux-pc-logo-blur {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 80px;
                filter: blur(15px);
                opacity: 0.5;
                z-index: 1;
            }

            .lux-btn-explora {
                border: 1px solid #d4a373;
                border-radius: 20px;
                padding: 8px 12px;
                color: #d4a373;
                font-size: 9px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin: 0 10px;
                transition: all 0.3s ease;
            }

            /* BANNER MÓVIL - DISEÑO DE LA IMAGEN */
            .banner-lux-mobile {
                display: none;
                position: sticky !important;
                width: 100%;
                background: #000000;
                border-bottom: 1px solid #d4a373;
                color: #ffffff;
                padding: 20px 10px;
                z-index: 49 !important;
                text-align: center;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                font-family: 'Montserrat', sans-serif;
                cursor: pointer;
            }

            .lux-m-content {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 5px;
            }

            .lux-m-title {
                font-size: 24px;
                font-weight: 400;
                letter-spacing: 1px;
                margin: 0;
            }

            .lux-m-subtitle {
                display: flex;
                align-items: center;
                gap: 10px;
                font-size: 11px;
                color: rgba(255,255,255,0.7);
                letter-spacing: 2px;
                text-transform: uppercase;
            }

            .lux-m-logo-img {
                height: 35px;
                filter: drop-shadow(0 0 8px rgba(212, 163, 115, 0.6));
            }

            /* Efecto glow suave para el nombre en el subtítulo */
            .lux-m-subtitle b {
                color: #d4a373;
                font-weight: 700;
            }
        `;
        document.head.appendChild(style);
    },

    createBanners: function() {
        if (document.getElementById('banner-pc-lux')) return;

        // Banner PC
        const bannerPC = document.createElement('div');
        bannerPC.id = 'banner-pc-lux';
        bannerPC.className = 'banner-lux-pc';
        bannerPC.innerHTML = `
            <div style="background: rgba(212, 163, 115, 0.1); padding: 15px 5px; font-size: 10px; color: #d4a373; font-weight: 800; letter-spacing: 1px;">LUX PARTNER</div>
            <div class="lux-pc-logo-container">
                <img src="patrocinios/Lux/lux-discoteca.webp" class="lux-pc-logo-blur">
                <img src="patrocinios/Lux/lux-discoteca.webp" style="width: 70px; position: relative; z-index: 2;">
            </div>
            <p style="color: #fff; font-size: 10px; margin-bottom: 15px; letter-spacing: 1px; opacity: 0.9;">VIDA NOCTURNA</p>
            <div class="lux-btn-explora">EXPLORA LUX</div>
        `;

        // Banner Móvil (Siguiendo la imagen)
        const bannerMobile = document.createElement('div');
        bannerMobile.id = 'banner-mobile-lux';
        bannerMobile.className = 'banner-lux-mobile';
        bannerMobile.innerHTML = `
            <div class="lux-m-content">
                <h2 class="lux-m-title">Vida Nocturna</h2>
                <div class="lux-m-subtitle">
                    PATROCINADO POR 
                    <img src="patrocinios/Lux/lux-discoteca.webp" class="lux-m-logo-img" onerror="this.src='https://placehold.co/60x30/000/d4a373?text=LUX'">
                </div>
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
                setTimeout(() => {
                    if(bannerPC) bannerPC.style.display = 'block';
                }, 500);
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
