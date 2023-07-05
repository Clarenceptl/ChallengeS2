FROM node:18.15-alpine

WORKDIR /app

RUN chmod -R 777 .

COPY --chown=node:node package*.json ./

RUN npm ci

COPY . .

CMD [ "npm", "run", "dev" ]
