FROM node:18.15-alpine  As development

WORKDIR /app

RUN chmod -R 777 .

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev" ]
