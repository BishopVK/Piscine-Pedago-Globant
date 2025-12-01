console.log("Wellcome to 2048!");

function initGame() {
  const grid = document.querySelector("#grid-container");
  grid.innerHTML = ""; // Vacía el grid al reiniciar

  for (let i = 1; i <= 16; i++) {
    const cell = document.createElement("div");
    cell.id = `cell${i}`;
    cell.className = "cell";
    cell.innerHTML = ""; // Vacía la celda inicialmente

    grid.appendChild(cell);
  }

  captureKeysEvent();
  fillStartingCells();
}

// Ejecutar el juego al cargar la página
initGame();

function fillStartingCells() {
    let firstCell = selectRandomCell();
    let secondCell = selectRandomCell();

    while (firstCell === secondCell)
      secondCell = selectRandomCell();

    let cell = document.querySelector("#cell" + firstCell);
    cell.innerHTML = `${generateRandomValue()}`;

    cell = document.querySelector("#cell" + secondCell);
    cell.innerHTML = `${generateRandomValue()}`;
}

function selectRandomCell() {
  return Math.floor(Math.random() * 16) + 1;
}

function generateRandomValue() {
  const num = Math.random() < 0.9 ? 2 : 4; // 90% de probabilidad de 2, 10% de 4
  return num.toString();
}

// Evento del botón restart
const startButton = document.getElementById("restart-button");
startButton.addEventListener("click", function () {
  initGame();
});

function captureKeysEvent() {
  document.addEventListener("keydown", (event) => {
    if (event.key === "w" || event.key === "ArrowUp") {
      event.preventDefault();
      console.log("Movimiento hacia arriba");
    }
    else if (event.key === "s" || event.key === "ArrowDown") {
      event.preventDefault();
      console.log("Movimiento hacia abajo");
    }
    else if (event.key === "a" || event.key === "ArrowLeft") {
      event.preventDefault();
      console.log("Movimiento hacia la izquierda");
    }
    else if (event.key === "d" || event.key === "ArrowRight") {
      event.preventDefault();
      console.log("Movimiento hacia la derecha");
    }
  });
}