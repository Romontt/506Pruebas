const CarteleraLux = {
    // Días extra que el sistema intentará detectar
    diasExtra: ['lunes', 'martes', 'miercoles', 'jueves'],
    // Días fijos que siempre muestran algo (imagen o "Relax")
    diasFijos: ['viernes', 'sabado', 'domingo'],
    
    // Ajustado para buscar correctamente dentro de la carpeta del proyecto
    rutaBase: "patrocinios/Lux/",

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
                border-radius: 20px; overflow-y: auto; padding: 40px 0px;
                position: relative; transform: translateY(20px);
                transition: transform 0.4s ease;
                box-shadow: 0 0 60px rgba(212, 163, 115, 0.15);
            }
            .lux-modal-close {
                position: absolute; top: 15px; right: 20px;
                color: #d4a373; font-size: 35px; cursor: pointer; z-index: 10;
            }
            
            .lux-modal-header, .lux-swipe-hint { 
                padding: 0 20px; display: flex; flex-direction: column; align-items: center; text-align: center; 
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
                display: flex; gap: 20px; padding: 0 40px 20px 40px;
                overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none;
            }
            .lux-grid-eventos::-webkit-scrollbar { display: none; }

            /* Ajuste para que en escritorio se vean repartidas si son pocas */
            @media (min-width: 769px) {
                .lux-grid-eventos { display: grid; grid-auto-columns: minmax(300px, 1fr); grid-auto-flow: column; justify-content: center; }
            }

            .lux-card-evento {
                background: #111; border-radius: 12px; overflow: hidden;
                border: 1px solid #222; display: flex; flex-direction: column;
                min-height: 400px; scroll-snap-align: center; scroll-snap-stop: always;
                min-width: 75%; flex-shrink: 0;
            }

            @media (min-width: 769px) { .lux-card-evento { min-width: 300px; } }

            .lux-afiche { width: 100%; height: 100%; object-fit: cover; }

            .lux-empty-state {
                flex: 1; display: flex; flex-direction: column;
                align-items: center; justify-content: center;
                padding: 30px; text-align: center; color: #888;
            }
            .lux-empty-state h3 { color: #d4a373; font-size: 14px; margin-bottom: 10px; font-weight: 800; }
            .lux-empty-state p { font-size: 12px; line-height: 1.5; }
        `;
        document.head.appendChild(style);
    },

    render: function() {
        let gridHTML = '';
        // Combinamos días para el escaneo
        const todosLosDias = [...this.diasExtra, ...this.diasFijos];

        todosLosDias.forEach(dia => {
            const imgPath = `${this.rutaBase}${dia}.webp`;
            const esFijo = this.diasFijos.includes(dia);
            
            gridHTML += `
                <div class="lux-card-evento" data-dia="${dia}" data-fijo="${esFijo}">
                    <div style="background: #d4a373; color: #000; text-align: center; padding: 8px; font-weight: 900; text-transform: uppercase; font-size: 13px;">
                        ${dia}
                    </div>
                    <div class="lux-card-body" style="flex: 1; display: flex; flex-direction: column;">
                        <img src="${imgPath}" class="lux-afiche" alt="Evento ${dia}" 
                             onerror="CarteleraLux.handleError(this)">
                        
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
                        <img src="${this.rutaBase}lux-discoteca.png" alt="Logo Lux">
                        <h2>CARTELERA</h2>
                    </div>
                    <div class="lux-swipe-hint">← DESLIZA →</div>
                    <div class="lux-grid-eventos" id="lux-grid">
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

    handleError: function(imgElement) {
        const card = imgElement.closest('.lux-card-evento');
        const esFijo = card.getAttribute('data-fijo') === 'true';

        if (esFijo) {
            imgElement.style.display = 'none';
            card.querySelector('.lux-empty-state').style.display = 'flex';
        } else {
            card.remove();
        }
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
