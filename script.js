// 1. LISTA COMPLETA DE CONCEPTOS Y DEFINICIONES
const data = [
    { id: 1, concept: "Tiempo de Acceso", def: "Es el tiempo que transcurre desde que una dirección de memoria es visible para los circuitos de la memoria hasta que el dato está almacenado o está disponible para ser utilizado." },
    { id: 2, concept: "Memoria Caché", def: "Componente que se coloca como una memoria intermedia entre la memoria principal y el procesador." },
    { id: 3, concept: "Acceso Secuencial", def: "Se accede desde la última posición a la que se ha accedido, leyendo en orden todas las posiciones hasta llegar a la posición deseada." },
    { id: 4, concept: "Registro", def: "Espacio de memoria que se encuentra dentro del procesador, integrado dentro del mismo chip de este." },
    { id: 5, concept: "Procesador", def: "Sistema de propósito general capaz de hacer operaciones aritméticas y lógicas básicas, a partir de las cuales se pueden resolver problemas complejos." },
    { id: 6, concept: "Arquitectura de Computador", def: "Conjunto de elementos del computador que son visibles desde el punto de vista del programador." },
    { id: 7, concept: "Acceso Directo", def: "Organización en bloques y cada bloque de memoria tiene una dirección única, se accede directamente al principio de un bloque y dentro de este se hace secuencia hasta llegar a la posición deseada." },
    { id: 8, concept: "Memoria Caché (Asociativa)", def: "Memorias de capacidad reducida, pero mas rápidas que la memoria principal, utilizan acceso asociativo, se pueden encontrar dentro del chip del procesador o cerca de él." },
    { id: 9, concept: "Estructura de Computador", def: "Se refiere a las unidades funcionales del computador y como están interconectadas." },
    { id: 10, concept: "Acceso Aleatorio", def: "Se organiza como un vector en el que cada elemento individual tiene una dirección única, se accede a una posición determinada proporcionando la dirección." },
    { id: 11, concept: "Memoria Volátil", def: "Necesita de una corriente eléctrica para mantener su estado, incluyen registros, memoria caché y memoria principal." }
];

// Variables de control
let timeLeft = 120; // 2 minutos para 11 conceptos
let timer;
const timerElement = document.getElementById('time');

// 2. INICIAR JUEGO
function initGame() {
    const defCol = document.getElementById('definitions');
    const conceptCol = document.getElementById('concepts');

    // Limpiar columnas por si acaso
    defCol.innerHTML = '<h3>Definiciones</h3>';
    conceptCol.innerHTML = '<h3>Conceptos</h3>';

    // Barajar las definiciones para que no coincidan con los conceptos
    const shuffledDefinitions = [...data].sort(() => Math.random() - 0.5);
    // Barajar los conceptos
    const shuffledConcepts = [...data].sort(() => Math.random() - 0.5);

    // Crear zonas de definiciones
    shuffledDefinitions.forEach(item => {
        const zone = document.createElement('div');
        zone.className = 'drop-zone';
        zone.innerHTML = `<p>${item.def}</p>`;
        zone.dataset.id = item.id;
        zone.ondragover = e => e.preventDefault();
        zone.ondrop = handleDrop;
        defCol.appendChild(zone);
    });

    // Crear tarjetas de conceptos
    shuffledConcepts.forEach(item => {
        const card = document.createElement('div');
        card.className = 'concept-card';
        card.innerText = item.concept;
        card.draggable = true;
        card.id = `card-${item.id}`;
        card.ondragstart = e => e.dataTransfer.setData('text', e.target.id);
        conceptCol.appendChild(card);
    });

    startTimer();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("¡Tiempo agotado!");
            checkAnswers();
        }
    }, 1000);
}

function handleDrop(e) {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('text');
    const card = document.getElementById(cardId);
    
    // Si soltamos sobre la zona o sobre el texto P dentro de la zona
    let zone = e.target;
    if (zone.tagName === 'P') zone = zone.parentElement;

    if (zone.classList.contains('drop-zone')) {
        zone.appendChild(card);
    }
}

function checkAnswers() {
    let correct = 0;
    let wrong = 0;
    const zones = document.querySelectorAll('.drop-zone');

    zones.forEach(zone => {
        const card = zone.querySelector('.concept-card');
        if (card) {
            const cardId = card.id.split('-')[1];
            if (cardId === zone.dataset.id) {
                zone.style.backgroundColor = "#d4edda"; // Verde claro
                correct++;
            } else {
                zone.style.backgroundColor = "#f8d7da"; // Rojo claro
                wrong++;
            }
        }
    });

    document.getElementById('correct').innerText = correct;
    document.getElementById('wrong').innerText = wrong;
    
    clearInterval(timer);
    alert(`Juego Terminado.\nAciertos: ${correct}\nFallos: ${wrong}`);
}

document.getElementById('check-btn').onclick = checkAnswers;

// Arrancar
initGame();