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
import { filter, take as rxjsTake, take, tap, finalize } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import{ChronoService} from "./chrono.service";
import { FinalMessageService } from "./final-message.service";
import { FreezeGameService } from "./freeze-game.services";
import { AuthService } from "./auth.service";
import { Subject} from "rxjs";
import { takeUntil } from 'rxjs/operators';
import { Injector } from '@angular/core';
import { MobService } from './mob.service'; // adapte le chemin si besoin


@Injectable({ providedIn: 'root' })
export class GameService {
    private availablePaths = [
        '/reglage', '/stats', '/jeu_etape1', '/jeu_etape2', '/jeu_etape3',
        '/mob', '/jeuComponent', '/', '/acceuil'
      ];
    private _wordSample: string[] = [];
    private _wordTarget: string[] = [];
    private _settings?: ChildSettings | null;

    private isCrossed: boolean = false;


    private isStep1CompletedSubject = new BehaviorSubject<boolean>(false);
    public isStep1Completed$ = this.isStep1CompletedSubject.asObservable();

    private isStep2CompletedSubject = new BehaviorSubject<boolean>(false);
    public isStep2Completed$ = this.isStep2CompletedSubject.asObservable();

    private isStep3CompletedSubject = new BehaviorSubject<boolean>(false);
    public isStep3Completed$ = this.isStep3CompletedSubject.asObservable();

    private isGameFinished = new BehaviorSubject<boolean>(false);
    public isGameFinished$ = this.isGameFinished.asObservable();

    private wantToContinue = new BehaviorSubject<boolean>(false);
    public wantToContinue$ = this.wantToContinue.asObservable();


    private wantToExit = new BehaviorSubject<boolean>(false);
    public wantToExit$ = this.wantToExit.asObservable();

    private currentWordIndex = new BehaviorSubject<number>(0);
    public currentWordIndex$ = this.currentWordIndex.asObservable();

  private currentWordLength=new BehaviorSubject<number>(0);
  public currentWordLength$=this.currentWordLength.asObservable();



    constructor(
        private motService: MotService,
        private platformService: PlatformService,
        private coinCollectionService: CoinCollectionService,
        private levelService: LevelService,
        private router: Router,
        private settingService: SettingsService,
        private w2gService: Word2GuessService,
        private chronoService : ChronoService,
        private finalMessageService: FinalMessageService,
        private authService : AuthService,
        private freezeGameService: FreezeGameService,
        private injector: Injector,
    ) {
        this.settingService.settings$.subscribe(settings => {
            this._settings = settings;
        });
        this.authService.startDifficultyTimer(this._settings!);
    }

