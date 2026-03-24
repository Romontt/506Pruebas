const PatrocinioLux = {
    init: function(viewActual) {
        if (viewActual === "vida-nocturna") {
            this.mostrarBanners();
            this.resaltarTarjetas();
        } else {
            this.ocultarBanners();
        }
    },

    mostrarBanners: function() {
        // Detectar si es móvil o PC
        if (window.innerWidth > 768) {
            document.getElementById('banner-pc-lux').style.display = 'block';
        } else {
            document.getElementById('banner-mobile-lux').style.display = 'block';
        }
    },

    resaltarTarjetas: function() {
        // Buscamos todas las tarjetas que digan "LUX"
        const tarjetas = document.querySelectorAll('.card-negocio'); // Cambia por tu clase real
        tarjetas.forEach(card => {
            if (card.innerText.includes("LUX")) {
                card.classList.add('card-highlight-lux');
                // Forzamos que suba al principio del contenedor
                card.parentElement.prepend(card);
            }
        });
    },

    abrirModalLux: function() {
        // Aquí llamas a tu función actual que abre los detalles del negocio
        // Por ejemplo: abrirDetalle('lux-id');
        console.log("Abriendo modal de Lux...");
    }
};
