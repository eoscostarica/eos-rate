FROM node:12-slim as builder

ARG branch
ARG WEBAPP_graphql_http_url
ARG WEBAPP_api_url
ARG WEBAPP_graphql_ws_url
ARG WEBAPP_eos_api_url
ARG WEBAPP_eos_api_host
ARG WEBAPP_eos_api_port
ARG WEBAPP_eos_api_protocol
ARG WEBAPP_eos_chain_id
ARG WEBAPP_block_explorer
ARG react_network_monitor_url

ENV WEBAPP_GRAPHQL_HTTP_URL $WEBAPP_graphql_http_url
ENV WEBAPP_GRAPHQL_WS_URL $WEBAPP_graphql_ws_url
ENV WEBAPP_EOS_API_URL $WEBAPP_eos_api_url
ENV WEBAPP_EOS_API_HOST $WEBAPP_eos_api_host
ENV WEBAPP_EOS_API_PORT $WEBAPP_eos_api_port
ENV WEBAPP_EOS_API_PROTOCOL $WEBAPP_eos_api_protocol
ENV WEBAPP_EOS_CHAIN_ID $WEBAPP_eos_chain_id
ENV WEBAPP_BLOCK_EXPLORER $WEBAPP_block_explorer
ENV WEBAPP_NETWORK_MONITOR_URL $react_network_monitor_url

WORKDIR /usr/src/app

COPY package.json .

COPY yarn*.lock .

RUN yarn --frozen-lockfile

COPY . .

ENV GENERATE_SOURCEMAP false

RUN yarn build

FROM nginx:1.16.1-alpine as server

COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY --from=builder /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf
