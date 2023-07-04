FROM node:18.15-alpine As development

WORKDIR /analytics-service

COPY --chown=node:node package*.json ./

RUN npm ci

# Bundle app source
COPY . .

# Use the node user from the image (instead of the root user)
USER node

EXPOSE 3020

CMD ["npm", "run", "start:dev"]
