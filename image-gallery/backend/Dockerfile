FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

# CMD ["nodemon", "src/index.js"]
CMD ["npm", "run", "dev"]
