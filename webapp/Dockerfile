FROM node:12-slim as builder

ARG branch
ARG webapp_graphql_http_url
ARG webapp_api_url
ARG webapp_graphql_ws_url
ARG webapp_eos_api_url
ARG webapp_eos_api_host
ARG webapp_eos_api_port
ARG webapp_eos_api_protocol
ARG webapp_eos_chain_id
ARG webapp_block_explorer
ARG webnetwork_monitor_url

ENV WEBAPP_GRAPHQL_HTTP_URL $webapp_graphql_http_url
ENV WEBAPP_GRAPHQL_WS_URL $webapp_graphql_ws_url
ENV WEBAPP_EOS_API_URL $webapp_eos_api_url
ENV WEBAPP_EOS_API_HOST $webapp_eos_api_host
ENV WEBAPP_EOS_API_PORT $webapp_eos_api_port
ENV WEBAPP_EOS_API_PROTOCOL $webapp_eos_api_protocol
ENV WEBAPP_EOS_CHAIN_ID $webapp_eos_chain_id
ENV WEBAPP_BLOCK_EXPLORER $webapp_block_explorer
ENV WEBAPP_NETWORK_MONITOR_URL $webnetwork_monitor_url

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
