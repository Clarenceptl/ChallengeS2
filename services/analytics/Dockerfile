FROM node:18.15-alpine As development

WORKDIR /analytics-service

COPY package*.json ./

RUN npm ci

# Bundle app source
COPY . .

EXPOSE 3020

CMD ["npm", "run", "start:dev"]
