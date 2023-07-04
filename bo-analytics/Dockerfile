FROM node:18.15-alpine

WORKDIR /app

RUN chmod 777 /app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY . .

USER node

EXPOSE 5000

CMD [ "npm", "run", "dev" ]
