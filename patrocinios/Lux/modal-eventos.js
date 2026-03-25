const CarteleraLux = {
    // Definimos los días y el sistema buscará las imágenes automáticamente
    dias: ['viernes', 'sabado', 'domingo'],
    
    // Configuración de la ruta base
    rutaBase: "506Pruebas/patrocinios/Lux/",

    init: function() {
        this.injectStyles();
    },

    injectStyles: function() {
        if (document.getElementById('lux-modal-styles')) return;
        const style = document.createElement('style');
        style.id = 'lux-modal-styles';
        style.innerHTML = `
            .lux-modal-overlay {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.96); z-index: 1000;
                display: flex; align-items: center; justify-content: center;
                opacity: 0; transition: opacity 0.4s ease;
                backdrop-filter: blur(12px);
            }
            .lux-modal-content {
                width: 95%; max-width: 1100px; max-height: 90vh;
                background: #0a0a0a; border: 1px solid #d4a373;
                border-radius: 20px; overflow-y: auto; padding: 40px 0px; /* Padding lateral 0 para el scroll */
                position: relative; transform: translateY(20px);
                transition: transform 0.4s ease;
                box-shadow: 0 0 60px rgba(212, 163, 115, 0.15);
            }
            .lux-modal-close {
                position: absolute; top: 15px; right: 20px;
                color: #d4a373; font-size: 35px; cursor: pointer; z-index: 10;
            }
            
            .lux-modal-header, .lux-swipe-hint { 
                padding: 0 20px; 
                display: flex; flex-direction: column; align-items: center; text-align: center; 
            }
            .lux-modal-header img { height: 75px; width: auto; margin-bottom: 10px; }
            .lux-modal-header h2 { 
                color: #fff; font-family: 'Montserrat', sans-serif; 
                letter-spacing: 5px; font-size: 18px; margin: 0 0 15px 0; font-weight: 900;
            }

            .lux-swipe-hint {
                color: #d4a373; font-size: 12px; font-weight: 700; letter-spacing: 2px;
                text-transform: uppercase; margin-bottom: 20px; opacity: 0.8;
            }

            .lux-grid-eventos {
                display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
                padding: 0 20px;
            }

            .lux-card-evento {
                background: #111; border-radius: 12px; overflow: hidden;
                border: 1px solid #222; display: flex; flex-direction: column;
                min-height: 400px; scroll-snap-align: center;
                scroll-snap-stop: always;
            }

            .lux-afiche { width: 100%; height: 100%; object-fit: cover; }

            .lux-empty-state {
                flex: 1; display: flex; flex-direction: column;
                align-items: center; justify-content: center;
                padding: 30px; text-align: center; color: #888;
            }
            .lux-empty-state h3 { color: #d4a373; font-size: 14px; margin-bottom: 10px; font-weight: 800; }
            .lux-empty-state p { font-size: 12px; line-height: 1.5; }

            @media (max-width: 768px) {
                .lux-grid-eventos {
                    display: flex;
                    overflow-x: auto;
                    scroll-snap-type: x mandatory;
                    gap: 15px;
                    padding: 0 40px 20px 40px; /* Más padding para centrar la tarjeta pequeña */
                    scrollbar-width: none;
                }
                .lux-grid-eventos::-webkit-scrollbar { display: none; }
                
                .lux-card-evento {
                    min-width: 75%; /* Tarjetas más pequeñas para que se vean las de los lados */
                    height: 55vh;
                    flex-shrink: 0;
                }
            }
        `;
        document.head.appendChild(style);
    },

    // Función para verificar si la imagen existe en el objeto de eventos o por convención
    render: function() {
        let gridHTML = '';

        this.dias.forEach(dia => {
            // Lógica: Construimos la ruta dinámica basada en tu carpeta
            const imgPath = `${this.rutaBase}${dia}.webp`;
            
            // Nota: En JS plano no podemos saber si un archivo existe en el servidor sin un fetch,
            // pero podemos usar el evento 'onerror' de la imagen para mostrar el empty state.
            
            gridHTML += `
                <div class="lux-card-evento">
                    <div style="background: #d4a373; color: #000; text-align: center; padding: 8px; font-weight: 900; text-transform: uppercase; font-size: 13px;">
                        ${dia}
                    </div>
                    <div class="lux-card-body" style="flex: 1; display: flex; flex-direction: column;">
                        <img src="${imgPath}" class="lux-afiche" alt="Evento ${dia}" 
                             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                        
                        <div class="lux-empty-state" style="display: none;">
                            <h3>DÍA DE RELAX</h3>
                            <p>Preparando lo mejor para este ${dia}.<br><br>
                            <b style="color: #fff;">#SportBarAbierto</b></p>
                        </div>
                    </div>
                </div>
            `;
        });

        const modalHTML = `
            <div id="lux-modal" class="lux-modal-overlay" onclick="CarteleraLux.close()">
                <div class="lux-modal-content" onclick="event.stopPropagation()">
                    <span class="lux-modal-close" onclick="CarteleraLux.close()">&times;</span>
                    
                    <div class="lux-modal-header">
                        <img src="patrocinios/Lux/lux-discoteca.png" alt="Logo Lux">
                        <h2>CARTELERA</h2>
                    </div>

                    <div class="lux-swipe-hint">← DESLIZA →</div>

                    <div class="lux-grid-eventos">
                        ${gridHTML}
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        setTimeout(() => {
            const m = document.getElementById('lux-modal');
            if(m) {
                m.style.opacity = '1';
                m.querySelector('.lux-modal-content').style.transform = 'translateY(0)';
            }
        }, 10);
    },

    close: function() {
        const m = document.getElementById('lux-modal');
        if(m) {
            m.style.opacity = '0';
            m.querySelector('.lux-modal-content').style.transform = 'translateY(20px)';
            setTimeout(() => m.remove(), 400);
        }
    }
};

window.abrirModalCartelera = function() {
    CarteleraLux.init();
    CarteleraLux.render();
};
