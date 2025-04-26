import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from "@angular/core";
import { Word2GuessService } from "src/services/word2guess.services";
import { SettingsService } from 'src/services/setting.service'; 
import { Subscription } from "rxjs";
import { Coin } from "src/models/coin.model";
import { CoinCollectionService } from "src/services/coincollection.service"; // <<< importé ici

@Component({
  selector: "app-word2guess",
  templateUrl: "./word2guess.component.html",
  styleUrls: ["./word2guess.component.scss"],
})
export class Word2GuessComponent implements OnInit, OnDestroy, OnChanges {
  @Input() mode: 'coin' | 'typing' = 'coin';
  @Input() userInput: string = '';
  @Output() wordGuessed = new EventEmitter<boolean>();
  @Output() letterGuessed = new EventEmitter<boolean>();

  hasStarted: boolean = false;
  incorrectLetters: Set<number> = new Set();

  currentFont: string = 'fantasy';
  private settingsSub!: Subscription;
  private coinSub?: Subscription;

  private _word: string = '';
  private _displayWord: string = '';


  constructor(
    public word2GuessService: Word2GuessService,
    private settingsService: SettingsService,
    private coinCollectionService: CoinCollectionService // <<< importé ici
  ) {}

  ngOnInit(): void {
    this._word = this.word2GuessService.getWord();
    this._displayWord = this.word2GuessService.getDisplay();
    console.log("word" +this._word);
    console.log("display_word "+this._displayWord);
    console.log("mode "+this.mode);

    if (this.mode === 'typing') {
      this.settingsSub = this.settingsService.settings$.subscribe(settings => {
        if (settings) {
          this.currentFont = settings.choosefont;
        }
      });
    } else if (this.mode === 'coin') {


      this.coinSub = this.coinCollectionService.collectedCoin$.subscribe(coin => {
        this.updateDisplayWordWithCoin(coin);
      });
    }
  }

  updateDisplayWordWithCoin(coin: Coin): void {
    const displayWordArray = this._displayWord.split(' ');
    for (let i = 0; i < this._word.length; i++) {
      if (coin.letter === this._word[i] && displayWordArray[i] === '_') {
        displayWordArray[i] = coin.letter;
        break;
      }
    }
    this._displayWord = displayWordArray.join(' ');
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mode']) {
      console.log('Mode changed to:', this.mode);
      // Tu peux mettre ici des comportements différents selon le mode
    }
    if (this.mode !== 'typing') return;
    if (this.word2GuessService.isPaused||this.word2GuessService.isCrossed||this.word2GuessService.isI) {
      return; // Sortir de la méthode, aucun changement n'est traité
    }
    
    if (!this.userInput) return;

    const isCorrect = this.word2GuessService.guessLetter(this.userInput);

    if (!this.hasStarted) {
      this.hasStarted = true;
    }

    if (isCorrect) {
      this.letterGuessed.emit(true);
    } else {
      this.letterGuessed.emit(false);
      const incorrectIndex = this.word2GuessService.currentIndex;
      this.incorrectLetters.add(incorrectIndex);
      setTimeout(() => {
        this.incorrectLetters.delete(incorrectIndex);
      }, 500);
    }

    if (this.word2GuessService.isWordComplete()) {
      this.wordGuessed.emit(true);
    }
  }

  get word(): string {
    return this._word;
  }

  get guessedIndexes(): number[] {
    return this.word2GuessService.getGuessedIndexes();
  }

  get display(): string {
    return this._displayWord;
  }

  ngOnDestroy(): void {
      this.settingsSub?.unsubscribe();
      this.coinSub?.unsubscribe();
  }
}
