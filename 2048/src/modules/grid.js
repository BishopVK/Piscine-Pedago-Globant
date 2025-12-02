export function updateGridFromMatrix(matrix) {
  for (let row = 0; row < 4; row++) {
	for (let col = 0; col < 4; col++) {
	  const cellIndex = row * 4 + col + 1; // Celdas van de 1 a 16
	  const cell = document.querySelector("#cell" + cellIndex);
	  const cellValue = matrix[row][col];
	  cell.innerHTML = cellValue === 0 ? "" : cellValue;
	  cellColour(cell);
	}
  }
}

export function cellColour(cell) {
	cell.className = ''; // Eliminar los estilos actuales

	if (cell.innerHTML.trim() === "") {
		cell.classList.add("cell");
		return;
	}

	switch (cell.innerHTML) {
		case "2":
		cell.classList.add("cell", "num2");
		break;
		case "4":
		cell.classList.add("cell", "num4");
		break;
		case "8":
		cell.classList.add("cell", "num8");
		break;
		case "16":
		cell.classList.add("cell", "num16");
		break;
		case "32":
		cell.classList.add("cell", "num32");
		break;
		case "64":
		cell.classList.add("cell", "num64");
		break;
		case "128":
		cell.classList.add("cell", "num128");
		break;
		case "256":
		cell.classList.add("cell", "num256");
		break;
		case "512":
		cell.classList.add("cell", "num512");
		break;
		case "1024":
		cell.classList.add("cell", "num1024");
		break;
		case "2048":
		cell.classList.add("cell", "num2048");
		break;
		default:
			cell.classList.add("cell");
 	}
}