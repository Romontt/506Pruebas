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

            /* TÓTEM PC - DISEÑO ORIGINAL TIPO CÁPSULA VERTICAL */
            .banner-lux-pc {
                display: none;
                position: fixed !important;
                left: 10px !important;
                top: 50% !important;
                transform: translateY(-50%);
                width: 130px;
                background: linear-gradient(145deg, #130f0e, #1c1817);
                border: 1px solid rgba(212, 163, 115, 0.5);
                border-radius: 65px;
                z-index: 10000 !important;
                text-align: center;
                box-shadow: 0 30px 60px rgba(0,0,0,0.8);
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
                text-transform: uppercase;
                letter-spacing: 1.5px;
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
                text-transform: uppercase;
                letter-spacing: 4px;
            }

            /* BANNER MÓVIL - CÁPSULA FLOTANTE (SIN FONDO CAFÉ) */
            .banner-lux-mobile {
                display: none; /* Controlado por JS */
                position: sticky !important;
                width: 92%;
                margin: 15px auto !important; /* Espacio para que no choque con el nav */
                background: rgba(19, 15, 14, 0.65) !important; /* Traslúcido */
                backdrop-filter: blur(12px) !important; /* Efecto cristal */
                border: 1px solid rgba(212, 163, 115, 0.35) !important;
                border-radius: 50px !important; /* Cápsula horizontal */
                padding: 10px 18px !important;
                z-index: 49 !important;
                box-shadow: 0 10px 25px rgba(0,0,0,0.5), 0 0 15px rgba(212, 163, 115, 0.1);
                
                /* Layout para alinear logo, texto y botón */
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 12px;
                cursor: pointer;
                font-family: 'Inter', sans-serif;
            }

            /* Contenedor de texto móvil */
            .lux-m-info {
                display: flex;
                flex-direction: column;
                text-align: left;
                flex-grow: 1;
            }

            .lux-m-info span {
                font-size: 9px;
                text-transform: uppercase;
                letter-spacing: 1px;
                color: rgba(255,255,255,0.7);
            }

            .lux-m-info b {
                color: #d4a373;
                font-size: 13px;
                font-weight: 700;
                letter-spacing: 0.5px;
            }

            /* Botón mini de la cápsula móvil */
            .lux-m-btn {
                border: 1px solid #d4a373;
                border-radius: 20px;
                color: #d4a373;
                font-size: 10px;
                font-weight: 800;
                padding: 5px 12px;
                text-transform: uppercase;
            }
        `;
        document.head.appendChild(style);
    },

    createBanners: function() {
        if (document.getElementById('banner-pc-lux')) return;

        // Crear Banner PC
        const bannerPC = document.createElement('div');
        bannerPC.id = 'banner-pc-lux';
        bannerPC.className = 'banner-lux-pc';
        bannerPC.innerHTML = `
            <div class="lux-header-gold">PARTNER<br>PREMIUM</div>
            <div class="lux-totem-body">
                <img src="patrocinios/Lux/lux-discoteca.webp" style="width: 85px;" onerror="this.src='https://placehold.co/80x80/130f0e/d4a373?text=LUX'">
                <p style="color: #d4a373; font-size: 10px; font-weight: 600;">VIDA NOCTURNA</p>
                <div class="lux-btn-oval">DESCUBRIR LUX</div>
            </div>
        `;

        // Crear Banner Móvil (Diseño Cápsula Horizontal)
        const bannerMobile = document.createElement('div');
        bannerMobile.id = 'banner-mobile-lux';
        bannerMobile.className = 'banner-lux-mobile';
        bannerMobile.innerHTML = `
            <img src="patrocinios/Lux/lux-discoteca.webp" style="width: 32px; height: 32px; object-fit: contain;" onerror="this.src='https://placehold.co/32x32/130f0e/d4a373?text=L'">
            <div class="lux-m-info">
                <span>Patrocinado</span>
                <b>LUX DISCOTECA</b>
            </div>
            <div class="lux-m-btn">VER</div>
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
        const luxCard = cards.find(card => card.textContent.toUpperCase().includes('LUX'));
        if (luxCard && container.firstChild !== luxCard) container.prepend(luxCard);
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
                    bannerMobile.style.display = 'flex'; // Usamos flex para el layout horizontal
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
            if (card.textContent.toUpperCase().includes('LUX')) {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                card.style.border = "2px solid #d4a373";
                setTimeout(() => {
                    card.click();
                    setTimeout(() => card.style.border = "", 2000);
                }, 800);
                break;
            }
        }
    }
};

LuxPatrocinio.init();
