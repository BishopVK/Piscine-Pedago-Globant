FROM node:22-alpine

WORKDIR /app

# Copiamos package.json e instalamos dependencias dentro de la imagen
COPY package*.json ./

# Instalar dependencias EXACTAS según package-lock.json
RUN npm ci --silent

# Copiamos el resto de la app
COPY . .

EXPOSE 5173

# CMD de desarrollo (Vite) — se usa con --host para permitir accesos desde la red
CMD ["npm","run","dev","--","--host"]