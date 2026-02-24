const data = [
    { id: 1, concept: "Tiempo de Acceso", def: "Tiempo desde que una dirección es visible hasta que el dato está disponible." },
    { id: 2, concept: "Memoria Caché", def: "Memoria intermedia entre la memoria principal y el procesador." },
    { id: 3, concept: "Acceso Secuencial", def: "Se accede leyendo en orden todas las posiciones hasta la deseada." },
    { id: 4, concept: "Registro", def: "Memoria interna del procesador, integrada en el chip." },
    { id: 5, concept: "Procesador", def: "Sistema capaz de realizar operaciones aritméticas y lógicas básicas." },
    { id: 6, concept: "Arquitectura", def: "Elementos del computador visibles para el programador." },
    { id: 7, concept: "Acceso Directo", def: "Organización en bloques con dirección única; acceso directo al bloque y luego secuencial." },
    { id: 8, concept: "Caché Asociativa", def: "Memorias rápidas de capacidad reducida que usan acceso asociativo." },
    { id: 9, concept: "Estructura", def: "Unidades funcionales y su interconexión." },
    { id: 10, concept: "Acceso Aleatorio", def: "Cada elemento tiene una dirección única y se accede directamente." },
    { id: 11, concept: "Memoria Volátil", def: "Requiere energía para mantener datos (Registros, Caché, RAM)." }
];

let timeLeft = 120;
let timer;

function init() {
    const defCol = document.getElementById('definitions');
    const conCol = document.getElementById('concepts');
    
    // Crear zonas de definiciones
    data.forEach(item => {
        const zone = document.createElement('div');
        zone.className = 'drop-zone';
        zone.innerHTML = `<p>${item.def}</p>`;
        zone.dataset.id = item.id;
        zone.addEventListener('dragover', e => e.preventDefault());
        zone.addEventListener('drop', handleDrop);
        defCol.appendChild(zone);
    });

    // Crear tarjetas de conceptos mezcladas
    [...data].sort(() => Math.random() - 0.5).forEach(item => {
        const card = document.createElement('div');
        card.className = 'concept-card';
        card.innerText = item.concept;
        card.draggable = true;
        card.id = `c-${item.id}`;
        card.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/plain', e.target.id);
        });
        conCol.appendChild(card);
    });
    
    startTimer();
}

function handleDrop(e) {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('text/plain');
    const card = document.getElementById(cardId);
    let targetZone = e.target;
    if (targetZone.tagName === 'P') targetZone = targetZone.parentElement;
    
    if (targetZone.classList.contains('drop-zone')) {
        targetZone.appendChild(card);
    }
}

function startTimer() {
    const bar = document.getElementById('progress-bar');
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time').innerText = timeLeft;
        bar.style.width = (timeLeft / 120 * 100) + "%";
        if (timeLeft <= 0) {
            clearInterval(timer);
            checkAnswers();
        }
    }, 1000);
}

function checkAnswers() {
    clearInterval(timer);
    let correct = 0;
    let wrong = 0;
    document.querySelectorAll('.drop-zone').forEach(zone => {
        const card = zone.querySelector('.concept-card');
        if (card && card.id === `c-${zone.dataset.id}`) {
            zone.style.backgroundColor = "#d4edda";
            correct++;
        } else {
            zone.style.backgroundColor = "#f8d7da";
            wrong++;
        }
    });
    document.getElementById('correct').innerText = correct;
    document.getElementById('wrong').innerText = wrong;
    alert(`Juego terminado. Aciertos: ${correct}`);
}

document.getElementById('check-btn').addEventListener('click', checkAnswers);
window.onload = init;
