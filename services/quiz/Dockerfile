FROM node:18.16-alpine As development

WORKDIR /quiz-service

COPY package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm config set registry http://registry.npmjs.org/

RUN npm ci

# Bundle app source
COPY . .

CMD ["npm", "run", "start:dev"]