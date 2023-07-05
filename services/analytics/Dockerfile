FROM node:18.15-alpine As development

WORKDIR /app

RUN chmod -R 777 .

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3020

CMD ["npm", "run", "start:prod"]
