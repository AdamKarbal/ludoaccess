import { Injectable } from '@angular/core';
import { Platform } from 'src/models/platform.model';

@Injectable({ providedIn: 'root'})

export class PlatformService {
  platforms: Platform[] = [];

  genererPlateformes(word: string): Platform[] {
    const SOL_Y = 10;   
    const CEILING_Y = 60;
    this.platforms = [];
  
   
    let lettresDisponibles = word.split('');
    
    const hauteurs = [20, 30, 40,50]; // On peut changer les hauteurs pour la difficulté
    let hauteurIndex = 0;
  
    let dernierX = 0; // en vw
    console.log('Mot utilisé :', word);
  
    while (lettresDisponibles.length > 0) {
      const largeur = this.getRandom(10, 15);
      const x = this.getRandom(dernierX + 10, dernierX + 15); 
      const y = hauteurs[hauteurIndex];
      
      const randomChoice = this.getRandom(0, 5); 
      if (randomChoice <= 3) {
        hauteurIndex = (hauteurIndex + 1) % hauteurs.length; 
      } else {
        if(hauteurIndex == 0) hauteurIndex = (hauteurIndex + 1) % hauteurs.length;
        else hauteurIndex = (hauteurIndex - 1) % hauteurs.length; 
      }

      const randomIndex = Math.floor(Math.random() * lettresDisponibles.length);
      const lettre = lettresDisponibles.splice(randomIndex, 1)[0];

      const p = new Platform(x, y, largeur, undefined, lettre);
      console.log('Lettre actuelle :', lettre);
      this.platforms.push(p);
      dernierX = x;
    }
  
    return this.platforms;
  }

  private getRandom(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getPlatforms(): Platform[] {
    return this.platforms;
  }
}

