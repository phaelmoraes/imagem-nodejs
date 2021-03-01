FROM node:15-alpine

WORKDIR /home/app

COPY . .

COPY package*.json ./

RUN npm install

CMD ["node", "src/index.js"]

EXPOSE 3000

