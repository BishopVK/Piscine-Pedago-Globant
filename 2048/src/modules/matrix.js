export function createMatrixFromGrid() {
  let matrix = [];
  
  for (let row = 0; row < 4; row++) {
    matrix[row] = [];
    for (let col = 0; col < 4; col++) {
      const cellIndex = row * 4 + col + 1; // Celdas van de 1 a 16
      const cell = document.querySelector("#cell" + cellIndex);
      const cellValue = cell.innerHTML.trim() === "" ? 0 : Number(cell.innerHTML);
      matrix[row][col] = cellValue;
    }
  }

  return matrix;
}

export function addRandomNumberToMatrix(matrix) {
	const emptyCells = [];
	const N = matrix.length;

	// Find all empty cells
	for (let i = 0; i < N; i++) {
		for (let j = 0; j < N; j++) {
			if (matrix[i][j] === 0) {
			emptyCells.push({ row: i, col: j });
			}
		}
	}

	// If there are no empty cells, return
	if (emptyCells.length === 0) {
	return;
	}

	// Select a random empty cell
	const randomIndex = Math.floor(Math.random() * emptyCells.length);
	const randomCell = emptyCells[randomIndex];

	// Decide whether to place a 2 or a 4 (90% chance for 2, 10% for 4)
	const newValue = Math.random() < 0.9 ? 2 : 4;

	// Place the new number in the selected cell
	matrix[randomCell.row][randomCell.col] = newValue;

	return randomCell;
}