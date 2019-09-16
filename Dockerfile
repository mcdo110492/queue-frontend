# Stage 1

FROM node:12-alpine as node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .



RUN npm run ng build -- --prod --output-path=dist


# Stage 2

FROM nginx:stable-alpine

COPY --from=node /usr/src/app/dist /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80