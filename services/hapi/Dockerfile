FROM node:12-alpine

# Create app directory
WORKDIR /opt/application

# Install nodemon for dev
RUN yarn --ignore-optional --frozen-lockfile global add nodemon

# Install dev tools
# RUN apt-get update && apt-get install jq curl git vim -y

# Install app dependencies
COPY package*.json ./
COPY yarn.lock ./
COPY node_modules/**/* ./

# Bundle app source
COPY . .

EXPOSE 3005
CMD nodemon -L src/index.js