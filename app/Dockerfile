FROM node:18.15-alpine as base

WORKDIR /app

COPY package*.json ./

RUN npm ci --production

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "run", "build" ]

FROM base as deployment

# Set the working directory
WORKDIR /app

# Copy the built code from the build stage
COPY --from=base /app/dist ./dist

# Set the command to start the server
CMD ["npm", "run", "preview"]

