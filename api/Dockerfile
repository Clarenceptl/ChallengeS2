FROM node:18.15-alpine

WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci

COPY . .

EXPOSE 3080

CMD ["npm", "run", "start"]
