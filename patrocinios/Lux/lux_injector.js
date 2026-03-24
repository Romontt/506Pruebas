const LuxPatrocinio = {
    init: function() {
        this.injectStyles();
        this.createBanners();
        // Verificamos el estado constantemente
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
                z-index: 999 !important;
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
                transition: all 0.3s ease;
            }

            /* BANNER MÓVIL - DEBAJO DEL NAV */
            .banner-lux-mobile {
                display: none;
                position: fixed !important;
                top: 72px !important; /* Ajuste para que quede debajo del nav */
                left: 0;
                width: 100%;
                background: rgba(19, 15, 14, 0.98);
                border-bottom: 1px solid #d4a373;
                color: #ffffff;
                padding: 12px;
                z-index: 40 !important; /* Menor que el nav (50) para que no lo tape */
                text-align: center;
                box-shadow: 0 4px 10px rgba(0,0,0,0.5);
                backdrop-filter: blur(10px);
                font-family: 'Inter', sans-serif;
                font-size: 11px;
                cursor: pointer;
            }

            .banner-lux-mobile b { color: #d4a373; }
            
            @keyframes mobileSlideIn {
                from { opacity: 0; transform: translateY(-10px); }
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
            <div class="lux-header-gold">PATROCINIO<br>DE CATEGORÍA</div>
            <div class="lux-totem-body">
                <img src="patrocinios/Lux/lux-discoteca.webp" style="width: 80px;" onerror="this.src='https://placehold.co/80x80/130f0e/d4a373?text=LUX'">
                <p style="color: #d4a373; font-size: 9px; font-weight: 500; margin: 0;">VIDA NOCTURNA</p>
                <div class="lux-btn-oval">EXPLORA LUX</div>
            </div>
        `;

        const bannerMobile = document.createElement('div');
        bannerMobile.id = 'banner-mobile-lux';
        bannerMobile.className = 'banner-lux-mobile';
        bannerMobile.innerHTML = `<span>Patrocinado por <b>LUX DISCOTECA</b> • Ver ahora</span>`;

        bannerPC.onclick = () => this.scrollToLux();
        bannerMobile.onclick = () => this.scrollToLux();

        document.body.appendChild(bannerPC);
        document.body.appendChild(bannerMobile);
    },

    // NUEVA FUNCIÓN: Mueve la tarjeta de Lux al inicio
    prioritizeLuxCard: function() {
        const container = document.getElementById('results-container') || document.querySelector('.grid');
        if (!container) return;

        const cards = Array.from(container.children);
        const luxCard = cards.find(card => 
            card.textContent.toUpperCase().includes('LUX DISCOTECA') || 
            (card.textContent.toUpperCase().includes('LUX') && !card.textContent.toUpperCase().includes('BAR'))
        );

        if (luxCard && container.firstChild !== luxCard) {
            container.insertBefore(luxCard, container.firstChild);
        }
    },

    checkStatus: function() {
        const params = new URLSearchParams(window.location.search);
        const esVidaNocturna = params.get('categoria') === 'vida nocturna';
        
        const bannerPC = document.getElementById('banner-pc-lux');
        const bannerMobile = document.getElementById('banner-mobile-lux');

        if (esVidaNocturna) {
            // Priorizamos la tarjeta antes de mostrar banners
            this.prioritizeLuxCard();

            if (window.innerWidth > 768) {
                if (bannerPC.style.display !== 'block') {
                    bannerPC.style.display = 'block';
                    bannerPC.style.animation = 'luxFadeIn 0.8s ease forwards';
                }
                bannerMobile.style.display = 'none';
            } else {
                if (bannerMobile.style.display !== 'block') {
                    bannerMobile.style.display = 'block';
                    bannerMobile.style.animation = 'mobileSlideIn 0.5s ease forwards';
                }
                bannerPC.style.display = 'none';
            }
        } else {
            if(bannerPC) bannerPC.style.display = 'none';
            if(bannerMobile) bannerMobile.style.display = 'none';
        }
    },

    scrollToLux: function() {
        const cards = document.querySelectorAll('.glass-card, .business-card');
        for (let card of cards) {
            const txt = card.textContent.toUpperCase();
            if (txt.includes('LUX') && (txt.includes('DISCOTECA') || txt.includes('NIGHT'))) {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                card.style.border = "2px solid #d4a373";
                
                // Abrir el modal automáticamente
                setTimeout(() => {
                    card.click();
                }, 600);
                break;
            }
        }
    }
};

LuxPatrocinio.init();
