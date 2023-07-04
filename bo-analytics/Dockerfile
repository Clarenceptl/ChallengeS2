FROM node:18.15-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN chown -R node /app/dist

USER node

EXPOSE 5000

CMD [ "npm", "run", "dev" ]
