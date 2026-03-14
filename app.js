// --- CONFIGURACIÓN GENERAL ---
let negociosRaw = [];
let categoriaActual = 'todos';
let etiquetaActual = null;
const normalizar = (t) => t ? t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";

// Función de apoyo interna (Sin rastreadores externos)
async function registrarActividad(tipo, negocio) {
    console.log(`[Actividad Interna] Evento: ${tipo} | Referencia: ${negocio}`);
}

// --- LÓGICA DE VISIBILIDAD Y NAVEGACIÓN ---
function gestionarVisibilidadHeader(categoria) {
    const elementos = {
        purpose: document.getElementById('purpose-card'),
        tagline: document.getElementById('discover-tagline'),
        grow: document.getElementById('grow-network-section')
    };

    if (categoria === 'todos') {
        elementos.purpose?.classList.remove('hidden');
        elementos.tagline?.classList.add('hidden');
        elementos.grow?.classList.remove('hidden');
    } else {
        elementos.purpose?.classList.add('hidden');
        elementos.tagline?.classList.remove('hidden');
        elementos.grow?.classList.add('hidden');
    }
}

function ejecutarTransicion(callback) {
    const loader = document.getElementById('preloader');
    if (loader) {
        loader.classList.remove('fade-out');
        setTimeout(() => {
            callback();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => loader.classList.add('fade-out'), 600);
        }, 500);
    } else {
        callback();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function volverInicio() {
    ejecutarTransicion(() => {
        categoriaActual = 'todos';
        etiquetaActual = null;
        const inputBusqueda = document.getElementById('busqueda');
        if (inputBusqueda) inputBusqueda.value = '';
        actualizarURL('todos');
        gestionarVisibilidadHeader('todos');
        renderLanding();
    });
}

// --- RENDERIZADO DE INTERFAZ ---
function renderLanding() {
    const landing = document.getElementById('landing-categories');
    const resultados = document.getElementById('section-results');
    if(!landing) return;

    landing.classList.remove('hidden');
    resultados?.classList.add('hidden');
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
                <h3 class="serif-title text-white text-[10px] md:text-lg tracking-[0.2em] uppercase">${cat.nombre}</h3>
            </div>
        </div>
    `).join('');
}

function seleccionarCategoria(id) {
    ejecutarTransicion(() => {
        categoriaActual = id;
        etiquetaActual = null;
        document.getElementById('landing-categories')?.classList.add('hidden');
        document.getElementById('section-results')?.classList.remove('hidden');
        actualizarURL(id);
        gestionarVisibilidadHeader(id);
        renderSubCategorias();
        aplicarFiltrosCombinados();
        
        setTimeout(() => {
            const res = document.getElementById('section-results');
            if(res) window.scrollTo({ top: res.offsetTop - 90, behavior: 'smooth' });
        }, 100);
    });
}

function renderCards(listaFiltrada) {
    const grid = document.getElementById('grid-negocios');
    if(!grid) return;
    
    grid.style.opacity = '0';
    setTimeout(() => {
        grid.innerHTML = listaFiltrada.map((n, i) => `
            <article class="group glass-card animate-reveal overflow-hidden" style="animation-delay: ${i * 0.08}s">
                <div class="relative h-48 md:h-64 overflow-hidden">
                    <img src="${n.imagen}" class="w-full h-full object-cover group-hover:scale-110 transition duration-[2s]" alt="${n.nombre}">
                    <div class="absolute inset-0 bg-gradient-to-t from-[#130f0e] via-transparent opacity-80"></div>
                    <div class="absolute top-4 left-4 text-[#d4a373] text-[6px] font-black tracking-[0.4em] uppercase bg-[#130f0e]/80 p-2 border border-[#d4a373]/20">${n.categoria}</div>
                </div>
                <div class="p-5 md:p-8 text-center flex flex-col flex-grow">
                    <h3 class="business-title text-base md:text-xl text-white uppercase tracking-wider mb-2">${n.nombre}</h3>
                    <p class="elegant-italic text-stone-400 text-[11px] md:text-[14px] italic line-clamp-2 mb-4">"${n.servicios_resumen}"</p>
                    <button onclick="verDetalle(${n.id})" class="mt-auto w-full py-3 text-[#d4a373] text-[9px] font-bold uppercase tracking-[0.5em] border border-[#d4a373]/20 hover:bg-[#d4a373] hover:text-[#130f0e] transition-all">Detalles</button>
                </div>
            </article>
        `).join('');
        grid.style.opacity = '1';
    }, 300);
}

// --- FILTROS Y BÚSQUEDA ---
function aplicarFiltrosCombinados() {
    const busqueda = normalizar(document.getElementById('busqueda')?.value || '');
    const filtrados = negociosRaw.filter(n => {
        const coincideBusqueda = normalizar(n.nombre).includes(busqueda) || 
                                 normalizar(n.servicios_resumen).includes(busqueda) ||
                                 normalizar(n.categoria).includes(busqueda);
        const coincideCategoria = categoriaActual === 'todos' || normalizar(n.categoria) === normalizar(categoriaActual);
        const coincideEtiqueta = !etiquetaActual || (n.etiquetas && n.etiquetas.includes(etiquetaActual));
        return coincideBusqueda && coincideCategoria && coincideEtiqueta;
    });

    if (busqueda !== '' || categoriaActual !== 'todos') {
        document.getElementById('section-results')?.classList.remove('hidden');
        document.getElementById('landing-categories')?.classList.add('hidden');
        renderCards(filtrados);
        renderSubCategorias();
    } else {
        renderLanding();
    }
}

// --- MODAL DETALLE ---
function verDetalle(id) {
    const n = negociosRaw.find(item => item.id === id);
    if (!n) return;

    registrarActividad('ver_detalle', n.nombre);
    const mensajeWA = encodeURIComponent(`¡Hola! Vi a ${n.nombre} en Punto 506 y me gustaría información.`);
    const modalContenido = document.getElementById('modal-content');
    
    modalContenido.innerHTML = `
        <div class="relative h-48 md:h-64 overflow-hidden">
            <img src="${n.imagen}" class="w-full h-full object-cover">
            <button onclick="cerrarModal()" class="absolute top-6 right-6 z-50 bg-black/40 text-white p-2 rounded-full">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" stroke-width="2"/></svg>
            </button>
        </div>
        <div class="p-8 md:p-12 -mt-10 relative z-10 bg-[#1c1614]">
            <div class="text-center mb-10">
                <span class="text-[#d4a373] text-[10px] font-black tracking-[0.5em] uppercase block mb-3">${n.categoria}</span>
                <h2 class="serif-title text-3xl text-white uppercase">${n.nombre}</h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div class="space-y-6">
                    <p class="elegant-italic text-white text-lg italic border-l-2 border-[#d4a373]/30 pl-4">"${n.servicios_resumen}"</p>
                    <p class="text-stone-400 text-sm">${n.descripcion || ''}</p>
                </div>
                <div class="bg-black/30 p-6 border border-[#d4a373]/10 space-y-4">
                    <p class="text-stone-200 text-xs uppercase tracking-wider"><b>Horario:</b> ${n.horario || 'Consultar'}</p>
                    <p class="text-stone-200 text-xs uppercase tracking-wider"><b>Ubicación:</b> ${n.direccion || 'Pococí'}</p>
                </div>
            </div>
            <div class="flex justify-center gap-6 mt-12">
                <a href="https://api.whatsapp.com/send?phone=${n.whatsapp}&text=${mensajeWA}" target="_blank" class="w-14 h-14 flex items-center justify-center border border-[#d4a373]/30 text-[#d4a373] hover:bg-[#d4a373] hover:text-[#130f0e] transition-all">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                </a>
            </div>
        </div>
    `;

    document.getElementById('modal-negocio').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function cerrarModal() {
    document.getElementById('modal-negocio').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// --- CARGA INICIAL ---
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

        // Init input búsqueda
        document.getElementById('busqueda')?.addEventListener('input', () => aplicarFiltrosCombinados());

        setTimeout(() => {
            document.getElementById('preloader')?.classList.add('fade-out');
        }, 950);
        
    } catch (e) { 
        console.error("Error cargando datos:", e);
    }
}

function actualizarURL(categoria) {
    const nuevaUrl = categoria === 'todos' ? window.location.pathname : `?categoria=${encodeURIComponent(categoria.toLowerCase())}`;
    window.history.pushState({}, '', nuevaUrl);
}

// Iniciar aplicación
document.addEventListener('DOMContentLoaded', loadData);
