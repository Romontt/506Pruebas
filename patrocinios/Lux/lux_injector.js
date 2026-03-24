/**
 * PUNTO 506 - MÓDULO DE PATROCINIO LUX (Socio Elite)
 * Inyector autónomo para banners contextuales
 */

const LuxPatrocinio = {
    // Configuración
    targetCategory: "vida nocturna",
    idNegocioLux: "lux-club-id", // Cambiar por el ID real de Supabase si es necesario

    init: function() {
        this.injectStyles();
        this.createBanners();
        this.setupObserver();
        this.handleResize();
        
        // Ejecutar check inicial
        this.checkStatus();
        
        window.addEventListener('resize', () => this.handleResize());
    },

    injectStyles: function() {
        // Inyectamos el CSS que ya definiste + ajustes de animación
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'patrocinios/Lux/lux_patrocinio.css';
        document.head.appendChild(link);
    },

    createBanners: function() {
        // 1. BANNER PC (Tótem Lateral)
        const bannerPC = document.createElement('div');
        bannerPC.id = 'banner-pc-lux';
        bannerPC.className = 'banner-lux-pc';
        bannerPC.innerHTML = `
            <div class="iso-emblem nav-logo-iso" style="margin: 0 auto 15px;">
                <span style="font-family: 'Cinzel'; color: #d4a373; font-size: 14px;">L</span>
            </div>
            <div style="writing-mode: vertical-rl; text-orientation: mixed; margin: 0 auto;">
                <span class="serif-title" style="color: #d4a373; font-size: 18px;">LUX</span>
            </div>
            <p style="font-size: 7px; letter-spacing: 0.2em; margin-top: 15px; color: rgba(212,163,115,0.6);">SOCIO ELITE</p>
        `;
        
        // 2. BANNER MÓVIL (Sticky Superior)
        const bannerMobile = document.createElement('div');
        bannerMobile.id = 'banner-mobile-lux';
        bannerMobile.className = 'banner-lux-mobile';
        bannerMobile.innerHTML = `
            <span>EXPLORA LA EXPERIENCIA LUX • VIDA NOCTURNA</span>
        `;

        // Añadir evento de click para scroll a la tarjeta
        [bannerPC, bannerMobile].forEach(el => {
            el.onclick = () => this.scrollToLux();
        });

        document.body.appendChild(bannerPC);
        document.body.appendChild(bannerMobile);
    },

    checkStatus: function() {
        // Usamos la variable global de tu App principal 'categoriaActual'
        // Si no existe (por ser página de pruebas), buscamos en el DOM
        const catName = typeof categoriaActual !== 'undefined' 
            ? categoriaActual.toLowerCase() 
            : document.querySelector('#categoria-titulo h2')?.innerText.toLowerCase();

        const isLuxCategory = catName === this.targetCategory;
        const bannerPC = document.getElementById('banner-pc-lux');
        const bannerMobile = document.getElementById('banner-mobile-lux');

        if (isLuxCategory) {
            this.handleResize(); // Muestra el que corresponda
        } else {
            if(bannerPC) bannerPC.style.display = 'none';
            if(bannerMobile) bannerMobile.style.display = 'none';
        }
    },

    handleResize: function() {
        // Solo actuar si estamos en la categoría correcta
        const catName = typeof categoriaActual !== 'undefined' ? categoriaActual.toLowerCase() : "";
        if (catName !== this.targetCategory) return;

        const bannerPC = document.getElementById('banner-pc-lux');
        const bannerMobile = document.getElementById('banner-mobile-lux');

        if (window.innerWidth > 768) {
            if(bannerPC) bannerPC.style.display = 'block';
            if(bannerMobile) bannerMobile.style.display = 'none';
        } else {
            if(bannerPC) bannerPC.style.display = 'none';
            if(bannerMobile) bannerMobile.style.display = 'block';
        }
    },

    setupObserver: function() {
        // Observamos cambios en el título de la categoría para reaccionar
        const targetNode = document.getElementById('section-results');
        if (!targetNode) return;

        const observer = new MutationObserver(() => this.checkStatus());
        observer.observe(targetNode, { childList: true, subtree: true });
    },

    scrollToLux: function() {
        // Busca la tarjeta que tenga el nombre LUX o el ID específico
        const cards = document.querySelectorAll('.glass-card');
        let targetCard = null;

        cards.forEach(card => {
            if (card.innerText.toLowerCase().includes('lux')) {
                targetCard = card;
            }
        });

        if (targetCard) {
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            targetCard.classList.add('lux-highlight-card');
        }
    }
};

// Lanzar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => LuxPatrocinio.init());
