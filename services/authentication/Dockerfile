FROM node:18.15-alpine As development

WORKDIR /app

RUN chmod -R 777 .

COPY . .

RUN npm ci

# Bundle app source


RUN npm run build

CMD ["npm", "run", "start:prod"]
