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

            /* TÓTEM PC - APARICIÓN SUAVE */
            .banner-lux-pc {
                display: none;
                position: fixed !important;
                left: 15px !important;
                top: 50% !important;
                transform: translateY(-50%);
                width: 130px;
                background: linear-gradient(145deg, #130f0e, #1c1817);
                border: 1px solid rgba(212, 163, 115, 0.5);
                border-radius: 65px;
                z-index: 10000 !important;
                text-align: center;
                box-shadow: 0 30px 60px rgba(0,0,0,0.8), inset 0 0 15px rgba(212, 163, 115, 0.05);
                overflow: hidden;
                font-family: 'Montserrat', sans-serif;
                animation: luxFadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                cursor: pointer;
            }

            .lux-header-gold {
                background: #d4a373;
                padding: 18px 5px;
                color: #130f0e;
                font-size: 10px;
                font-weight: 900;
                letter-spacing: 1.5px;
                text-transform: uppercase;
            }

            .lux-totem-body {
                padding: 30px 10px;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 25px;
            }

            .lux-btn-oval {
                border: 1.5px solid #d4a373;
                border-radius: 35px;
                padding: 18px 10px;
                writing-mode: vertical-rl;
                text-orientation: mixed;
                color: #d4a373;
                font-size: 11px;
                font-weight: 800;
                letter-spacing: 4px;
                text-transform: uppercase;
                transition: all 0.4s ease;
            }

            /* BANNER MÓVIL - MÁS GRANDE Y ELEGANTE */
            .banner-lux-mobile {
                display: none;
                position: sticky !important;
                width: 100%;
                background: linear-gradient(90deg, #0a0808 0%, #1a1514 50%, #0a0808 100%);
                border-bottom: 2px solid #d4a373;
                color: #ffffff;
                padding: 16px 10px; /* Más grande */
                z-index: 49 !important;
                text-align: center;
                box-shadow: 0 8px 20px rgba(0,0,0,0.6);
                font-family: 'Montserrat', sans-serif;
                font-size: 12px;
                letter-spacing: 0.5px;
                cursor: pointer;
            }

            /* Efecto de brillo en el texto del móvil */
            .banner-lux-mobile span b { 
                color: #d4a373; 
                text-shadow: 0 0 10px rgba(212, 163, 115, 0.4);
                background: linear-gradient(90deg, #d4a373, #fff, #d4a373);
                background-size: 200% auto;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                animation: shine 3s linear infinite;
            }

            @keyframes mobileSlideIn {
                from { opacity: 0; transform: translateY(-20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    },

    createBanners: function() {
        if (document.getElementById('banner-pc-lux')) return;

        const bannerPC = document.createElement('div');
        bannerPC.id = 'banner-pc-lux';
        bannerPC.className = 'banner-lux-pc';
        bannerPC.innerHTML = `
            <div class="lux-header-gold">PARTNER<br>PREMIUM</div>
            <div class="lux-totem-body">
                <img src="patrocinios/Lux/lux-discoteca.webp" 
                     style="width: 85px; filter: drop-shadow(0 0 15px rgba(212,163,115,0.4));" 
                     onerror="this.src='https://placehold.co/80x80/130f0e/d4a373?text=LUX'">
                <p style="color: #d4a373; font-size: 10px; font-weight: 600; letter-spacing: 1.2px; margin: 0; line-height: 1.4;">
                    VIDA NOCTURNA<br><span style="color: #fff; font-size: 8px; opacity: 0.8;">EXPERIENCIA LUX</span>
                </p>
                <div class="lux-btn-oval">DESCUBRIR LUX</div>
            </div>
        `;

        const bannerMobile = document.createElement('div');
        bannerMobile.id = 'banner-mobile-lux';
        bannerMobile.className = 'banner-lux-mobile';
        bannerMobile.innerHTML = `<span>VIDA NOCTURNA • PATROCINADO POR <b>LUX DISCOTECA</b></span>`;

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
                // Pequeño retraso para que cargue después de las tarjetas
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
