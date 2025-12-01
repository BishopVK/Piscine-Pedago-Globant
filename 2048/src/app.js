console.log("Wellcome to 2048!");

function initGame() {
  const grid = document.querySelector("#grid-container");
  grid.innerHTML = ""; // Vacía el grid al reiniciar

  for (let i = 1; i <= 16; i++) {
    const cell = document.createElement("div");
    cell.id = `cell + ${i}`;
    cell.className = "cell";
    cell.innerHTML = ""; // Vacía la celda inicialmente

    grid.appendChild(cell);
  }

  fillStartingCells();
}

// Ejecutar el juego al cargar la página
initGame();

export function fillStartingCells() {
  for (let i = 1; i <= 2; i++) {
    let firstCell = Math.random() * 16 + 1;

    while (firstCell === Math.random() * 16 + 1) {
      let secondCell = Math.random() * 16 + 1;
    }

    const cell = document.querySelector(`#cell${firstCell}`);
    cell.innerHTML = `<h1>${generateRandomValue()}</h1>`;
  }
  while (firstCell === Math.random() * 16 + 1) {
    secondCell = Math.random() * 16 + 1;
  }
  for (let i = 1; i <= 2; i++) {
    const cell = document.querySelector(`#cell${i}`);
    cell.innerHTML = firstCell;
  }
}

export function generateRandomValue() {
  return Math.random() < 0.9 ? 2 : 4; // 90% de probabilidad de 2, 10% de 4
  //cell.innerHTML = `<h1>${randomNumber}</h1>`;
}

// Evento del botón restart
const startButton = document.getElementById("restart-button");
startButton.addEventListener("click", function () {
  initGame();
});
