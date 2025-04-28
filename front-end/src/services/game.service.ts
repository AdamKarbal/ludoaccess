import { Injectable } from "@angular/core";
import { MotService } from "src/services/mot.service";
import { PlatformService } from "./platform.service";
import { Platform } from "src/models/platform.model";
import { CoinCollectionService } from "./coincollection.service";
import { Coin } from "src/models/coin.model";
import { LevelService } from "./levels.service";
import { SettingsService } from "./setting.service";
import { Router } from "@angular/router";
import { ChildSettings } from "src/models/setting.model";
import { Word2GuessService } from "./word2guess.services";
import { filter, take as rxjsTake, tap } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import { resetFakeAsyncZone } from "@angular/core/testing";

@Injectable({ providedIn: 'root' })
export class GameService {
    private availablePaths = [
        '/reglage', '/stats', '/jeu_etape1', '/jeu_etape2', '/jeu_etape3',
        '/mob', '/jeuComponent', '/', '/acceuil'
      ];
    private _wordSample: string[] = [];
    private _wordTarget: string[] = [];
    private _settings?: ChildSettings | null;

    private isStep1CompletedSubject = new BehaviorSubject<boolean>(false);
    public isStep1Completed$ = this.isStep1CompletedSubject.asObservable();

    private isStep2CompletedSubject = new BehaviorSubject<boolean>(false);
    public isStep2Completed$ = this.isStep2CompletedSubject.asObservable();

    private isStep3CompletedSubject = new BehaviorSubject<boolean>(false);
    public isStep3Completed$ = this.isStep3CompletedSubject.asObservable();

    constructor(
        private motService: MotService,
        private platformService: PlatformService,
        private coinCollectionService: CoinCollectionService,
        private levelService: LevelService,
        private router: Router,
        private settingService: SettingsService,
        private w2gService: Word2GuessService
    ) {
        this.settingService.settings$.subscribe(settings => {
            this._settings = settings;
        });
    }

    fillSample(): void {
        if (this._settings?.wordDifficulty === "Facile") {
            for (let i = 0; i < 8; i++) {
                let word = this.motService.getMotParNiveau(1);
                if (this._wordSample.includes(word)) {
                    i--; // Décrémenter l'index pour répéter cette itération
                    continue;
                }
                else {
                    this._wordSample.push(word);
                }
            }
            for (let i = 0; i < 7; i++) {
                let word = this.motService.getMotParNiveau(2);
                if (this._wordSample.includes(word)) {
                    i--; // Décrémenter l'index pour répéter cette itération
                    continue;
                }
                else {
                    this._wordSample.push(word);
                }
            }
        }
        if (this._settings?.wordDifficulty === "Moyen") {
            for (let i = 0; i < 5; i++) {
                let word = this.motService.getMotParNiveau(1);
                if (this._wordSample.includes(word)) {
                    i--; // Décrémenter l'index pour répéter cette itération
                    continue;
                }
                else {
                    this._wordSample.push(word);
                }
            }
            for (let i = 0; i < 5; i++) {
                let word = this.motService.getMotParNiveau(2);
                if (this._wordSample.includes(word)) {
                    i--; // Décrémenter l'index pour répéter cette itération
                    continue;
                }
                else {
                    this._wordSample.push(word);
                }
            }
            for (let i = 0; i < 5; i++) {
                let word = this.motService.getMotParNiveau(3);
                if (this._wordSample.includes(word)) {
                    i--;
                    continue;
                }
                else {
                    this._wordSample.push(word);
                }
            }
        }
        if (this._settings?.wordDifficulty === "Difficile") {
            for (let i = 0; i < 7; i++) {
                let word = this.motService.getMotParNiveau(2);
                if (this._wordSample.includes(word)) {
                    i--;
                    continue;
                }
                else {
                    this._wordSample.push(word);
                }
            }
            for (let i = 0; i < 8; i++) {
                let word = this.motService.getMotParNiveau(3);
                if (this._wordSample.includes(word)) {
                    i--;
                    continue;
                }
                else {
                    this._wordSample.push(word);
                }
            }
        }
        console.log(this._settings?.wordDifficulty + ": difficulté et " + this._wordSample.length + ": sample");
        for (let i = 0; i < this._wordSample.length; i++) {
            console.log(this._wordSample[i]);
        }
    }

