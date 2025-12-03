import { resetScore } from "./scores.js";
import { initGame } from "../app.js";
import { move } from "./moving.js";

// Variables para detectar gestos táctiles
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

const minSwipeDistance = 30; // Distancia mínima para considerar un swipe

export function modal(mode) {
	//console.log("Llamada a la modal..."); // DB

	// Evitar que el jugador siga jugando
	disableControls();

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
		//console.log("Encontré el closeButton"); //DB
	
	// Cuando el usuario hace clic en closeButton (x), cerramos la modal
	closeButton.onclick = function() {
		//console.log("salí al hacer click en la X de la modal"); // DB
		modalDiv.style.display = "none";
		resetScore();
		initGame();
		enableControls(); // Vuelve a funcionar el teclado
	}
	
	// Cuando el usuario hace clic en cualquier parte fuera de la modal, la cerramos
	window.onclick = function(event) {
		if (event.target == modalDiv) {
			//console.log("salí al hacer click fuera de la modal"); // DB
			modalDiv.style.display = "none";
			resetScore();
			initGame();
			enableControls(); // Vuelve a funcionar el teclado
		}
	}
}

export function enableControls() {
	document.addEventListener("keydown", handleKeyEvents);

	// Eventos táctiles
	const gridContainer = document.getElementById("grid-container");
	if (gridContainer) {
		gridContainer.addEventListener("touchstart", handleTouchStart, { passive: true });
		gridContainer.addEventListener("touchend", handleTouchEnd, { passive: true });
	}
}

export function disableControls() {
	document.removeEventListener("keydown", handleKeyEvents);

	// Remover eventos táctiles
	const gridContainer = document.getElementById("grid-container");
	if (gridContainer) {
		gridContainer.removeEventListener("touchstart", handleTouchStart);
		gridContainer.removeEventListener("touchend", handleTouchEnd);
	}
}

function handleKeyEvents(event) {
	if (event.key === "w" || event.key === "ArrowUp") {
		event.preventDefault();
		move("up");
	}
	else if (event.key === "s" || event.key === "ArrowDown") {
		event.preventDefault();
		move("down");
	}
	else if (event.key === "a" || event.key === "ArrowLeft") {
		event.preventDefault();
		move("left");
	}
	else if (event.key === "d" || event.key === "ArrowRight") {
		event.preventDefault();
		move("right");
	}
}

// MANEJO DE EVENTOS TÁCTILES

function handleTouchStart(event) {
	// Guardar la posición inicial del toque
	touchStartX = event.changedTouches[0].screenX;
	touchStartY = event.changedTouches[0].screenY;
}

function handleTouchEnd(event) {
	// Guardar la posición final del toque
	touchEndX = event.changedTouches[0].screenX;
	touchEndY = event.changedTouches[0].screenY;
	
	// Detectar la dirección del swipe
	handleSwipe();
}

function handleSwipe() {
	// Calcular la diferencia en X e Y
	const diffX = touchEndX - touchStartX;
	const diffY = touchEndY - touchStartY;
	
	// Calcular la distancia absoluta
	const absX = Math.abs(diffX);
	const absY = Math.abs(diffY);
	
	// Verificar que el movimiento sea suficientemente largo
	if (absX < minSwipeDistance && absY < minSwipeDistance) {
		return; // Movimiento muy pequeño, ignorar
	}
	
	// Determinar si el swipe es más horizontal o vertical
	if (absX > absY) {
		// Swipe horizontal
		if (diffX > 0) {
			move("right");
		} else {
			move("left");
		}
	} else {
		// Swipe vertical
		if (diffY > 0) {
			move("down");
		} else {
			move("up");
		}
	}
}