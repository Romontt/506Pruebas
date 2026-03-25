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
                from { opacity: 0; transform: translateX(-20px) translateY(-50%); }
                to { opacity: 1; transform: translateX(0) translateY(-50%); }
            }

            @keyframes neonPulse {
                0% { filter: drop-shadow(0 0 5px #d4a373); transform: scale(1.02); }
                50% { filter: drop-shadow(0 0 15px rgba(212, 163, 115, 0.6)); transform: scale(1.05); }
                100% { filter: drop-shadow(0 0 5px #d4a373); transform: scale(1.02); }
            }

            /* TÓTEM PC - REPLICANDO IMAGEN EXACTA */
            .banner-lux-pc {
                display: none;
                position: fixed !important;
                left: 25px !important;
                top: 50% !important;
                transform: translateY(-50%);
                width: 80px;
                height: 480px; /* Aumentado para acomodar el nuevo diseño */
                background: #000;
                border: 1px solid rgba(212, 163, 115, 0.5);
                border-radius: 0 0 40px 40px; /* Plano arriba, curvo abajo */
                z-index: 10000 !important;
                text-align: center;
                box-shadow: 0 20px 50px rgba(0,0,0,0.9);
                font-family: 'Montserrat', sans-serif;
                animation: luxFadeIn 0.8s ease-out forwards;
                cursor: pointer;
                overflow: hidden;
            }

            .lux-pc-header-flat {
                background: #d4a373; /* Fondo dorado plano */
                color: #000;
                padding: 15px 5px;
                font-size: 9px;
                font-weight: 800;
                line-height: 1.3;
                letter-spacing: 0.5px;
                text-transform: uppercase;
                border-bottom: 2px solid rgba(0,0,0,0.2);
            }

            .lux-pc-body {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 20px 0;
                height: calc(100% - 60px); /* Ajuste para el header plano */
                justify-content: space-between;
            }

            /* Sección amarilla de referencia - Logo Grande */
            .lux-pc-logo-section {
                padding: 10px 0;
            }

            .lux-pc-main-logo {
                width: 70px; /* Logo grande según referencia amarilla */
                transition: transform 0.3s ease;
                filter: drop-shadow(0 0 10px rgba(212, 163, 115, 0.3));
            }

            /* Sección roja de referencia - Texto Vertical al revés apuntando al logo */
            .lux-pc-sponsored-section {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 5px;
                margin-top: -10px; /* Acerca el texto al logo */
            }

            .lux-pc-vertical-sponsored {
                writing-mode: vertical-rl;
                transform: rotate(180deg); /* Volteado hacia el otro lado apuntando arriba */
                color: #d4a373;
                font-size: 8px;
                letter-spacing: 2px;
                font-weight: 600;
                text-transform: uppercase;
                opacity: 0.9;
            }

            /* Sección de Vida Nocturna y Botón */
            .lux-pc-footer-section {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 15px;
                padding-bottom: 20px;
            }

            .lux-pc-vertical-text {
                writing-mode: vertical-rl;
                text-orientation: mixed;
                color: #fff;
                font-size: 12px;
                letter-spacing: 4px;
                text-transform: uppercase;
                opacity: 0.9;
                font-weight: 300;
            }

            .lux-pc-btn {
                font-size: 8px;
                color: #d4a373;
                border: 1px solid #d4a373;
                padding: 6px 10px;
                border-radius: 20px;
                font-weight: bold;
                letter-spacing: 1px;
                text-transform: uppercase;
                white-space: nowrap;
            }

            /* MANTENIENDO TU ESTILO MÓVIL EXACTO */
            .banner-lux-mobile {
                display: none;
                position: sticky !important;
                width: 100%;
                background: #000;
                border-bottom: 1px solid #d4a373;
                padding: 10px 15px;
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

            .lux-m-text {
                font-size: 9px;
                color: #fff;
                letter-spacing: 1px;
                text-transform: uppercase;
                font-weight: 600;
            }

            .lux-m-text b { color: #d4a373; margin-left: 4px; }

            .lux-m-logo-neon {
                height: 65px;
                margin: -10px 0;
                animation: neonPulse 3s infinite ease-in-out;
                object-fit: contain;
            }
        `;
        document.head.appendChild(style);
    },

    createBanners: function() {
        if (document.getElementById('banner-pc-lux')) return;

        // PC - Estructura Totem Basada en tus nuevas referencias exactas
        const bannerPC = document.createElement('div');
        bannerPC.id = 'banner-pc-lux';
        bannerPC.className = 'banner-lux-pc';
        bannerPC.innerHTML = `
            <div class="lux-pc-header-flat">PATROCINIO<br>DE CATEGORÍA</div>
            <div class="lux-pc-body">
                <div class="lux-pc-logo-section">
                    <img src="patrocinios/Lux/lux-discoteca.png" class="lux-pc-main-logo">
                </div>
                <div class="lux-pc-sponsored-section">
                    <div class="lux-pc-vertical-sponsored">PATROCINADO POR</div>
                </div>
            </div>
        `;

        // Móvil - Manteniendo tu banner actual exacto
        const bannerMobile = document.createElement('div');
        bannerMobile.id = 'banner-mobile-lux';
        bannerMobile.className = 'banner-lux-mobile';
        bannerMobile.innerHTML = `
            <div class="lux-m-container">
                <div class="lux-m-text">VIDA NOCTURNA<b>• PATROCINADO POR</b></div>
                <img src="patrocinios/Lux/lux-discoteca.png" class="lux-m-logo-neon" onerror="this.src='https://placehold.co/100x50/000/d4a373?text=LUX'">
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
