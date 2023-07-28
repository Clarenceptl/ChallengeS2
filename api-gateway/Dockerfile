FROM node:18.15-alpine As development

WORKDIR /app

COPY package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm config set registry http://registry.npmjs.org/

RUN npm ci

# Bundle app source
COPY . .

# Use the node user from the image (instead of the root user)
# USER node

EXPOSE 3080

CMD ["npm", "run", "start:dev"]
