# 1. PREPARACIÓN INICIAL (FULL DOCKER)

> Este documento es la versión **FULL-DOCKER**. El objetivo: **todo** (dependencias, dev server, hot reload) se ejecuta dentro de contenedores; nada se instala en la máquina host.

## 1.1. Crear cuenta y app en Unsplash
- Guardar Access Key / Secret Key / Redirect URI (ej. `http://localhost:5173/auth/callback`).
- Añadir orígenes permitidos según necesites.
- **No subir** las claves al repo. Guarda en `.env` del backend y `.env.local` del frontend (o en el `.env` root usado por docker-compose).

---

# 2. PRINCIPIO BÁSICO

**Regla principal (FULL DOCKER):**
- NO ejecutar `npm install`, `node`, `npm run` ni `npx` en la máquina host.
- TODO se hace desde el contenedor con `docker compose exec ...` o `docker compose build`.
- `node_modules` viven únicamente dentro del contenedor (volumen anónimo `/app/node_modules`).

Esto hace el proyecto 100% portable: cualquier persona con Docker y Docker Compose podrá levantarlo sin instalar Node localmente.

---

# 3. ESTRUCTURA DEL PROYECTO

``` bash
image-gallery/
├── frontend/
├── backend/
├── docker-compose.yml
├── Makefile
└── README.md
```

---

# 4. DOCKER: archivos y configuración (FULL-DOCKER ready)

> NOTA: los `Dockerfile` están pensados para desarrollo. Incluyen `COPY . .` para instalar dependencias dentro de la imagen y conservarlas en `/app/node_modules` (volumen anónimo). Además exponemos puertos y dejamos CMD para dev.

## 4.1 Dockerfile frontend

```dockerfile
FROM node:22-alpine

WORKDIR /app

# Copiamos package.json e instalamos dependencias dentro de la imagen
COPY package*.json ./
RUN npm ci --silent

# Copiamos el resto de la app
COPY . .

EXPOSE 5173

# CMD de desarrollo (Vite) — se usa con --host para permitir accesos desde la red
CMD ["npm","run","dev","--","--host"]
```

## 4.2 Dockerfile backend

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --silent

# (opcional) instalar nodemon global si lo prefieres
# RUN npm install -g nodemon --silent

COPY . .

EXPOSE 3000

CMD ["npm","run","dev"]
```

## 4.3 docker-compose.yml (FULL-DOCKER)

```yaml
services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: image-gallery-backend
    ports:
      - "3000:3000"
    volumes:
      - ./backend:/app:cached
      - /app/node_modules
    environment:
      UNSPLASH_CLIENT_ID: ${UNSPLASH_CLIENT_ID}
      UNSPLASH_CLIENT_SECRET: ${UNSPLASH_CLIENT_SECRET}
      FRONTEND_URL: http://localhost:5173
      APP_PORT: 3000
      CHOKIDAR_USEPOLLING: "true"
    networks:
      - appnet

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: image-gallery-frontend
    ports:
      - "5173:5173"
    volumes:
      - ./frontend:/app:cached
      - /app/node_modules
    environment:
      VITE_APP_BACKEND_URL: http://backend:3000
      VITE_UNSPLASH_CLIENT_ID: ${UNSPLASH_CLIENT_ID}
      VITE_UNSPLASH_REDIRECT_URI: http://backend:3000/auth/callback
      CHOKIDAR_USEPOLLING: "true"
    depends_on:
      - backend
    networks:
      - appnet

networks:
  appnet:
    driver: bridge
```

**Notas importantes en compose:**
- `- ./frontend:/app:cached` y `- ./backend:/app:cached` usan la opción `cached` para macOS/ Docker Desktop; mejora la velocidad de lectura. Se puede quitar `:cached` si da problemas.
- `/app/node_modules` es un **volumen anónimo**: las dependencias quedarán dentro del contenedor y no en el host.
- `CHOKIDAR_USEPOLLING=true` mejora la detección de cambios en entornos con FS (File System) montados (útil para Vite / nodemon).

---

# 5. MAKEFILE (FULL-DOCKER, seguro y práctico)

```makefile
COMPOSE = docker compose -f docker-compose.yml

