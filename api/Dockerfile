FROM node:18-alpine As development

WORKDIR /app

COPY package*.json ./

RUN npm ci

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]