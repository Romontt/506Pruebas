// --- CONFIGURACIÓN ---
let negociosRaw = [];
let categoriaActual = 'todos';
let etiquetaActual = null;

const normalizar = (t) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

// --- LÓGICA DE HEADER Y SECCIONES DINÁMICAS ---
function gestionarVisibilidadHeader(categoria) {
    const purposeCard = document.getElementById('purpose-card');
    const discoverTagline = document.getElementById('discover-tagline');
    const growSection = document.getElementById('grow-network-section');
    if (categoria === 'todos') {
        if (purposeCard) purposeCard.classList.remove('hidden');
        if (discoverTagline) discoverTagline.classList.add('hidden');
        if (growSection) growSection.classList.remove('hidden'); 
    } else {
        if (purposeCard) purposeCard.classList.add('hidden');
        if (discoverTagline) discoverTagline.classList.remove('hidden');
        if (growSection) growSection.classList.add('hidden'); 
    }
}

// --- TRANSICIÓN ELEGANTE CON LOGO ---
function ejecutarTransicion(callback) {
    const loader = document.getElementById('preloader');
    if (loader) {
        loader.classList.remove('fade-out');
        setTimeout(() => {
            callback();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => {
                loader.classList.add('fade-out');
            }, 600);
        }, 500);
    } else {
        callback();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// --- VOLVER AL INICIO ---
function volverInicio() {
    ejecutarTransicion(() => {
        categoriaActual = 'todos';
        etiquetaActual = null;
        const inputBusqueda = document.getElementById('busqueda');
        if (inputBusqueda) inputBusqueda.value = '';
        actualizarURL('todos');
        gestionarVisibilidadHeader('todos');
        
        // Desactivar botones de filtro visualmente
        document.querySelectorAll('.filter-btn').forEach(btn => {
            if(btn.getAttribute('data-cat') === 'todos') activarBoton(btn);
        });
        
        renderLanding();
    });
}

// --- RENDERIZAR CUADROS DE CATEGORÍA ---
function renderLanding() {
    const landing = document.getElementById('landing-categories');
    const resultados = document.getElementById('section-results');
    if(!landing) return;

    landing.classList.remove('hidden');
    if(resultados) resultados.classList.add('hidden');
    gestionarVisibilidadHeader('todos');

    const categoriasConfig = [
        { id: 'salud', nombre: 'Salud & Bienestar', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000' },
        { id: 'gastronomía', nombre: 'Gastronomía', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop' },
        { id: 'estética', nombre: 'Estética & Imagen', img: 'img/estetica.webp'},
        { id: 'vida nocturna', nombre: 'Vida Nocturna', img: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=1000&auto=format&fit=crop' },
        { id: 'servicios', nombre: 'Servicios Varios', img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1000' },
        { id: 'turismo', nombre: 'Destinos & Turismo', img: 'https://images.unsplash.com/photo-1590523278191-995cbcda646b?q=80&w=1000&auto=format&fit=crop' },
        { id: 'eventos', nombre: 'Eventos & Recepciones', img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1000&auto=format&fit=crop' }
    ];

    landing.className = "grid grid-cols-2 md:grid-cols-3 gap-4 px-4 md:px-0";
    landing.innerHTML = categoriasConfig.map((cat, i) => `
        <div onclick="seleccionarCategoria('${cat.id}')" 
             class="portal-card animate-reveal h-40 md:h-64" 
             style="animation-delay: ${i * 0.1}s">
            <img src="${cat.img}" alt="${cat.nombre}" class="w-full h-full object-cover">
            <div class="portal-card-content p-4">
                <div class="mb-1 h-[1px] w-6 bg-[#d4a373]/50"></div>
                <h3 class="serif-title text-white text-[10px] md:text-lg tracking-[0.2em] uppercase leading-tight">${cat.nombre}</h3>
            </div>
        </div>
    `).join('');
}

function seleccionarCategoria(id) {
    ejecutarTransicion(() => {
        categoriaActual = id;
        etiquetaActual = null;
        const landing = document.getElementById('landing-categories');
        const resultados = document.getElementById('section-results');
        
        if(landing) landing.classList.add('hidden');
        if(resultados) resultados.classList.remove('hidden');
        
        actualizarURL(id);
        gestionarVisibilidadHeader(id);
        renderSubCategorias();
        aplicarFiltrosCombinados();

        setTimeout(() => {
            if(resultados) {
                const offset = resultados.offsetTop - 90;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        }, 100);
    });
}

function actualizarURL(categoria) {
    const nuevaUrl = categoria === 'todos' ? window.location.pathname : `?categoria=${encodeURIComponent(categoria.toLowerCase())}`;
    window.history.pushState({ step: 'categoria', path: nuevaUrl }, '', nuevaUrl);
}

function expandirGrid() {
    const wrapper = document.getElementById('wrapper-grid');
    const btnContainer = document.getElementById('btn-ver-mas-container');
    if(wrapper) wrapper.classList.add('grid-expandido');
    if(btnContainer) btnContainer.classList.add('hidden');
}

function gestionarLimiteVisual(totalMostrados) {
    const wrapper = document.getElementById('wrapper-grid');
    const btnContainer = document.getElementById('btn-ver-mas-container');
    if (!wrapper || !btnContainer) return;

    if (categoriaActual === 'todos' && totalMostrados > 8) {
        wrapper.classList.remove('grid-expandido');
        wrapper.classList.add('grid-limitado');
        btnContainer.classList.remove('hidden');
    } else {
        wrapper.classList.add('grid-expandido');
        btnContainer.classList.add('hidden');
    }
}

async function loadData() {
    try {
        const response = await fetch('negocios.json');
        negociosRaw = await response.json();
        const params = new URLSearchParams(window.location.search);
        const catParam = params.get('categoria');

        if (catParam && catParam !== 'todos') {
            categoriaActual = catParam;
            gestionarVisibilidadHeader(catParam);
            aplicarFiltrosCombinados();
        } else {
            renderLanding();
        }
        initFilters();
        actualizarFlechasNav();
        
        const loader = document.getElementById('preloader');
        if (loader) setTimeout(() => loader.classList.add('fade-out'), 950);

    } catch (e) { 
        const grid = document.getElementById('grid-negocios');
        if(grid) grid.innerHTML = '<p class="text-stone-600 text-center py-20 col-span-full uppercase text-[9px] tracking-[0.5em] font-bold italic">Preparando la experiencia...</p>';
        const loader = document.getElementById('preloader');
        if (loader) loader.classList.add('fade-out');
    }
}

function actualizarFlechasNav() {
    const navScroll = document.getElementById('nav-categories');
    const hint = document.getElementById('scroll-hint');
    if(navScroll && hint) {
        navScroll.addEventListener('scroll', () => {
            const maxScroll = navScroll.scrollWidth - navScroll.clientWidth;
            hint.style.opacity = (navScroll.scrollLeft >= maxScroll - 15) ? '0' : '1';
        });
    }
}

// Función auxiliar para el estado (abierto/cerrado) si la usas
function obtenerBadgeEstado(n) {
    // Si no tienes esta lógica definida aún, devolvemos vacío para evitar errores
    return ''; 
}

function renderCards(listaFiltrada) {
    const grid = document.getElementById('grid-negocios');
    if(!grid) return;

    grid.style.opacity = '0';
    setTimeout(() => {
        grid.innerHTML = listaFiltrada.map((n, i) => {
            const badgeEstado = obtenerBadgeEstado(n);
            return `
            <article class="group glass-card animate-reveal overflow-hidden"
                     style="animation-delay: ${i * 0.08}s; animation-fill-mode: forwards;">
                <div class="relative h-48 md:h-64 overflow-hidden">
                    ${badgeEstado}
                    <img src="${n.imagen}" 
                         class="w-full h-full object-cover sepia-[10%] group-hover:sepia-0 group-hover:scale-110 transition duration-[2s] ease-out" 
                         alt="${n.nombre}" 
                         loading="lazy"> 
                    <div class="absolute inset-0 bg-gradient-to-t from-[#130f0e] via-transparent opacity-80"></div>
                    <div class="absolute top-4 left-4 text-[#d4a373] text-[6px] font-black tracking-[0.4em] uppercase bg-[#130f0e]/80 backdrop-blur-md px-2 py-1 border border-[#d4a373]/20">${n.categoria}</div>
                </div>
                <div class="p-5 md:p-8 text-center flex flex-col flex-grow">
                    <h3 class="business-title text-base md:text-xl text-white uppercase tracking-wider font-bold mb-2 group-hover:text-[#d4a373] transition-colors duration-500">${n.nombre}</h3>
                    <p class="elegant-italic text-stone-400 text-[11px] md:text-[14px] leading-relaxed line-clamp-2 mb-4 italic">
                        "${n.servicios_resumen}"
                    </p>
                    <button onclick="verDetalle(${n.id})" 
                            class="mt-auto w-full py-3 md:py-4 text-[#d4a373] text-[8px] md:text-[9px] font-bold uppercase tracking-[0.5em] border border-[#d4a373]/20 hover:bg-[#d4a373] hover:text-[#130f0e] transition-all duration-700">
                        Detalles
                    </button>
                </div>
            </article>`;
        }).join('');
        grid.style.opacity = '1';
        gestionarLimiteVisual(listaFiltrada.length);
    }, 300);
}

function renderSubCategorias() {
    const contenedorBase = document.getElementById('sub-categorias');
    if (!contenedorBase) return;
    contenedorBase.innerHTML = '';
    
    const busqueda = document.getElementById('busqueda')?.value || '';
    if (categoriaActual === 'todos' || busqueda.length > 0) return;

    const etiquetas = [...new Set(
        negociosRaw
            .filter(n => normalizar(n.categoria) === normalizar(categoriaActual) && n.etiquetas)
            .flatMap(n => n.etiquetas)
    )];

    if (etiquetas.length === 0) return;

    contenedorBase.className = "relative w-full overflow-hidden mb-6";
    const scrollContainer = document.createElement('div');
    scrollContainer.className = "flex overflow-x-auto hide-scroll gap-2 py-2 px-4 md:flex-wrap md:justify-center md:px-0";
    
    const hint = document.createElement('div');
    hint.className = "absolute right-0 top-0 bottom-0 flex items-center pr-2 pointer-events-none transition-opacity duration-300 md:hidden";
    hint.innerHTML = `<svg class="w-4 h-4 text-[#d4a373] animate-bounce-x" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

    etiquetas.forEach(tag => {
        const btn = document.createElement('button');
        btn.innerText = tag.toUpperCase();
        const activo = etiquetaActual === tag;
        btn.className = `whitespace-nowrap text-[8px] tracking-[0.4em] px-5 py-2.5 border transition-all duration-700 ${activo ? 'border-[#d4a373] text-[#d4a373] font-bold bg-[#d4a373]/5' : 'border-transparent text-stone-500 hover:text-stone-200'}`;
        btn.onclick = () => {
            etiquetaActual = (etiquetaActual === tag) ? null : tag;
            renderSubCategorias();
            aplicarFiltrosCombinados();
        };
        scrollContainer.appendChild(btn);
    });

    contenedorBase.appendChild(scrollContainer);
    contenedorBase.appendChild(hint);
    scrollContainer.addEventListener('scroll', () => {
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        hint.style.opacity = (scrollContainer.scrollLeft >= maxScroll - 10) ? '0' : '1';
    });
}

function aplicarFiltrosCombinados() {
    const busquedaElement = document.getElementById('busqueda');
    const busqueda = busquedaElement ? normalizar(busquedaElement.value) : '';
    const tituloSeccion = document.getElementById('categoria-titulo');
    
    if(tituloSeccion) {
        tituloSeccion.innerText = categoriaActual === 'todos' ? 'Nuestra Colección' : categoriaActual;
    }

    const filtrados = negociosRaw.filter(n => {
        const coincideBusqueda = 
            normalizar(n.nombre).includes(busqueda) || 
            normalizar(n.servicios_resumen).includes(busqueda) ||
            normalizar(n.categoria).includes(busqueda) ||
            (n.etiquetas && n.etiquetas.some(etq => normalizar(etq).includes(busqueda)));
            
        const coincideCategoria = categoriaActual === 'todos' || normalizar(n.categoria) === normalizar(categoriaActual);
        const coincideEtiqueta = !etiquetaActual || (n.etiquetas && n.etiquetas.includes(etiquetaActual));
        
        return coincideBusqueda && coincideCategoria && coincideEtiqueta;
    });

    if (busqueda !== '' || (categoriaActual !== 'todos' && categoriaActual !== null)) {
        document.getElementById('section-results').classList.remove('hidden');
        document.getElementById('landing-categories').classList.add('hidden');
        renderCards(filtrados);
        renderSubCategorias(); 
    } else {
        renderLanding();
    }
}

function initFilters() {
    const input = document.getElementById('busqueda');
    if(input) input.addEventListener('input', () => aplicarFiltrosCombinados());
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const catValue = btn.getAttribute('data-cat');
            if(catValue === 'todos') volverInicio();
            else seleccionarCategoria(catValue);
            activarBoton(btn);
        });
    });
}

function activarBoton(btn) {
    document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('text-[#d4a373]', 'border-[#d4a373]', 'font-black');
        b.classList.add('text-stone-500', 'border-transparent');
    });
    btn.classList.add('text-[#d4a373]', 'border-[#d4a373]', 'font-black');
}

// --- MODAL DETALLE ACTUALIZADO ---
function verDetalle(id) {
    const n = negociosRaw.find(item => item.id === id);
    if (!n) return;

    const mensajeWA = encodeURIComponent(`¡Hola! Vi a ${n.nombre} en Punto 506 y me gustaría solicitar más información.`);
    
    // 1. Lógica para el botón de Menú
    let botonMenu = '';
    // Verificamos si tiene un campo 'menu_url' en el JSON o si es el caso específico detectado
    if (n.menu_url || n.nombre.toLowerCase().includes("uy ke rico") || n.nombre.toLowerCase().includes("uy.. que rico")) {
        const urlMenu = n.menu_url || "menu-uyquerico.html"; // Fallback al archivo local si no hay URL externa
        
        botonMenu = `
            <div class="flex justify-center mb-8">
                <a href="${urlMenu}" 
                   class="flex items-center justify-center gap-3 px-10 py-4 bg-[#d4a373] text-[#130f0e] hover:bg-white transition-all duration-300 font-black uppercase tracking-[0.2em] text-[11px] shadow-xl w-full md:w-auto">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Ver Menú e Iniciar Pedido
                </a>
            </div>
        `;
    }

    // ... (resto de la lógica de redes sociales se mantiene igual)

    const modalContenido = document.getElementById('modal-content');
    modalContenido.innerHTML = `
        <div class="relative h-48 md:h-64 overflow-hidden">
            <img src="${n.imagen}" alt="${n.nombre}" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-[#1c1614] via-transparent to-black/20"></div>
            <button onclick="cerrarModal()" class="absolute top-6 right-6 z-50 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-all">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
        </div>
        <div class="p-8 md:p-12 -mt-10 relative z-10 bg-[#1c1614]">
            <div class="text-center mb-10">
                <span class="text-[#d4a373] text-[10px] font-black tracking-[0.5em] uppercase block mb-3">${n.categoria}</span>
                <h2 class="serif-title text-3xl md:text-4xl text-white uppercase tracking-[0.1em]">${n.nombre}</h2>
                <div class="h-px w-16 bg-[#d4a373] mx-auto mt-6"></div>
            </div>
            
            ${botonMenu}

            <div class="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                <div class="space-y-6">
                     <div>
                        <h4 class="text-[9px] uppercase tracking-[0.4em] font-black text-stone-500 mb-3">La Experiencia</h4>
                        <p class="elegant-italic text-white text-lg leading-relaxed italic border-l-2 border-[#d4a373]/30 pl-4">"${n.servicios_resumen}"</p>
                     </div>
                     <p class="text-stone-400 text-sm leading-relaxed">${n.descripcion || 'Propuesta exclusiva Punto 506.'}</p>
                </div>
                </div>
            </div>
    `;

    document.getElementById('modal-negocio').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}
// Registro Formspree
document.addEventListener('DOMContentLoaded', () => {
    const registroForm = document.getElementById('form-registro') || document.getElementById('registro-form');
    if (registroForm) {
        registroForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = registroForm.querySelector('button[type="submit"]');
            btn.innerText = "PROCESANDO...";
            try {
                const response = await fetch("https://formspree.io/f/xqedvowy", {
                    method: 'POST',
                    body: new FormData(registroForm),
                    headers: { 'Accept': 'application/json' }
                });
                if (response.ok) {
                    btn.innerText = "¡EXITOSO!";
                    setTimeout(() => {
                        cerrarModalRegistro();
                        registroForm.reset();
                        btn.innerText = "REGISTRARSE";
                    }, 2500);
                }
            } catch (error) { btn.innerText = "ERROR"; }
        });
    }
});

function cerrarModalRegistro() {
    const modal = document.getElementById('modal-registro');
    if (modal) modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function abrirModalRegistro() {
    const modal = document.getElementById('modal-registro');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

// Cerrar modales al hacer clic fuera
window.onclick = function(event) {
    const modalNegocio = document.getElementById('modal-negocio');
    const modalRegistro = document.getElementById('modal-registro');
    if (event.target == modalNegocio) cerrarModal();
    if (event.target == modalRegistro) cerrarModalRegistro();
}

// Inicio
loadData();
