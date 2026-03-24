const LuxPatrocinio = {
    init: function() {
        this.injectStyles();
        this.createBanners();
        
        // Sincronización para que no se esconda al escrolear en móvil (Mantiene tu lógica)
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

            @keyframes shine {
                0% { background-position: -100px; }
                100% { background-position: 200px; }
            }

            /* TÓTEM PC - SE MANTIENE EXACTO */
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
                box-shadow: 0 30px 60px rgba(0,0,0,0.8), inset 0 0 15px rgba(212, 163, 115, 0.05);
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
                letter-spacing: 1.5px;
                text-transform: uppercase;
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
                letter-spacing: 4px;
                text-transform: uppercase;
                transition: all 0.4s ease;
            }

            /* =========================================
               NUEVO BANNER MÓVIL - ESTILOreferencia
               Mantiene posición STICKY y lógica JS
               ========================================= */
            .banner-lux-mobile {
                display: none; /* Controlado por JS */
                position: sticky !important; /* Mantiene tu lógica sticky */
                top: 0; /* Ajustado dinámicamente por syncMobilePosition() */
                
                /* Diseño Cápsula "Glow & Glass" */
                width: 92%; /* Flota en la pantalla como la referencia */
                margin: 10px auto !important; /* Centrado horizontal y separación del nav */
                background: rgba(19, 15, 14, 0.6) !important; /* Traslúcido premium */
                backdrop-filter: blur(10px) !important; /* Desenfoque esmerilado */
                border: 1px solid rgba(212, 163, 115, 0.3) !important; /* Borde sutil */
                border-radius: 40px !important; /* Forma de cápsula completa */
                
                color: #ffffff;
                padding: 12px 15px !important; /* Espaciado interno horizontal */
                z-index: 49 !important; /* Justo debajo del nav (50) */
                
                /* Brillo Perimetral Dorado (referencia Glow) */
                box-shadow: 0 4px 15px rgba(212, 163, 115, 0.2) !important; 
                
                /* Layout Horizontal */
                display: flex !important;
                align-items: center !important;
                justify-content: space-between !important;
                gap: 10px;
                
                cursor: pointer;
                font-family: 'Inter', sans-serif;
                animation: mobileSlideIn 0.5s ease-out;
            }

            /* Sección de Texto Central (Copia del estilo de referencia) */
            .banner-lux-mobile .info-container {
                display: flex;
                flex-direction: column;
                text-align: left;
                flex-grow: 1;
            }

            .banner-lux-mobile .info-container span {
                font-size: 10px;
                letter-spacing: 0.5px;
                opacity: 0.8;
            }

            .banner-lux-mobile .info-container b {
                color: #d4a373; 
                font-size: 12px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 1px;
                /* Sutil destello en el nombre de la marca */
                text-shadow: 0 0 8px rgba(212, 163, 115, 0.3);
            }

            /* Botón de Acción derecho (Estiloreferencia) */
            .banner-lux-mobile .action-btn {
                border: 1px solid #d4a373;
                border-radius: 20px;
                color: #d4a373;
                font-size: 10px;
                font-weight: 700;
                text-transform: uppercase;
                padding: 6px 14px;
                letter-spacing: 1px;
                white-space: nowrap;
            }

            @keyframes mobileSlideIn {
                from { opacity: 0; transform: translateY(-20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    },

    createBanners: function() {
        if (document.getElementById('banner-pc-lux')) return;

        // Banner PC - Estructura Original (Se mantiene)
        const bannerPC = document.createElement('div');
        bannerPC.id = 'banner-pc-lux';
        bannerPC.className = 'banner-lux-pc';
        bannerPC.innerHTML = `
            <div class="lux-header-gold">PARTNER<br>PREMIUM</div>
            <div class="lux-totem-body">
                <img src="patrocinios/Lux/lux-discoteca.webp" 
                     style="width: 85px; filter: drop-shadow(0 0 15px rgba(212,163,115,0.4));" 
                     onerror="this.src='https://placehold.co/80x80/130f0e/d4a373?text=LUX'">
                <p style="color: #d4a373; font-size: 10px; font-weight: 600; letter-spacing: 1.2px; margin: 0; line-height: 1.4;">
                    VIDA NOCTURNA<br><span style="color: #fff; font-size: 8px; opacity: 0.8;">EXPERIENCIA LUX</span>
                </p>
                <div class="lux-btn-oval">DESCUBRIR LUX</div>
            </div>
        `;

        // Banner Móvil - NUEVA ESTRUCTURA HORIZONTAL (Tipo referencia)
        const bannerMobile = document.createElement('div');
        bannerMobile.id = 'banner-mobile-lux';
        bannerMobile.className = 'banner-lux-mobile';
        // Mismos textos pero en layout horizontal premium
        bannerMobile.innerHTML = `
            <img src="patrocinios/Lux/lux-discoteca.webp" 
                 style="width: 32px; height: 32px; object-fit: contain;" 
                 onerror="this.src='https://placehold.co/32x32/130f0e/d4a373?text=L'">
            <div class="info-container">
                <span>VIDA NOCTURNA • PATROCINADO</span>
                <b>LUX DISCOTECA</b>
            </div>
            <div class="action-btn">VER</div>
        `;

        bannerPC.onclick = () => this.scrollToLux();
        bannerMobile.onclick = () => this.scrollToLux();

        document.body.appendChild(bannerPC);
        
        // Mantiene tu lógica de inserción DOM
        const navbar = document.querySelector('nav');
        if (navbar) {
            navbar.insertAdjacentElement('afterend', bannerMobile);
        }
    },

    // Mantiene tu lógica sticky exacta
    syncMobilePosition: function() {
        const bannerMobile = document.getElementById('banner-mobile-lux');
        const navbar = document.querySelector('nav');
        if (bannerMobile && navbar && bannerMobile.style.display !== 'none') {
            // Ajuste dinámico basado en la altura real del nav
            const navHeight = navbar.offsetHeight;
            bannerMobile.style.top = `${navHeight}px`;
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
                // Pequeño retraso para que cargue después de las tarjetas (Mantiene lógica PC)
                setTimeout(() => {
                    if(bannerPC) bannerPC.style.display = 'block';
                }, 500);
                if(bannerMobile) bannerMobile.style.display = 'none';
            } else {
                if(bannerMobile) {
                    // Mantiene lógica de aparición móvil
                    bannerMobile.style.display = 'flex'; // Cambiado a flex para el nuevo layout
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
