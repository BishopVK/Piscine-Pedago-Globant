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

## 3.1. Dockerfile frontend

# 4. DOCKER

## 4.1. Dockerfile frontend
``` dockerfile
FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
```

## 4.2. Dockerfile backend
``` dockerfile
FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

# Instalamos nodemon global para auto-reload
RUN npm install -g nodemon

EXPOSE 3000

# CMD ["nodemon", "src/index.js"]
CMD ["npm", "run", "dev"]
```

## 4.3. Docker-compose.yml
``` dockerfile
version: "3.8"

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

## 4.4. .env en root
``` bash
UNSPLASH_CLIENT_ID=QPEbY3rdBYt6Qnnru50FPtjDwYnZagm5xNHZWRLblsc
UNSPLASH_CLIENT_SECRET=SKwi_zDFLtrnpL9UouphD1Qg2RUZP6oV1UyPsJUswqQ
```

