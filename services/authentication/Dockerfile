FROM node:18.15-alpine As development

WORKDIR /app

RUN chmod -R 777 .

COPY package*.json ./

RUN npm ci --production

# Bundle app source
COPY . .

#RUN npm run build
CMD ["npm", "run", "start:prod"]
