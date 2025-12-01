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

  fillStartingCells();
}

// Ejecutar el juego al cargar la página
captureKeysEvent();
restartButton();
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
  const num = Math.random() < 0.9 ? 2 : 4; // 90% de probabilidad de 2, 10% de 4
  return num.toString();
}

function cellColour(cell) {
  if (cell.innerHTML.trim() === "")
    return;

  cell.className = ''; // Eliminar los estilos actuales
  if (cell.innerHTML ===  "2")
    cell.classList.add("cell", "num2")
  else if (cell.innerHTML ===  "4")
    cell.classList.add("cell", "num4")
}

// Evento del botón restart
function restartButton() {
  const startButton = document.getElementById("restart-button");
  startButton.addEventListener("click", function () {
    initGame();
  });
}

function captureKeysEvent() {
  document.addEventListener("keydown", (event) => {
    if (event.key === "w" || event.key === "ArrowUp") {
      event.preventDefault();
      console.log("Movimiento hacia arriba");
      moveUp("up");
    }
    else if (event.key === "s" || event.key === "ArrowDown") {
      event.preventDefault();
      console.log("Movimiento hacia abajo");
      moveUp("down");
    }
    else if (event.key === "a" || event.key === "ArrowLeft") {
      event.preventDefault();
      console.log("Movimiento hacia la izquierda");
      moveUp("left");
    }
    else if (event.key === "d" || event.key === "ArrowRight") {
      event.preventDefault();
      console.log("Movimiento hacia la derecha");
      moveUp("right");
    }
  });
}

function moveUp(move) {
  // Vamos a repetir lo mismo columna por columna

  // Guardamos los indices las celdas de cada columna
  for (let i = 1; i <= 4; i++)
  {
    const colIdx = [i, i + 4, i + 8, i + 12];

    // Vamos a recorrer las 4 celdas para guardar su contenido
    let celsValues = [];
    for (let j = 0; j < 4; j++) {
      let cell = document.querySelector("#cell" + colIdx[j]);
      celsValues.push(Number(cell.innerHTML));
    }
    console.log("celsValues:", celsValues); // DB
    
    // Al haber pulsado arriba la comprobación se hace de abajo a arriba, hay que voltear el array
    /* if (move === "up") {
      celsValues = celsValues.reverse();
      console.log("reversed:", celsValues);  // DB
    } */

    // Crear array nuevo según la tecla pulsada
    const newArray = createNewArray(celsValues);
    console.log("newArray:", newArray); // DB

    let finalArray = sumNumbers(newArray);
    console.log("finalArray:", finalArray); // DB

    if (move === "down") {
      finalArray = finalArray.reverse();
      console.log("reversed:", finalArray);  // DB
    }

    for (let i = 0; i < 4; i++) {
      let cell = document.querySelector("#cell" + colIdx[i]);
      if (finalArray[i] === 0)
        cell.innerHTML = "";
      else 
        cell.innerHTML = finalArray[i];

    }
  }
}

function createNewArray(celsValues) {
  // Move al numbers to the first position
  let newArray = [];
  for (let i = 0; i < celsValues.length; i++) {
    if (celsValues[i] !== 0) {
      newArray.push(celsValues[i]);
    }
  }

  console.log("newArray # elements:", newArray.length); // DB

  // Fill whit 0
  for (let filled = newArray.length; filled < 4; filled++) {
    newArray.push(0);
  }

  return newArray;
}

function sumNumbers(newArray) {
  let finalArray = [];

  for (let i = 0; i < 4; i++) {
    if (newArray[i] == 0)
      continue;

    let firstNbr = newArray[i];
    let secondNbr = 0;
    if (i < 3)
      secondNbr = newArray[i + 1];

    if (firstNbr === secondNbr) {
      finalArray.push(firstNbr * 2);
      newArray[i + 1] = 0;
    }
    else {
      finalArray.push(firstNbr);
      finalArray.push(secondNbr);
    }
  }

  // Fill whit 0
  for (let filled = finalArray.length; filled < 4; filled++) {
    finalArray.push(0);
  }

  return finalArray;
}