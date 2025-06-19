FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build:docker


FROM nginx:alpine

#Copie les fichiers générés (build) de l’étape précédente vers le dossier utilisé par Nginx pour servir du contenu.
COPY --from=build /app/dist/front-end /usr/share/nginx/html
#Remplace la configuration par défaut de Nginx avec une version personnalisée fournie par le projet.
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80



