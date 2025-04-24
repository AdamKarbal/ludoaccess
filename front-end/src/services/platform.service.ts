import { Injectable } from '@angular/core';
import { Platform } from 'src/models/platform.model';

@Injectable({ providedIn: 'root'})

export class PlatformService {
  platforms: Platform[] = [];

  genererPlateformes(word: string): Platform[] {
    const SOL_Y = 10;   
    const CEILING_Y = 60;
    this.platforms = [];

    let dernierY = CEILING_Y - 5;
    let dernierX = 20;  // en vw
    console.log('Mot utilisé :', word);

    for (let i = 0; i < word.length; i++) {
      const largeur = this.getRandom(10, 20);
      const x = this.getRandom(dernierX + 5, dernierX + 20); // espacement entre plateformes
      const y = this.getRandom(Math.max(SOL_Y + 5, dernierY - 15), Math.min(CEILING_Y, dernierY - 5)); 
      
      const p = new Platform(x, y, largeur, undefined, word[i]);
      console.log('Lettre actuelle :', word[i]);
      this.platforms.push(p);

      dernierX = x;
      dernierY = y;
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


