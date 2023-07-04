FROM node:18.15-alpine As development

WORKDIR /auth-service

COPY package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm ci

# Bundle app source
COPY . .

RUN chown -R node /app/node_modules

USER node

CMD ["npm", "run", "start:dev"]
