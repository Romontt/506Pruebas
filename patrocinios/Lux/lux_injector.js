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
                height: 85px; 
                /* Fondo negro con textura de "Dark Matter" y un gradiente de profundidad */
                background: radial-gradient(circle at 80% center, #1a1a1a 0%, #000 100%), 
                            url('https://www.transparenttextures.com/patterns/dark-matter.png');
                border-bottom: 2px solid #d4a373;
                position: sticky !important;
                z-index: 48 !important;
                cursor: pointer;
                font-family: 'Montserrat', sans-serif;
                overflow: visible; /* Permitimos que el logo sobresalga ligeramente */
                transition: all 0.3s ease;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            }

            /* Brillo ambiental neón detrás del logo */
            .lux-header-banner::before {
                content: '';
                position: absolute;
                top: 0; right: 0; width: 40%; height: 100%;
                background: radial-gradient(circle at 80% center, rgba(212, 163, 115, 0.2) 0%, transparent 70%);
                z-index: 1;
            }

            .lux-header-container {
                max-width: 1100px;
                height: 100%;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 20px;
                position: relative;
                z-index: 2;
            }

            .lux-header-text h4 {
                color: #fff;
                margin: 0;
                font-size: 14px;
                letter-spacing: 5px;
                text-transform: uppercase;
                font-weight: 800;
                /* Texto metálico con brillo */
                background: linear-gradient(90deg, #fff, #d4a373, #fff);
                background-size: 200% auto;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                animation: shineText 5s linear infinite;
            }

            @keyframes shineText {
                to { background-position: 200% center; }
            }

            .lux-header-text b {
                color: #d4a373;
                font-weight: 900;
                margin-left: 5px;
                -webkit-text-fill-color: #d4a373;
            }

            /* LOGO PROTAGONISTA EN PC */
            .lux-header-logo {
                height: 110px; /* Tamaño grande para que impacte */
                margin-top: 10px; /* Lo bajamos un poco para que rompa la línea inferior */
                filter: drop-shadow(0 0 15px rgba(212, 163, 115, 0.8));
                animation: neonPulsePC 3s infinite ease-in-out;
                transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                object-fit: contain;
            }

            .lux-header-banner:hover .lux-header-logo {
                transform: scale(1.1) rotate(-2deg);
                filter: drop-shadow(0 0 25px rgba(212, 163, 115, 1));
            }

            @keyframes neonPulsePC {
                0%, 100% { filter: drop-shadow(0 0 10px rgba(212, 163, 115, 0.6)); }
                50% { filter: drop-shadow(0 0 20px rgba(212, 163, 115, 0.9)); }
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

        if (!document.getElementById('lux-header-banner')) {
            const bannerPC = document.createElement('div');
            bannerPC.id = 'lux-header-banner';
            bannerPC.className = 'lux-header-banner';
            bannerPC.innerHTML = `
                <div class="lux-header-container">
                    <div class="lux-header-text">
                        <h4>VIDA NOCTURNA<b>• CATEGORÍA PATROCINADA POR</b></h4>
                    </div>
                    <img src="patrocinios/Lux/lux-discoteca.png" class="lux-header-logo">
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
    // 1. Buscamos todas las tarjetas disponibles
    const cards = document.querySelectorAll('.glass-card, .card, [onclick*="verDetalle"]');
    let targetCard = null;

    for (let card of cards) {
        if (card.textContent.toUpperCase().includes('LUX')) {
            targetCard = card;
            break;
        }
    }

    if (targetCard) {
        // 2. Scroll suave hacia la tarjeta
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // 3. Intentamos abrir el detalle
        // Esperamos a que termine el scroll para evitar conflictos visuales
        setTimeout(() => {
            // Intentamos disparar el clic directamente
            targetCard.click();

            // Respaldo: Si tu app usa una función global 'verDetalle'
            // Extraemos el ID o los datos si es necesario, pero .click() debería bastar
            // si el elemento capturado es el que tiene el 'onclick'
        }, 600); 
    } else {
        // Si no la encuentra a la primera (por carga asíncrona), reintentamos una vez
        console.log("Reintentando encontrar tarjeta Lux...");
    }
}

LuxPatrocinio.init();
