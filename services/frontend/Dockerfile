FROM node:12-slim as builder

ARG branch

WORKDIR /usr/src/app

COPY package.json .

COPY yarn*.lock .

RUN yarn --frozen-lockfile

COPY . .

RUN yarn build:"$branch"

FROM nginx:1.16.1-alpine as server

COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY --from=builder /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf
