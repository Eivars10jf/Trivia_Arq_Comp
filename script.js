const data = [
    { id: 1, concept: "Tiempo de Acceso", def: "Tiempo desde que una dirección es visible hasta que el dato está disponible." },
    { id: 2, concept: "Memoria Caché", def: "Memoria intermedia entre la memoria principal y el procesador." },
    { id: 3, concept: "Acceso Secuencial", def: "Se accede leyendo en orden todas las posiciones hasta la deseada." },
    { id: 4, concept: "Registro", def: "Memoria interna del procesador, integrada en el chip." },
    { id: 5, concept: "Procesador", def: "Sistema capaz de realizar operaciones aritméticas y lógicas básicas." },
    { id: 6, concept: "Arquitectura de Computador", def: "Elementos del computador visibles para el programador." },
    { id: 7, concept: "Acceso Directo", def: "Organización en bloques con dirección única; acceso directo al bloque y luego secuencial." },
    { id: 8, concept: "Caché Asociativa", def: "Memorias rápidas de capacidad reducida que usan acceso asociativo." },
    { id: 9, concept: "Estructura de Computador", def: "Unidades funcionales y su interconexión." },
    { id: 10, concept: "Acceso Aleatorio", def: "Cada elemento tiene una dirección única y se accede directamente." },
    { id: 11, concept: "Memoria Volátil", def: "Requiere energía para mantener datos (Registros, Caché, RAM)." }
];

let timeLeft = 120;
let timer;

function init() {
    const defCol = document.getElementById('definitions');
    const conCol = document.getElementById('concepts');
    
    [...data].sort(() => Math.random() - 0.5).forEach(item => {
        const zone = document.createElement('div');
        zone.className = 'drop-zone';
        zone.innerHTML = `<p>${item.def}</p>`;
        zone.dataset.id = item.id;
        zone.ondragover = e => e.preventDefault();
        zone.ondrop = drop;
        defCol.appendChild(zone);
    });

    [...data].sort(() => Math.random() - 0.5).forEach(item => {
        const card = document.createElement('div');
        card.className = 'concept-card';
        card.innerText = item.concept;
        card.draggable = true;
        card.id = `c-${item.id}`;
        card.ondragstart = e => e.dataTransfer.setData('text', e.target.id);
        conCol.appendChild(card);
    });
    
    startTimer();
}

function startTimer() {
    const bar = document.getElementById('progress-bar');
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time').innerText = timeLeft;
        bar.style.width = (timeLeft / 120 * 100) + "%";
        if (timeLeft <= 0) { clearInterval(timer); check(); }
    }, 1000);
}

function drop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text');
    let target = e.target;
    if (target.tagName === 'P') target = target.parentElement;
    if (target.classList.contains('drop-zone')) target.appendChild(document.getElementById(id));
}

function check() {
    clearInterval(timer);
    let ok = 0, fail = 0;
    document.querySelectorAll('.drop-zone').forEach(z => {
        const c = z.querySelector('.concept-card');
        if (c && c.id === `c-${z.dataset.id}`) {
            z.style.backgroundColor = "#d4edda"; ok++;
        } else {
            z.style.backgroundColor = "#f8d7da"; fail++;
        }
    });
    document.getElementById('correct').innerText = ok;
    document.getElementById('wrong').innerText = fail;
    alert(`Juego terminado. Aciertos: ${ok}`);
}

document.getElementById('check-btn').onclick = check;
init();
