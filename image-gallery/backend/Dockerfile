FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

# Instalar dependencias EXACTAS según package-lock.json
RUN npm ci --silent

COPY . .

EXPOSE 3000

CMD ["npm","run","dev"]