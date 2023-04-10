FROM node:18.10.0-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM node:18.10.0-alpine
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
ENV WEB_PORT=3000
EXPOSE 3000
RUN npm install
COPY --from=builder /app/dist ./dist
CMD [ "yarn", "start:dev" ]