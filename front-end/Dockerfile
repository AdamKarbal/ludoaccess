FROM node:22.16 AS build
ARG ENVIRONNEMENT=docker
WORKDIR /usr/local/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:${ENVIRONNEMENT}

FROM nginx:1.27.5
COPY --from=build /usr/local/app/dist/front-end/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
