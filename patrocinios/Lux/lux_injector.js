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
            /* 1. HEADER BANNER STICKY ELITE (PC) */
            .lux-header-banner {
                display: none;
                width: 100%;
                height: 75px; /* Altura más elegante y compacta */
                background: #000 url('https://www.transparenttextures.com/patterns/dark-matter.png');
                border-bottom: 1px solid rgba(212, 163, 115, 0.4);
                position: sticky !important;
                z-index: 48 !important;
                cursor: pointer;
                font-family: 'Montserrat', sans-serif;
                overflow: hidden;
                transition: all 0.3s ease;
            }

            /* Brillo ambiental sutil detrás del logo */
            .lux-header-banner::before {
                content: '';
                position: absolute;
                top: 0; right: 0; width: 40%; height: 100%;
                background: radial-gradient(circle at 80% center, rgba(212, 163, 115, 0.15) 0%, transparent 70%);
                z-index: 1;
            }

           .lux-header-container {
                max-width: 1100px; /* Reducido para que no se vea tan separado en pantallas anchas */
                height: 100%;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: space-between; /* Mantiene texto a la izq y logo a la der */
                padding: 0 20px;
                position: relative;
                z-index: 2;
            }

            .lux-header-text h4 {
                color: #fff;
                margin: 0;
                font-size: 13px; /* Un poco más grande para llenar espacio */
                letter-spacing: 3px;
                text-transform: uppercase;
                font-weight: 700;
                /* Agregamos un degradado sutil al texto para más elegancia */
                background: linear-gradient(to right, #fff, #d4a373);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            .lux-header-text b {
                color: #d4a373;
                font-weight: 900;
                margin-left: 5px;
            }

            /* Logo Neón a la derecha */
           .lux-header-logo {
                height: 80px; /* Aumentamos el tamaño del logo */
                filter: drop-shadow(0 0 12px rgba(212, 163, 115, 0.7));
                animation: neonPulse 3s infinite ease-in-out;
                transition: all 0.5s ease;
                object-fit: contain;
            }

            .lux-header-banner:hover .lux-header-logo {
                transform: scale(1.1);
            }

            /* 2. BANNER MÓVIL (MANTENIDO EXACTAMENTE IGUAL) */
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

        // Banner PC con orden invertido (Texto -> Logo)
        if (!document.getElementById('lux-header-banner')) {
            const bannerPC = document.createElement('div');
            bannerPC.id = 'lux-header-banner';
            bannerPC.className = 'lux-header-banner';
            bannerPC.innerHTML = `
                <div class="lux-header-container">
                    <div class="lux-header-text">
                        <h4>VIDA NOCTURNA<b>• CATEGORIA PATROCINADA POR</b></h4>
                    </div>
                    <img src="patrocinios/Lux/lux-discoteca.png" class="lux-header-logo">
                </div>
            `;
            bannerPC.onclick = () => this.scrollToLux();
            navbar.insertAdjacentElement('afterend', bannerPC);
        }

        // Banner Móvil (Sin cambios)
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
