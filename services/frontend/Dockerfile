FROM node:12-slim as builder

ARG branch
ARG react_app_graphql_http_url
ARG react_app_api_url
ARG react_app_graphql_ws_url
ARG react_app_eos_api_url
ARG react_app_eos_api_host
ARG react_app_eos_api_port
ARG react_app_eos_api_protocol
ARG react_app_eos_chain_id
ARG react_app_block_explorer
ARG react_network_monitor_url

ENV REACT_APP_GRAPHQL_HTTP_URL $react_app_graphql_http_url
ENV REACT_APP_GRAPHQL_WS_URL $react_app_graphql_ws_url
ENV REACT_APP_EOS_API_URL $react_app_eos_api_url
ENV REACT_APP_EOS_API_HOST $react_app_eos_api_host
ENV REACT_APP_EOS_API_PORT $react_app_eos_api_port
ENV REACT_APP_EOS_API_PROTOCOL $react_app_eos_api_protocol
ENV REACT_APP_EOS_CHAIN_ID $react_app_eos_chain_id
ENV REACT_APP_BLOCK_EXPLORER $react_app_block_explorer
ENV REACT_APP_NETWORK_MONITOR_URL $react_network_monitor_url

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
