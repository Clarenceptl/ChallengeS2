FROM node:18-alpine as base

RUN npm install --global serve

WORKDIR /app

COPY package*.json ./

RUN npm ci --production

RUN npm install

COPY . .

RUN npm run build

# Set the command to start the server
CMD serve -s dist

