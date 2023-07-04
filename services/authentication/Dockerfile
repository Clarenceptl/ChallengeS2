FROM node:18.15-alpine As development

WORKDIR /app

RUN chmod 777 /app

COPY --chown=node:node package*.json ./

RUN npm ci

# Bundle app source
COPY . .

USER node

CMD ["npm", "run", "start:dev"]
