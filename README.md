# 2048 -- Vanilla JavaScript Implementation

Este proyecto es una recreación del clásico juego **2048**, desarrollado
utilizando **HTML, CSS y JavaScript puro**, cumpliendo con los
requisitos del *Globant Piscine -- Project 0*.\
No se utilizan librerías externas de JavaScript y la ejecución debe
hacerse mediante Docker.

------------------------------------------------------------------------

## 🧩 Descripción del Proyecto

El objetivo del juego es combinar números del mismo valor en un tablero
**4x4** hasta crear la ficha **2048**.\
Cada turno permite desplazar las fichas en una de cuatro direcciones
mediante las flechas del teclado. Al moverlas:

-   Las fichas se deslizan lo máximo posible.
-   Las fichas del mismo valor se **combinan** en una nueva con valor
    igual a la suma.
-   Cada combinación incrementa la **puntuación**.

El juego termina si: - No quedan movimientos disponibles (**Game
Over**), o\
- Se alcanza una ficha con valor **2048** (**Victoria**).

Incluye un botón para **reiniciar la partida** en cualquier momento.

------------------------------------------------------------------------

## 🚀 Características Principales

### ✔️ Mecánicas del Juego

-   Tablero dinámico de **4x4** generado con JavaScript.
-   Aparición inicial de **2 fichas aleatorias** (valor 2 o 4).
-   Movimientos con teclado.
-   Reglas completas de desplazamiento y combinación.
-   Prevención de combinaciones dobles.
-   Detección de victoria y derrota.
-   Botón de reinicio.

### ✔️ Interfaz y Estilo

-   Implementación en HTML + CSS puros.
-   Diseño responsive en grid.
-   Animaciones de movimiento y aparición.

### ✔️ Docker

Incluye `Dockerfile` y `docker-compose.yml`.

------------------------------------------------------------------------

## 📦 Instalación y Ejecución con Docker

``` bash
git clone <URL_DE_TU_REPOSITORIO>
cd <carpeta_del_proyecto>
docker-compose up --build
```

Accede al juego en:

    http://localhost:5173

------------------------------------------------------------------------

## 📁 Estructura del Proyecto

    .
    ├── ex00/
    │   ├── index.html
    │   ├── styles.css
    │   ├── script.js
    │   ├── Dockerfile
    │   ├── docker-compose.yml
    │   └── README.md

------------------------------------------------------------------------

## 🖱️ Controles

  Acción            Tecla
  ----------------- -----------------
  Mover arriba      ⬆️
  Mover abajo       ⬇️
  Mover izquierda   ⬅️
  Mover derecha     ➡️
  Reiniciar         Botón "Restart"

------------------------------------------------------------------------

## 🧑‍💻 Autor

**Daniel Jiménez**
