FROM node:22.16
WORKDIR /app
COPY package*.json .
RUN ls
RUN npm install
COPY . .
EXPOSE 8081
CMD ["npm","run","dev"]
