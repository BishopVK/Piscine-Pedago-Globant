# 1. PREPARACIÓN INICIAL

## 1.1. Crear cuenta y app en Unsplash
### Guardar:
- Access Key
- Secret Key
- Redirect URI --> http://localhost:5173/auth/callback

### En la cuenta de desarrollador de Unsplash:
- Create New Application → "Image Gallery"
- Añadir http://localhost:3000/auth/callback (5173 si no trabajas con backend) en "Redirect URIs"
- Poner http://localhost:5173 como origen permitido
- Guarda claves y añadirlas a los ficheros .env del frontend y el backend (NO subirlas al repo)

# 2. SETUP DEL PROYECTO

## 2.1. Crear proyecto React+TS+Vite
``` bash
npm create vite@latest image-gallery --template react-ts
cd image-gallery
npm install
```

## 2.2. Instalar TailwindCSS
``` bash
npm install -D tailwindcss @tailwindcss/vite
```

## 2.3. Configurar *vite.config.ts*
``` ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // plugin oficial Tailwind v4 para Vite
  ],
  server: {
    host: true, // permite --host 0.0.0.0 y accesos desde la red
    port: 5173,
  },
});
```

## 2.4. Añadir a *index.css*
``` css
@import "tailwindcss";
```

## 2.5. Añadir a *App.tsx*
Para comprobar que tailwind está instalado
``` HTML
<h1 className="text-4xl text-emerald-500 font-bold mt-5">
	Tailwind v4 funcionando 🚀
</h1>
```

## 2.6. Levantar el servidor
``` bash
npm run dev
```

## 2.7. Reestructurar frontend de backend
### Crear carpeta frontend y backend y mover ficheros:
``` bash
image-gallery/
├── frontend/
│   ├── README.md          <- opcional (README específico frontend)
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   ├── eslint.config.js
│   ├── vite.config.ts
│   └── .env.local
├── backend/
│   ├── src/
│   │   └── index.js       <- tu backend Express (crear cuando sea necesario)
│   ├── package.json       <- (crear cuando sea necesario)
│   ├── package-lock.json  <- (crear cuando sea necesario)
│   └── .env               <- variables de entorno
├── docker-compose.yml
└── README.md              <- README general del proyecto
```

## 2.8. Crear archivos de variables de entorno
### frontend/.env.local
``` bash
VITE_APP_BACKEND_URL=http://localhost:3000
VITE_UNSPLASH_CLIENT_ID=abc123DEF
VITE_UNSPLASH_REDIRECT_URI=http://localhost:3000/auth/callback
```

### backend/.env
``` bash
UNSPLASH_CLIENT_ID=abc123DEF
UNSPLASH_CLIENT_SECRET=verySecretValue123
FRONTEND_URL=http://localhost:5173
APP_PORT=3000
```

# 3. CONFIGURACIÓN INICIAL BACKEND

## 3.1. Crear *package.json*
``` bash
npm init -y
```

## 3.2. Actualizar *package.json*

### 3.2.1. Añadir ES Modules
``` json
"type": "module",
```

### 3.2.3. Añadir Scripts recomendados
``` json
"scripts": {
  "start": "node src/index.js",
  "dev": "node --watch src/index.js"
}
```
*--watch -> Usa el propio Nodemon de Node +22 para actualizar a tiempo real la aplicación*

## 3.3. Instalar *Express* y *CORS*
``` bash
npm install express cors
```

## 3.4. Instalar *axios*
Para hacer las llamadas a Unsplash desde el backend. Por ejemplo:
- *Intercambiar el code por el access_token*
- *Enviar likes a /photos/:id/like*
``` bash
npm install axios
```

## 3.5. Instalar *dotenv*
Necesario para cargar las claves del .env desde el backend. Por ejemplo:
- *Sin dotenv, no puedes acceder a process.env.UNSPLASH_CLIENT_ID*
``` bash
npm install dotenv
```

