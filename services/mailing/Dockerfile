FROM node:18.15-alpine As development

WORKDIR /app

RUN chmod -R 777 .

COPY package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm ci --production

# Bundle app source
COPY . .

#RUN npm run build

CMD ["node", "dist/main"]
