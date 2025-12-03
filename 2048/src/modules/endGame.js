export function checkWin(matrix) {
const N = matrix.length;

for (let i = 0; i < N; i++) {
	for (let j = 0; j < N; j++) {
		if (matrix[i][j] === 2048)
			return true;
		}
	}

	return false;
}

export function checkLose(matrix) {
	const N = matrix.length;

	const gridIsFull = checkIfGridIsFull(matrix);

	if (!gridIsFull)
		return false; // Aún hay huecos -> no ha perdido

	const mergeItsPosible = checkMerge(matrix);

	if (mergeItsPosible)
		return false; // puede fusionar -> no ha perdido

	return true; // No hay huecos + No puede fusionar -> Ha perdido
}

function checkIfGridIsFull(matrix) {
const N = matrix.length;

for (let i = 0; i < N; i++) {
	for (let j = 0; j < N; j++) {
		if (matrix[i][j] === 0)
			return false;
	}
}

// Grid its full
return true;
}

function checkMerge(matrix) {
	const N = matrix.length;

	for (let i = 0; i < N; i++) {
		for (let j = 0; j < N; j++) {

			const current = matrix[i][j];

			// Derecha
			if (j < N - 1 && current === matrix[i][j + 1])
				return true; // puede fusionarse -> no ha perdido

			// Abajo
			if (i < N - 1 && current === matrix[i + 1][j])
				return true; // puede fusionarse -> no ha perdido
		}
	}

	return false; // no hay movimientos posibles -> ha perdido
}