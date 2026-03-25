const LuxPatrocinio = {
    init: function() {
        this.injectStyles();
        this.createBanners(); // Crea el de móvil (se queda igual)
        window.addEventListener('scroll', () => this.syncMobilePosition());
        window.addEventListener('resize', () => this.syncMobilePosition());
        setInterval(() => this.checkStatus(), 300);
    },

    injectStyles: function() {
        if (document.getElementById('lux-styles')) return;
        const style = document.createElement('style');
        style.id = 'lux-styles';
        style.innerHTML = `
            /* SPONSOR CARD ELITE (SOLO PC) */
            .lux-featured-card {
                grid-column: span 2;
                min-height: 300px;
                background: linear-gradient(135deg, #000 0%, #1a1a1a 100%);
                border: 2px solid #d4a373;
                border-radius: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                position: relative;
                overflow: hidden;
                box-shadow: 0 15px 35px rgba(0,0,0,0.6), inset 0 0 25px rgba(212, 163, 115, 0.1);
                transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                cursor: pointer;
                font-family: 'Montserrat', sans-serif;
                margin-bottom: 20px;
            }

            .lux-featured-card:hover {
                transform: translateY(-8px);
                border-color: #fff;
                box-shadow: 0 20px 50px rgba(212, 163, 115, 0.3);
            }

            .lux-featured-tag {
                font-size: 10px;
                color: #d4a373;
                letter-spacing: 4px;
                text-transform: uppercase;
                font-weight: 800;
                margin-bottom: 15px;
            }

            .lux-featured-logo {
                width: 220px;
                filter: drop-shadow(0 0 15px rgba(212, 163, 115, 0.4));
                transition: transform 0.5s ease;
            }

            .lux-featured-footer {
                margin-top: 20px;
                text-align: center;
                color: #fff;
                font-size: 13px;
                letter-spacing: 1.5px;
            }
            .lux-featured-footer b { color: #d4a373; }

            /* MANTENER BANNER MÓVIL ORIGINAL */
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
            .lux-m-container { display: flex; align-items: center; justify-content: center; gap: 15px; }
            .lux-m-text { font-size: 9px; color: #fff; letter-spacing: 1px; text-transform: uppercase; font-weight: 600; }
            .lux-m-text b { color: #d4a373; margin-left: 4px; }
            .lux-m-logo-neon { height: 65px; margin: -10px 0; animation: neonPulse 3s infinite ease-in-out; object-fit: contain; }
            
            @keyframes neonPulse {
                0%, 100% { filter: drop-shadow(0 0 5px #d4a373); transform: scale(1.02); }
                50% { filter: drop-shadow(0 0 15px rgba(212, 163, 115, 0.6)); transform: scale(1.05); }
            }

            /* AJUSTE RESPONSIVO */
            @media (max-width: 768px) {
                .lux-featured-card { 
                    grid-column: span 1; /* En móvil la card destacada vuelve a tamaño normal si se muestra */
                    display: none; /* Preferimos el banner mobile original */
                }
            }
        `;
        document.head.appendChild(style);
    },

    createBanners: function() {
        if (document.getElementById('banner-mobile-lux')) return;

        const bannerMobile = document.createElement('div');
        bannerMobile.id = 'banner-mobile-lux';
        bannerMobile.className = 'banner-lux-mobile';
        bannerMobile.innerHTML = `
            <div class="lux-m-container">
                <div class="lux-m-text">VIDA NOCTURNA<b>• PATROCINADO POR</b></div>
                <img src="patrocinios/Lux/lux-discoteca.png" class="lux-m-logo-neon">
            </div>
        `;
        bannerMobile.onclick = () => this.scrollToLux();
        const navbar = document.querySelector('nav');
        if (navbar) navbar.insertAdjacentElement('afterend', bannerMobile);
    },

    // INYECTA LA TARJETA EN LA GRID (SOLO PC)
    injectSponsorCard: function() {
        const container = document.getElementById('grid-comercios') || document.querySelector('.grid');
        if (!container || document.getElementById('lux-featured-card')) return;

        const card = document.createElement('div');
        card.id = 'lux-featured-card';
        card.className = 'lux-featured-card';
        card.innerHTML = `
            <div class="lux-featured-tag">Socio de Entretenimiento Oficial</div>
            <img src="patrocinios/Lux/lux-discoteca.png" class="lux-featured-logo">
            <div class="lux-featured-footer">
                LUX PRESENTA ESTA CATEGORÍA<br>
                <b>VIDA NOCTURNA EXCLUSIVA POCOCÍ</b>
            </div>
        `;
        card.onclick = () => this.scrollToLux();
        container.prepend(card);
    },

    syncMobilePosition: function() {
        const bannerMobile = document.getElementById('banner-mobile-lux');
        const navbar = document.querySelector('nav');
        if (bannerMobile && navbar && bannerMobile.style.display !== 'none') {
            bannerMobile.style.top = `${navbar.offsetHeight}px`;
        }
    },

    checkStatus: function() {
        const params = new URLSearchParams(window.location.search);
        const esVidaNocturna = params.get('categoria') === 'vida nocturna';
        const bannerMobile = document.getElementById('banner-mobile-lux');
        const featuredCard = document.getElementById('lux-featured-card');

        if (esVidaNocturna) {
            if (window.innerWidth > 768) {
                // PC: Mostrar Card Destacada, ocultar banner móvil
                if(bannerMobile) bannerMobile.style.display = 'none';
                this.injectSponsorCard();
            } else {
                // MÓVIL: Mostrar banner original, quitar card de la grid
                if(bannerMobile) { bannerMobile.style.display = 'block'; this.syncMobilePosition(); }
                if(featuredCard) featuredCard.remove();
            }
        } else {
            if(bannerMobile) bannerMobile.style.display = 'none';
            if(featuredCard) featuredCard.remove();
        }
    },

    scrollToLux: function() {
        const cards = document.querySelectorAll('.glass-card, [onclick*="abrirModal"]');
        for (let card of cards) {
            const txt = card.textContent.toUpperCase();
            if (txt.includes('LUX') && (txt.includes('DISCOTECA') || txt.includes('NIGHT'))) {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                card.style.transition = "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
                card.style.border = "2px solid #d4a373";
                card.style.boxShadow = "0 0 40px rgba(212, 163, 115, 0.5)";
                setTimeout(() => {
                    card.click();
                    setTimeout(() => { card.style.border = ""; card.style.boxShadow = ""; }, 2500);
                }, 800);
                break;
            }
        }
    }
};

LuxPatrocinio.init();
