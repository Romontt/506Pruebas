const LuxPatrocinio = {
    init: function() {
        this.injectStyles();
        this.createBanners();
        // Sincronización inmediata con el scroll para evitar saltos
        window.addEventListener('scroll', () => this.syncMobileBanner());
        setInterval(() => this.checkStatus(), 300);
    },

    injectStyles: function() {
        if (document.getElementById('lux-styles')) return;
        const style = document.createElement('style');
        style.id = 'lux-styles';
        style.innerHTML = `
            /* TÓTEM PC */
            .banner-lux-pc {
                display: none;
                position: fixed !important;
                left: 25px !important;
                top: 50% !important;
                transform: translateY(-50%);
                width: 125px;
                background: #130f0e;
                border: 1px solid rgba(212, 163, 115, 0.4);
                border-radius: 60px;
                z-index: 10000 !important;
                text-align: center;
                box-shadow: 0 25px 50px rgba(0,0,0,0.7);
                overflow: hidden;
                font-family: 'Montserrat', sans-serif;
                cursor: pointer;
            }

            .lux-header-gold {
                background: #d4a373;
                padding: 15px 5px;
                color: #130f0e;
                font-size: 9px;
                font-weight: 900;
                text-transform: uppercase;
            }

            .lux-totem-body {
                padding: 20px 10px;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 15px;
            }

            /* BANNER MÓVIL STICKY REFORZADO */
            .banner-lux-mobile {
                display: none;
                position: sticky !important;
                /* El top se inyectará dinámicamente por JS */
                width: 100%;
                background: #130f0e;
                border-bottom: 1.5px solid #d4a373;
                color: #ffffff;
                padding: 12px;
                /* El nav es z-50, nosotros somos 49 para que las categorías del nav no se tapen */
                z-index: 49 !important; 
                text-align: center;
                font-family: 'Inter', sans-serif;
                font-size: 11px;
                cursor: pointer;
                box-shadow: 0 4px 10px rgba(0,0,0,0.5);
                transition: transform 0.1s ease-out;
            }

            .banner-lux-mobile b { color: #d4a373; }
        `;
        document.head.appendChild(style);
    },

    createBanners: function() {
        if (document.getElementById('banner-pc-lux')) return;

        const bannerPC = document.createElement('div');
        bannerPC.id = 'banner-pc-lux';
        bannerPC.className = 'banner-lux-pc';
        bannerPC.innerHTML = `
            <div class="lux-header-gold">PATROCINIO</div>
            <div class="lux-totem-body">
                <img src="patrocinios/Lux/lux-discoteca.webp" style="width: 70px;" onerror="this.src='https://placehold.co/80x80/130f0e/d4a373?text=LUX'">
                <p style="color: #d4a373; font-size: 8px; font-weight: 600;">EXCLUSIVA</p>
                <div style="border: 1.5px solid #d4a373; border-radius: 30px; padding: 12px 6px; writing-mode: vertical-rl; color: #d4a373; font-size: 10px; font-weight: 700; text-transform: uppercase;">EXPLORA LUX</div>
            </div>
        `;

        const bannerMobile = document.createElement('div');
        bannerMobile.id = 'banner-mobile-lux';
        bannerMobile.className = 'banner-lux-mobile';
        bannerMobile.innerHTML = `<span>Vida Nocturna • Patrocinado por <b>LUX DISCOTECA</b></span>`;

        bannerPC.onclick = () => this.scrollToLux();
        bannerMobile.onclick = () => this.scrollToLux();

        document.body.appendChild(bannerPC);
        
        // Inyectar móvil justo después del nav
        const navbar = document.querySelector('nav');
        if (navbar) {
            navbar.insertAdjacentElement('afterend', bannerMobile);
        }
    },

    syncMobileBanner: function() {
        const bannerMobile = document.getElementById('banner-mobile-lux');
        const navbar = document.querySelector('nav');
        if (bannerMobile && navbar && bannerMobile.style.display !== 'none') {
            // Calculamos el alto real del nav incluyendo bordes
            const navHeight = navbar.getBoundingClientRect().height;
            // Forzamos el top para que sea idéntico al alto del nav
            bannerMobile.style.top = `${navHeight - 1}px`; // -1px para evitar líneas de luz entre elementos
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
                if(bannerMobile) bannerMobile.style.display = 'block';
                if(bannerPC) bannerPC.style.display = 'none';
                this.syncMobileBanner(); // Sincronizar apenas aparezca
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
                card.style.transition = "all 0.3s ease";
                card.style.border = "2px solid #d4a373";
                
                setTimeout(() => {
                    card.click();
                    setTimeout(() => card.style.border = "", 2000);
                }, 600);
                break;
            }
        }
    }
};

LuxPatrocinio.init();
