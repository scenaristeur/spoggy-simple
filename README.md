# spoggy-simple
Pour utiliser Spoggy, préférez Firefox ou Chrome https://scenaristeur.github.io/spoggy-simple/

# tutoriel
Cliquez sur les images pour ouvrir la video. Clic on picture to open the video.

    1 Créer un nouveau graphe
   [![Créer un nouveau graphe](https://img.youtube.com/vi/bkedKb34USI/0.jpg)](https://www.youtube.com/watch?v=bkedKb34USI)

    2 Vider un graphe
   [![Vider un graphe](https://img.youtube.com/vi/YqatYoxz5VU/0.jpg)](https://www.youtube.com/watch?v=YqatYoxz5VU)

    3 Créer un nouveau noeud dans le graphe
   [![Créer un nouveau noeud dans le graphe](https://img.youtube.com/vi/XkI6cJPUTuk/0.jpg)](https://www.youtube.com/watch?v=XkI6cJPUTuk)

    4 Créer un deuxième noeud dans le graphe
   [![Créer un deuxième noeud dans le graphe](https://img.youtube.com/vi/AmDwlkLk7f8/0.jpg)](https://www.youtube.com/watch?v=AmDwlkLk7f8)

    5 Créer un lien entre deux noeuds
   [![Créer un lien entre deux noeuds](https://img.youtube.com/vi/ND8fK2liSdE/0.jpg)](https://www.youtube.com/watch?v=ND8fK2liSdE)


    6 Créer un triplet
   [![Créer un triplet](https://img.youtube.com/vi/tXfX8vgfdiQ/0.jpg)](https://www.youtube.com/watch?v=tXfX8vgfdiQ)

# todo
- [ ] proposer une liste de graphes
- [ ] enregistrer les graphes 1. dans un POD public, 2. dans un POD perso, 3. dans un POD partagé
- [ ] utiliser les cluster visjs pour séparer les graphes (cluster 1 : navigation, cluster 2 : graphe en cours, ... ou réserver cluster 0 à 10 pour le système, et cluster data à partir de 11 )
- [ ] bloquer le déplacement du graphe par clavier quand le focus est dans l'input
- [ ] ne pas créer de noeud en cas de message chat
- [ ] implémenter la recherche dans le graphe, dans les sources connues
- [ ] enregistrer les sources utilisées, les sources préférées, proposer les sources connues du "Central", proposer une source au "Central"
- [ ] implémenter en web composants + agents
- [ X ] récupérer les réglages de graphes depuis heroku-spoggy
- [ X ] capture screenshot d'un graphe (fond Blanc) (comment recupérer le background du canvas ?)
- [ ] ajouter prise de photo et reconnaissance Semantique transmise au graphe https://medium.com/nanonets/how-to-do-image-segmentation-using-deep-learning-c673cc5862ef

# agents communication
https://github.com/scenaristeur/evejs

# services solid
https://github.com/Arquisoft/dechat_en2a/tree/master/src/app/services

# spoggy-simple
- test de base, sans connexion Solid : ouvrez la page index.html dans un navigateur
- pour le developpement ou tester la connexion avec un POD, utilisez nodejs,

```git clone https://github.com/scenaristeur/spoggy-simple.git
cd spoggy-simple
npm update
node .
```
et ouvrez votre navigateur à l'adresse http://127.0.0.1:3000

# Compatibilité
Testé sur Windows avec Chrome 74 et Firefox 66