## 3.6. Ejemplo de *backend/src/index.js*
``` js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 3000;

app.use(cors());
app.use(express.json());

// Endpoint mínimo para que puedas comprobar que funciona
app.get("/", (req, res) => {
  res.json({ message: "Backend funcionando correctamente 🚀" });
});

app.listen(PORT, () => {
  console.log(`Backend escuchando en http://localhost:${PORT}`);
});
```

## 3.7. (Opcional) Instalar *Nodemon*
``` bash
npm install -D nodemon
```
*Ya no es necesario desde Node +22*

# 4. MAKEFILE
``` Makefile
all:
	docker compose -f docker-compose.yml up --build

down:
	docker compose -f docker-compose.yml down

up:
	docker compose -f docker-compose.yml up -d

restart:
	docker compose -f docker-compose.yml restart

clean:
	docker compose -f docker-compose.yml down -v

fclean: clean
	docker compose -f docker-compose.yml rm -f
	docker rmi $$(docker images -f "dangling=true" -q)
	docker system prune -f
	docker volume prune -f
	docker network prune -f
	docker image prune -f
	docker builder prune -f
	docker container prune -f
	docker compose -f docker-compose.yml build --no-cache
	docker compose -f docker-compose.yml up --build -d

stop:
	docker compose -f docker-compose.yml stop

re: fclean all

.PHONY: all down up clean fclean re
```

# 5 ESTRUCTURA DEL PROYECTO

## 5.1. Estructura inicial de frontend/src/
``` bash
src/
├── App.css
├── App.tsx
├── assets/
│   └── react.svg
├── components/
│   ├── Navbar.tsx
│   ├── PhotoCard.tsx
│   └── PhotoGrid.tsx
├── context/
│   └── AuthContext.tsx
├── hooks/
│   └── useUnsplash.ts
├── index.css
├── main.tsx
├── pages/
│   ├── Callback.tsx
│   ├── Favorites.tsx
│   └── Home.tsx
└── services/
    └── api.ts  ← Peticiones al backend
```

## 5.2. Estructura inicial de backend/src/
``` bash
src/
├── index.js
├── unsplash.js  ← Servicio para OAuth + likes + peticiones privadas
└── routes/
    ├── auth.js
    └── photos.js
```

# 6. DOCKER

## 6.1. Dockerfile frontend
``` dockerfile
FROM node:22-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
```

## 6.2. Dockerfile backend
``` dockerfile
FROM node:22-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

# (Opcional) Instalamos nodemon global para auto-reload
# RUN npm install -g nodemon

EXPOSE 3000

# CMD ["nodemon", "src/index.js"]
CMD ["npm", "run", "dev"]
```

## 6.3. Docker-compose.yml
``` dockerfile
services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: image-gallery-backend
    ports:
      - "3000:3000"
    volumes:
      - ./backend:/app
      - /app/node_modules
    environment:
      UNSPLASH_CLIENT_ID: ${UNSPLASH_CLIENT_ID}
      UNSPLASH_CLIENT_SECRET: ${UNSPLASH_CLIENT_SECRET}
      FRONTEND_URL: http://localhost:5173
      APP_PORT: 3000
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
      - ./frontend:/app
      - /app/node_modules
    environment:
      VITE_APP_BACKEND_URL: http://backend:3000
      VITE_UNSPLASH_CLIENT_ID: ${UNSPLASH_CLIENT_ID}
      VITE_UNSPLASH_REDIRECT_URI: http://backend:3000/auth/callback
    depends_on:
      - backend
    networks:
      - appnet

networks:
  appnet:
    driver: bridge
```

## 6.4. .env en root
``` bash
UNSPLASH_CLIENT_ID=abc123DEF
UNSPLASH_CLIENT_SECRET=verySecretValue123
```

## 6.5. Levantar contenedores Docker
``` bash
docker compose -f docker-compose.yml up --build
```
o
``` bash
make
```
