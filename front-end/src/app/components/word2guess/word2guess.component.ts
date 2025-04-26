import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from "@angular/core";
import { Word2GuessService } from "src/services/word2guess.services";
import { SettingsService } from 'src/services/setting.service'; 
import { Subscription } from "rxjs";

@Component({
  selector: "app-word2guess",
  templateUrl: "./word2guess.component.html",
  styleUrls: ["./word2guess.component.scss"],
})
export class Word2GuessComponent implements OnInit, OnDestroy, OnChanges {
  @Input() userInput: string = '';
  @Output() wordGuessed = new EventEmitter<boolean>();
  @Output() letterGuessed = new EventEmitter<boolean>();

  hasStarted: boolean = false;
  incorrectLetters: Set<number> = new Set();

  currentFont: string = 'initial';
  private settingsSub!: Subscription;

  constructor(
    public word2GuessService: Word2GuessService,
    private settingsService: SettingsService 
  ) {}

  ngOnInit(): void {
    this.settingsSub = this.settingsService.settings$.subscribe(settings => {
      if (settings) {
        this.currentFont = settings.choosefont;
        console.log('Font mise à jour :', this.currentFont);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
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
    return this.word2GuessService.getWord();
  }

  get guessedIndexes(): number[] {
    return this.word2GuessService.getGuessedIndexes();
  }

  ngOnDestroy(): void {
    if (this.settingsSub) {
      this.settingsSub.unsubscribe(); 
    }
  }
}
