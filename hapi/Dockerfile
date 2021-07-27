FROM node:12.16.2-alpine

# Create app directory
WORKDIR /opt/application

# Install dev tools
# Install global depedencies
RUN apk add --no-cache yarn
RUN apk add --no-cache git
RUN apk add --no-cache jq
RUN apk add --no-cache curl
RUN apk add --no-cache vim
RUN yarn global add serve
RUN yarn global add eslint

# Install nodemon for dev
RUN yarn --ignore-optional --frozen-lockfile global add nodemon

# Install app dependencies
COPY package*.json ./
COPY yarn.lock ./

# Bundle app source
COPY . .

EXPOSE 9090
CMD nodemon -L src/index.js
