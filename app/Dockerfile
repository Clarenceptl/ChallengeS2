FROM node:18.15-alpine as base

WORKDIR /app

COPY package*.json ./

RUN npm ci --production

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve

# Set the command to start the server
CMD serve -s dist

