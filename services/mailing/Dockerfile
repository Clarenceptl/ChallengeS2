FROM node:18.15-alpine As development

WORKDIR /mailing-service

RUN chmod -R 777 .

COPY package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm ci

# Bundle app source
COPY . .

CMD ["npm", "run", "start:dev"]
