import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from "@angular/core";
import { Word2GuessService } from "src/services/word2guess.services";
import { SettingsService } from 'src/services/setting.service';
import { Subscription } from "rxjs";
import { Coin } from "src/models/coin.model";
import { CoinCollectionService } from "src/services/coincollection.service";
import {GameService} from "../../../services/game.service";



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
  @Input() showW2g: boolean = true;
  showCount:boolean = true;

  public currentFont: string = 'Arial';
  public currentSize: number = 16;

  wordIndex: number = 1;
  totalWords: number = 15;


  private settingsSub?: Subscription;
  private coinSub?: Subscription;
  private wordCompletedSub?: Subscription;
  private incorrectLetterSub?: Subscription;

  constructor(
    public word2GuessService: Word2GuessService,
    private settingsService: SettingsService,
    private coinCollectionService: CoinCollectionService ,
    private gameService: GameService,
  ) {}

  ngOnInit(): void {
    this.settingsSub = this.settingsService.settings$.subscribe(settings => {
      this.currentFont=settings?.choosefont || 'Arial';
      this.currentSize=this.settingsService?.getLetterSizePx() || 20;
    });

    if (this.mode === 'coin') {
      this.coinSub = this.coinCollectionService.collectedCoin$.subscribe(coin => {
        console.log('hello from coin');
        this.word2GuessService.updateDisplayWordWithCoin(coin);
      });
    }

    this.wordCompletedSub = this.word2GuessService.isWordComplete$.subscribe(completed => {
      if (completed) {
        this.wordGuessed.emit(true);
      }
    });

    this.incorrectLetterSub = this.word2GuessService.incorrectLetter$.subscribe(index => {
      if (index !== null) {
        console.log('Incorrect letter at index', index);
      }
    });
    this.gameService.currentWordIndex$.subscribe(index => {
      this.wordIndex = index;
    });
    this.gameService.isStep1Completed$.subscribe(isStep1Completed => {
      this.showCount=!isStep1Completed;
    })
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (this.mode !== 'typing' || !this.userInput) return;
    this.word2GuessService.guessLetter(this.userInput);
  }

  get word(): string {
    return this.word2GuessService.getWord();
  }

  get guessedIndexes(): number[] {
    return this.word2GuessService.getGuessedIndexes();
  }

  get display(): string {
    return this.word2GuessService.getDisplay();
  }

  ngOnDestroy(): void {
    this.settingsSub?.unsubscribe();
    this.coinSub?.unsubscribe();
    this.wordCompletedSub?.unsubscribe();
    this.incorrectLetterSub?.unsubscribe();
  }
}
