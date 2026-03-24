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

            /* TÓTEM PC - DISEÑO ORIGINAL */
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
            }

            /* BANNER MÓVIL - CORREGIDO PRIORIDAD */
            .banner-lux-mobile {
                display: none;
                position: fixed !important; 
                top: 72px !important;       /* Pegado al nav móvil */
                left: 0;
                width: 100%;
                background: #130f0e;
                border-bottom: 1.5px solid #d4a373;
                color: #ffffff;
                padding: 10px;
                /* Subimos el z-index a 100 para que no lo tape el nav (z-50) */
                z-index: 100 !important;      
                text-align: center;
                box-shadow: 0 4px 15px rgba(0,0,0,0.8);
                font-family: 'Inter', sans-serif;
                font-size: 11px;
                cursor: pointer;
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

        const bannerMobile = document.createElement('div');
        bannerMobile.id = 'banner-mobile-lux';
        bannerMobile.className = 'banner-lux-mobile';
        bannerMobile.innerHTML = `<span>Vida Nocturna • Patrocinado por <b>LUX DISCOTECA</b></span>`;

        bannerPC.onclick = () => this.scrollToLux();
        bannerMobile.onclick = () => this.scrollToLux();

        // Inyectamos directo al body para máxima jerarquía
        document.body.appendChild(bannerPC);
        document.body.appendChild(bannerMobile);
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
            }
        } else {
            if(bannerPC) bannerPC.style.display = 'none';
            if(bannerMobile) bannerMobile.style.display = 'none';
        }
    },

    scrollToLux: function() {
        // Buscamos todas las tarjetas disponibles
        const cards = document.querySelectorAll('.glass-card, [onclick*="abrirModal"]');
        
        for (let card of cards) {
            const contenido = card.textContent.toUpperCase();
            // Filtro específico para Discoteca (evita Sport Bar)
            if (contenido.includes('LUX') && (contenido.includes('DISCOTECA') || contenido.includes('NIGHT'))) {
                
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Feedback visual
                card.style.transition = "all 0.3s ease";
                card.style.border = "2px solid #d4a373";
                card.style.boxShadow = "0 0 20px rgba(212, 163, 115, 0.4)";
                
                setTimeout(() => {
                    // Abrimos el modal de la tarjeta
                    card.click();
                    setTimeout(() => {
                        card.style.border = "";
                        card.style.boxShadow = "";
                    }, 2000);
                }, 700);
                
                break;
            }
        }
    }
};

LuxPatrocinio.init();
