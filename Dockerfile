# Stage 1

FROM node:12-alpine as node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

<<<<<<< HEAD


RUN npm run ng build -- --prod --output-path=dist
=======
RUN npm run ng build -- --prod
>>>>>>> 6115ea88986270af0ad488e9a38aa1e5d32bd995


# Stage 2

FROM nginx:stable-alpine

COPY --from=node /usr/src/app/dist /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80