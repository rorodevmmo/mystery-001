# Mystery 001 — Les Trois Portes

V1 d'un mini escape game web en HTML/CSS/JS.

## Lancer

Aucun build nécessaire.

Pour tester localement, ouvrez `index.html` ou utilisez un petit serveur local :

```bash
python3 -m http.server 8000
```

Puis ouvrez :

http://localhost:8000/

## GitHub Pages

1. Envoyez ces fichiers dans le repo `mystery-001`.
2. GitHub → Settings → Pages.
3. Source : Deploy from a branch.
4. Branch : `main` / `/ (root)`.
5. L'URL sera :

https://rorodevmmo.github.io/mystery-001/

## Important : trois téléphones

La V1 utilise `localStorage` pour permettre de tester le jeu sans backend.

`localStorage` est propre à chaque téléphone. Donc les trois téléphones ne peuvent PAS partager leur progression réelle.

Pour le vrai jeu, il faut remplacer cette partie par une petite base partagée.

### Architecture recommandée V2

Firebase Realtime Database :

```text
rooms/
  ABC123/
    team: "Les Ombres"
    currentRoom: 2
    players/
      jafar:
        done: true
      scar:
        done: true
      ursula:
        done: false
```

Chaque téléphone écoute `rooms/ABC123` et l'écran se met à jour instantanément.

## Personnaliser les énigmes

Toutes les salles sont dans `game.js`, dans la constante `ROOMS`.

Pour chaque salle :

- `title` = titre
- `intro` = texte
- `clue[0]` = indice Jafar
- `clue[1]` = indice Scar
- `clue[2]` = indice Ursula
- `answers` = réponses individuelles
- `code` = code qui ouvre la porte
- `next` = texte après ouverture

## Personnaliser les visuels

Ajoutez vos images dans `assets/` puis remplacez les blocs HTML/CSS concernés.

La V1 ne contient volontairement aucune image Disney sous copyright : vous pouvez ajouter vos propres visuels/éléments dont vous avez les droits.

## QR code

Le QR code peut simplement pointer vers :

https://rorodevmmo.github.io/mystery-001/

Pour un vrai système à trois joueuses, la page pourra ensuite générer un code d'équipe et des liens de rôle uniques.
