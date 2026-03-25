const CarteleraLux = {
    // Aquí pondrías las rutas de los afiches reales. 
    // Si el string está vacío, el sistema mostrará el mensaje del Sport Bar.
    eventos: {
        viernes: "patrocinios/Lux/viernes.webp", 
        sabado: "",  // Ejemplo de día sin evento
        domingo: ""  // Ejemplo de día sin evento
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
                width: 90%; max-width: 1000px; max-height: 90vh;
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
            .lux-modal-header { text-align: center; margin-bottom: 30px; }
            .lux-modal-header img { height: 60px; margin-bottom: 10px; }
            .lux-modal-header h2 { 
                color: #fff; font-family: 'Montserrat', sans-serif; 
                letter-spacing: 4px; font-size: 18px; margin: 0;
            }

            /* Contenedor de Afiches */
            .lux-grid-eventos {
                display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
            }
            .lux-card-evento {
                background: #111; border-radius: 10px; overflow: hidden;
                border: 1px solid #222; display: flex; flex-direction: column;
                min-height: 400px;
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
            .lux-empty-state i { color: #d4a373; font-size: 40px; margin-bottom: 15px; }
            .lux-empty-state h3 { color: #d4a373; font-size: 14px; margin-bottom: 10px; text-transform: uppercase; }
            .lux-empty-state p { font-size: 11px; line-height: 1.5; }

            @media (max-width: 768px) {
                .lux-grid-eventos { grid-template-columns: 1fr; }
                .lux-card-evento { min-height: auto; height: 500px; }
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
                    <div style="background: #d4a373; color: #000; text-align: center; padding: 5px; font-weight: 900; text-transform: uppercase; font-size: 12px;">
                        ${dia}
                    </div>
                    ${imgPath ? 
                        `<img src="${imgPath}" class="lux-afiche" alt="Evento ${dia}">` : 
                        `<div class="lux-empty-state">
                            <h3>Recargando Baterías</h3>
                            <p>Estamos preparando lo mejor para el próximo ${dia}.<br><br>
                            <b>¡Te esperamos hoy en el Sport Bar!</b></p>
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
                        <img src="patrocinios/Lux/lux-discoteca.png">
                        <h2>EVENTOS DE LA SEMANA</h2>
                    </div>
                    <div class="lux-grid-eventos">
                        ${gridHTML}
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Animación de entrada
        setTimeout(() => {
            const m = document.getElementById('lux-modal');
            m.style.opacity = '1';
            m.querySelector('.lux-modal-content').style.transform = 'translateY(0)';
        }, 10);
    },

    close: function() {
        const m = document.getElementById('lux-modal');
        m.style.opacity = '0';
        m.querySelector('.lux-modal-content').style.transform = 'translateY(20px)';
        setTimeout(() => m.remove(), 400);
    }
};

// Esta es la función que llama el banner
window.abrirModalCartelera = function() {
    CarteleraLux.init();
    CarteleraLux.render();
};
