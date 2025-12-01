console.log("Wellcome to 2048!");

// Seleccionar un div por su ID y cambiar su contenido
/* const gameContainer = document.getElementById("cell1");
gameContainer.innerHTML = "<h1>2</h1>"; */

// Dentro de grid-container genero 16 celdas con id "cell+n" y class "cell"
// y les agrego un número aleatorio entre 2 y 4

for (let i = 1; i <= 16; i++) {
  const cell = document.createElement("div");
  cell.id = "cell" + i;
  cell.className = "cell";
  const randomNumber = Math.random() < 0.5 ? 2 : 4;
  cell.innerHTML = "<h1>" + randomNumber + "</h1>";
  document.querySelector("#grid-container").appendChild(cell);
}

// Agregar un evento de clic a un botón
const startButton = document.getElementById("restart-button");
startButton.addEventListener("click", function () {
  alert("Game restarted!");
});
