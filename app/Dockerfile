FROM node:18.15-alpine

WORKDIR /app

COPY package*.json ./

RUN npm config set registry http://registry.npmjs.org/

RUN npm ci

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev" ]
