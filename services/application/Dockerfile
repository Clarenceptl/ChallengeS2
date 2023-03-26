FROM node:18.15-alpine As development

WORKDIR /app

COPY --chown=node:node package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm ci

# Bundle app source
COPY --chown=node:node . .

# Use the node user from the image (instead of the root user)
USER node

EXPOSE 3021

CMD ["npm", "run", "start:dev"]