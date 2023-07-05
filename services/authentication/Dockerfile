FROM node:18.15-alpine As development

WORKDIR /app

RUN chmod -R 777 .

COPY package*.json ./

RUN npm ci

# Bundle app source
COPY . .

CMD ["npm", "run", "start:dev"]
