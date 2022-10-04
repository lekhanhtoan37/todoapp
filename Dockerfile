FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g @nestjs/cli ts-node && npm install
#can not install production cause error nest start

COPY . .

RUN npm run build api