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

        .banner-lux-pc {
            display: none;
            position: fixed !important;
            left: 20px !important;
            top: 50% !important;
            transform: translateY(-50%);
            width: 85px; /* Ligeramente más ancho para mejor legibilidad */
            height: 520px; 
            background: #000;
            border: 1px solid rgba(176, 141, 87, 0.4);
            border-radius: 0 0 45px 45px;
            z-index: 10000 !important;
            text-align: center;
            box-shadow: 0 20px 50px rgba(0,0,0,0.9);
            font-family: 'Montserrat', sans-serif;
            animation: luxFadeIn 0.8s ease-out forwards;
            cursor: pointer;
            overflow: hidden;
        }

        /* HEADER DORADO PROFUNDO */
        .lux-pc-header-flat {
            background: #b08d57; /* Dorado más oscuro y elegante */
            color: #000;
            padding: 18px 5px;
            font-size: 10px;
            font-weight: 900;
            line-height: 1.2;
            letter-spacing: 0.5px;
            text-transform: uppercase;
        }

        .lux-pc-body {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 25px 0;
            height: calc(100% - 70px);
            justify-content: flex-start;
            gap: 30px;
        }

        /* LOGO CON MEJOR TAMAÑO */
        .lux-pc-main-logo {
            width: 75px; 
            height: auto;
            filter: drop-shadow(0 0 12px rgba(176, 141, 87, 0.3));
            transition: transform 0.3s ease;
        }

        .lux-pc-main-logo:hover {
            transform: scale(1.1);
        }

        /* TEXTO "PATROCINADO POR" */
        .lux-pc-sponsored-label {
            color: #b08d57;
            font-size: 9px;
            font-weight: 700;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin-bottom: 10px;
        }

        /* TEXTO VERTICAL PRINCIPAL - MEJORADO */
        .lux-pc-vertical-main {
            writing-mode: vertical-rl;
            transform: rotate(180deg);
            color: #fff;
            font-size: 14px;
            letter-spacing: 5px;
            text-transform: uppercase;
            font-weight: 300;
            opacity: 0.8;
            margin-top: 20px;
        }

        .lux-pc-vertical-main b {
            font-weight: 800;
            color: #b08d57;
        }

        /* BOTÓN EXPLORA */
        .lux-pc-btn-footer {
            margin-top: auto;
            margin-bottom: 30px;
            font-size: 9px;
            color: #b08d57;
            border: 1px solid #b08d57;
            padding: 8px 12px;
            border-radius: 20px;
            font-weight: 800;
            letter-spacing: 1px;
        }
        
        /* ... (resto de estilos móviles iguales) ... */
    `;
    document.head.appendChild(style);
},

/* --- ESTRUCTURA HTML ACTUALIZADA --- */

createBanners: function() {
    if (document.getElementById('banner-pc-lux')) return;

    const bannerPC = document.createElement('div');
    bannerPC.id = 'banner-pc-lux';
    bannerPC.className = 'banner-lux-pc';
    bannerPC.innerHTML = `
        <div class="lux-pc-header-flat">PATROCINIO<br>DE CATEGORÍA</div>
        <div class="lux-pc-body">
            <img src="patrocinios/Lux/lux-discoteca.png" class="lux-pc-main-logo">
            <div class="lux-pc-sponsored-label">PATROCINADO POR</div>
            <div class="lux-pc-vertical-main">VIDA NOCTURNA <b>EXCLUSIVA</b></div>
            <div class="lux-pc-btn-footer">EXPLORA LUX</div>
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
