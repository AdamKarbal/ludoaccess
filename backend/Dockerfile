FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

#On installe toutes les dépendances du projet
RUN npm install

#On copie le code source du backend dans le conteneur
COPY . .

EXPOSE 8081

CMD ["npm", "start"]