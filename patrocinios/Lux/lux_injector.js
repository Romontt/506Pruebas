const LuxPatrocinio = {
    init: function() {
        this.createBanners();
        // Chequeo ultra-rápido cada 100ms para que no haya lag
        setInterval(() => this.checkStatus(), 100);
    },

    createBanners: function() {
        if(document.getElementById('banner-pc-lux')) return;

        const bannerPC = document.createElement('div');
        bannerPC.id = 'banner-pc-lux';
        bannerPC.className = 'banner-lux-pc';
        // Estructura de cápsula idéntica a tu imagen
        bannerPC.innerHTML = `
            <div class="lux-capsule-header">
                <span>PATROCINIO<br>DE CATEGORÍA</span>
            </div>
            <div style="padding: 10px 0; display: flex; justify-content: center;">
                <img src="https://romontt.github.io/506Pruebas/img/logolux.webp" 
                     style="width: 80px; height: auto;" 
                     onerror="this.src='https://placehold.co/80x80/2c1e1a/d4a373?text=LUX'"
                     alt="LUX">
            </div>
            <p style="font-size: 9px; color: #d4a373; margin: 15px 0; opacity: 0.8; line-height: 1.4; font-family: sans-serif; font-weight: bold;">
                VIDA NOCTURNA<br>EXCLUSIVA
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
        // MÉTODO INFALIBLE: Leer la URL
        const params = new URLSearchParams(window.location.search);
        const categoriaURL = params.get('categoria');
        
        // También buscamos en el texto por si acaso
        const h2 = document.querySelector('h2');
        const textoH2 = h2 ? h2.innerText.toLowerCase() : "";

        const esVidaNocturna = (categoriaURL === 'vida nocturna' || textoH2.includes('vida nocturna'));
        
        const bannerPC = document.getElementById('banner-pc-lux');
        const bannerMobile = document.getElementById('banner-mobile-lux');

        if (esVidaNocturna) {
            if (window.innerWidth > 768) {
                bannerPC.style.display = 'block';
                bannerMobile.style.display = 'none';
            } else {
                bannerPC.style.display = 'none';
                bannerMobile.style.display = 'block';
            }
        } else {
            if(bannerPC) bannerPC.style.display = 'none';
            if(bannerMobile) bannerMobile.style.display = 'none';
        }
    },

    scrollToLux: function() {
        // Buscamos cualquier elemento que contenga la palabra LUX
        const elements = document.querySelectorAll('*');
        for (let el of elements) {
            if (el.children.length === 0 && el.innerText && el.innerText.toUpperCase().includes('LUX')) {
                const card = el.closest('.glass-card') || el;
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                break;
            }
        }
    }
};

LuxPatrocinio.init();
