# 🎮 2048 Game

Una implementación moderna del clásico juego 2048, construida con JavaScript vanilla y desplegada usando Docker y Nginx.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación de Docker](#instalación-de-docker)
- [Instalación del Proyecto](#instalación-del-proyecto)
- [Uso](#uso)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)

## ✨ Características

### 🎯 Funcionalidades del Juego
- **Tablero 4x4** con mecánicas clásicas del 2048
- **Sistema de puntuación** con mejor puntuación guardada (localStorage)
- **Detección de victoria** al alcanzar 2048
- **Detección de derrota** cuando no hay movimientos posibles
- **Generación aleatoria** de fichas (90% probabilidad de 2, 10% de 4)

### 🎨 Animaciones y Efectos Visuales
- **Animación de aparición** para nuevas fichas (efecto pop)
- **Animación de fusión** para celdas combinadas (escala + brillo)
- **Efecto shake** del tablero según la dirección del movimiento
- **Esquema de colores dinámico** basado en el valor de cada celda
- **Diseño responsive** que se adapta a diferentes tamaños de pantalla

### 🎮 Controles
- **Teclado**: Teclas WASD o flechas direccionales
- **Táctil**: Gestos swipe en cualquier parte de la pantalla (compatible con móviles)
- **Botón de reinicio** para empezar una nueva partida

### 🪟 Modal de Fin de Juego
- Modal informativa al ganar o perder
- Muestra la puntuación final
- Permite reiniciar la partida

## 📦 Requisitos Previos

- **Docker** (versión 20.10 o superior)
- **Docker Compose** (versión 2.0 o superior)

## 🐳 Instalación de Docker

### Linux (Ubuntu/Debian)

```bash
# Actualizar paquetes
sudo apt update

# Instalar dependencias
sudo apt install apt-transport-https ca-certificates curl software-properties-common

# Añadir clave GPG oficial de Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Añadir repositorio de Docker
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Instalar Docker
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Verificar instalación
docker --version
docker compose version
```

### macOS

```bash
# Opción 1: Descargar Docker Desktop desde
# https://www.docker.com/products/docker-desktop

# Opción 2: Usando Homebrew
brew install --cask docker

# Verificar instalación
docker --version
docker compose version
```

### Windows

1. Descargar **Docker Desktop** desde: https://www.docker.com/products/docker-desktop
2. Ejecutar el instalador
3. Reiniciar el sistema si es necesario
4. Abrir Docker Desktop y esperar a que inicie
5. Verificar en PowerShell o CMD:
```powershell
docker --version
docker compose version
```

### Añadir usuario al grupo docker (Linux)

```bash
# Añadir tu usuario al grupo docker para no usar sudo
sudo usermod -aG docker $USER

# Cerrar sesión y volver a iniciarla, o ejecutar:
newgrp docker

# Verificar que funciona sin sudo
docker run hello-world
```

## 🚀 Instalación del Proyecto

1. **Clonar el repositorio** (o descargar los archivos)
```bash
git clone <tu-repositorio>
cd ex00
```

2. **Construir la imagen Docker**
```bash
make all
# o directamente: docker compose build
```

3. **Iniciar el contenedor**
```bash
make up
# o directamente: docker compose up -d
```

4. **Abrir en el navegador**
```
http://localhost:5173
```

## 🎮 Uso

### Comandos del Makefile

```bash
make all      # Construir la imagen Docker
make up       # Iniciar el contenedor en segundo plano
make down     # Detener el contenedor
make restart  # Reiniciar el contenedor
make fclean   # Limpiar todo (contenedores, imágenes, volúmenes)
```

### Cómo Jugar

1. **Objetivo**: Combinar fichas con el mismo número hasta alcanzar 2048
2. **Movimientos**: 
   - **PC**: Usa las teclas `W A S D` o las flechas direccionales
   - **Móvil**: Desliza el dedo en la dirección deseada
3. **Fusión**: Dos fichas con el mismo número se combinan al chocar
4. **Puntuación**: Cada fusión suma puntos equivalentes al nuevo valor creado
5. **Victoria**: Alcanza la ficha 2048
6. **Derrota**: El tablero se llena sin movimientos posibles

## 🛠 Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript (ES6 Modules)
- **Servidor Web**: Nginx (Alpine Linux)
- **Containerización**: Docker & Docker Compose
- **Build Tool**: Make

## 📁 Estructura del Proyecto

```
ex00/
├── Makefile                    # Comandos para gestionar Docker
├── docker-compose.yml          # Configuración de servicios
├── docs/
│   └── steps.md               # Documentación del algoritmo
└── src/
    ├── Dockerfile             # Imagen Docker con Nginx
    ├── index.html             # Estructura HTML
    ├── styles.css             # Estilos y animaciones
    ├── app.js                 # Inicialización del juego
    └── modules/
        ├── endGame.js         # Lógica de victoria/derrota
        ├── events.js          # Manejo de eventos (teclado + táctil)
        ├── grid.js            # Actualización del DOM
        ├── matrix.js          # Creación y manipulación de matriz
        ├── mergeNumbers.js    # Lógica de compresión y fusión
        ├── moving.js          # Controlador principal de movimientos
        ├── rotation.js        # Rotación de matriz para movimientos
        ├── scores.js          # Sistema de puntuación
        └── transformCoords.js # Transformación de coordenadas rotadas
```

## 🎯 Algoritmo de Movimiento

Cada movimiento sigue esta secuencia:

1. **Copiar matriz** actual (deep copy)
2. **Rotar matriz** según la dirección (para normalizar a "izquierda")
3. **Comprimir** números hacia la izquierda
4. **Fusionar** pares iguales y guardar coordenadas
5. **Comprimir** nuevamente
6. **Transformar coordenadas** al sistema original
7. **Rotar matriz de vuelta**
8. **Comparar** estado anterior con nuevo
9. Si cambió:
   - Actualizar DOM
   - Aplicar animación de fusión
   - Generar nueva ficha
10. Verificar victoria/derrota

## 📱 Compatibilidad

- ✅ Chrome/Edge (últimas versiones)
- ✅ Firefox (últimas versiones)
- ✅ Safari (últimas versiones)
- ✅ Dispositivos móviles (iOS/Android)
- ✅ Tablets

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

¡Disfruta jugando! 🎮✨