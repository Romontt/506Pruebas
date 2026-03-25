const LuxPatrocinio = {
    init: function() {
        this.injectStyles();
        this.createElements();
        window.addEventListener('scroll', () => this.syncPositions());
        window.addEventListener('resize', () => this.syncPositions());
        setInterval(() => this.checkStatus(), 300);
    },

    injectStyles: function() {
        if (document.getElementById('lux-styles')) return;
        const style = document.createElement('style');
        style.id = 'lux-styles';
        style.innerHTML = `
            /* 1. HEADER BANNER STICKY (PC) */
            .lux-header-banner {
                display: none;
                width: 100%;
                height: 120px; /* Un poco más alto para que luzca el logo */
                background: linear-gradient(90deg, #000 0%, #111 50%, #000 100%);
                border-bottom: 2px solid #d4a373;
                position: sticky !important;
                z-index: 48 !important; /* Justo debajo del navbar */
                cursor: pointer;
                font-family: 'Montserrat', sans-serif;
                overflow: hidden;
                transition: all 0.3s ease;
            }

            /* Efecto de brillo sutil que recorre el banner */
            .lux-header-banner::after {
                content: '';
                position: absolute;
                top: 0; left: -100%;
                width: 50%; height: 100%;
                background: linear-gradient(90deg, transparent, rgba(212, 163, 115, 0.1), transparent);
                animation: luxShimmer 6s infinite;
            }

            @keyframes luxShimmer {
                0% { left: -100%; }
                30% { left: 150%; }
                100% { left: 150%; }
            }

            .lux-header-container {
                max-width: 1400px;
                height: 100%;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 60px;
                position: relative;
                z-index: 2;
            }

            .lux-logo-section {
                display: flex;
                align-items: center;
                gap: 25px;
            }

            .lux-header-logo {
                height: 90px; /* Logo más grande */
                filter: drop-shadow(0 0 15px rgba(212, 163, 115, 0.4));
                transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
            }

            .lux-header-banner:hover .lux-header-logo {
                transform: scale(1.1) rotate(-2deg);
            }

            .lux-header-text {
                text-align: right;
            }

            .lux-header-text h4 {
                color: #d4a373;
                margin: 0;
                font-size: 18px; /* Título más imponente */
                letter-spacing: 5px;
                text-transform: uppercase;
                font-weight: 900;
                text-shadow: 0 2px 4px rgba(0,0,0,0.5);
            }

            .lux-header-text p {
                margin: 8px 0 0;
                font-size: 13px;
                color: #fff;
                letter-spacing: 2px;
                opacity: 0.8;
                font-style: italic;
            }

            .lux-badge {
                background: #d4a373;
                color: #000;
                padding: 4px 12px;
                font-size: 10px;
                font-weight: 900;
                border-radius: 4px;
                margin-left: 15px;
                letter-spacing: 1px;
            }

            /* 2. BANNER MÓVIL (MANTENIDO) */
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
            .lux-m-logo-neon { height: 65px; margin: -10px 0; animation: neonPulse 3s infinite ease-in-out; }
            
            @keyframes neonPulse {
                0%, 100% { filter: drop-shadow(0 0 5px #d4a373); transform: scale(1.02); }
                50% { filter: drop-shadow(0 0 15px rgba(212, 163, 115, 0.6)); transform: scale(1.05); }
            }

            @media (max-width: 768px) {
                .lux-header-banner { display: none !important; }
            }
        `;
        document.head.appendChild(style);
    },

    createElements: function() {
        const navbar = document.querySelector('nav') || document.querySelector('header');
        if (!navbar) return;

        if (!document.getElementById('lux-header-banner')) {
            const bannerPC = document.createElement('div');
            bannerPC.id = 'lux-header-banner';
            bannerPC.className = 'lux-header-banner';
            bannerPC.innerHTML = `
                <div class="lux-header-container">
                    <div class="lux-logo-section">
                        <img src="patrocinios/Lux/lux-discoteca.png" class="lux-header-logo">
                    </div>
                    <div class="lux-header-text">
                        <h4>Socio de Entretenimiento Oficial <span class="lux-badge">PREMIUM</span></h4>
                        <p>La mejor experiencia de Vida Nocturna en Pococí</p>
                    </div>
                </div>
            `;
            bannerPC.onclick = () => this.scrollToLux();
            navbar.insertAdjacentElement('afterend', bannerPC);
        }

        if (!document.getElementById('banner-mobile-lux')) {
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
            navbar.insertAdjacentElement('afterend', bannerMobile);
        }
    },

    syncPositions: function() {
        const navbar = document.querySelector('nav') || document.querySelector('header');
        const bannerPC = document.getElementById('lux-header-banner');
        const bannerMobile = document.getElementById('banner-mobile-lux');
        
        const navHeight = navbar ? navbar.offsetHeight : 0;

        if (window.innerWidth > 768 && bannerPC) {
            bannerPC.style.top = `${navHeight}px`;
        } else if (bannerMobile) {
            bannerMobile.style.top = `${navHeight}px`;
        }
    },

    checkStatus: function() {
        const params = new URLSearchParams(window.location.search);
        const esVidaNocturna = params.get('categoria') === 'vida nocturna';
        const bannerPC = document.getElementById('lux-header-banner');
        const bannerMobile = document.getElementById('banner-mobile-lux');

        if (esVidaNocturna) {
            if (window.innerWidth > 768) {
                if(bannerPC) { bannerPC.style.display = 'block'; this.syncPositions(); }
                if(bannerMobile) bannerMobile.style.display = 'none';
            } else {
                if(bannerPC) bannerPC.style.display = 'none';
                if(bannerMobile) { bannerMobile.style.display = 'block'; this.syncPositions(); }
            }
        } else {
            if(bannerPC) bannerPC.style.display = 'none';
            if(bannerMobile) bannerMobile.style.display = 'none';
        }
    },

    scrollToLux: function() {
        const cards = document.querySelectorAll('.glass-card, .card, [onclick*="verDetalle"]');
        for (let card of cards) {
            if (card.textContent.toUpperCase().includes('LUX')) {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(() => card.click(), 500);
                break;
            }
        }
    }
};

LuxPatrocinio.init();
