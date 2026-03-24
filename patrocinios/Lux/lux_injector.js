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

            /* BANNER MÓVIL - FIJO TOTALMENTE */
            .banner-lux-mobile {
                display: none;
                position: fixed !important; 
                top: 72px !important; /* Ajuste para que quede pegado al nav de Punto 506 */
                left: 0;
                width: 100%;
                background: #130f0e;
                border-bottom: 1.5px solid #d4a373;
                color: #ffffff;
                padding: 8px 10px;
                z-index: 49 !important; /* Justo debajo del nav (z-50) */
                text-align: center;
                box-shadow: 0 4px 10px rgba(0,0,0,0.8);
                font-family: 'Inter', sans-serif;
                font-size: 10px;
                text-transform: uppercase;
                letter-spacing: 1px;
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
                <img src="patrocinios/Lux/lux-discoteca.webp" style="width: 80px;" onerror="this.src='https://placehold.co/80x80/130f0e/d4a373?text=LUX'">
                <p style="color: #d4a373; font-size: 9px; font-weight: 500; margin: 0;">VIDA NOCTURNA</p>
                <div class="lux-btn-oval">VER DISCOTECA</div>
            </div>
        `;

        const bannerMobile = document.createElement('div');
        bannerMobile.id = 'banner-mobile-lux';
        bannerMobile.className = 'banner-lux-mobile';
        bannerMobile.innerHTML = `<span>Patrocinado por <b>LUX DISCOTECA</b> • Ver más</span>`;

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
            if (window.innerWidth > 768) {
                bannerPC.style.display = 'block';
                bannerMobile.style.display = 'none';
            } else {
                bannerMobile.style.display = 'block';
                bannerPC.style.display = 'none';
            }
        } else {
            if(bannerPC) bannerPC.style.display = 'none';
            if(bannerMobile) bannerMobile.style.display = 'none';
        }
    },

    scrollToLux: function() {
        // Buscamos todas las tarjetas
        const cards = document.querySelectorAll('.glass-card, .business-card'); 
        let found = false;

        for (let card of cards) {
            // Buscamos específicamente "DISCOTECA" para no confundir con el Sport Bar
            if (card.textContent.toUpperCase().includes('LUX DISCOTECA') || 
               (card.textContent.toUpperCase().includes('LUX') && card.textContent.toUpperCase().includes('DISCO'))) {
                
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Efecto visual de selección
                card.style.transition = "all 0.5s ease";
                card.style.border = "2px solid #d4a373";
                card.style.boxShadow = "0 0 20px rgba(212, 163, 115, 0.5)";

                // DISPARAR EL MODAL: 
                // Simulamos un clic en la tarjeta para que tu sistema abra el detalle
                setTimeout(() => {
                    card.click();
                }, 600);

                setTimeout(() => {
                    card.style.border = "";
                    card.style.boxShadow = "";
                }, 3000);

                found = true;
                break;
            }
        }

        if (!found) console.log("No se encontró la tarjeta específica de LUX Discoteca");
    }
};

LuxPatrocinio.init();
