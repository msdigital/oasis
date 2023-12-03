FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ENV WEB_PORT=3000

EXPOSE 3000

CMD ["npm", "start"]
