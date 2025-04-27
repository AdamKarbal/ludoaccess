import { Injectable } from '@angular/core';
import { GameService } from './game.service';
import { FreezeGameService } from './freeze-game.services';
import { CoinCollectionService } from './coincollection.service';
import { Coin } from 'src/models/coin.model';
import { LevelService } from "./levels.service";
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

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
      this.freezeGameService.isPaused$.subscribe(paused => {
        this.isPaused = paused;
      });
      this.freezeGameService.isCrossed$.subscribe(exited => {
        this.isCrossed = exited;
      });
      this.freezeGameService.isInfo$.subscribe(info => {
        this.isI = info;
      });
    }
      get badLetter() : boolean{
        return this._badLetter;
      }

      initializeWord(word: string) {
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
        const displayWordArray = this.display.split(' ');
        for (let i = 0; i < this.word.length; i++) {
          if (coin.letter === this.word[i] && displayWordArray[i] === '_') {
            displayWordArray[i] = coin.letter;
            break;
          }
        }
        this.display = displayWordArray.join(' ');
        if (this.guessedIndexes.length === this.word.length) {
          this.wordCompleteSubject.next(true);
        }
      }
    
      isWordComplete(): boolean {
        return this.guessedIndexes.length === this.word.length;
      }
      
      onWordCompleted(): void {
        if (this.isWordComplete()) {
          console.log('Mot trouvé !');
          this.LevelService.increaseProgress(this.word.length); // Augmente le niveau de progression lorsque le mot est trouvé
          this.wordCompleteSubject.next(true); // Émet l'événement de mot complet
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