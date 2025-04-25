import { Injectable } from '@angular/core';
import { Platform } from 'src/models/platform.model';
import { Coin } from 'src/models/coin.model'; // Assurez-vous que Coin est bien importé

@Injectable({ providedIn: 'root' })
export class PlatformService {
  platforms: Platform[] = [];

  genererPlateformes(word: string): Platform[] {
    const MAX_PLATFORMS = 6;
    const SOL_Y = 10;
    const CEILING_Y = 60;
    this.platforms = [];
    let nbPt = 0;
    let lettresDisponibles = word.split('');

    const hauteurs = [20, 30, 40, 50]; // On peut changer les hauteurs pour la difficulté
    let hauteurIndex = 0;

    let dernierX = 0; // en vw
    console.log('Mot utilisé :', word);
    
    for (let i = 0; i < MAX_PLATFORMS; i++) {
      const largeur = this.getRandom(10, 15);
      const x = this.getRandom(dernierX + 10, dernierX + 15);
      const y = hauteurs[hauteurIndex];

      const randomChoice = this.getRandom(0, 5);
      if (randomChoice <= 3) {
        hauteurIndex = (hauteurIndex + 1) % hauteurs.length;
      } else {
        if (hauteurIndex == 0) hauteurIndex = (hauteurIndex + 1) % hauteurs.length;
        else hauteurIndex = (hauteurIndex - 1) % hauteurs.length;
      }
      
      let p = new Platform(x, y, largeur, undefined);
      this.platforms.push(p);
      nbPt++;
      dernierX = x;
    }

    let i = 0;
    // On affecte les lettres aux plateformes
    while (lettresDisponibles.length > 0) {
      const randomIndex = Math.floor(Math.random() * lettresDisponibles.length);
      const lettre = lettresDisponibles.splice(randomIndex, 1)[0];

      if (lettre !== undefined) {
        const targetPlatform = this.platforms[i % this.platforms.length];
        console.log(`Affectation de la lettre '${lettre}' à la plateforme ${i % this.platforms.length + 1}`);

        // Créer un objet Coin avec la lettre
        const coin = new Coin(targetPlatform.x, targetPlatform.y, lettre);

        // Utilisation de addLetter pour affecter le coin
        if (!targetPlatform.addCoin(coin)) {
          // Si la plateforme ne peut pas ajouter la lettre, on passe à la suivante
          console.log(`La plateforme ${i % this.platforms.length + 1} est pleine, réessayer avec une autre plateforme`);
          i++;
          lettresDisponibles.unshift(lettre); // remet la lettre dans la pile si échec
        }

        i++;
      }
    }

    // Afficher les plateformes après affectation des lettres
    console.log('Plateformes après affectation des lettres :', this.platforms);

    return this.platforms;
  }

  private getRandom(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getPlatforms(): Platform[] {
    return this.platforms;
  }
}
