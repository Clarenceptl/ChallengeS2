FROM node:18.15-alpine As development

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm ci

# Bundle app source
COPY . .

CMD ["npm", "run", "start:dev"]
