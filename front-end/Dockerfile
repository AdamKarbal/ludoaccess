#Étape de build
FROM node:20-alpine AS build
ARG ENVIRONMENT=docker
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:$ENVIRONMENT


FROM nginx:alpine
COPY --from=build /app/dist/front-end /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80



