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
            .lux-header-banner {
                display: none;
                width: 100%;
                height: 85px; 
                background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
                            url('patrocinios/Lux/fondo-banner.webp');
                background-size: cover;
                background-position: center;
                border-bottom: 2px solid #d4a373;
                position: sticky !important;
                z-index: 48 !important;
                cursor: pointer;
                font-family: 'Montserrat', sans-serif;
                overflow: visible;
                transition: all 0.3s ease;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
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
                font-size: 13px;
                letter-spacing: 3px;
                text-transform: uppercase;
                font-weight: 800;
            }

            .lux-header-text b { color: #d4a373; font-weight: 900; margin-left: 5px; }

            /* Estilo del Botón de Eventos */
            .lux-btn-eventos {
                background: rgba(212, 163, 115, 0.1);
                border: 1px solid #d4a373;
                color: #d4a373;
                padding: 8px 15px;
                border-radius: 5px;
                font-size: 11px;
                font-weight: 900;
                text-transform: uppercase;
                letter-spacing: 1px;
                transition: all 0.3s ease;
                margin-left: 20px;
                white-space: nowrap;
            }

            .lux-btn-eventos:hover {
                background: #d4a373;
                color: #000;
                box-shadow: 0 0 15px rgba(212, 163, 115, 0.5);
                transform: translateY(-2px);
            }

            .lux-header-logo {
                height: 100px;
                margin-top: 5px;
                filter: drop-shadow(0 0 10px rgba(212, 163, 115, 0.6));
                transition: all 0.5s ease;
            }

            /* Estilos Móvil */
            .banner-lux-mobile {
                display: none;
                position: sticky !important;
                width: 100%;
                background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), 
                            url('patrocinios/Lux/fondo-banner.webp');
                background-size: cover;
                background-position: center;
                border-bottom: 1px solid #d4a373;
                padding: 12px 15px;
                z-index: 49 !important;
                font-family: 'Montserrat', sans-serif;
            }

            .lux-m-container { display: flex; align-items: center; justify-content: space-between; }
            .lux-m-text-box { display: flex; flex-direction: column; gap: 2px; }
            .lux-m-text { font-size: 8px; color: #fff; letter-spacing: 1px; font-weight: 600; opacity: 0.8; }
            .lux-m-logo-neon { height: 50px; }

            @media (max-width: 768px) {
                .lux-header-banner { display: none !important; }
            }
        `;
        document.head.appendChild(style);
    },

    createElements: function() {
        const navbar = document.querySelector('nav') || document.querySelector('header');
        if (!navbar) return;

        // Banner PC
        if (!document.getElementById('lux-header-banner')) {
            const bannerPC = document.createElement('div');
            bannerPC.id = 'lux-header-banner';
            bannerPC.className = 'lux-header-banner';
            bannerPC.innerHTML = `
                <div class="lux-header-container">
                    <div style="display: flex; align-items: center;">
                        <div class="lux-header-text">
                            <h4>VIDA NOCTURNA<b>• PATROCINADO POR</b></h4>
                        </div>
                        <button class="lux-btn-eventos" onclick="event.stopPropagation(); LuxPatrocinio.abrirCarteleraLux();">
                            Ver eventos de la semana
                        </button>
                    </div>
                    <img src="patrocinios/Lux/lux-discoteca.png" class="lux-header-logo">
                </div>
            `;
            bannerPC.onclick = () => this.abrirCarteleraLux();
            navbar.insertAdjacentElement('afterend', bannerPC);
        }

        // Banner Móvil
        if (!document.getElementById('banner-mobile-lux')) {
            const bannerMobile = document.createElement('div');
            bannerMobile.id = 'banner-mobile-lux';
            bannerMobile.className = 'banner-lux-mobile';
            bannerMobile.innerHTML = `
                <div class="lux-m-container">
                    <div class="lux-m-text-box">
                        <div class="lux-m-text">PATROCINADO POR</div>
                        <img src="patrocinios/Lux/lux-discoteca.png" class="lux-m-logo-neon">
                    </div>
                    <button class="lux-btn-eventos" style="margin-left: 0; padding: 6px 10px;" onclick="event.stopPropagation(); LuxPatrocinio.abrirCarteleraLux();">
                        Eventos
                    </button>
                </div>
            `;
            bannerMobile.onclick = () => this.abrirCarteleraLux();
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
                if(bannerPC && bannerPC.style.display !== 'block') { bannerPC.style.display = 'block'; this.syncPositions(); }
                if(bannerMobile) bannerMobile.style.display = 'none';
            } else {
                if(bannerPC) bannerPC.style.display = 'none';
                if(bannerMobile && bannerMobile.style.display !== 'block') { bannerMobile.style.display = 'block'; this.syncPositions(); }
            }
        } else {
            if(bannerPC) bannerPC.style.display = 'none';
            if(bannerMobile) bannerMobile.style.display = 'none';
        }
    },

    abrirCarteleraLux: function() {
        console.log("Abriendo cartelera de eventos de Lux...");
        // Aquí llamaremos a la función que generará el modal especial de afiches
        if (typeof abrirModalCartelera === "function") {
            abrirModalCartelera();
        } else {
            alert("Próximamente: Cartelera de eventos Lux Discoteca");
        }
    }
};

LuxPatrocinio.init();
