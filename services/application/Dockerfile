FROM node:18.15-alpine As development

WORKDIR /app

COPY --chown=node:node package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm ci

# Bundle app source
COPY . .

# Use the node user from the image (instead of the root user)
USER node

CMD ["npm", "run", "start:dev"]
