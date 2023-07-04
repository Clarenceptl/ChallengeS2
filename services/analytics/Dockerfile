FROM node:18.15-alpine As development

WORKDIR /analytics-service

COPY --chown=node:node package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm ci

# Bundle app source
COPY --chown=node:node . .

RUN chown -R node /app/node_modules

USER node

EXPOSE 3020

CMD ["npm", "run", "start:dev"]
