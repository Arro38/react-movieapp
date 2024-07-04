# Étape 1 : Construction de l'application
FROM node:20-alpine as builder

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de package et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application
RUN npm run build

# Étape 2 : Configuration du serveur NGINX
FROM nginx:1.23

# Copier les fichiers construits dans le répertoire de distribution de NGINX
COPY --from=builder /app/dist /usr/share/nginx/html

# Copier le fichier de configuration personnalisé de NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80 pour accéder à l'application
EXPOSE 80

# Démarrer le serveur NGINX
CMD ["nginx", "-g", "daemon off;"]