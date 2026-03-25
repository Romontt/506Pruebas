const CarteleraLux = {
    diasExtra: ['lunes', 'martes', 'miercoles', 'jueves'],
    diasFijos: ['viernes', 'sabado', 'domingo'],
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
                opacity: 0; transition: opacity 0.4s ease; backdrop-filter: blur(12px);
            }
            .lux-modal-content {
                width: 98%; max-width: 1200px; max-height: 95vh;
                background: #0a0a0a; border: 1px solid #d4a373;
                border-radius: 20px; overflow-y: auto; padding: 30px 0px;
                position: relative; transform: translateY(20px);
                transition: transform 0.4s ease; box-shadow: 0 0 60px rgba(212, 163, 115, 0.15);
            }
            .lux-modal-close {
                position: absolute; top: 15px; right: 20px;
                color: #d4a373; font-size: 35px; cursor: pointer; z-index: 10;
            }
            .lux-modal-header { 
                padding: 0 20px; display: flex; flex-direction: column; align-items: center; text-align: center; 
            }
            .lux-modal-header img { height: 70px; width: auto; margin-bottom: 5px; }
            .lux-modal-header h2 { 
                color: #fff; font-family: 'Montserrat', sans-serif; letter-spacing: 5px; 
                font-size: 18px; margin: 0 0 10px 0; font-weight: 900;
            }

            .lux-nav-container { position: relative; width: 100%; display: flex; align-items: center; }

            .lux-grid-eventos {
                display: flex; gap: 20px; padding: 10px 20px 20px 20px;
                overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none;
                scroll-behavior: smooth; width: 100%;
            }
            .lux-grid-eventos::-webkit-scrollbar { display: none; }

            .lux-card-evento {
                background: #111; border-radius: 12px; overflow: hidden;
                border: 1px solid #222; display: flex; flex-direction: column;
                aspect-ratio: 4 / 5; 
                scroll-snap-align: center; flex-shrink: 0; 
                width: 90%; /* Tarjeta más grande en móvil */
            }

            .lux-card-body { flex: 1; overflow: hidden; display: flex; flex-direction: column; position: relative; background: #000; }
            .lux-afiche { width: 100%; height: 100%; object-fit: cover; display: block; }

            .lux-btn-nav {
                position: absolute; top: 50%; transform: translateY(-50%);
                background: rgba(212, 163, 115, 0.8); color: #000;
                border: none; width: 50px; height: 50px;
                border-radius: 50%; cursor: pointer; z-index: 5;
                display: none; align-items: center; justify-content: center; 
                font-size: 20px; transition: 0.3s;
                box-shadow: 0 0 15px rgba(0,0,0,0.5);
            }
            .lux-btn-nav:hover { background: #fff; scale: 1.1; }
            .lux-prev { left: 10px; }
            .lux-next { right: 10px; }

            @media (min-width: 769px) {
                .lux-btn-nav { display: flex; }
                .lux-card-evento { width: 350px; } /* Tarjeta más grande en PC */
                .lux-grid-eventos { justify-content: flex-start; padding: 10px 60px 20px 60px; }
            }

            .lux-empty-state {
                flex: 1; display: flex; flex-direction: column;
                align-items: center; justify-content: center;
                padding: 30px; text-align: center; color: #888;
            }
            .lux-empty-state h3 { color: #d4a373; font-size: 14px; margin-bottom: 10px; font-weight: 800; }
        `;
        document.head.appendChild(style);
    },

    render: function() {
        let gridHTML = '';
        const todosLosDias = [...this.diasExtra, ...this.diasFijos];

        todosLosDias.forEach(dia => {
            const imgPath = `${this.rutaBase}${dia}.webp`;
            const esFijo = this.diasFijos.includes(dia);
            
            gridHTML += `
                <div class="lux-card-evento" data-dia="${dia}" data-fijo="${esFijo}">
                    <div style="background: #d4a373; color: #000; text-align: center; padding: 10px; font-weight: 900; text-transform: uppercase; font-size: 14px; letter-spacing: 1px;">
                        ${dia}
                    </div>
                    <div class="lux-card-body">
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
                    <div class="lux-nav-container">
                        <button class="lux-btn-nav lux-prev" onclick="CarteleraLux.scrollGrid(-370)">❮</button>
                        <div class="lux-grid-eventos" id="lux-grid">
                            ${gridHTML}
                        </div>
                        <button class="lux-btn-nav lux-next" onclick="CarteleraLux.scrollGrid(370)">❯</button>
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
                this.checkNavButtons();
            }
        }, 10);
    },

    scrollGrid: function(amount) {
        const grid = document.getElementById('lux-grid');
        if(grid) grid.scrollBy({ left: amount, behavior: 'smooth' });
    },

    checkNavButtons: function() {
        const grid = document.getElementById('lux-grid');
        if(!grid) return;
        const cards = grid.querySelectorAll('.lux-card-evento').length;
        if (cards <= 3) {
            document.querySelectorAll('.lux-btn-nav').forEach(b => b.style.display = 'none');
            grid.style.justifyContent = 'center';
        }
    },

    handleError: function(imgElement) {
        const card = imgElement.closest('.lux-card-evento');
        const esFijo = card.getAttribute('data-fijo') === 'true';

        if (esFijo) {
            imgElement.style.display = 'none';
            card.querySelector('.lux-empty-state').style.display = 'flex';
        } else {
            card.remove();
            this.checkNavButtons();
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
