FROM node:18.15-alpine

WORKDIR /app

RUN chmod -R 777 .

COPY package*.json ./

RUN npm ci

COPY . ./

EXPOSE 5000

CMD [ "npm", "run", "dev" ]