    playStep1(): void {
        // if(this.var === 1){
        //     this.playStep2();
        // }
        if (this._wordSample.length === 0) {
            console.log('Tous les mots ont été joués.');
            console.log("Taille target: " + this._wordTarget.length);
            if(this._wordTarget.length === 0){
                console.log("Pas encore fini.");
                return;
            }
            else{
                console.log("On passe à l'étape 2.");
                setTimeout(() => {this.isStep1CompletedSubject.next(true);});
                return;
            }
            return;
          }
        console.log("Taille sample: " + this._wordSample.length);
          const word = this._wordSample.pop();
          if (word) {
            this.w2gService.initializeWord(word);
            console.log(`Mot "${word}" après initialisation.`);
        
            this.w2gService.isWordComplete$.pipe(tap(val => console.log('Valeur émise par isWordComplete$:', val)),filter(isComplete => isComplete),
            rxjsTake(1)).subscribe(() => {

                console.log(`Mot "${word}" complété. badLetter: ${this.w2gService.badLetter}`);
                if (this.w2gService.badLetter == true) {
                  this._wordTarget.push(word);
                  console.log("Taille sample: " + this._wordSample.length);
                  console.log("Ajout dans wordTarget");
                  console.log(this._wordTarget);
                }
                this.w2gService.resetWord();
                if (this._wordSample.length >= 0) {
                    this.playStep1();
                }
                
            });
          }
    }

    playStep2(): void {
        console.log(this._wordTarget);
        if (this._wordTarget.length === 0) {
            console.log("Tous les mots ont été joués.");
            console.log("On passe à l'étape 3.");
            setTimeout(() => this.isStep2CompletedSubject.next(true));
            this.playStep3();
            return;
        }
        const word = this.w2g;
        if (this._wordTarget.includes(word)) {

            this.w2gService.resetWord();
            this.w2gService.initializeWord(word);
            console.log(`Mot "${word}" après initialisation.`);
            this.w2gService.isWordComplete$.pipe(
                tap(val => console.log('Valeur émise par isWordComplete$:', val)),
                filter(isComplete => isComplete),
                rxjsTake(1)
            ).subscribe(() => {
                console.log(`Mot "${word}" complété.`);
                this.w2gService.resetWord();
                this._wordSample.push(word);
                this._wordTarget.pop();
                setTimeout(() => {this.isStep2CompletedSubject.next(true);});
            });
        }
    }

    playStep3(): void {
        console.log("On est dans l'étape 3.");
        if (this._wordSample.length === 0) {
            console.log('Tous les mots ont été joués.');
            this.changeStep('/')
                return;
          }
        console.log("Taille sample: " + this._wordSample.length);
          const word = this._wordSample.pop();
          if (word) {
            this.w2gService.initializeWord(word);
            console.log(`Mot "${word}" après initialisation.`);
        
            this.w2gService.isWordComplete$.pipe(tap(val => console.log('Valeur émise par isWordComplete$:', val)),filter(isComplete => isComplete),
            rxjsTake(1)).subscribe(() => {

                console.log(`Mot "${word}" complété. badLetter: ${this.w2gService.badLetter}`);
                this.w2gService.resetWord();
                this.w2gService.onWordCompleted();
                setTimeout(() => {this.isStep3CompletedSubject.next(true);});
                
            });
          }
    }


    // Getters
    get w2g(): string {
        return this._wordTarget[this._wordTarget.length - 1] || '';
    }

    get platforms(): Platform[] {
        return this.platformService.platforms;
    }

    get existentCoins(): Coin[] {
        return this.coinCollectionService.existentCoins;
    }

    get collectedCoins(): Coin[] {
        return this.coinCollectionService.collectedCoins;
    }

    get level(): number {
        return this.levelService.level;
    }

    get progress(): number {
        return this.levelService.progress;
    }    changeStep(path: string): void {
        if (this.availablePaths.includes(path)) {
          this.router.navigate([path]);
        } else {
          console.error('Path invalide:', path);
        }
      }
}