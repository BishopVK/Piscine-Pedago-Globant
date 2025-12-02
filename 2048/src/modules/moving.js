import { createMatrixFromGrid, addRandomNumberToMatrix } from "./matrix.js";
import { rotateMatrix, getOppositeDirection } from "./rotation.js";
import { compressNumbers, sumNumbers } from "./mergeNumbers.js";
import { updateGridFromMatrix } from "./grid.js";

export function move(direction) {
  const originalMatrix = createMatrixFromGrid();
  console.log("originalMatrix:", originalMatrix); // DB

  // Copy Matrix
  let copyMatrix = structuredClone(originalMatrix);
  console.log("copyMatrix:", copyMatrix); // DB

  // Rotate copied Matrix
  copyMatrix = rotateMatrix(copyMatrix, direction);
  console.log("rotatedMatrix:", copyMatrix); // DB

  // Move nums to the left
  copyMatrix = compressNumbers(copyMatrix);
  console.log("compressedMatrix:", copyMatrix); // DB

  // Sum numbers
  copyMatrix = sumNumbers(copyMatrix);
  console.log("summedMatrix:", copyMatrix); // DB

  // Move nums to the left again
  copyMatrix = compressNumbers(copyMatrix);
  console.log("finalMatrix before rotate back:", copyMatrix); // DB

  // Rotate back to original direction
  copyMatrix = rotateMatrix(copyMatrix, getOppositeDirection(direction));
  console.log("finalMatrix after rotate back:", copyMatrix); // DB

  // Check if there was any change
  if (JSON.stringify(originalMatrix) !== JSON.stringify(copyMatrix)) {
    shakeGridContainer(direction); // DB
    // If there was a change, add a new random number to the grid
    const newCell = addRandomNumberToMatrix(copyMatrix);
    // Update the grid with the final matrix
    updateGridFromMatrix(copyMatrix);

    // Efecto de aparición
    if (newCell) {
      const index = newCell.row * 4 + newCell.col + 1;
      const cell = document.getElementById("cell" + index);
      cell.classList.add("spawn");

      setTimeout(() => cell.classList.remove("spawn"), 400);
    }
  } else {
    console.log("No change in the matrix, no new number added.");
  }
}

function shakeGridContainer(direction) {
  const gridContainer = document.getElementById("grid-container");
  let animationClass = "";

  switch (direction) {
    case "up":
      animationClass = "shake-up";
      break;
    case "down":
      animationClass = "shake-down";
      break;
    case "left":
      animationClass = "shake-left";
      break;
    case "right":
      animationClass = "shake-right";
      break;
    default:
      return; // Invalid direction
  }

  gridContainer.classList.add(animationClass);

  // Remove the class after the animation duration (assumed 200ms here)
  setTimeout(() => {
    gridContainer.classList.remove(animationClass);
  }, 200);
}