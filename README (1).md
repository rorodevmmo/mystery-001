# MYSTERY 001 — V1 100 % GitHub Pages

Cette version ne nécessite :

- aucun serveur ;
- aucune base de données ;
- Firebase ;
- Node.js ;
- installation ;
- backend.

Elle fonctionne uniquement avec des fichiers statiques servis par GitHub Pages.

## Publication

Déposez le contenu de ce dossier à la racine du repository :

`https://github.com/rorodevmmo/mystery-001`

Puis activez :

**Settings → Pages → Deploy from a branch → main → / (root)**

L'adresse sera :

`https://rorodevmmo.github.io/mystery-001/`

## QR code

Le QR code doit pointer vers :

`https://rorodevmmo.github.io/mystery-001/`

Les trois filles scannent le même QR code.

Elles choisissent ensuite :

- Jafar
- Scar
- Ursula

Chacune obtient une énigme différente.

## Comment fonctionne la progression

Il n'y a aucune synchronisation entre les téléphones.

C'est volontaire.

Les trois filles doivent :

1. résoudre leur indice ;
2. se communiquer leurs réponses ;
3. reconstituer le code ;
4. entrer le code de la porte ;
5. passer à la salle suivante.

Les URL contiennent la salle :

`room.html?player=jafar&room=2`

Le site n'a donc pas besoin de stocker une progression sur un serveur.

## Attention au rafraîchissement

La validation de l'indice est mémorisée dans `sessionStorage` uniquement pour le téléphone et l'onglet courant.

La vraie progression du jeu est l'URL de la salle.

## Modifier les énigmes

Tout est dans `game.js`, dans `ROOMS`.

Chaque salle possède :

- `title`
- `intro`
- `clues[0]` = Jafar
- `clues[1]` = Scar
- `clues[2]` = Ursula
- `answers` = réponses individuelles
- `code` = code commun
- `next` = texte après ouverture

## Ajouter des images

Ajoutez vos fichiers dans `assets/` et référencez-les depuis `room.html` ou `game.js`.

Cette V1 ne contient pas de contenu Disney protégé.
