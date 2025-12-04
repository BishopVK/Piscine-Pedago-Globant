FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

# Instalamos nodemon global para auto-reload
RUN npm install -g nodemon

EXPOSE 3000

# CMD ["nodemon", "src/index.js"]
CMD ["npm", "run", "dev"]
