# Stage 1

FROM node:12-alpine as node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


# Stage 2

FROM nginx:stable-alpine

COPY --from=node /usr/src/app/dist/queue-frontend /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf