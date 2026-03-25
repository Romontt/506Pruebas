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
                from { opacity: 0; transform: translateX(-30px) translateY(-50%); }
                to { opacity: 1; transform: translateX(0) translateY(-50%); }
            }

            @keyframes logoGlow {
                0% { filter: drop-shadow(0 0 10px rgba(212, 163, 115, 0.4)); }
                50% { filter: drop-shadow(0 0 20px rgba(212, 163, 115, 0.7)); }
                100% { filter: drop-shadow(0 0 10px rgba(212, 163, 115, 0.4)); }
            }

            /* TÓTEM PC ELITE */
            .banner-lux-pc {
                display: none;
                position: fixed !important;
                left: 30px !important;
                top: 55% !important;
                transform: translateY(-50%);
                width: 110px;
                height: 520px; 
                background: linear-gradient(145deg, rgba(15, 15, 15, 0.95) 0%, rgba(0, 0, 0, 1) 100%);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(212, 163, 115, 0.4);
                border-radius: 60px;
                z-index: 10000 !important;
                box-shadow: 0 25px 50px rgba(0,0,0,0.8), inset 0 0 15px rgba(212, 163, 115, 0.05);
                font-family: 'Montserrat', sans-serif;
                animation: luxFadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                cursor: pointer;
                overflow: hidden;
                transition: all 0.4s ease;
            }

            .banner-lux-pc:hover {
                border-color: #d4a373;
                transform: translateY(-52%) scale(1.02);
                box-shadow: 0 30px 60px rgba(0,0,0,1), 0 0 20px rgba(212, 163, 115, 0.2);
            }

            .lux-pc-container {
                display: flex;
                flex-direction: column;
                height: 100%;
                align-items: center;
            }

            .lux-pc-tag {
                background: #d4a373;
                color: #000;
                font-size: 9px;
                font-weight: 800;
                width: 100%;
                padding: 20px 0 12px 0;
                letter-spacing: 2px;
                text-transform: uppercase;
                clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
            }

            .lux-pc-body {
                flex-grow: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-around;
                padding: 25px 0;
            }

            .lux-pc-logo-wrap {
                width: 85px; /* Tamaño aumentado */
                height: 85px;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: logoGlow 4s infinite ease-in-out;
                transition: transform 0.5s ease;
            }

            .lux-pc-logo-img {
                width: 100%;
                object-fit: contain;
            }

            .banner-lux-pc:hover .lux-pc-logo-wrap {
                transform: scale(1.1) rotate(5deg);
            }

            .lux-pc-text-v {
                writing-mode: vertical-rl;
                color: rgba(255, 255, 255, 0.9);
                font-size: 15px;
                letter-spacing: 6px;
                font-weight: 200;
                text-transform: uppercase;
                margin: 20px 0;
            }

            .lux-pc-text-v b {
                color: #d4a373;
                font-weight: 700;
                margin-top: 5px;
            }

            .lux-pc-btn {
                width: 44px;
                height: 44px;
                border-radius: 50%;
                border: 1px solid rgba(212, 163, 115, 0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #d4a373;
                margin-bottom: 15px;
                transition: all 0.3s ease;
                background: rgba(212, 163, 115, 0.05);
            }

            .banner-lux-pc:hover .lux-pc-btn {
                background: #d4a373;
                color: #000;
                border-color: #fff;
                box-shadow: 0 0 15px rgba(212, 163, 115, 0.5);
            }

            /* MANTENER MÓVIL INTACTO */
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
                0% { filter: drop-shadow(0 0 5px #d4a373); transform: scale(1.02); }
                50% { filter: drop-shadow(0 0 15px rgba(212, 163, 115, 0.6)); transform: scale(1.05); }
                100% { filter: drop-shadow(0 0 5px #d4a373); transform: scale(1.02); }
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
            <div class="lux-pc-container">
                <div class="lux-pc-tag">ELITE CLUB</div>
                <div class="lux-pc-body">
                    <div class="lux-pc-logo-wrap">
                        <img src="patrocinios/Lux/lux-discoteca.png" class="lux-pc-logo-img">
                    </div>
                    <div class="lux-pc-text-v">EXPERIENCIA <b>LUX</b></div>
                    <div class="lux-pc-btn">↓</div>
                </div>
            </div>
        `;

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
        if (navbar) navbar.insertAdjacentElement('afterend', bannerMobile);
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
        if (luxCard && container.firstChild !== luxCard) container.prepend(luxCard);
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
                if(bannerMobile) { bannerMobile.style.display = 'block'; this.syncMobilePosition(); }
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
