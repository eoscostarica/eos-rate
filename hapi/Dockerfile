FROM node:12.16.2-alpine

# Create app directory
WORKDIR /opt/application

# Install dev tools
# Install global depedencies
RUN apk add --no-cache yarn &&\
    apk add --no-cache git &&\
    apk add --no-cache jq &&\
    apk add --no-cache curl &&\
    apk add --no-cache vim &&\
    yarn global add serve &&\
    yarn global add eslint &&\
    yarn --ignore-optional --frozen-lockfile global add nodemon

# Install app dependencies
COPY package*.json ./
COPY yarn.lock ./

# Bundle app source
COPY . .

EXPOSE 9090
CMD nodemon -L src/index.js
