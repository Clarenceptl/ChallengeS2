FROM node:18.15-alpine As development

WORKDIR /app

COPY package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm ci

# Bundle app source
COPY . .

RUN chown -R node /app/dist

USER node

EXPOSE 3080

CMD ["npm", "run", "start:dev"]
