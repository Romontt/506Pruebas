const CarteleraLux = {
    // Rutas de los afiches. Si el string está vacío, muestra el mensaje del Sport Bar.
    eventos: {
        viernes: "patrocinios/Lux/viernes.webp", 
        sabado: "",  
        domingo: ""  
    },

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
                background: rgba(0,0,0,0.95); z-index: 1000;
                display: flex; align-items: center; justify-content: center;
                opacity: 0; transition: opacity 0.4s ease;
                backdrop-filter: blur(10px);
            }
            .lux-modal-content {
                width: 95%; max-width: 1000px; max-height: 90vh;
                background: #0a0a0a; border: 1px solid #d4a373;
                border-radius: 15px; overflow-y: auto; padding: 30px;
                position: relative; transform: translateY(20px);
                transition: transform 0.4s ease;
                box-shadow: 0 0 50px rgba(212, 163, 115, 0.2);
            }
            .lux-modal-close {
                position: absolute; top: 15px; right: 20px;
                color: #d4a373; font-size: 30px; cursor: pointer; z-index: 10;
            }
            .lux-modal-header { text-align: center; margin-bottom: 20px; }
            .lux-modal-header img { height: 60px; margin-bottom: 10px; }
            .lux-modal-header h2 { 
                color: #fff; font-family: 'Montserrat', sans-serif; 
                letter-spacing: 4px; font-size: 18px; margin: 0;
            }

            /* Contenedor de Afiches (PC) */
            .lux-grid-eventos {
                display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
            }
            .lux-card-evento {
                background: #111; border-radius: 10px; overflow: hidden;
                border: 1px solid #222; display: flex; flex-direction: column;
                min-height: 450px;
            }
            .lux-afiche {
                width: 100%; height: 100%; object-fit: cover;
                transition: transform 0.5s ease;
            }
            .lux-card-evento:hover .lux-afiche { transform: scale(1.05); }

            /* Estado Vacío (Sport Bar) */
            .lux-empty-state {
                flex: 1; display: flex; flex-direction: column;
                align-items: center; justify-content: center;
                padding: 20px; text-align: center; color: #888;
            }
            .lux-empty-state h3 { color: #d4a373; font-size: 14px; margin-bottom: 10px; text-transform: uppercase; }
            .lux-empty-state p { font-size: 11px; line-height: 1.5; }

            /* CAMBIOS PARA MÓVIL (HORIZONTAL) */
            @media (max-width: 768px) {
                .lux-modal-content { padding: 20px 15px; }
                
                .lux-grid-eventos { 
                    display: flex; /* Cambia a flex para scroll lateral */
                    overflow-x: auto; 
                    scroll-snap-type: x mandatory; 
                    gap: 15px;
                    padding-bottom: 15px;
                    -webkit-overflow-scrolling: touch;
                }

                .lux-grid-eventos::-webkit-scrollbar { display: none; } /* Oculta barra de scroll */

                .lux-card-evento { 
                    min-width: 85vw; /* Ancho de la tarjeta en móvil */
                    height: 65vh; 
                    scroll-snap-align: center; 
                    flex-shrink: 0;
                }
            }
        `;
        document.head.appendChild(style);
    },

    render: function() {
        const dias = ['viernes', 'sabado', 'domingo'];
        let gridHTML = '';

        dias.forEach(dia => {
            const imgPath = this.eventos[dia];
            gridHTML += `
                <div class="lux-card-evento">
                    <div style="background: #d4a373; color: #000; text-align: center; padding: 8px; font-weight: 900; text-transform: uppercase; font-size: 13px; letter-spacing: 2px;">
                        ${dia}
                    </div>
                    ${imgPath ? 
                        `<img src="${imgPath}" class="lux-afiche" alt="Evento ${dia}">` : 
                        `<div class="lux-empty-state">
                            <h3 style="font-weight: 900;">Recargando Baterías</h3>
                            <p>Estamos preparando lo mejor para el próximo ${dia}.<br><br>
                            <b style="color: #fff;">¡Te esperamos hoy en el Sport Bar!</b></p>
                        </div>`
                    }
                </div>
            `;
        });

        // Instrucción visual solo para móviles
        const instruccionMovil = window.innerWidth <= 768 ? 
            `<p style="color: #d4a373; font-size: 9px; text-align: center; margin-bottom: 15px; opacity: 0.6; letter-spacing: 1px;">
                ← DESLIZA PARA VER OTROS DÍAS →
            </p>` : '';

        const modalHTML = `
            <div id="lux-modal" class="lux-modal-overlay" onclick="CarteleraLux.close()">
                <div class="lux-modal-content" onclick="event.stopPropagation()">
                    <span class="lux-modal-close" onclick="CarteleraLux.close()">&times;</span>
                    <div class="lux-modal-header">
                        <img src="patrocinios/Lux/lux-discoteca.png">
                        <h2>EVENTOS DE LA SEMANA</h2>
                    </div>
                    ${instruccionMovil}
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
