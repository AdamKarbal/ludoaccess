import { Injectable } from '@angular/core';
import { Platform } from 'src/models/platform.model';

@Injectable({ providedIn: 'root'})

export class PlatformService {
  platforms: Platform[] = [];

  genererPlateformes(word: string): Platform[] {
    const MAX_PLATFORMS = 6;
    const SOL_Y = 10;   
    const CEILING_Y = 60;
    this.platforms = [];
    let nbPt = 0;
    let lettresDisponibles = word.split('');
    
    const hauteurs = [20, 30, 40,50]; // On peut changer les hauteurs pour la difficulté
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
        if(hauteurIndex == 0) hauteurIndex = (hauteurIndex + 1) % hauteurs.length;
        else hauteurIndex = (hauteurIndex - 1) % hauteurs.length; 
      }
      console.log("plateformes générées :", nbPt);
      var p;
      p = new Platform(x, y, largeur, undefined);
      this.platforms.push(p);
      nbPt++;
      dernierX = x;
    }

    let i = 0;
    while (lettresDisponibles.length > 0) {
      const randomIndex = Math.floor(Math.random() * lettresDisponibles.length);
      const lettre = lettresDisponibles.splice(randomIndex, 1)[0];
    
      if (lettre !== undefined) {
        const targetPlatform = this.platforms[i % this.platforms.length];
        //const targetPlatform = this.platforms[this.getRandom(0,this.platforms.length-1)]; Plus aléatoire mais moins intéressant...
    
        if (!targetPlatform.getCoinLetterFirst()) {
          targetPlatform.setCoinLetterFirst(lettre);
        } else if (!targetPlatform.getCoinLetterSecond()) {
          targetPlatform.setCoinLetterSecond(lettre);
        } else {
          i++; 
          lettresDisponibles.unshift(lettre); 
        }
    
        i++;
      }
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

