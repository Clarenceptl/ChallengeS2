FROM node:18.15-alpine As development

WORKDIR /analytics-service

RUN chmod 777 /analytics-service

COPY --chown=node:node package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm ci

# Bundle app source
COPY . .

# Use the node user from the image (instead of the root user)
USER node

EXPOSE 3020

CMD ["npm", "run", "start:dev"]
