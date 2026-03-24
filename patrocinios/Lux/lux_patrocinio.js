const PatrocinioLux = {
    idLux: null, // Se llenará dinámicamente

    init: function(categoria) {
        // Buscamos el ID de Lux en tus datos actuales
        const luxData = negociosRaw.find(n => n.nombre.toLowerCase().includes("lux"));
        if (luxData) this.idLux = luxData.id;

        const bannerPC = document.getElementById('banner-pc-lux');
        const bannerMobile = document.getElementById('banner-mobile-lux');

        if (categoria === 'vida nocturna') {
            if (window.innerWidth > 768) {
                if(bannerPC) bannerPC.style.display = 'block';
            } else {
                if(bannerMobile) bannerMobile.style.display = 'block';
            }
        } else {
            if(bannerPC) bannerPC.style.display = 'none';
            if(bannerMobile) bannerMobile.style.display = 'none';
        }
    },

    // Esta función la llamaremos dentro de aplicarFiltrosCombinados
    ordenarYResaltar: function(lista) {
        if (categoriaActual !== 'vida nocturna') return lista;

        // 1. Separar a Lux del resto
        const lux = lista.filter(n => n.nombre.toLowerCase().includes("lux"));
        const resto = lista.filter(n => !n.nombre.toLowerCase().includes("lux"));

        // 2. Retornar a Lux de primero
        return [...lux, ...resto];
    }
};
