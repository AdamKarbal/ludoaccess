# I) Tests
# 1. Contexte et objectif

Ce plan de tests a pour but de garantir la qualité fonctionnelle et l’adéquation thérapeutique du jeu de plateforme destiné à la rééducation en ergothérapie. Les scénarios couvrent l’ensemble du parcours utilisateur : gestion des profils, configuration, jeu, statistiques et banque de mots. Chaque scénario est évalué selon deux critères (intérêt thérapeutique, adaptabilité) afin d’établir une priorité réaliste et orientée patient.

# 2. Critères de priorisation

| Critère | Description | Échelle |
| ------- | ------------ | ------- |
| Intérêt thérapeutique | Contribution à l’objectif de rééducation validé par l’ergothérapeute. | 1 → anecdotique ; 10 → essentiel |
| Adaptabilité | Impact des ajustements pour les enfants en fonction de leur trouble. | 1 → rigide ; 10 → hautement modulable |

# 3. Matrice de priorisation

Les scores fournis ont été additionnés (somme max = 20). Le rang reflète la priorité (1 = plus haute) à traiter en premier.

| Rang | Scénario | Somme des scores |
| ---- | -------- | ---------------- |
| 1 | Le jeune collecte les lettres pour compléter le mot | 20 |
| 2 | Modifier les réglages du jeu d’un enfant | 18 |
| 3 | Ajouter un nouvel enfant | 17 |
| 4 | Vérifier la concordance des statistiques | 13 |
| 5 | Supprimer un mot de la banque de mots | 14 |
| 6 | Ajouter un mot à la banque de mots | 14 |
| 7 | Perte de vie ou réussite du mini‑jeu | 13 |
| 8 | Supprimer un enfant | 9 |
| 9 | Consulter la liste des mots par difficulté | 12 |

**NB :** Les scénarios 5 et 6 présentent la même somme. Leur ordre a été tranché en faveur de la suppression.

# 4. Scénarios de test détaillés

## Scénario 1 – Collecte des lettres pour compléter le mot (Rang 1)

- Objectif : Valider le cœur ludique et thérapeutique du jeu.
- Sélectionner le profil du premier enfant.
- Se connecter.
- Appuyer sur Jouer.
- Récupérer le word2Guess.
- Entrer le mot avec une erreur (déclenche la deuxième partie du jeu).
- Collecter une lettre.
- Vérifier que word2Guess affiche la lettre.

## Scénario 2 – Modification des réglages d’un enfant

- Objectif : Assurer la personnalisation visuelle et cognitive.
- Sélectionner le premier profil d’ergothérapeute.
- Se connecter.
- Ouvrir le profil du premier enfant.
- Modifier background et nombre de mots.
- Se déconnecter.
- Sélectionner le premier profil d’un enfant.
- Se connecter.
- Lancer le jeu.
- Vérifier si le background et le nombre de mots ont changé.

## Scénario 3 – Ajout d’un nouvel enfant

- Objectif : Garantir l’enregistrement rapide d’un nouvel enfant.
- Sélectionner le premier profil d’un ergothérapeute.
- Se connecter.
- Cliquer sur ajouter un enfant.
- Remplir Ali Madandar, 12 ans.
- Valider.
- Vérifier sur la page si l’enfant est apparu.

## Scénario 4 – Concordance des statistiques

- Sélectionner le premier profil d’ergothérapeute.
- Se connecter.
- Choisir le premier enfant et appuyer sur son bouton statistiques.
- Regarder si pour chaque période, chaque graphe on a les bonnes valeurs.
- Appuyer sur le bouton se déconnecter.

## Scénario 5 – Suppression d’un mot

- Sélectionner le premier profil d’ergothérapeute.
- Se connecter.
- Choisir le premier enfant et appuyer sur le bouton mot.
- Sélectionner la difficulté “Facile”.
- Supprimer le premier mot.
- Appuyer sur le bouton déconnecter.

## Scénario 6 – Ajout d’un mot

- Sélectionner le premier profil d’ergothérapeute.
- Se connecter.
- Choisir le premier enfant et appuyer sur le bouton mot.
- Appuyer sur le bouton ajouter un mot.
- Entrer le mot “Test” et sélectionner la difficulté Facile.
- Vérifier si le mot est dans les mots Faciles.
- Appuyer sur le bouton retour.
- Appuyer sur le bouton déconnecter.

## Scénario 7 – Perte de vie ou réussite du mini‑jeu

**Version A : échec → game‑over**

- Sélectionner le premier profil d’enfant.
- Se connecter.
- Lancer le jeu.
- Réussir la première étape en faisant une faute.
- Avancer jusqu’au monstre.
- Rater toutes les lettres jusqu’à perdre toute sa vie.
- Appuyer sur le bouton quitter du game-over.

