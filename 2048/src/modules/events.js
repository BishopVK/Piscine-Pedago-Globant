import { resetScore } from "./scores.js";
import { initGame } from "../app.js";


export function modal(mode) {
	console.log("Llamada a la modal..."); // DB

	const modalDiv = document.getElementById("modal");
	if (!modalDiv) {
		console.error("Modal not found");
		resetScore();
		initGame();
	}

	let modalTitle = document.getElementById("modal-title");
	let modalScore = document.getElementById("modal-score");
	const scoreElement = document.getElementById("score-value");

	modalScore.innerHTML = scoreElement.innerHTML;
	if (mode === "win")
		modalTitle.innerHTML = "Has ganado";
	else
		modalTitle.innerHTML = "Has perdido";

	// Mostrar modal
	modalDiv.style.display = "block";

	const closeButton = document.getElementById("close-modal");
	if (closeButton)
		console.log("Encontré el closeButton");
	
	// Cuando el usuario hace clic en closeButton (x), cerramos la modal
	closeButton.onclick = function() {
		console.log("salí al hacer click en la X de la modal");
		modalDiv.style.display = "none";
		resetScore();
		initGame();
	}
	
	// Cuando el usuario hace clic en cualquier parte fuera de la modal, la cerramos
	window.onclick = function(event) {
		if (event.target == modalDiv) {
			console.log("salí al hacer click fuera de la modal");
			modalDiv.style.display = "none";
			resetScore();
			initGame();
		}
	}
}