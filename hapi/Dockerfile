# ---------- Base ----------
FROM node:14.16.0 as base
WORKDIR /app

# ---------- Builder ----------
FROM base AS builder
COPY package.json ./
COPY yarn.lock ./
RUN yarn --ignore-optional
COPY ./src ./src

# ---------- Release ----------
FROM base AS release
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
USER node
CMD ["node", "./src/index.js"]