all: build up

init-frontend:
	$(COMPOSE) exec frontend npm install

init-backend:
	$(COMPOSE) exec backend npm install

init: init-frontend init-backend

build:
	$(COMPOSE) build --no-cache

up:
	$(COMPOSE) up -d

logs:
	$(COMPOSE) logs -f

ps:
	$(COMPOSE) ps

exec-frontend:
	$(COMPOSE) exec frontend sh

exec-backend:
	$(COMPOSE) exec backend sh

stop:
	$(COMPOSE) stop

down:
	$(COMPOSE) down

clean:
	$(COMPOSE) down -v --remove-orphans

re: clean all

.PHONY: all build up logs ps exec-frontend exec-backend stop down clean re
```

---

# 6. FLUJO DE TRABAJO (FULL-DOCKER)

## 6.1 Prerrequisitos en la máquina host
- Docker y Docker Compose (v2) instalados. Nada más.

## 6.2 Levantar el entorno por primera vez
Desde la raíz del proyecto:

```bash
# Construye imágenes e instala dependencias dentro de las imágenes
make build

# Levanta contenedores en background
make up

# Ver logs
make logs
```

## 6.3 Añadir/instalar dependencias (desde dentro del contenedor)
**Siempre** instalar paquetes dentro del contenedor para que queden en `/app/node_modules` de la imagen/volumen:

```bash
# Instala una dependencia en frontend
docker compose exec frontend npm install axios
docker compose exec frontend npm install -D tailwindcss @tailwindcss/vite

# Instala una dependencia en backend
docker compose exec backend npm install axios express dotenv
docker compose exec backend npm install -D typescript ts-node @types/node @types/express

# Crear tsconfig.json
docker compose exec backend npx tsc --init
```

> Alternativa (reconstruir imagen con nueva dependencia):
> 1. Añade la dependencia en package.json del servicio.
> 2. `make build` && `make up`

## 6.4 Ejecutar scripts y abrir shells
- Shell en frontend: `make exec-frontend` (abre `sh` dentro del contenedor)
- Ejecutar tests o scripts desde el contenedor: `docker compose exec backend npm test` etc.

## 6.5 Parar y limpiar
- Parar: `make stop`
- Parar y eliminar: `make clean`

---

# 7. BACKEND: ejemplo mínimo

Ejemplo de `backend/src/index.ts`:

```js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Backend funcionando correctamente 🚀" });
});

app.listen(PORT, () => {
  console.log(`Backend escuchando en http://localhost:${PORT}`);
});
```

---

# 8. FRONTEND: dev con Vite
- `package.json` debe contener script `dev` (Vite). `CMD` del Dockerfile lanza `npm run dev -- --host`.
- Vite detectará cambios en `./frontend` y hará HMR* (si se comporta bien en tu SO).
- Si HMR falla, activa polling con `CHOKIDAR_USEPOLLING=true` (ya está en compose).

**HMR: Hot Module Replacement*
- Recargua un componente rápidamente
- Sin refrescar toda la página
- Sin perder el estado
- Sin reiniciar Vite

---

# 9. Seguridad y .env
- Mantén las claves en archivos `.env` no versionados.
- Ejemplo: en la raíz puedes poner un `.env` con las claves y el compose lo leerá si corres `docker compose --env-file .env up`.

---

# 10. Consejos finales / FAQ rápidas
- Si ves EACCES: elimina los `node_modules` locales creados accidentalmente y vuelve a levantar con `make clean && make build && make up`.
- Para obtener una shell con node y npm listos: `make exec-frontend`.
- Para añadir dependencias: siempre usar `docker compose exec ... npm install`.

---

# 11. Comandos utilizados para inicializar la primera vez

```bash
# Primera vez
make
make init
```

---

# 12. Ejemplo de comandos frecuentes

```bash
# Primera vez
make build
make up

# Añadir paquete al frontend
docker compose exec frontend npm install some-package

# Reconstruir todo
make clean
make

# Logs
make logs
```
