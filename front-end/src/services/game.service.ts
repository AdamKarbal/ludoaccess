import { Injectable } from "@angular/core";
import { MotService } from "src/services/mot.service";
import { PlatformService } from "./platform.service";
import { Platform } from "src/models/platform.model";
import { CoinCollectionService } from "./coincollection.service";
import { Coin } from "src/models/coin.model";
import { LevelService } from "./levels.service";
import { BANQUE_MOTS } from "src/app/data/banque";
import { SettingsService } from "./setting.service";
import { Router } from "@angular/router";
import { ChildSettings } from "src/models/setting.model";

@Injectable({providedIn: 'root'})
export class GameService {
    private availablePaths = [
        '/reglage', '/stats', '/jeu_etape1', '/jeu_etape2', '/jeu_etape3',
        '/mob', '/jeuComponent', '/', '/acceuil'
      ];

    
    private _wordSample : string[] = [];
    private _settings? : ChildSettings | null;


    constructor(
        private motService: MotService,
        private platformService : PlatformService,
        private coinCollectionService : CoinCollectionService,
        private levelService : LevelService,
        private router : Router,
        private settingService : SettingsService
    ) {
        this.settingService.settings$.subscribe(settings => {
            this._settings=settings;
        })

    }

    fillSample() : void{
        if(this._settings?.wordDifficulty === "Facile"){
            for(let i = 0; i < 8; i++){
                let word = this.motService.getMotParNiveau(1);
                if(this._wordSample.includes(word)){
                    i--; // Décrémenter l'index pour répéter cette itération
                    continue;
                }
                else{
                    this._wordSample.push(word);
                }
            }
            for(let i = 0; i < 7; i++){
                let word = this.motService.getMotParNiveau(2);
                if(this._wordSample.includes(word)){
                    i--; // Décrémenter l'index pour répéter cette itération
                    continue;
                }
                else{
                    this._wordSample.push(word);
                }
            }   
        }
        if(this._settings?.wordDifficulty === "Moyen"){
            for(let i = 0; i < 5; i++){
                let word = this.motService.getMotParNiveau(1);
                if(this._wordSample.includes(word)){
                    i--; // Décrémenter l'index pour répéter cette itération
                    continue;
                }
                else{
                    this._wordSample.push(word);
                }
            }
            for(let i = 0; i < 5; i++){
                let word = this.motService.getMotParNiveau(2);
                if(this._wordSample.includes(word)){
                    i--; // Décrémenter l'index pour répéter cette itération
                    continue;
                }
                else{
                    this._wordSample.push(word);
                }
            } 
            for(let i = 0; i < 5; i++){
                let word = this.motService.getMotParNiveau(3);
                if(this._wordSample.includes(word)){
                    i--;
                    continue;
                }
                else{
                    this._wordSample.push(word);
                }
            }    
        }
        if(this._settings?.wordDifficulty === "Difficile"){
            for(let i = 0; i < 7; i++){
                let word = this.motService.getMotParNiveau(2);
                if(this._wordSample.includes(word)){
                    i--; 
                    continue;
                }
                else{
                    this._wordSample.push(word);
                }
            }
            for(let i = 0; i < 8; i++){
                let word = this.motService.getMotParNiveau(3);
                if(this._wordSample.includes(word)){
                    i--; 
                    continue;
                }
                else{
                    this._wordSample.push(word);
                }
            }   
        }
        console.log(this._settings?.wordDifficulty + ": difficulté et " + this._wordSample.length + ": sample");
    } 

    

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
