import { Injectable } from "@angular/core";
import { MotService } from "src/services/mot.service";
import { PlayerService } from "./player.service";
import { PlatformService } from "./platform.service";
import { Platform } from "src/models/platform.model";
import { CoinCollectionService } from "./coincollection.service";
import { Coin } from "src/models/coin.model";
import { LevelService } from "./levels.service";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class GameService {
    private availablePaths = [
        '/reglage', '/stats', '/jeu_etape1', '/jeu_etape2', '/jeu_etape3',
        '/mob', '/jeuComponent', '/', '/acceuil'
      ];
      
    constructor(
        private motService: MotService,
        private platformService : PlatformService,
        private coinCollectionService : CoinCollectionService,
        private levelService : LevelService,
        private router : Router
    ) {}

    get w2g() : string {
        return this.motService.getWord();
    }

    get platforms() : Platform[] {
        return this.platformService.platforms;
    }

    get existentCoins() : Coin[] {
        return this.coinCollectionService.existentCoins;
    }

    get collectedCoins() : Coin[] {
        return this.coinCollectionService.collectedCoins;
    }

    get level() : number {
        return this.levelService.level;
    }

    get progress() : number {
        return this.levelService.progress;
    }

    changeStep(path: string): void {
        if (this.availablePaths.includes(path)) {
          this.router.navigate([path]);
        } else {
          console.error('Path invalide:', path);
        }
      }
}
