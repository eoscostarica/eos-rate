FROM node:11

# Create app directory
WORKDIR /opt/application

# install nodemon for reloading the service when a file changes
RUN yarn global add nodemon

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn --ignore-optional --frozen-lockfile

# Bundle app source
COPY . .

EXPOSE 3030

CMD [ "yarn", "dev" ]
