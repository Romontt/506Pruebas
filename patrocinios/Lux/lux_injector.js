const LuxPatrocinio = {
    init: function() {
        this.injectStyles();
        this.createBanners();
        // Chequeo constante de categoría
        setInterval(() => this.checkStatus(), 200);
    },

    injectStyles: function() {
        if (document.getElementById('lux-styles')) return;
        const style = document.createElement('style');
        style.id = 'lux-styles';
        style.innerHTML = `
            .banner-lux-pc {
                display: none;
                position: fixed !important;
                left: 20px !important;
                top: 50% !important;
                transform: translateY(-50%) !important;
                width: 110px;
                background: linear-gradient(180deg, rgba(28, 22, 20, 0.98) 0%, rgba(10, 10, 10, 1) 100%);
                border: 1px solid rgba(212, 163, 115, 0.5);
                border-radius: 60px;
                z-index: 10000 !important;
                text-align: center;
                backdrop-filter: blur(15px);
                box-shadow: 0 20px 50px rgba(0,0,0,0.8);
                overflow: hidden;
                font-family: 'Inter', sans-serif;
            }

            .lux-capsule-header {
                background: #d4a373;
                padding: 12px 5px;
                color: #1c1614;
                font-size: 8px;
                font-weight: 900;
                letter-spacing: 1px;
                text-transform: uppercase;
                margin-bottom: 20px;
            }

            .lux-btn-explore {
                margin: 20px auto;
                display: block;
                width: fit-content;
                padding: 15px 8px;
                border: 1px solid #d4a373;
                border-radius: 30px;
                writing-mode: vertical-rl;
                text-orientation: mixed;
                color: #d4a373;
                font-size: 10px;
                letter-spacing: 2px;
                text-transform: uppercase;
                cursor: pointer;
            }

            .banner-lux-mobile {
                display: none;
                position: fixed !important;
                top: 70px !important;
                left: 0;
                width: 100%;
                background: #d4a373;
                color: #130f0e;
                padding: 12px;
                z-index: 9999 !important;
                text-align: center;
                font-weight: 900;
                font-size: 10px;
                letter-spacing: 2px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.4);
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
            <div class="lux-capsule-header">PATROCINIO<br>DE CATEGORÍA</div>
            <div style="padding: 10px 0;">
                <img src="https://romontt.github.io/patrocinios/Lux/lux-discoteca.webp" 
                     style="width: 70px; display: block; margin: 0 auto;" 
                     onerror="this.src='https://placehold.co/70x70/2c1e1a/d4a373?text=LUX'">
            </div>
            <p style="color: #d4a373; font-size: 9px; margin: 10px 0; font-weight: bold; line-height: 1.4;">
                VIDA NOCTURNA<br>EXCLUSIVA
            </p>
            <div class="lux-btn-explore">EXPLORA LUX</div>
        `;

        const bannerMobile = document.createElement('div');
        bannerMobile.id = 'banner-mobile-lux';
        bannerMobile.className = 'banner-lux-mobile';
        bannerMobile.innerHTML = `EXPLORA LA EXPERIENCIA LUX`;

        bannerPC.onclick = () => this.scrollToLux();
        bannerMobile.onclick = () => this.scrollToLux();

        document.body.appendChild(bannerPC);
        document.body.appendChild(bannerMobile);
    },

    checkStatus: function() {
        // Detectar por URL (más seguro en tu sitio)
        const params = new URLSearchParams(window.location.search);
        const esVidaNocturna = params.get('categoria') === 'vida nocturna';
        
        const bannerPC = document.getElementById('banner-pc-lux');
        const bannerMobile = document.getElementById('banner-mobile-lux');

        if (bannerPC && bannerMobile) {
            if (esVidaNocturna) {
                if (window.innerWidth > 768) {
                    bannerPC.style.setProperty('display', 'block', 'important');
                    bannerMobile.style.setProperty('display', 'none', 'important');
                } else {
                    bannerPC.style.setProperty('display', 'none', 'important');
                    bannerMobile.style.setProperty('display', 'block', 'important');
                }
            } else {
                bannerPC.style.setProperty('display', 'none', 'important');
                bannerMobile.style.setProperty('display', 'none', 'important');
            }
        }
    },

    scrollToLux: function() {
        // Busca cualquier card que mencione LUX
        const cards = document.querySelectorAll('.glass-card');
        for (let card of cards) {
            if (card.textContent.toUpperCase().includes('LUX')) {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                card.style.border = "2px solid #d4a373";
                break;
            }
        }
    }
};

// Ejecución inmediata
LuxPatrocinio.init();
