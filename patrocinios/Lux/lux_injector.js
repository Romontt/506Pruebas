const LuxPatrocinio = {
    init: function() {
        this.injectStyles();
        this.createElements(); // Crea Banner PC y Banner Móvil
        window.addEventListener('scroll', () => this.syncPositions());
        window.addEventListener('resize', () => this.syncPositions());
        setInterval(() => this.checkStatus(), 300);
    },

    injectStyles: function() {
        if (document.getElementById('lux-styles')) return;
        const style = document.createElement('style');
        style.id = 'lux-styles';
        style.innerHTML = `
            /* 1. HEADER BANNER (SOLO PC) */
            .lux-header-banner {
                display: none;
                width: 100%;
                height: 100px;
                background: #000 url('https://www.transparenttextures.com/patterns/dark-matter.png');
                border-bottom: 1px solid rgba(212, 163, 115, 0.4);
                position: relative;
                overflow: hidden;
                z-index: 10;
                cursor: pointer;
                font-family: 'Montserrat', sans-serif;
            }

            .lux-header-container {
                max-width: 1200px;
                height: 100%;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 40px;
                background: radial-gradient(circle at center, rgba(212, 163, 115, 0.05) 0%, transparent 70%);
            }

            .lux-header-logo {
                height: 70px;
                filter: drop-shadow(0 0 10px rgba(212, 163, 115, 0.3));
                transition: transform 0.5s ease;
            }

            .lux-header-banner:hover .lux-header-logo {
                transform: scale(1.05);
            }

            .lux-header-text {
                text-align: right;
                color: #fff;
            }

            .lux-header-text h4 {
                color: #d4a373;
                margin: 0;
                font-size: 14px;
                letter-spacing: 3px;
                text-transform: uppercase;
                font-weight: 800;
            }

            .lux-header-text p {
                margin: 5px 0 0;
                font-size: 11px;
                color: #888;
                letter-spacing: 1px;
            }

            /* 2. BANNER MÓVIL (MANTENIDO IGUAL) */
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

            /* RESPONSIVE */
            @media (max-width: 768px) {
                .lux-header-banner { display: none !important; }
            }
        `;
        document.head.appendChild(style);
    },

    createElements: function() {
        const navbar = document.querySelector('nav') || document.querySelector('header');
        if (!navbar) return;

        // Crear Banner PC
        if (!document.getElementById('lux-header-banner')) {
            const bannerPC = document.createElement('div');
            bannerPC.id = 'lux-header-banner';
            bannerPC.className = 'lux-header-banner';
            bannerPC.innerHTML = `
                <div class="lux-header-container">
                    <img src="patrocinios/Lux/lux-discoteca.png" class="lux-header-logo">
                    <div class="lux-header-text">
                        <h4>Socio de Entretenimiento Oficial</h4>
                        <p>Curaduría exclusiva de la mejor Vida Nocturna en Pococí</p>
                    </div>
                </div>
            `;
            bannerPC.onclick = () => this.scrollToLux();
            navbar.insertAdjacentElement('afterend', bannerPC);
        }

        // Crear Banner Móvil
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
        const bannerMobile = document.getElementById('banner-mobile-lux');
        if (bannerMobile && navbar && window.innerWidth <= 768) {
            bannerMobile.style.top = `${navbar.offsetHeight}px`;
        }
    },

    checkStatus: function() {
        const params = new URLSearchParams(window.location.search);
        const esVidaNocturna = params.get('categoria') === 'vida nocturna';
        
        const bannerPC = document.getElementById('lux-header-banner');
        const bannerMobile = document.getElementById('banner-mobile-lux');

        if (esVidaNocturna) {
            if (window.innerWidth > 768) {
                if(bannerPC) bannerPC.style.display = 'block';
                if(bannerMobile) bannerMobile.style.display = 'none';
            } else {
                if(bannerPC) bannerPC.style.display = 'none';
                if(bannerMobile) {
                    bannerMobile.style.display = 'block';
                    this.syncPositions();
                }
            }
        } else {
            if(bannerPC) bannerPC.style.display = 'none';
            if(bannerMobile) bannerMobile.style.display = 'none';
        }
    },

    scrollToLux: function() {
        // Busca el ID o el nombre en las tarjetas para abrir el modal
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
