import { cellColour } from "./modules/grid.js";
import { resetScore } from "./modules/scores.js";
import { updateBestScore } from "./modules/scores.js";
import { enableControls } from "./modules/events.js"

//console.log("Wellcome to 2048!");

export function initGame() {
  const grid = document.querySelector("#grid-container");
  grid.innerHTML = ""; // Vacía el grid al reiniciar

  for (let i = 1; i <= 16; i++) {
    const cell = document.createElement("div");
    cell.id = `cell${i}`;
    cell.className = "cell";
    cell.innerHTML = ""; // Vacía la celda inicialmente

    grid.appendChild(cell);
  }

  fillStartingCells();
}

// Ejecutar el juego al cargar la página
captureKeysEvent();
restartButton();
updateBestScore(0);
initGame();

function fillStartingCells() {
    let firstCell = selectRandomCell();
    let secondCell = selectRandomCell();

    while (firstCell === secondCell) {
      secondCell = selectRandomCell();
    }

    let cell = document.querySelector("#cell" + firstCell);
    cell.innerHTML = `${generateRandomValue()}`;
    cellColour(cell);

    cell = document.querySelector("#cell" + secondCell);
    cell.innerHTML = `${generateRandomValue()}`;
    cellColour(cell);
}

function selectRandomCell() {
  return Math.floor(Math.random() * 16) + 1;
}

function generateRandomValue() {
  return Math.random() < 0.9 ? 2 : 4; // 90% de probabilidad de 2, 10% de 4
}

// Evento del botón restart
function restartButton() {
  const startButton = document.getElementById("restart-button");
  startButton.addEventListener("click", function () {
    resetScore();
    initGame();
  });
}

function captureKeysEvent() {
  enableControls();
}