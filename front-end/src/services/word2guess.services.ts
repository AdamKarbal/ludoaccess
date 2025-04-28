import { Injectable } from '@angular/core';
import { GameService } from './game.service';
import { FreezeGameService } from './freeze-game.services';
import { CoinCollectionService } from './coincollection.service';
import { Coin } from 'src/models/coin.model';
import { LevelService } from "./levels.service";
import { BehaviorSubject } from 'rxjs';
import { combineLatest } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })

export class Word2GuessService {
    private word: string="";
    private display: string="";
    private guessedIndexes: number[] = [];
    public currentIndex = 0;
    public isPaused: boolean = false;
    public isCrossed: boolean = false;
    public isI: boolean = false;
    private _badLetter : boolean = false;
    
    private incorrectIndexes: Set<number> = new Set<number>();

    private wordCompleteSubject = new BehaviorSubject<boolean>(false);
    public isWordComplete$ = this.wordCompleteSubject.asObservable();

    private letterGuessedSubject = new BehaviorSubject<boolean | null>(null);
  public letterGuessed$ = this.letterGuessedSubject.asObservable();

    private incorrectLetterSubject = new BehaviorSubject<number | null>(null);
  public incorrectLetter$ = this.incorrectLetterSubject.asObservable();

    constructor(private freezeGameService: FreezeGameService,private LevelService:LevelService) {
      this.freezeGameService.isPaused$.subscribe(isPaused => {
        this.isPaused = isPaused;
        console.log(`isPaused updated: ${this.isPaused}`);
      });
    
      this.freezeGameService.isCrossed$.subscribe(isCrossed => {
        this.isCrossed = isCrossed;
        console.log(`isCrossed updated: ${this.isCrossed}`);
      });
    
      this.freezeGameService.isInfo$.subscribe(isInfo => {
        this.isI = isInfo;
        console.log(`isInfo updated: ${this.isI}`);
      });
  }
      get badLetter() : boolean{
        return this._badLetter;
      }

      initializeWord(word: string) {
        if (this.word === word) {
          console.warn('Le mot est déjà initialisé:', word);
          return;
        }
        this.resetWord(); // Réinitialise l'état de mot complet
        this._badLetter = false;
        this.word = word;
        console.log("Nom du initialize : "+ this.word);
        this.display = Array(this.word.length).fill('_').join(' ');
        this.guessedIndexes = [];
        this.currentIndex = 0;
      }
  
      getWord(): string {
        return this.word;
      }

      getDisplay() : string{
        return this.display;
      }
      getIncorrectIndexes(): Set<number> {
        return this.incorrectIndexes;
      }
    
      getGuessedIndexes(): number[] {
        return this.guessedIndexes;
      }
    
      guessLetter(letter: string): boolean {
        
        if(this.isPaused || this.isCrossed || this.isI) {
          console.log('Le jeu est en pause, impossible de deviner une lettre.');// Vérifie si le jeu est en pause ou si l'utilisateur a quitté
          return false;
        } 
        if (!letter.match(/^\p{L}$/u)){
          this._badLetter = true;   // A REPRENDRE POUR LES STATS
          this.letterGuessedSubject.next(false);
          console.log("Wrong letter !");
          return false;
        }
        console.log(`Comparing "${letter}" with "${this.word[this.currentIndex]}"`);
    // Comparer la lettre entrée avec celle du mot, en tenant compte de la casse
        if (letter === this.word[this.currentIndex]) {
          this.guessedIndexes.push(this.currentIndex);
          this.currentIndex++;
          this.letterGuessedSubject.next(true);
          const isComplete = this.isWordComplete();
          console.log(`Is word complete? ${isComplete}`);
          this.wordCompleteSubject.next(isComplete);
          return true;
        }
        this.incorrectIndexes.add(this.guessedIndexes.length);
        setTimeout(() => {
          this.incorrectIndexes.delete(this.currentIndex); // <= supprime après 500ms
        }, 500);
        this.letterGuessedSubject.next(false);
       this.incorrectLetterSubject.next(this.guessedIndexes.length);

        this._badLetter = true; // A REPRENDRE POUR LES STATS
        return false;
      }

      updateDisplayWordWithCoin(coin: Coin): void {
        console.log(`Coin collected: ${this.display}`);
        const displayWordArray = this.display.split(' ');
        for (let i = 0; i < this.word.length; i++) {
          if (coin.letter === this.word[i] && displayWordArray[i] === '_') {
            this.guessedIndexes.push(i);
            displayWordArray[i] = coin.letter;
            break;
          }
        }
        this.display = displayWordArray.join(' ');
        if (this.isWordComplete()) {
          console.log('Mot trouvé avec le coin !');
          this.wordCompleteSubject.next(true);
        }
      }
    
      isWordComplete(): boolean {
        if (this.guessedIndexes.length === this.word.length){
          return true;
        }
        else return false;
      }

      resetWord(): void {
        this.incorrectIndexes.clear(); // Réinitialise les index incorrects
        this.wordCompleteSubject.next(false); // Réinitialise l'état de mot complet
      }
      onWordCompleted(): void {
        if (this.isWordComplete()) {
          console.log('Mot trouvé !');
          this.LevelService.increaseProgress(this.word.length); // Augmente le niveau de progression lorsque le mot est trouvé
      }
    }
    
    
      getCurrentDisplay(): string {
        let display = '';
        for (let i = 0; i < this.word.length; i++) {
          if (this.guessedIndexes.includes(i)) {
            display += this.word[i] + ' '; // lettre trouvée
          } else {
            display += '_ '; // lettre non trouvée
          }
        }
        return display.trim();
      }      





  }