import { Component, OnInit, OnDestroy } from "@angular/core";
import { Word2GuessService } from "src/services/word2guess.services";
import { CoinCollectionService } from "src/services/coincollection.service"; // <<< importé ici
import { Coin } from "src/models/coin.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-w2gS2",
  templateUrl: "./w2gS2.component.html",
  styleUrls: ["./w2gS2.component.scss"],
})
export class W2gS2Component implements OnInit, OnDestroy { 
  currentFont: string = 'fantasy';
  private _word: string = this.word2GuessService.getWord();
  private _displayWord: string = this.word2GuessService.getDisplay();
  private subscription: Subscription = new Subscription();

  constructor(
    public word2GuessService: Word2GuessService,
    private coinCollectionService: CoinCollectionService 
  ) {}

  ngOnInit(): void {
    this.subscription = this.coinCollectionService.collectedCoin$.subscribe((coin: Coin) => {
      this.updateDisplayWord(coin);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); 
  }

  updateDisplayWord(coin: Coin): void {
    const displayWordArray = this._displayWord.split(' ');
    for (let i = 0; i < this._word.length; i++) {
      if (coin.letter === this._word[i] && displayWordArray[i] === '_') {
        displayWordArray[i] = coin.letter;
        break;
      }
    }
    this._displayWord = displayWordArray.join(' ');
  }
  
  

  get word(): string {
    return this._word;
  }

  get display(): string {
    return this._displayWord;
  }
}
