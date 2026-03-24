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
                from { opacity: 0; transform: translateX(-20px); }
                to { opacity: 1; transform: translateX(0); }
            }

            /* TÓTEM PC - FINO Y ELEGANTE */
            .banner-lux-pc {
                display: none;
                position: fixed !important;
                left: 20px !important;
                top: 50% !important;
                transform: translateY(-50%);
                width: 100px;
                background: rgba(10, 8, 8, 0.85);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(212, 163, 115, 0.4);
                border-radius: 50px;
                z-index: 10000 !important;
                text-align: center;
                box-shadow: 0 10px 40px rgba(0,0,0,0.5);
                padding: 25px 10px;
                font-family: 'Montserrat', sans-serif;
                animation: luxFadeIn 0.8s ease-out forwards;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .banner-lux-pc:hover {
                border-color: #d4a373;
                box-shadow: 0 0 20px rgba(212, 163, 115, 0.3);
                transform: translateY(-52%);
            }

            .lux-pc-tag {
                font-size: 8px;
                color: #d4a373;
                letter-spacing: 2px;
                text-transform: uppercase;
                margin-bottom: 15px;
                font-weight: 800;
            }

            /* BANNER MÓVIL - COMPACTO Y LOGO PROTAGONISTA */
            .banner-lux-mobile {
                display: none;
                position: sticky !important;
                width: 100%;
                background: #000;
                border-bottom: 1px solid #d4a373;
                padding: 8px 15px;
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

            .lux-m-text-box {
                text-align: right;
            }

            .lux-m-small-title {
                display: block;
                font-size: 10px;
                color: #fff;
                letter-spacing: 1px;
                text-transform: uppercase;
                opacity: 0.8;
            }

            .lux-m-patro-by {
                display: block;
                font-size: 7px;
                color: #d4a373;
                letter-spacing: 0.5px;
                margin-top: 2px;
            }

            .lux-m-logo-large {
                height: 45px; /* Logo grande */
                filter: drop-shadow(0 0 10px rgba(212, 163, 115, 0.4));
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
            <div class="lux-pc-tag">Partner</div>
            <img src="patrocinios/Lux/lux-discoteca.webp" style="width: 70px; filter: drop-shadow(0 0 10px rgba(212,163,115,0.3));">
            <div style="margin-top: 15px; width: 15px; height: 1px; background: #d4a373; margin-left: auto; margin-right: auto;"></div>
        `;

        // Banner Móvil
        const bannerMobile = document.createElement('div');
        bannerMobile.id = 'banner-mobile-lux';
        bannerMobile.className = 'banner-lux-mobile';
        bannerMobile.innerHTML = `
            <div class="lux-m-container">
                <div class="lux-m-text-box">
                    <span class="lux-m-small-title">Vida Nocturna</span>
                    <span class="lux-m-patro-by">PATROCINADO POR</span>
                </div>
                <img src="patrocinios/Lux/lux-discoteca.webp" class="lux-m-logo-large" onerror="this.src='https://placehold.co/80x40/000/d4a373?text=LUX'">
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
