// --- ESTADO GLOBAL ---
let negociosRaw = [];
let categoriaActual = 'todos';
let etiquetaActual = null;

// --- UTILIDADES ---
const normalizar = (texto) => texto ? texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : "";

function registrarActividad(evento, detalle) {
    console.log(`[Analytics] ${evento}: ${detalle}`);
    if (typeof gtag === 'function') {
        gtag('event', evento, { 'event_label': detalle });
    }
}

// --- LÓGICA DE HEADER Y SECCIONES DINÁMICAS ---
function gestionarVisibilidadHeader(categoria) {
    const purposeCard = document.getElementById('purpose-card');
    const discoverTagline = document.getElementById('discover-tagline');
    const growSection = document.getElementById('grow-network-section');
    
    const esTodos = categoria === 'todos';
    
    if (purposeCard) purposeCard.classList.toggle('hidden', !esTodos);
    if (discoverTagline) discoverTagline.classList.toggle('hidden', esTodos);
    if (growSection) growSection.classList.toggle('hidden', !esTodos);
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

// --- NAVEGACIÓN Y FILTROS ---
function volverInicio() {
    ejecutarTransicion(() => {
        categoriaActual = 'todos';
        etiquetaActual = null;
        const inputBusqueda = document.getElementById('busqueda');
        if (inputBusqueda) inputBusqueda.value = '';
        actualizarURL('todos');
        gestionarVisibilidadHeader('todos');
        document.querySelectorAll('.filter-btn').forEach(btn => {
            if(btn.getAttribute('data-cat') === 'todos') activarBoton(btn);
        });
        renderLanding();
    });
}

function seleccionarCategoria(id) {
    ejecutarTransicion(() => {
        categoriaActual = id;
        etiquetaActual = null;
        actualizarURL(id);
        gestionarVisibilidadHeader(id);
        
        // UI Switch
        document.getElementById('landing-categories')?.classList.add('hidden');
        document.getElementById('section-results')?.classList.remove('hidden');
        
        renderSubCategorias();
        aplicarFiltrosCombinados();

        setTimeout(() => {
            const resultados = document.getElementById('section-results');
            if (resultados) {
                const offset = resultados.offsetTop - 90;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        }, 100);
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
            normalizar(n.keywords_busqueda || "").includes(busqueda);
            
        const coincideCategoria = categoriaActual === 'todos' || normalizar(n.categoria) === normalizar(categoriaActual);
        const coincideEtiqueta = !etiquetaActual || (n.etiquetas && n.etiquetas.includes(etiquetaActual));
        
        return coincideBusqueda && coincideCategoria && coincideEtiqueta;
    });

    if (busqueda !== '' || (categoriaActual !== 'todos' && categoriaActual !== null)) {
        document.getElementById('section-results')?.classList.remove('hidden');
        document.getElementById('landing-categories')?.classList.add('hidden');
        renderCards(filtrados);
        renderSubCategorias(); 
    } else {
        renderLanding();
    }
}

// --- RENDERIZADO DE COMPONENTES ---
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

function renderCards(listaFiltrada) {
    const grid = document.getElementById('grid-negocios');
    if (!grid) return;

    grid.style.opacity = '0';
    setTimeout(() => {
        grid.innerHTML = listaFiltrada.map((n, i) => `
            <article class="group glass-card animate-reveal overflow-hidden" style="animation-delay: ${i * 0.08}s">
                <div class="relative h-48 md:h-64 overflow-hidden">
                    <img src="${n.imagen}" class="w-full h-full object-cover transition duration-[2s] group-hover:scale-110" alt="${n.nombre}" loading="lazy"> 
                    <div class="absolute inset-0 bg-gradient-to-t from-[#130f0e] via-transparent opacity-80"></div>
                    <div class="absolute top-4 left-4 text-[#d4a373] text-[6px] font-black tracking-[0.4em] uppercase bg-[#130f0e]/80 backdrop-blur-md px-2 py-1 border border-[#d4a373]/20">${n.categoria}</div>
                </div>
                <div class="p-5 md:p-8 text-center flex flex-col flex-grow">
                    <h3 class="business-title text-base md:text-xl text-white uppercase tracking-wider font-bold mb-2 group-hover:text-[#d4a373] transition-colors">${n.nombre}</h3>
                    <p class="elegant-italic text-stone-400 text-[11px] md:text-[14px] leading-relaxed line-clamp-2 mb-4 italic">"${n.servicios_resumen}"</p>
                    <button onclick="verDetalle(${n.id})" class="mt-auto w-full py-3 text-[#d4a373] text-[8px] font-bold uppercase tracking-[0.5em] border border-[#d4a373]/20 hover:bg-[#d4a373] hover:text-[#130f0e] transition-all">Detalles</button>
                </div>
            </article>
        `).join('');
        grid.style.opacity = '1';
        gestionarLimiteVisual(listaFiltrada.length);
    }, 300);
}

function renderSubCategorias() {
    const contenedorBase = document.getElementById('sub-categorias');
    if (!contenedorBase) return;
    contenedorBase.innerHTML = '';

    if (categoriaActual === 'todos' || (document.getElementById('busqueda')?.value.length > 0)) return;

    const etiquetas = [...new Set(
        negociosRaw
            .filter(n => normalizar(n.categoria) === normalizar(categoriaActual) && n.etiquetas)
            .flatMap(n => n.etiquetas)
    )];

    if (etiquetas.length === 0) return;

    contenedorBase.className = "relative w-full overflow-hidden mb-6";
    const scrollContainer = document.createElement('div');
    scrollContainer.className = "flex overflow-x-auto hide-scroll gap-2 py-2 px-4 md:flex-wrap md:justify-center";
    
    etiquetas.forEach(tag => {
        const btn = document.createElement('button');
        const activo = etiquetaActual === tag;
        btn.innerText = tag.toUpperCase();
        btn.className = `whitespace-nowrap text-[8px] tracking-[0.4em] px-5 py-2.5 border transition-all duration-700 ${activo ? 'border-[#d4a373] text-[#d4a373] bg-[#d4a373]/5' : 'border-transparent text-stone-500 hover:text-stone-200'}`;
        btn.onclick = () => {
            etiquetaActual = (etiquetaActual === tag) ? null : tag;
            renderSubCategorias();
            aplicarFiltrosCombinados();
        };
        scrollContainer.appendChild(btn);
    });
    contenedorBase.appendChild(scrollContainer);
}

// --- MODALES (DETALLE Y REGISTRO) ---
function verDetalle(id) {
    const n = negociosRaw.find(item => item.id === id);
    if (!n) return;
    
    registrarActividad('ver_detalle', n.nombre);
    const mensajeWA = encodeURIComponent(`¡Hola! Vi a ${n.nombre} en Punto 506 y me gustaría solicitar más información.`);
    
    let botonesRedes = '';
    if (n.instagram && n.instagram !== "null") {
        botonesRedes += `<a href="${n.instagram}" target="_blank" class="w-12 h-12 flex items-center justify-center border border-[#d4a373]/30 text-[#d4a373] hover:bg-[#d4a373] hover:text-black transition-all"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.247 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.247-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.247-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.247 3.608-1.308 1.266-.058 1.646-.07 4.85-.07M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.2 4.353 2.612 6.766 6.96 6.965 1.28.058 1.688.072 4.948.072s3.668-.014 4.948-.072c4.351-.2 6.763-2.612 6.96-6.965.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.353-2.612-6.765-6.96-6.965C15.668.014 15.26 0 12 0m0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324M12 16a4 4 0 110-8 4 4 0 010 8m6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881"/></svg></a>`;
    }

    const modalContenido = document.getElementById('modal-content');
    modalContenido.innerHTML = `
        <div class="relative h-48 md:h-64 overflow-hidden">
            <img src="${n.imagen}" class="w-full h-full object-cover">
            <button onclick="cerrarModal()" class="absolute top-6 right-6 bg-black/40 text-white p-2 rounded-full">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" stroke-width="2" stroke-linecap="round"/></svg>
            </button>
        </div>
        <div class="p-8 md:p-12 -mt-10 relative bg-[#1c1614]">
            <div class="text-center mb-10">
                <span class="text-[#d4a373] text-[10px] font-black tracking-[0.5em] uppercase block mb-3">${n.categoria}</span>
                <h2 class="serif-title text-3xl text-white uppercase">${n.nombre}</h2>
                <div class="h-px w-16 bg-[#d4a373] mx-auto mt-6"></div>
            </div>
            <div class="grid md:grid-cols-2 gap-10 mb-12">
                <div class="space-y-6">
                    <p class="elegant-italic text-white text-lg border-l-2 border-[#d4a373]/30 pl-4 italic">"${n.servicios_resumen}"</p>
                    <p class="text-stone-400 text-sm">${n.descripcion || 'Exclusividad garantizada por Punto 506.'}</p>
                </div>
                <div class="bg-black/30 p-6 border border-[#d4a373]/10 space-y-4">
                    <p class="text-[8px] text-stone-500 uppercase tracking-widest">Horarios: <span class="text-stone-200 block text-xs mt-1">${n.horario || 'Consultar'}</span></p>
                    <p class="text-[8px] text-stone-500 uppercase tracking-widest">Ubicación: <span class="text-stone-200 block text-xs mt-1">${n.direccion || 'Pococí, Limón'}</span></p>
                </div>
            </div>
            <div class="flex justify-center gap-4 mb-10">
                <a href="https://api.whatsapp.com/send?phone=${n.whatsapp}&text=${mensajeWA}" target="_blank" class="w-12 h-12 flex items-center justify-center border border-[#d4a373]/30 text-[#d4a373] hover:bg-[#d4a373] hover:text-black transition-all">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                </a>
                ${botonesRedes}
            </div>
            <div class="border-t border-white/5 pt-8">
                <form id="feedback-form" action="https://formspree.io/f/mlgwzggv" method="POST" class="max-w-xl mx-auto space-y-4">
                    <input type="hidden" name="Negocio" value="${n.nombre}">
                    <textarea name="comentario" required placeholder="Sugerencias anónimas..." class="w-full bg-black/50 border border-white/10 p-4 text-white text-xs h-24 resize-none"></textarea>
                    <button type="submit" class="w-full py-4 border border-[#d4a373] text-[#d4a373] text-[9px] uppercase tracking-[0.4em] hover:bg-[#d4a373] hover:text-black transition-all">Enviar Feedback</button>
                </form>
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

function abrirModalRegistro() {
    document.getElementById('modal-registro').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function cerrarModalRegistro() {
    document.getElementById('modal-registro').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// --- INITIALIZATION ---
async function loadData() {
    try {
        const response = await fetch('negocios.json');
        negociosRaw = await response.json();
        
        const params = new URLSearchParams(window.location.search);
        const catParam = params.get('categoria');
        
        if (catParam && catParam !== 'todos') {
            seleccionarCategoria(catParam);
        } else {
            renderLanding();
        }
        
        initFilters();
        setTimeout(() => document.getElementById('preloader')?.classList.add('fade-out'), 950);
    } catch (e) {
        console.error("Error cargando datos:", e);
    }
}

function initFilters() {
    document.getElementById('busqueda')?.addEventListener('input', () => aplicarFiltrosCombinados());
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const cat = btn.getAttribute('data-cat');
            if(cat === 'todos') volverInicio();
            else seleccionarCategoria(cat);
            activarBoton(btn);
        });
    });

    // Delegación de eventos para cerrar modales al hacer clic fuera
    window.addEventListener('click', (e) => {
        if (e.target.id === 'modal-negocio') cerrarModal();
        if (e.target.id === 'modal-registro') cerrarModalRegistro();
    });

    // Formulario de Registro con Formspree
    const formReg = document.getElementById('form-registro') || document.getElementById('registro-form');
    if (formReg) {
        formReg.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = formReg.querySelector('button[type="submit"]');
            btn.innerText = "PROCESANDO...";
            btn.disabled = true;

            try {
                const response = await fetch("https://formspree.io/f/xqedvowy", {
                    method: 'POST',
                    body: new FormData(formReg),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    btn.innerText = "¡REGISTRO EXITOSO!";
                    setTimeout(() => {
                        cerrarModalRegistro();
                        formReg.reset();
                        btn.innerText = "REGISTRARME";
                        btn.disabled = false;
                    }, 2000);
                }
            } catch (error) {
                btn.innerText = "ERROR - REINTENTAR";
                btn.disabled = false;
            }
        });
    }
}

function activarBoton(btn) {
    document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('text-[#d4a373]', 'border-[#d4a373]', 'font-black');
        b.classList.add('text-stone-500', 'border-transparent');
    });
    btn.classList.add('text-[#d4a373]', 'border-[#d4a373]', 'font-black');
}

function actualizarURL(categoria) {
    const url = categoria === 'todos' ? window.location.pathname : `?categoria=${encodeURIComponent(categoria.toLowerCase())}`;
    window.history.pushState({}, '', url);
}

function gestionarLimiteVisual(total) {
    const wrapper = document.getElementById('wrapper-grid');
    const btnMas = document.getElementById('btn-ver-mas-container');
    if (categoriaActual === 'todos' && total > 8) {
        wrapper?.classList.add('grid-limitado');
        btnMas?.classList.remove('hidden');
    } else {
        wrapper?.classList.remove('grid-limitado');
        btnMas?.classList.add('hidden');
    }
}

function expandirGrid() {
    document.getElementById('wrapper-grid')?.classList.remove('grid-limitado');
    document.getElementById('btn-ver-mas-container')?.classList.add('hidden');
}

// Iniciar app
loadData();
registrarActividad('visita_pagina', 'Punto 506');
