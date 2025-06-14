import { Injectable, OnDestroy } from '@angular/core';
import { GameService } from './game.service';
import { FreezeGameService } from './freeze-game.services';
import { CoinCollectionService } from './coincollection.service';
import { Coin } from 'src/models/coin.model';
import { LevelService } from "./levels.service";
import {BehaviorSubject, Subject, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Word2GuessService implements OnDestroy {
  private word: string = "";
  private display: string = "";
  private guessedIndexes: number[] = [];
  public currentIndex = 0;
  public isPaused: boolean = false;
  public isCrossed: boolean = false;
  public isI: boolean = false;
  private _badLetter: boolean = false;
  nbBadLetters : number = 0;

  private incorrectIndexes: Set<number> = new Set<number>();

  private badLetterSubject = new Subject<void>();
  public badLetter$ = this.badLetterSubject.asObservable();

  private wordCompleteSubject = new BehaviorSubject<boolean>(false);
  public isWordComplete$ = this.wordCompleteSubject.asObservable();

  private letterGuessedSubject = new BehaviorSubject<boolean | null>(null);
  public letterGuessed$ = this.letterGuessedSubject.asObservable();

  private incorrectLetterSubject = new BehaviorSubject<number | null>(null);
  public incorrectLetter$ = this.incorrectLetterSubject.asObservable();

  private subscriptions: Subscription = new Subscription();

  constructor(
    private freezeGameService: FreezeGameService,
    private LevelService: LevelService
  ) {
    this.subscriptions.add(
      this.freezeGameService.isPaused$.subscribe(isPaused => {
        this.isPaused = isPaused;
        console.log(`isPaused updated: ${this.isPaused}`);
      })
    );

    this.subscriptions.add(
      this.freezeGameService.isCrossed$.subscribe(isCrossed => {
        this.isCrossed = isCrossed;
        console.log(`isCrossed updated: ${this.isCrossed}`);
      })
    );

    this.subscriptions.add(
      this.freezeGameService.isInfo$.subscribe(isInfo => {
        this.isI = isInfo;
        console.log(`isInfo updated: ${this.isI}`);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  get badLetter(): boolean {
    return this._badLetter;
  }

  initializeWord(word: string) {
    if (this.word === word) {
      console.warn('Le mot est déjà initialisé:', word);
      return;
    }
    this._badLetter = false;
    this.word = word;
    console.log("Nom du initialize : " + this.word);
    this.display = Array(this.word.length).fill('_').join(' ');
    this.guessedIndexes = [];
    this.currentIndex = 0;
  }

  getWord(): string {
    return this.word;
  }

  getDisplay(): string {
    return this.display;
  }

  getIncorrectIndexes(): Set<number> {
    return this.incorrectIndexes;
  }

  getNbMissedLetters(): number {
    return this.nbBadLetters;
  }

  getGuessedIndexes(): number[] {
    return this.guessedIndexes;
  }

  resetNbBadLetters(): void {
    this.nbBadLetters = 0;
  }

  guessLetter(letter: string): boolean {
    if (this.isPaused || this.isCrossed || this.isI) { //Jeu mis en pause
      console.log('Le jeu est en pause, impossible de deviner une lettre.');
      return false;
    }

    if (!letter.match(/^\p{L}$/u)) { //Lettre non unicode => Caractère spécial non reconnu
      this._badLetter = true;
      this.letterGuessedSubject.next(false);
      console.log("Wrong letter !");
      return false;
    }

    console.log(`Comparing "${letter}" with "${this.word[this.currentIndex]}"`); //Lettre reconnue
    if (letter === this.word[this.currentIndex]) {
      this.guessedIndexes.push(this.currentIndex);
      this.currentIndex++;
      this.letterGuessedSubject.next(true);
      const isComplete = this.isWordComplete();
      console.log(`Is word complete? ${isComplete}`);
      this.wordCompleteSubject.next(isComplete);
      return true;
    }

    console.log("Lettre incorrecte !"); //Lettre reconnu mais pas la bonne lettre à entrer
    const audio = new Audio('assets/sons/wrongLetter.mp3');
    audio.play();

    this.incorrectIndexes.add(this.guessedIndexes.length);

    setTimeout(() => {
      this.incorrectIndexes.delete(this.currentIndex);
    }, 200);
    this.letterGuessedSubject.next(false);
    this.incorrectLetterSubject.next(this.guessedIndexes.length);
    this._badLetter = true;
    this.badLetterSubject.next();
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
    return this.guessedIndexes.length === this.word.length;
  }

  resetWord(): void {
    this.word = "";
    this.display = "";
    this.guessedIndexes = [];
    this.currentIndex = 0;
    this.incorrectIndexes.clear();
    this.wordCompleteSubject.next(false);
    this.letterGuessedSubject.next(null);     // ← efface la valeur mémorisée
    this.incorrectLetterSubject.next(null);   // (optionnel mais logique)
    console.log('🔄 Mot complètement réinitialisé');
  }

  onWordCompleted(): void {
    if (this.isWordComplete()) {
      console.warn('Mot trouvé !');
      this.LevelService.increaseProgress(3*this.word.length);
    }
  }

  getCurrentDisplay(): string {
    let display = '';
    for (let i = 0; i < this.word.length; i++) {
      if (this.guessedIndexes.includes(i)) {
        display += this.word[i] + ' ';
      } else {
        display += '_ ';
      }
    }
    return display.trim();
  }
}
