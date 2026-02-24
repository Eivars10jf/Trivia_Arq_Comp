<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Trivia de Ingeniería</title>
    <link rel="stylesheet" href="styles.css"> 
</head>
<body>
    <div class="game-container">
        <h1>Trivia: Estructura de Computadores</h1>
        <div class="progress-container"><div id="progress-bar"></div></div>
        <div class="stats-panel">
            <div class="stat-box"><span>Tiempo:</span> <span id="time">120</span>s</div>
            <div class="stat-box"><span>✅:</span> <span id="correct">0</span></div>
            <div class="stat-box"><span>❌:</span> <span id="wrong">0</span></div>
        </div>
        <div class="game-board">
            <div class="column" id="definitions"><h3>Definiciones</h3></div>
            <div class="column" id="concepts"><h3>Conceptos</h3></div>
        </div>
        <button id="check-btn">Verificar Respuestas</button>
    </div>
    <script src="script.js"></script>
</body>
</html>
