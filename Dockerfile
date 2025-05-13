# Étape 1 : build de l'app
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Étape 2 : serveur web pour servir le build
FROM nginx:alpine

# Copie le build React dans le dossier de nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copie la config nginx personnalisée (optionnel)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
