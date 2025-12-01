export function rotateMatrix(copyMatrix, direction) {
  if (direction === "up" || direction === "right") {
    copyMatrix = makeRotation(copyMatrix, "left");
    if (direction === "right") {
      copyMatrix = makeRotation(copyMatrix, "left");
    }
  } else if (direction === "down") {
    copyMatrix = makeRotation(copyMatrix, "right");
  } else if (direction === "left") {
    // No rotation needed for left
  }

  return copyMatrix; // Necesario?
}

function makeRotation(matrix, direction) {
  const N = matrix.length; // Devuelve el número de filas (o columnas) de la matriz

  // Inicializar la matriz rotada con ceros
  let rotated = [];
  for (let i = 0; i < N; i++) {
    rotated[i] = [];
    for (let j = 0; j < N; j++) {
      rotated[i][j] = 0;
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (direction === "right") {
        rotated[j][N - 1 - i] = matrix[i][j];
      } else if (direction === "left") {
        rotated[N - 1 - j][i] = matrix[i][j];
      }
    }
  }

  return rotated;
}

export function getOppositeDirection(direction) {
  switch (direction) {
	case "up":
		return "down";
	case "down":
		return "up";
	case "left":
		return "left";
	case "right":
		return "right";
	default:
		return null;
  }
}