    fillSample(): void {
        if (this._settings?.wordDifficulty === "Facile") {
            let nb1=Math.floor(this._settings?.numberOfWords/2);
            let nb2=Math.floor(this._settings?.numberOfWords/2);
            if(this._settings?.numberOfWords%2!=0){
                nb1++;
            }

            for (let i = 0; i < nb1; i++) {
                let word = this.motService.getMotParNiveau(1);
                if (this._wordSample.includes(word)) {
                    i--; // Décrémenter l'index pour répéter cette itération
                    continue;
                }
                else {
                    this._wordSample.push(word);
                }
            }
            for (let i = 0; i < nb2; i++) {
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
            let nb1=Math.floor(this._settings?.numberOfWords/3);
            let nb2=Math.floor(this._settings?.numberOfWords/3);
            let nb3=Math.floor(this._settings?.numberOfWords/3);
            if(this._settings?.numberOfWords%3==1){
                nb1++;
            }
            if(this._settings?.numberOfWords%3==2){
                nb1++;
                nb2++;
            }
            for (let i = 0; i < nb1; i++) {
                let word = this.motService.getMotParNiveau(1);
                if (this._wordSample.includes(word)) {
                    i--; // Décrémenter l'index pour répéter cette itération
                    continue;
                }
                else {
                    this._wordSample.push(word);
                }
            }
            for (let i = 0; i < nb2; i++) {
                let word = this.motService.getMotParNiveau(2);
                if (this._wordSample.includes(word)) {
                    i--; // Décrémenter l'index pour répéter cette itération
                    continue;
                }
                else {
                    this._wordSample.push(word);
                }
            }
            for (let i = 0; i < nb3; i++) {
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
            let nb1=Math.floor(this._settings?.numberOfWords/2);
            let nb2=Math.floor(this._settings?.numberOfWords/2);
            if(this._settings?.numberOfWords%2!=0){
                nb1++;
            }
            for (let i = 0; i < nb2; i++) {
                let word = this.motService.getMotParNiveau(2);
                if (this._wordSample.includes(word)) {
                    i--;
                    continue;
                }
                else {
                    this._wordSample.push(word);
                }
            }
            for (let i = 0; i < nb1; i++) {
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
    public destroyStep$ = new Subject<void>();


    playStep1(): void {
        
        this.stopStep();
        
        if (this._wordSample.length === 0) {
            console.log('Tous les mots ont été joués.');
            console.log("Taille target: " + this._wordTarget.length);
            if(this._wordTarget.length === 0){
                console.log("Pas encore fini.");
                this.fillSample();
                this.currentWordIndex.next(0);
            }
            else{
                console.log("On passe à l'étape 2.");
                if(this._settings?.adaptDifficulty===true && this._wordTarget.length > 5){
                    this.settingService.lowerDifficulty(this._settings!);
                }
                if(this._settings?.adaptDifficulty===true && this._wordTarget.length < 2){
                    this.settingService.upDifficulty(this._settings!);
                }
                setTimeout(() => {
                    this.isStep1CompletedSubject.next(true);});
                return;
            }
          }
        console.log("Taille sample: " + this._wordSample.length);
          const word = this._wordSample.pop();
          if (word) {
            this.w2gService.initializeWord(word);
            console.log(`Mot "${word}" après initialisation.`);

            this.w2gService.isWordComplete$.pipe(tap(val => console.log('Valeur émise par isWordComplete$:', val)),filter(isComplete => isComplete),
            rxjsTake(1),takeUntil(this.destroyStep$)).subscribe(() => {
    
                const audio = new Audio('assets/sons/correctAnswer.mp3');
                audio.play();
                console.log(`Mot "${word}" complété. badLetter: ${this.w2gService.badLetter}`);
              const current = this.currentWordIndex.getValue();
                this.currentWordIndex.next(current+1);
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

    private _currentWord: string = '';

    private _isProcessing: boolean = false;

    playStep2(): void {
        this.stopStep();
        if (this._isProcessing) return;
        this._isProcessing = true;
        console.log('Début étape 2 - WordTarget:', this._wordTarget);


        if (this._wordTarget.length === 0) {
            console.log("Aucun mot dans wordTarget, passage à l'étape 3");
            this._isProcessing = false;
            this.isStep2CompletedSubject.next(true);
            return;
        }

        this._currentWord = this._wordTarget.pop() || '';
        console.log(`Mot courant pour l'étape 2: "${this._currentWord}"`);
        this.currentWordLength.next(this._currentWord.length);
        this.w2gService.resetWord();
        this.w2gService.initializeWord(this._currentWord);

        this.w2gService.isWordComplete$.pipe(
            filter(isComplete => isComplete),
            take(1),
            finalize(() => {
                this._isProcessing = false;
                console.log(`Fin étape 2 - Mot "${this._currentWord}" complété`);
                this.resetStep2();
                this.isStep2CompletedSubject.next(true);
            }),takeUntil(this.destroyStep$)
        ).subscribe(() => {
            console.log('Mot complété dans étape 2');
            this.w2gService.resetWord();
        });
    }

    playStep3(): void {

        this.stopStep();
        if (this._isProcessing) return;
        this._isProcessing = true;
        this.chronoService.resetTimer();
        this.chronoService.startTimer();
        // console.log('Début étape 3 - Chrono démarré');

        console.log('Début étape 3 - Mot courant:', this._currentWord);

        this.w2gService.resetWord();
        this.w2gService.initializeWord(this._currentWord);
        this.chronoService.resetTimer();
        this.chronoService.startTimer();
        this.w2gService.isWordComplete$.pipe(
            filter(isComplete => isComplete),
            take(1),
            finalize(() => {
                this._isProcessing = false;
                this.resetStep3();
                console.log(`Fin étape 3 - Mot "${this._currentWord}" complété`);
                // if(this._wordTarget.length===0) {
                //     console.log("Mot courant réinitialisé.");
                //     this.isGameFinished.next(true);
                //     this._isProcessing = false;

                //     this.finalMessageService.wantToContinue$.pipe(filter(wantsToContinue => wantsToContinue),rxjsTake(1)).subscribe(wantsToContinue => {
                //         console.log("Je veux continuer!");
                //         this.wantToContinue.next(true);
                //     });
                //    this.finalMessageService.wantToExit$.pipe(filter(wantsToExit => wantsToExit),rxjsTake(1)).subscribe(wantsToExit => {
                //         console.log("Je veux quitter!");
                //         this.wantToExit.next(true);
                //     }
                //     );
                //     return;
                // }
                this.isStep3CompletedSubject.next(true);
            }),takeUntil(this.destroyStep$)
        ).subscribe(() => {
            if(this._wordTarget.length===0) {
                    console.log("Mot courant réinitialisé.");
                    this.isGameFinished.next(true);
                    this._isProcessing = false;

                    this.finalMessageService.wantToContinue$.pipe(filter(wantsToContinue => wantsToContinue),rxjsTake(1)).subscribe(wantsToContinue => {
                        console.log("Je veux continuer!");
                        this.wantToContinue.next(true);
                    });
                   this.finalMessageService.wantToExit$.pipe(filter(wantsToExit => wantsToExit),rxjsTake(1)).subscribe(wantsToExit => {
                        console.log("Je veux quitter!");
                        this.wantToExit.next(true);
                    }
                    );
                    return;
                }
            console.log('Mot complété dans étape 3');
            this.w2gService.resetWord();
            this.w2gService.onWordCompleted();
        });
    }

    stopStep(): void{
        this.freezeGameService.isNewEvent$.pipe(
    filter(val => val),
    rxjsTake(1),
  ).subscribe(() => {
    console.log('Interruption d\'une step à cause de newEvent');
    this.destroyStep$.next(); // Annule tous les abonnements en cours
    this.destroyStep$.complete(); // Évite les fuites mémoire
  });
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
    get wordTarget(): string[] {
        return this._wordTarget;
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

      get isExitedToolbar(): boolean {
        this.freezeGameService.isCrossed$.pipe(
          rxjsTake(1)
          ).subscribe(isCrossed => {
            this.isCrossed = isCrossed;
        });
        return this.isCrossed;
    }

    resetGame(): void {
        console.warn("Hé ho");
        this.isStep1CompletedSubject.next(false);
        this.isStep2CompletedSubject.next(false);
        this.isStep3CompletedSubject.next(false);
        this.isCrossed = false;
        this.finalMessageService.reset();
        this.isGameFinished.next(false);
        this.wantToContinue.next(false);
        this.wantToExit.next(false);
        this.currentWordIndex.next(0);
        this._wordSample = [];
        this._wordTarget = [];
        this._currentWord = '';
        this.platformService.resetPlatforms();
        // this.w2gService.resetWord();
        this.chronoService.resetTimer();
        // this.fillSample();
        // this.playStep1();

    }

    resetStep2(): void {
        this.platformService.resetPlatforms();
        this.w2gService.resetWord();
;
    }

    resetStep3(): void {
        this.coinCollectionService.reset();
        this.chronoService.resetTimer();
    }

  getCurrentWordIndex(): number {
    return this.currentWordIndex.getValue();
  }

  continue(){
    this.isStep1CompletedSubject.next(false);
    this.isStep2CompletedSubject.next(false);
    this.isStep3CompletedSubject.next(false);
    this.isGameFinished.next(false);
    this.isCrossed = false;
    this.finalMessageService.reset();
    this.wantToContinue.next(false);
    this.wantToExit.next(false);
    this.currentWordIndex.next(1);
    this._wordSample = [];
    this._wordTarget = [];
    this._currentWord = '';
    this.platformService.resetPlatforms();
    this.w2gService.resetWord();
    this.chronoService.resetTimer();
    
}

}
