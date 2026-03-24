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

            /* TÓTEM PC - ESTILO FIEL A LA IMAGEN */
            .banner-lux-pc {
                display: none;
                position: fixed !important;
                left: 25px !important;
                top: 50% !important;
                transform: translateY(-50%);
                width: 125px;
                background: #130f0e;
                border: 1px solid rgba(212, 163, 115, 0.4);
                border-radius: 60px; /* Cápsula perfecta */
                z-index: 10000 !important;
                text-align: center;
                box-shadow: 0 25px 50px rgba(0,0,0,0.7);
                overflow: hidden;
                font-family: 'Montserrat', sans-serif;
            }

            .lux-header-gold {
                background: #d4a373;
                padding: 15px 5px;
                color: #130f0e;
                font-size: 9px;
                font-weight: 900;
                letter-spacing: 1px;
                text-transform: uppercase;
                line-height: 1.2;
            }

            .lux-totem-body {
                padding: 25px 10px;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 20px;
            }

            .lux-btn-oval {
                border: 1.5px solid #d4a373;
                border-radius: 30px;
                padding: 15px 8px;
                writing-mode: vertical-rl;
                text-orientation: mixed;
                color: #d4a373;
                font-size: 10px;
                font-weight: 700;
                letter-spacing: 3px;
                text-transform: uppercase;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .lux-btn-oval:hover {
                background: rgba(212, 163, 115, 0.1);
            }

            /* BANNER MÓVIL - POSICIÓN CORREGIDA */
            .banner-lux-mobile {
                display: none;
                position: fixed !important;
                top: 85px !important; /* Aumentado para que baje del navbar */
                left: 5%;
                width: 90%;
                background: rgba(19, 15, 14, 0.98);
                border: 1px solid #d4a373;
                border-radius: 10px;
                color: #ffffff;
                padding: 12px;
                z-index: 9998 !important; /* Un nivel abajo del navbar si es necesario */
                text-align: center;
                box-shadow: 0 10px 20px rgba(0,0,0,0.5);
                backdrop-filter: blur(10px);
            }

            .banner-lux-mobile b { color: #d4a373; }
        `;
        document.head.appendChild(style);
    },

    createBanners: function() {
        if (document.getElementById('banner-pc-lux')) return;

        // Crear PC
        const bannerPC = document.createElement('div');
        bannerPC.id = 'banner-pc-lux';
        bannerPC.className = 'banner-lux-pc';
        bannerPC.innerHTML = `
            <div class="lux-header-gold">PATROCINIO<br>DE CATEGORÍA</div>
            <div class="lux-totem-body">
                <img src="patrocinios/Lux/lux-discoteca.webp" 
                     style="width: 80px; filter: drop-shadow(0 0 10px rgba(212,163,115,0.3));" 
                     onerror="this.src='https://placehold.co/80x80/130f0e/d4a373?text=LUX'">
                <p style="color: #d4a373; font-size: 9px; font-weight: 500; letter-spacing: 1px; margin: 0;">
                    VIDA NOCTURNA<br>EXCLUSIVA
                </p>
                <div class="lux-btn-oval">EXPLORA LUX</div>
            </div>
        `;

        // Crear Móvil
        const bannerMobile = document.createElement('div');
        bannerMobile.id = 'banner-mobile-lux';
        bannerMobile.className = 'banner-lux-mobile';
        bannerMobile.innerHTML = `<span>Vida Nocturna • Patrocinado por <b>LUX</b></span>`;

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
