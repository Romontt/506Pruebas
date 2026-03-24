const LuxPatrocinio = {
    targetCategory: "vida nocturna",

    init: function() {
        this.createBanners();
        // Chequeo continuo cada 500ms para asegurar que aparezca/desaparezca al navegar
        setInterval(() => this.checkStatus(), 500);
        
        window.addEventListener('resize', () => this.checkStatus());
    },

    createBanners: function() {
        // Eliminar si ya existen (para evitar duplicados en pruebas)
        if(document.getElementById('banner-pc-lux')) return;

        const bannerPC = document.createElement('div');
        bannerPC.id = 'banner-pc-lux';
        bannerPC.className = 'banner-lux-pc';
        // Ajustamos el HTML para que sea la CÁPSULA de la imagen
        bannerPC.innerHTML = `
            <div class="lux-capsule-header">
                <span>PATROCINIO<br>DE CATEGORÍA</span>
            </div>
            <div style="padding: 10px 0;">
                <img src="img/logolux.webp" style="width: 80px; margin: 0 auto; display: block;" alt="LUX">
            </div>
            <p style="font-size: 9px; color: #d4a373; margin: 15px 0; opacity: 0.8; line-height: 1.4;">
                VIDA NOCTURNA<br><b>EXCLUSIVA</b>
            </p>
            <div class="lux-btn-explore">EXPLORA LUX</div>
        `;
        
        const bannerMobile = document.createElement('div');
        bannerMobile.id = 'banner-mobile-lux';
        bannerMobile.className = 'banner-lux-mobile';
        bannerMobile.innerHTML = `<span>EXPLORA LA EXPERIENCIA LUX</span>`;

        bannerPC.onclick = () => this.scrollToLux();
        bannerMobile.onclick = () => this.scrollToLux();

        document.body.appendChild(bannerPC);
        document.body.appendChild(bannerMobile);
    },

    checkStatus: function() {
        // Buscamos el texto del H2 que tú ya tienes en el HTML
        const h2 = document.querySelector('#categoria-titulo h2');
        const currentText = h2 ? h2.innerText.toLowerCase().trim() : "";
        
        const isLuxCategory = (currentText === this.targetCategory);
        
        const bannerPC = document.getElementById('banner-pc-lux');
        const bannerMobile = document.getElementById('banner-mobile-lux');

        if (isLuxCategory) {
            if (window.innerWidth > 768) {
                if(bannerPC) bannerPC.style.display = 'block';
                if(bannerMobile) bannerMobile.style.display = 'none';
            } else {
                if(bannerPC) bannerPC.style.display = 'none';
                if(bannerMobile) bannerMobile.style.display = 'block';
            }
        } else {
            // Si no es la categoría, OCULTAR AMBOS
            if(bannerPC) bannerPC.style.display = 'none';
            if(bannerMobile) bannerMobile.style.display = 'none';
        }
    },

    scrollToLux: function() {
        const cards = document.querySelectorAll('.glass-card');
        for (let card of cards) {
            if (card.innerText.toLowerCase().includes('lux')) {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                card.classList.add('lux-highlight-card');
                break;
            }
        }
    }
};

LuxPatrocinio.init();
