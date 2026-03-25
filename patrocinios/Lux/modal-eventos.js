const CarteleraLux = {
    // Configuración de afiches
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
                background: rgba(0,0,0,0.96); z-index: 1000;
                display: flex; align-items: center; justify-content: center;
                opacity: 0; transition: opacity 0.4s ease;
                backdrop-filter: blur(12px);
            }
            .lux-modal-content {
                width: 95%; max-width: 1100px; max-height: 90vh;
                background: #0a0a0a; border: 1px solid #d4a373;
                border-radius: 20px; overflow-y: auto; padding: 40px 20px;
                position: relative; transform: translateY(20px);
                transition: transform 0.4s ease;
                box-shadow: 0 0 60px rgba(212, 163, 115, 0.15);
            }
            .lux-modal-close {
                position: absolute; top: 15px; right: 20px;
                color: #d4a373; font-size: 35px; cursor: pointer; z-index: 10;
            }
            
            /* Header Centrado */
            .lux-modal-header { 
                display: flex; flex-direction: column; align-items: center; 
                text-align: center; margin-bottom: 25px; 
            }
            .lux-modal-header img { height: 80px; width: auto; margin-bottom: 15px; }
            .lux-modal-header h2 { 
                color: #fff; font-family: 'Montserrat', sans-serif; 
                letter-spacing: 5px; font-size: 20px; margin: 0; font-weight: 900;
            }

            /* Texto de Deslizar */
            .lux-swipe-hint {
                color: #d4a373; font-size: 13px; text-align: center; 
                margin-bottom: 20px; font-weight: 700; letter-spacing: 2px;
                text-transform: uppercase; display: none; /* Se activa en móvil */
            }

            /* Contenedor de Afiches */
            .lux-grid-eventos {
                display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
            }
            .lux-card-evento {
                background: #111; border-radius: 12px; overflow: hidden;
                border: 1px solid #222; display: flex; flex-direction: column;
                min-height: 450px; scroll-snap-align: center;
                scroll-snap-stop: always; /* FUERZA EL UNO POR UNO */
            }
            .lux-afiche {
                width: 100%; height: 100%; object-fit: cover;
                transition: transform 0.5s ease;
            }

            /* Estado Vacío */
            .lux-empty-state {
                flex: 1; display: flex; flex-direction: column;
                align-items: center; justify-content: center;
                padding: 30px; text-align: center; color: #888;
            }
            .lux-empty-state h3 { color: #d4a373; font-size: 16px; margin-bottom: 15px; font-weight: 800; }
            .lux-empty-state p { font-size: 13px; line-height: 1.6; }

            /* Estilos Móvil */
            @media (max-width: 768px) {
                .lux-swipe-hint { display: block; }
                .lux-grid-eventos {
                    display: flex;
                    overflow-x: auto;
                    scroll-snap-type: x mandatory;
                    gap: 15px;
                    padding-bottom: 20px;
                    scrollbar-width: none; /* Firefox */
                }
                .lux-grid-eventos::-webkit-scrollbar { display: none; }
                .lux-card-evento {
                    min-width: 85vw;
                    height: 60vh;
                    flex-shrink: 0;
                }
                .lux-modal-header img { height: 70px; }
                .lux-modal-header h2 { font-size: 16px; }
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
                    <div style="background: #d4a373; color: #000; text-align: center; padding: 10px; font-weight: 900; text-transform: uppercase; font-size: 14px; letter-spacing: 2px;">
                        ${dia}
                    </div>
                    ${imgPath ? 
                        `<img src="${imgPath}" class="lux-afiche" alt="Evento ${dia}">` : 
                        `<div class="lux-empty-state">
                            <h3>¡DÍA DE SPORT BAR!</h3>
                            <p>Hoy no hay evento programado,<br>pero te esperamos con las mejores bocas y ambiente.<br><br>
                            <b style="color: #fff; font-size: 11px;">#NOSVEMOSENLUX</b></p>
                        </div>`
                    }
                </div>
            `;
        });

        const modalHTML = `
            <div id="lux-modal" class="lux-modal-overlay" onclick="CarteleraLux.close()">
                <div class="lux-modal-content" onclick="event.stopPropagation()">
                    <span class="lux-modal-close" onclick="CarteleraLux.close()">&times;</span>
                    
                    <div class="lux-modal-header">
                        <img src="patrocinios/Lux/lux-discoteca.png" alt="Logo Lux">
                        <h2>EVENTOS DE LA SEMANA</h2>
                    </div>

                    <div class="lux-swipe-hint">
                        ← DESLIZA PARA NAVEGAR →
                    </div>

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
