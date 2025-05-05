import { Injectable } from '@angular/core';
import { Platform } from 'src/models/platform.model';
import { Coin } from 'src/models/coin.model';
import { CoinCollectionService } from './coincollection.service'; 
import { SettingsService } from './setting.service';
import { ChildSettings } from '../models/setting.model';

@Injectable({ providedIn: 'root' })
export class PlatformService {
  private _platforms: Platform[] = [];
  private _settings: ChildSettings | null = null;

  constructor(private coinCollectionService : CoinCollectionService, private settingsService : SettingsService){
    this.settingsService.settings$.subscribe(settings => {
      this._settings = settings;
    });
  }

  genererPlateformes(word: string): Platform[] {
    const MAX_PLATFORMS = 6;
    const SOL_Y = 10;
    const CEILING_Y = 60;
    this._platforms = [];
    let nbPt = 0;
    let lettresDisponibles = word.split('');
    let hauteurs: number[] = [];
    if(this._settings?.jumpDifficulty==true){
      hauteurs=[25,40,55,62];
    }
    else{
      hauteurs=[30,40,50,60]
    }
    let hauteurIndex = 0;

    let dernierX = 0; // en vw
    console.log('Mot utilisé :', word);

    for (let i = 0; i < MAX_PLATFORMS; i++) {
      const largeur = this.getRandom(10, 15);
      const x = this.getRandom(dernierX + 10, dernierX + 15);
      const y = 100-hauteurs[hauteurIndex];

      const randomChoice = this.getRandom(0, 5);
      if (randomChoice <= 3) {
        hauteurIndex = (hauteurIndex + 1) % hauteurs.length;
      } else {
        if (hauteurIndex == 0) hauteurIndex = (hauteurIndex + 1) % hauteurs.length;
        else hauteurIndex = (hauteurIndex - 1) % hauteurs.length;
      }

      let p = new Platform(x, y, largeur, undefined);
      this._platforms.push(p);
      nbPt++;
      dernierX = x;
    }

    let i = 0;
    // On affecte les lettres aux plateformes
    while (lettresDisponibles.length > 0) {
      const randomIndex = Math.floor(Math.random() * lettresDisponibles.length);
      const lettre = lettresDisponibles.splice(randomIndex, 1)[0];

      if (lettre !== undefined) {
        const targetPlatform = this._platforms[i % this._platforms.length];
        console.log(`Affectation de la lettre '${lettre}' à la plateforme ${i % this._platforms.length + 1}`);

        // Créer un objet Coin avec la lettre
        const coin = new Coin(targetPlatform.x, targetPlatform.y, lettre);

        // Utilisation de addLetter pour affecter le coin
        if (!targetPlatform.addCoin(coin)) {
          // Si la plateforme ne peut pas ajouter la lettre, on passe à la suivante
          console.log(`La plateforme ${i % this._platforms.length + 1} est pleine, réessayer avec une autre plateforme`);
          i++;
          lettresDisponibles.unshift(lettre); // remet la lettre dans la pile si échec
        }
        else{
          this.coinCollectionService.addExistent(coin);
        }

        i++;
      }
    }

    // Afficher les plateformes après affectation des lettres
    console.log('Plateformes après affectation des lettres :', this._platforms);
    /*this.platforms.push(new Platform(10,60,10));
    this.platforms.push(new Platform(25,72,10));
    this.platforms.push(new Platform(40,60,18));
    this.platforms.push(new Platform(58.5,50,10));
    this.platforms.push(new Platform(68.5,40,5));*/

    return this._platforms;
  }

  private getRandom(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  get platforms(): Platform[] {
    return this._platforms;
  }

  resetPlatforms(): void {
    this._platforms = [];
  }
}
