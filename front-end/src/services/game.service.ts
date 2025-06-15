import { Injectable } from "@angular/core";
import {Injector} from "@angular/core";
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
import { BehaviorSubject, combineLatest } from "rxjs";
import{ChronoService} from "./chrono.service";
import { FinalMessageService } from "./final-message.service";
import { FreezeGameService } from "./freeze-game.services";
import { AuthService } from "./auth.service";
import { Subject} from "rxjs";
import { takeUntil } from 'rxjs/operators';
import {Interaction} from "../models/interaction.model";
import {UserStatsService} from "./stats.service";
import {ProgressionImpl} from "../models/progressionImpl.model";
import {InteractionImpl} from "../models/interactionImpl.model";
import {PlayerService} from "./player.service";
import { MiniGameService } from "./minigame.service";





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
    // partie à transmettre aux stats
    listLetterErrors: Map<string,number> = new Map();


    errorOcurrencesByPosition:  Map<number, Map<string, number>> = new Map();

    progression: ProgressionImpl[] = [];

    interaction: InteractionImpl[] = [];
    //fin
    private progressionMap: Map<string,ProgressionImpl> = new Map();
    private interactionMap: Map<string,InteractionImpl> = new Map();

    private isStep1CompletedSubject = new BehaviorSubject<boolean>(false);

    private currentStep=new BehaviorSubject<number>(1);
    public currentStep$ = this.currentStep.asObservable();

    private wordForStat = new BehaviorSubject<string[]>([]);
    public wordForStat$ = this.wordForStat.asObservable();


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

  private isResetting = false;




    constructor(
        public motService: MotService,
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
        private injector:Injector,

        private miniGameService: MiniGameService

    ) {
        this.settingService.settings$.subscribe(settings => {
            this._settings = settings;
        });

        this.authService.startDifficultyTimer(this._settings!);
        this.freezeGameService.isNewEvent$.pipe(
        filter(val => val),
    ).subscribe(() => {
        console.log('Interruption d\'une step à cause de newEvent');
        this.stopStep();
    });
    }

    fillSample(): void {
        console.log("Entrée dans fillSample");
        console.log("Settings avant fillSample:", this._settings);
        if (this._settings?.wordDifficulty === "Facile") {
            console.log("Settings avant fillSample: facile", this._settings);
            let nb1=Math.floor(this._settings?.numberOfWords/2);
            let nb2=Math.floor(this._settings?.numberOfWords/2);
            if(this._settings?.numberOfWords%2!=0){
                nb1++;
            }

            for (let i = 0; i < nb1; i++) {
                let word = this.motService.getMotParNiveau(1);
                console.log("Mot récupéré pour niveau 1: " + word);
                if (this._wordSample.includes(word)) {
                    console.log("Mot déjà présent dans le sample, on recommence.");
                    i--; // Décrémenter l'index pour répéter cette itération
                    continue;
                }
                else {
                    this._wordSample.push(word);
                    console.log("Mot ajouté au sample: " + word);
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
            console.log("sample: " + this._wordSample);
        }
        if (this._settings?.wordDifficulty === "Moyen") {
                                console.log("Settings avant fillSample: moyen", this._settings);

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
                                console.log("Settings avant fillSample: difficle", this._settings);

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
        console.log("Entrée dans playStep1");
        this.currentStep.next(1);
        if (this._isProcessing) return;
        this._isProcessing = true;
        this.destroyStep$ = new Subject<void>();


        if (this._wordSample.length === 0) {
            console.log('Tous les mots ont été joués.');
            if(this._wordTarget.length === 0){
                console.log("Pas encore fini.");
                this._isProcessing = false;
                this.fillSample();
                this.currentWordIndex.next(0);
            }
            else{ // là on finit l'étape 1
                this._isProcessing=false;
                console.log("On passe à l'étape 2.");
                console.log("Important : ",this.progressionMap);
                if(this._settings?.adaptDifficulty===true && this._wordTarget.length > 5){
                    this.settingService.lowerDifficulty(this._settings!);
                }
                if(this._settings?.adaptDifficulty===true && this._wordTarget.length < 2){
                    this.settingService.upDifficulty(this._settings!);
                }
                setTimeout(() => {
                    this.isStep1CompletedSubject.next(true);});
                return; // dcp on exit la fonction playStep1
            }
        }
        console.log("Taille sample: " + this._wordSample.length);
        const word = this._wordSample.pop(); // il reste encore des mots
        if (word) {
          this.w2gService.initializeWord(word);
          console.log(`Mot "${word}" après initialisation.`);

          this.w2gService.isWordComplete$.pipe(tap(val => console.log('Valeur émise par isWordComplete$:', val)),filter(isComplete => isComplete),
            rxjsTake(1),takeUntil(this.destroyStep$)).subscribe(() => {
              this._isProcessing = false;

              const audio = new Audio('assets/sons/correctAnswer.mp3');
              audio.play();
              console.log(`Mot "${word}" complété. badLetter: ${this.w2gService.badLetter}`);
              const current = this.currentWordIndex.getValue();
              this.currentWordIndex.next(current+1);
              if (this.w2gService.badLetter == true) {
                const current = this.wordForStat.getValue();
                 this.wordForStat.next([...current, word]);
                const incorrectLetters=this.w2gService.getIncorrectLetters();
                this.progressionMap.set(word,new ProgressionImpl(word,incorrectLetters.length,0));
                this.handleErrorsByPosition(word.length,this.w2gService.getIncorrectIndex());
                this.updateIncorrectLetters(incorrectLetters);
                this._wordTarget.push(word);
                console.log("Taille sample: " + this._wordSample.length);
                console.log("Ajout dans wordTarget");
                console.log(this._wordTarget);

                }
                this.w2gService.resetWord();
                    this.playStep1();

            });
          }
    }

    private _currentWord: string = '';

    private _isProcessing: boolean = false;

    playStep2(): void {
        this.currentStep.next(2);
        this.destroyStep$ = new Subject<void>();
        if (this._isProcessing) return;
        this._isProcessing = true;
        this.miniGameService.reset();
        this.gameOver();
        console.log('Début étape 2 - WordTarget:', this._wordTarget);


        if (this._wordTarget.length === 0 &&this._isProcessing) {

            console.log("Aucun mot dans wordTarget, passage à l'étape 3");
            this._isProcessing = false;
            this.isStep2CompletedSubject.next(true);
            console.warn("Step 2 done :"+this.isStep2CompletedSubject.getValue());
            return;
        }

        this._currentWord = this._wordTarget.pop() || '';
        console.log(`Mot courant pour l'étape 2: "${this._currentWord}"`);
        this.currentWordLength.next(this._currentWord.length);
        this.w2gService.resetWord();
        this.w2gService.initializeWord(this._currentWord);

        this.w2gService.isWordComplete$.pipe(
            filter(isComplete => isComplete),
            rxjsTake(1),
            finalize(() => {
                if (this.isResetting) {
                    console.warn('finalize ignoré car reset en cours');
                    return;
                }
                this._isProcessing = false;
                const gameService= this.injector.get(PlayerService);
                this.updateInteractionMap('Sauts',gameService.getSuccessfulJumps(),gameService.getFailedJumps());
                console.log(`Fin étape 2 - Mot "${this._currentWord}" complété`);
                this.resetStep2();
                this.isStep2CompletedSubject.next(true);
                console.warn("Step 2 done :" + this.isStep2CompletedSubject.getValue());
            }),takeUntil(this.destroyStep$)
        ).subscribe(() => {
            console.log('Mot complété dans étape 2 [subscribe]');
            this.w2gService.resetWord();

        });
    }

    playStep3(): void {

        this.currentStep.next(3);
        this.destroyStep$ = new Subject<void>();
        if (this._isProcessing) return;
        this._isProcessing = true;
        console.log('Début étape 3 - Mot courant:', this._currentWord);

        this.w2gService.resetWord();
        this.w2gService.initializeWord(this._currentWord);
        this.chronoService.resetTimer();
        this.chronoService.startTimer();
        this.w2gService.isWordComplete$.pipe(
            filter(isComplete => isComplete),
            rxjsTake(1),
            finalize(() => {
                if (this.isResetting) {
                    console.warn('finalize ignoré car reset en cours');
                    return;
                }
                this._isProcessing = false;
                this.resetStep3();
                /*this.interaction.push(new InteractionImpl('dernière lettre',0,this.getGlobalEdgeLetterErrorStats().last));
                this.interaction.push(new InteractionImpl('première lettre',0,this.getGlobalEdgeLetterErrorStats().first));
                console.log("Important",this.interaction);*/
                console.log(`Fin étape 3 - Mot "${this._currentWord}" complété`);
                this.isStep3CompletedSubject.next(true);
                console.warn("Step 3 done :"+this.isStep3CompletedSubject.getValue());

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
                   });
                   this.handleErrorsByPosition(this._currentWord.length,this.w2gService.getIncorrectIndex());
                   const statsService = this.injector.get(UserStatsService);
                   this.updateProgressionMap(this._currentWord,this.w2gService.getIncorrectLetters().length,0);
                   this.updateProgression();
                   this.updateInteraction();
                   this.interaction.push(new InteractionImpl('dernière lettre',0,this.getGlobalEdgeLetterErrorStats().last));
                   this.interaction.push(new InteractionImpl('première lettre',0,this.getGlobalEdgeLetterErrorStats().first));
                   statsService.updateStatsFromGameState(this.authService.getCurrentUser()!);
                   statsService.sendStatsToServer(this.authService.getCurrentUser()!);
                   console.log('Mot complété dans étape 3');
                   this.w2gService.resetWord();
                   this.w2gService.onWordCompleted();
                    this.w2gService.resetNbBadLetters();
             }

        });
    }


    handleErrorsByPosition(length:number,incorrectIndexes:number[]):void{
      if (!this.errorOcurrencesByPosition.has(length)) {
        this.errorOcurrencesByPosition.set(length, new Map<string, number>());
      }
      const positionMap = this.errorOcurrencesByPosition.get(length)!;

      // Incrémente le compteur pour chaque index erroné
      for (const index of incorrectIndexes) {
        const positionKey = index.toString();
        if (positionMap.has(positionKey)) {
          positionMap.set(positionKey, positionMap.get(positionKey)! + 1);
        } else {
          positionMap.set(positionKey, 1);
        }
      }
    }

    updateIncorrectLetters(incorrectLetters:string[]):void{
      for(const letter of incorrectLetters){
        if(this.listLetterErrors.has(letter)){
          this.listLetterErrors.set(letter,this.listLetterErrors.get(letter)!+1);
        }
        else{
          this.listLetterErrors.set(letter,1);
        }
      }
    }
    updateInteractionMap(action:string,success:number,failed:number){
      if(!this.interactionMap.has(action)){
        this.interactionMap.set(action,new InteractionImpl(action,success,failed));
      }
      else{
        this.interactionMap.get(action)!.addSuccess(success);
        this.interactionMap.get(action)!.addFailure(failed);
      }
    }
    updateInteraction(){
      this.interaction=Array.from(this.interactionMap.values());
    }
    updateProgression(){
      this.progression=Array.from(this.progressionMap.values());
    }

    updateProgressionMap(word:string,nbError:number,time:number) {
      if (!this.progressionMap.has(word)) {
        this.progressionMap.set(word, new ProgressionImpl(word, nbError, time));
      } else {
        this.progressionMap.get(word)!.addError(nbError);
        this.progressionMap.get(word)!.setTime(time);
        this.progressionMap.get(word)!.setCompleted(time < 30);
      }
    }


    stopStep(): void {
    console.warn('>>> stopStep() called');
    this.isResetting = true;
    try {
        console.warn('avant destroyStep$.next()');
        this.destroyStep$.next();
        console.warn('avant destroyStep$.complete()');
        this.destroyStep$.complete();
        console.warn('avant new Subject');
        this.destroyStep$ = new Subject<void>();
        console.warn('avant resetGame()');
        this.resetGame();
        console.warn('après resetGame()');
    } catch (e) {
        console.error('Erreur dans stopStep:', e);
    }
    // Optionnel : tu peux remettre à false ici ou dans resetGame()
}
    gameOver(): void {
        console.warn("Attention au Game Over");
        this.miniGameService.GameOver$
        .pipe(filter(gameOver => gameOver), take(1),takeUntil(this.destroyStep$))
        .subscribe(gameOver => {
            this.isGameFinished.next(true);

            console.warn("Is finished :"+gameOver);
            console.log("Game Over détecté, traitement en cours...");
            this.finalMessageService.wantToContinue$.pipe(
                filter(wantsToContinue => wantsToContinue),
                rxjsTake(1),takeUntil(this.destroyStep$)
            ).subscribe(wantsToContinue => {
            if (wantsToContinue) {
                console.log("L'utilisateur veut continuer le jeu.");
                this.wantToContinue.next(true);
                this.stopStep();// On arrête la step en cours
            }
            });
            this.finalMessageService.wantToExit$.pipe(
                filter(wantToExit => wantToExit),
                rxjsTake(1),takeUntil(this.destroyStep$)
            ).subscribe(wantToExit => {
            if (wantToExit) {
                console.log("L'utilisateur veut quitter le jeu.");
                this.wantToExit.next(true);
                this.stopStep();// On arrête la step en cours
            }});
            this.resetStep2();
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

    get currentWord(): string {
        return this._currentWord;
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


    resetGame(): void {
        console.warn("ResetGame appelé");
            // 👉 TRES IMPORTANT : bien annuler les playStep en cours
        this.destroyStep$.next();
        this.destroyStep$.complete();
        this.destroyStep$ = new Subject<void>();
        this.isStep1CompletedSubject.next(false);
        this.isStep2CompletedSubject.next(false);
        this.isStep3CompletedSubject.next(false);
        this.freezeGameService.isNewEventSubject.next(false);
        this.errorOcurrencesByPosition=new Map<number,Map<string,number>>;
        this.listLetterErrors.clear();
        this.w2gService.resetWord();
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
        this.wordForStat.next([]);
        // this.w2gService.resetWord();
        this.coinCollectionService.reset();
        this.chronoService.resetTimer();
        this.progressionMap.clear();

        this.miniGameService.reset();
        this._isProcessing = false;
        this.isResetting = false;
        this.currentStep.next(1);

        // this.fillSample();
        // this.playStep1();

    }
    restartIfExiting(): void {
        this.freezeGameService.isCrossed$.pipe(
        rxjsTake(1), filter(isCrossed => isCrossed), tap(() => {
                console.log("Je suis dans le tap de isCrossed");
                this.isCrossed = true;
            })
        ).subscribe(isCrossed => {
            if (isCrossed) {
                this.resetGame();
            }
        });
    }

    resetStep2(): void {
        this.platformService.resetPlatforms();
        this.w2gService.resetWord();
        this.coinCollectionService.reset();

    }

    resetStep3(): void {
        console.warn("reset step3");
        this.coinCollectionService.reset();
        this.chronoService.resetTimer();
    }

  getCurrentWordIndex(): number {
    return this.currentWordIndex.getValue();
  }

  getListLetterErrors(): Map<string,number> {
    return this.listLetterErrors;
  }

  getErrorOcurrencesByPosition(): Map<number,Map<string,number>> {
    return this.errorOcurrencesByPosition;
  }

  getProgression(): ProgressionImpl[] {
    return this.progression;
  }

  getInteraction(): Interaction[] {
    return this.interaction;
  }

  getGlobalEdgeLetterErrorStats(): { first: number; last: number } {
    let first = 0;
    let last = 0;

    for (const [length, map] of this.errorOcurrencesByPosition.entries()) {
      first += map.get('1') ?? 0;
      last += map.get((length).toString()) ?? 0;
    }

    return { first, last };
  }



  continue(){
    this.isStep1CompletedSubject.next(false);
    this.isStep2CompletedSubject.next(false);
    this.isStep3CompletedSubject.next(false);
    this.freezeGameService.isNewEventSubject.next(false);
    this.isGameFinished.next(false);
    this.isCrossed = false;
    this.finalMessageService.reset();
    this.w2gService.resetWord();
    this.wantToContinue.next(false);
    this.wantToExit.next(false);
    this.currentWordIndex.next(0);
    this._wordSample = [];
    this._wordTarget = [];
    this._currentWord = '';
    this.platformService.resetPlatforms();
    this.chronoService.resetTimer();
    this.currentStep.next(1);
    this.levelService.resetProgress();

}

}
