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
    const bannerPC = document.createElement('div');
    bannerPC.id = 'banner-pc-lux';
    bannerPC.className = 'banner-lux-pc';
    bannerPC.innerHTML = `
        <div class="lux-capsule-header">
            <span>PATROCINIO<br>DE CATEGORÍA</span>
        </div>
        <img src="img/logolux.webp" style="width: 70%; margin: 0 auto; filter: drop-shadow(0 0 5px rgba(212,163,115,0.5));" alt="LUX">
        <p style="font-size: 9px; color: #d4a373; margin-top: 15px; opacity: 0.7; letter-spacing: 0.1em;">VIDA NOCTURNA<br>EXCLUSIVA</p>
        <div class="lux-btn-explore">EXPLORA LUX</div>
    `;
    
    const bannerMobile = document.createElement('div');
    bannerMobile.id = 'banner-mobile-lux';
    bannerMobile.className = 'banner-lux-mobile';
    bannerMobile.innerHTML = `<span>EXPLORA LA EXPERIENCIA LUX</span>`;

    [bannerPC, bannerMobile].forEach(el => {
        el.onclick = () => this.scrollToLux();
    });

    document.body.appendChild(bannerPC);
    document.body.appendChild(bannerMobile);
},

checkStatus: function() {
    // Detectar categoría desde el H2 de tu página
    const h2Element = document.querySelector('#categoria-titulo h2');
    const catName = h2Element ? h2Element.innerText.toLowerCase().trim() : "";
    
    const isLuxCategory = catName === "vida nocturna";
    const bannerPC = document.getElementById('banner-pc-lux');
    const bannerMobile = document.getElementById('banner-mobile-lux');

    if (isLuxCategory) {
        // Mostrar según tamaño de pantalla
        if (window.innerWidth > 768) {
            if(bannerPC) bannerPC.style.display = 'block';
            if(bannerMobile) bannerMobile.style.display = 'none';
        } else {
            if(bannerPC) bannerPC.style.display = 'block'; // O 'flex' según necesites
            if(bannerMobile) bannerMobile.style.display = 'block';
        }
    } else {
        // OCULTAR ABSOLUTAMENTE en otras categorías
        if(bannerPC) bannerPC.style.display = 'none';
        if(bannerMobile) bannerMobile.style.display = 'none';
    }
}
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
