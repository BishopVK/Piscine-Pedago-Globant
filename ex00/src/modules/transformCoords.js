// Transforma las coordenadas desde el sistema rotado al sistema original
export function transformCoordinates(coords, move) {
	const N = 4; // Tamaño del tablero
	const transformedCoords = [];

	for (const coord of coords) {
		let { row, col } = coord;
		let originalRow, originalCol;

		switch (move) {
			case "left":
				// Sin rotación, las coordenadas son las mismas
				originalRow = row;
				originalCol = col;
				break;

			case "up":
				// Se rotó 1 vez a la izquierda
				// Revertir: rotación a la derecha
				originalRow = col;
				originalCol = N - 1 - row;
				break;

			case "right":
				// Se rotó 2 veces a la izquierda (180°)
				// Revertir: 2 rotaciones a la derecha (o simplemente invertir ambas coordenadas)
				originalRow = N - 1 - row;
				originalCol = N - 1 - col;
				break;

			case "down":
				// Se rotó 1 vez a la derecha
				// Revertir: rotación a la izquierda
				originalRow = N - 1 - col;
				originalCol = row;
				break;

			default:
				originalRow = row;
				originalCol = col;
		}

		transformedCoords.push({ row: originalRow, col: originalCol });
	}

	return transformedCoords;
}