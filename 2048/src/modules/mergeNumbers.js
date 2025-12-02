import { updateScore } from "./scores.js";

// Move numbers to the left in each row
export function compressNumbers(copyMatrix) {
	const N = copyMatrix.length;
	for (let i = 0; i < N; i++) {
		let newArray = [];
		// Move al numbers to the first position
		for (let j = 0; j < N; j++) {
			if (copyMatrix[i][j] !== 0) {
				newArray.push(copyMatrix[i][j]);
			}
		}

		// Fill whit 0
		for (let filled = newArray.length; filled < N; filled++) {
			newArray.push(0);
		}

		// Update the row in the matrix
		for (let j = 0; j < N; j++) {
			copyMatrix[i][j] = newArray[j];
		}
	}
	
	return copyMatrix;
}

export function sumNumbers(copyMatrix) {
	const N = copyMatrix.length;

	for (let i = 0; i < N; i++) {
		for (let j = 0; j < N - 1; j++) {
			let firstNbr = copyMatrix[i][j];

			if (firstNbr === 0 || j + 1 >= N)
				continue;

			let secondNbr = copyMatrix[i][j + 1];

			if (firstNbr === secondNbr && firstNbr !== 0) {
				copyMatrix[i][j] = firstNbr * 2;
				updateScore(firstNbr * 2);
				copyMatrix[i][j + 1] = 0;
				j++; // Skip the next number since it has been merged
			}
		}
	}

	return copyMatrix;
}