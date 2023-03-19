FROM node:18.15-alpine

WORKDIR /node/app

COPY package*.json ./

RUN npm ci

RUN npm install

RUN npm install -g vite

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev" ]
