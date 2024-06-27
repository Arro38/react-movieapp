# React Movie App [voir en démo](https://react-movieapp.formaterz.fr/)

Ce projet est un site web frontend développé avec React.js et TypeScript. Il utilise TailwindCSS et DaisyUI pour le style. Le backend de l'application repose sur une API Symfony disponible [ici](https://github.com/Arro38/symfony_movie_app). 

## Fonctionnalités

- Affichage de tous les films sur la page d'accueil.
- Fonctionnalités de CRUD (Créer, Lire, Mettre à jour, Supprimer) pour les films.
- Filtrage des films grâce à une barre de recherche.
- Filtrage des films en cliquant sur le nom des réalisateurs.
- Une seconde page dédiée à la création de films.

## Technologies Utilisées

- **React.js** : Une bibliothèque JavaScript pour construire des interfaces utilisateur.
- **TypeScript** : Un sur-ensemble de JavaScript qui ajoute le typage statique.
- **TailwindCSS** : Un framework CSS utilitaire pour un développement rapide.
- **DaisyUI** : Composants UI prêts à l'emploi basés sur TailwindCSS.
- **Symfony** : Framework PHP pour le backend de l'application.

## Installation et Lancement

### Prérequis

- Node.js (v.20) installé
- Symfony CLI installé pour le backend (suivre les instructions sur le dépôt Symfony)

### Étapes

1. Clonez le dépôt du frontend.
   ```bash
   git clone https://github.com/votre-utilisateur/react-movieapp.git
   ```
2. Installez les dépendances.
   ```bash
   cd react-movieapp
   npm install
   ```
3. Configurez l'URL de l'API Symfony dans les fichiers de configuration si nécessaire. ("src/lib/utils")

4. Lancez l'application.
   ```bash
   npm start
   ```

L'application devrait être accessible sur `http://localhost:3000`.

Pour plus de détails sur le backend API, vous pouvez consulter [ce dépôt](https://github.com/Arro38/symfony_movie_app).

## Utilisation

### Page d'Accueil

- **Voir tous les films** : La page d'accueil affiche une liste de tous les films disponibles.
- **Éditer/Supprimer** : Chaque film a des options pour être édité ou supprimé.
- **Filtrage** : Utilisez la barre de recherche pour filtrer les films ou cliquez sur le nom des réalisateurs pour filtrer par réalisateur.

### Page de Création

- **Créer un film** : Utilisez cette page pour ajouter un nouveau film à la collection.


## License

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.