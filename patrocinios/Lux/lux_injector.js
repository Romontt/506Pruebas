const LuxPatrocinio = {
    init: function() {
        this.injectStyles();
        this.createBanners();
        setInterval(() => this.checkStatus(), 200);
    },

    injectStyles: function() {
        if (document.getElementById('lux-styles')) return;
        const style = document.createElement('style');
        style.id = 'lux-styles';
        style.innerHTML = `
            @keyframes luxFadeIn {
                from { opacity: 0; transform: translateY(-45%) scale(0.95); }
                to { opacity: 1; transform: translateY(-50%) scale(1); }
            }

            /* TÓTEM PC - DISEÑO CÁPSULA ROBUSTA */
            .banner-lux-pc {
                display: none;
                position: fixed !important;
                left: 20px !important;
                top: 50% !important;
                transform: translateY(-50%);
                width: 120px;
                background: #130f0e; /* Fondo sólido como la imagen */
                border: 1.5px solid #d4a373;
                border-radius: 60px;
                z-index: 10000 !important;
                text-align: center;
                box-shadow: 0 20px 40px rgba(0,0,0,0.8);
                overflow: hidden;
                font-family: 'Montserrat', sans-serif;
            }

            .lux-header-gold {
                background: #d4a373;
                padding: 12px 5px;
                color: #130f0e;
                font-size: 10px;
                font-weight: 900;
                letter-spacing: 1px;
                text-transform: uppercase;
                border-bottom: 1.5px solid #d4a373;
            }

            .lux-totem-body {
                padding: 20px 10px;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 15px;
            }

            .lux-btn-oval {
                border: 1px solid #d4a373;
                border-radius: 25px;
                padding: 12px 6px;
                writing-mode: vertical-rl;
                text-orientation: mixed;
                color: #d4a373;
                font-size: 10px;
                font-weight: 700;
                letter-spacing: 2px;
                text-transform: uppercase;
                margin-top: 5px;
                transition: 0.3s;
            }

            /* BANNER MÓVIL - DEBAJO DEL HEADER */
            .banner-lux-mobile {
                display: none;
                position: sticky !important; /* Cambiado a sticky para que fluya con el header */
                top: 70px !important; /* Ajusta según el alto de tu header real */
                width: 94%;
                margin: 5px auto;
                background: #130f0e;
                border: 1px solid #d4a373;
                border-radius: 8px;
                color: #ffffff;
                padding: 10px;
                z-index: 9000 !important;
                text-align: center;
                box-shadow: 0 5px 15px rgba(0,0,0,0.5);
                font-size: 11px;
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
                <img src="patrocinios/Lux/lux-discoteca.webp" 
                     style="width: 75px; height: auto;" 
                     onerror="this.src='https://placehold.co/80x80/130f0e/d4a373?text=LUX'">
                <p style="color: #d4a373; font-size: 9px; font-weight: 600; margin: 0;">VIDA NOCTURNA</p>
                <div class="lux-btn-oval">EXPLORA LUX</div>
            </div>
        `;

        const bannerMobile = document.createElement('div');
        bannerMobile.id = 'banner-mobile-lux';
        bannerMobile.className = 'banner-lux-mobile';
        bannerMobile.innerHTML = `Vida Nocturna • Patrocinado por <b>LUX</b>`;

        bannerPC.onclick = () => this.scrollToLux();
        bannerMobile.onclick = () => this.scrollToLux();

        document.body.appendChild(bannerPC);
        document.body.appendChild(bannerMobile);
    },

    checkStatus: function() {
        const params = new URLSearchParams(window.location.search);
        const esVidaNocturna = params.get('categoria') === 'vida nocturna';
        
        const bannerPC = document.getElementById('banner-pc-lux');
        const bannerMobile = document.getElementById('banner-mobile-lux');

        if (esVidaNocturna) {
            if (bannerPC.style.display !== 'block' && bannerMobile.style.display !== 'block') {
                setTimeout(() => {
                    if (window.innerWidth > 768) {
                        bannerPC.style.display = 'block';
                        bannerPC.style.animation = 'luxFadeIn 0.8s ease forwards';
                    } else {
                        bannerMobile.style.display = 'block';
                    }
                }, 600);
            }
        } else {
            if(bannerPC) bannerPC.style.display = 'none';
            if(bannerMobile) bannerMobile.style.display = 'none';
        }
    },

    scrollToLux: function() {
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

LuxPatrocinio.init();
