/**
 * PUNTO 506 - MÓDULO DE PATROCINIO LUX (Versión Elite)
 * Inyector autónomo con delay de carga y diseño refinado.
 */

const LuxPatrocinio = {
    init: function() {
        this.injectStyles();
        this.createBanners();
        // Chequeo constante de categoría para SPA
        setInterval(() => this.checkStatus(), 200);
    },

    injectStyles: function() {
        if (document.getElementById('lux-styles')) return;
        const style = document.createElement('style');
        style.id = 'lux-styles';
        style.innerHTML = `
            /* Animación de entrada suave con desenfoque */
            @keyframes luxFadeIn {
                from { opacity: 0; transform: translateY(-40%) scale(0.95); filter: blur(10px); }
                to { opacity: 1; transform: translateY(-50%) scale(1); filter: blur(0px); }
            }

            .banner-lux-pc {
                display: none;
                position: fixed !important;
                left: 30px !important;
                top: 50% !important;
                transform: translateY(-50%);
                width: 100px;
                background: rgba(19, 15, 14, 0.9);
                border: 1px solid rgba(212, 163, 115, 0.2);
                border-radius: 50px;
                z-index: 10000 !important;
                text-align: center;
                backdrop-filter: blur(20px);
                box-shadow: 0 15px 35px rgba(0,0,0,0.4);
                overflow: hidden;
                font-family: 'Inter', sans-serif;
                opacity: 0; /* Empieza invisible para la animación */
            }

            .lux-capsule-header {
                background: rgba(212, 163, 115, 0.1);
                border-bottom: 1px solid rgba(212, 163, 115, 0.2);
                padding: 10px 5px;
                color: #d4a373;
                font-size: 7px;
                font-weight: 400;
                letter-spacing: 2px;
                text-transform: uppercase;
            }

            .lux-btn-explore {
                margin: 15px auto 25px;
                display: block;
                padding: 12px 6px;
                border: 1px solid rgba(212, 163, 115, 0.4);
                border-radius: 20px;
                writing-mode: vertical-rl;
                text-orientation: mixed;
                color: #d4a373;
                font-size: 9px;
                letter-spacing: 3px;
                text-transform: uppercase;
                cursor: pointer;
                transition: all 0.4s ease;
            }

            .lux-btn-explore:hover {
                background: #d4a373;
                color: #1c1614;
            }

            /* BANNER MÓVIL REFINADO (Estilo Cápsula) */
            .banner-lux-mobile {
                display: none;
                position: fixed !important;
                top: 75px !important; /* Ajustado para quedar debajo del nav */
                left: 5%;
                width: 90%;
                background: rgba(19, 15, 14, 0.95);
                border: 1px solid rgba(212, 163, 115, 0.3);
                border-radius: 12px;
                color: #f3f4f6;
                padding: 12px;
                z-index: 9999 !important;
                text-align: center;
                box-shadow: 0 10px 25px rgba(0,0,0,0.5);
                backdrop-filter: blur(10px);
                opacity: 0;
            }

            .banner-lux-mobile span {
                font-size: 9px;
                letter-spacing: 1px;
                text-transform: uppercase;
            }

            .banner-lux-mobile b {
                color: #d4a373;
                margin-left: 5px;
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
            <div class="lux-capsule-header">SOCIO ELITE</div>
            <div style="padding: 20px 0;">
                <img src="https://romontt.github.io/506Pruebas/img/logolux.webp" 
                     style="width: 65px; display: block; margin: 0 auto; opacity: 0.9;" 
                     onerror="this.src='https://placehold.co/70x70/2c1e1a/d4a373?text=LUX'">
            </div>
            <div class="lux-btn-explore">EXPLORA LUX</div>
        `;

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
            // Solo si no se están mostrando ya (display none y opacidad 0)
            if (bannerPC.style.display !== 'block' && bannerMobile.style.display !== 'block') {
                
                // DELAY DE CARGA: Aparece 800ms después de detectar la categoría
                setTimeout(() => {
                    if (window.innerWidth > 768) {
                        bannerPC.style.display = 'block';
                        bannerPC.style.animation = 'luxFadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards';
                    } else {
                        bannerMobile.style.display = 'block';
                        bannerMobile.style.animation = 'luxFadeIn 1s ease forwards';
                    }
                }, 800);
            }
        } else {
            // Desaparecer inmediatamente en otras categorías
            if(bannerPC) {
                bannerPC.style.display = 'none';
                bannerPC.style.opacity = '0';
            }
            if(bannerMobile) {
                bannerMobile.style.display = 'none';
                bannerMobile.style.opacity = '0';
            }
        }
    },

    scrollToLux: function() {
        const cards = document.querySelectorAll('.glass-card');
        for (let card of cards) {
            if (card.textContent.toUpperCase().includes('LUX')) {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Efecto visual de resaltado temporal
                card.style.transition = "all 0.5s ease";
                card.style.border = "2px solid #d4a373";
                card.style.boxShadow = "0 0 20px rgba(212, 163, 115, 0.4)";
                
                setTimeout(() => {
                    card.style.boxShadow = "";
                }, 2000);
                break;
            }
        }
    }
};

LuxPatrocinio.init();