**Version B : réussite**

- Sélectionner le premier profil d’enfant.
- Se connecter.
- Lancer le jeu.
- Réussir la première étape en faisant une faute.
- Avancer jusqu’au monstre.
- Réussir toutes les lettres, jusqu’à ce que le mini-jeu se termine.
- Appuyer sur le bouton quitter.
- Confirmer.

## Scénario 8 – Suppression d’un enfant

- Sélectionner le premier profil d’ergothérapeute.
- Se connecter.
- Sélectionner le premier enfant.
- Appuyer sur le bouton supprimer.
- Confirmer.
- Appuyer sur le bouton déconnecter.

## Scénario 9 – Consultation de la liste des mots

- Sélectionner le premier profil d’ergothérapeute.
- Se connecter.
- Sélectionner le premier enfant.
- Appuyer sur le bouton mot.
- Choisir la difficulté des mots.
- Consulter la liste.
- Appuyer sur le bouton déconnexion.

# 5. Justification et explication des tests

Afin de justifier nos choix de priorité dans le classement, on va détailler l’attribution de points pour les deux premiers scénarios.

**Scénario 1 :** Le premier scénario est la partie jeu en lui-même du projet, sans cette partie l’enfant ne peut pas travailler sur son trouble. De plus c’est ici que la différente adaptation s’applique d’où une adaptabilité de 10. Ce qui donne une note de 20.

**Scénario 2 :** De même que pour le premier scénario, ce scénario est essentiel à l’adaptation des troubles. Accéder aux différents réglages, permet de modifier les paramètres et avoir un impact sur le jeu. D’où les notes de 8/10 pour l’intérêt thérapeutique et 10/10 pour l’adaptabilité.

Et ainsi de suite pour chaque scénario, ce qui nous a permis d’effectuer un ordre de priorité.

# 6. Transformer en plus gros scénario

Si on veut effectuer des plus gros scénarios end to end, on peut combiner plusieurs de nos scénarios pour en faire un complet. Par exemple on peut utiliser les scénarios : 3‑2‑1‑4, pour faire le scénario suivant : “Un nouvel enfant est arrivé, il faut l’enregistrer et modifier ses réglages pour lancer une première partie. Une fois fini, on peut regarder ses statistiques et se déconnecter.”

# 7. Difficulté dans les scénarios

Lors de la mise en œuvre des différents scénarios, on a rencontré une grosse difficulté. Lors de l’étape 2 où il faut récupérer les lettres sur les plateformes, il était compliqué de mouvoir le personnage sans erreurs de time out, on a donc dû changer de stratégie pour le faire bouger. Un autre problème était de déterminer à tout instant les coordonnées du Player et des plateformes afin de savoir quand sauter pour atterrir sur les plateformes. Une fois réussi, un dernier problème est intervenu : quand notre personnage commence à courir, il y a un temps minimal avant qu’une autre touche puisse être pressée, sauf que le moment où le personnage doit sauter est avant ce temps minimal. Du coup, il était impossible de monter sur une plateforme. Finalement, on a changé notre stratégie et mis un mot avec une seule lettre pour récupérer seulement cette lettre sans avoir besoin d’aller sur la plateforme.

# 8. Amélioration possible

Vis‑à‑vis de nos scénarios actuels, une amélioration possible aurait été de regrouper plusieurs scénarios pour faire plusieurs plus gros scénarios permettant de voir si une interaction plus complète s’effectue sans problème.

Si on devait refaire la partie des tests, on aurait utilisé les fixtures dès le début, afin d’éviter de faire du refactor. Mais aussi fait des tests moins segmentés. De plus, pour le prochain projet, on saura déjà faire des tests Playwright, donc on pourra les faire dès le début à l’image du PS5.

# II) Conteneurisation

# 1. Statut lors de la livraison

**Partie 1:** Done

**Partie 2:** Done

**Partie 3:** Commencé pas fini

# 2. Fonctionnement

- Services :
    - Un service nommé back-end acccessible sur le port 8081 de l'hôte qui tourne sur le network "app-net" du conteneur.
    - Un service nommé front-end accessible sur le port 8080 de l'hôte qui dépend du back-end pour se lancer et qui lui aussi tourne sur le network "app-net".

- On utilise un docker-compose constitué des deux services déclarés au-dessus avec des healthchecks. Le service front-end utilise 'curl' pour vérifier la santé de l'autre service sur le port http://localhost:4201 du conteneur, pour qu'il ne run qu'une fois que le service back-end est opérationnel.

- 
