FROM node:18.15-alpine  As development

WORKDIR /app

RUN chmod -R 777 .

COPY --chown=node:node package*.json ./

RUN npm ci

COPY . .

USER node

EXPOSE 5173

CMD [ "npm", "run", "dev" ]
