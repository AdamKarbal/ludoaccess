import { Component, OnInit,Input,Output,EventEmitter,OnChanges,SimpleChanges} from "@angular/core";
import { Word2GuessService } from "src/services/word2guess.services";

@Component({
  selector: "app-word2guess",
    templateUrl: "./word2guess.component.html",
    styleUrls: ["./word2guess.component.scss"],
})
export class Word2GuessComponent implements OnInit{
  ngOnInit(): void {}
  @Input() userInput: string = '';
  @Output() wordGuessed = new EventEmitter<boolean>();
  @Output() letterGuessed = new EventEmitter<boolean>();

  hasStarted: boolean = false;

  incorrectLetters: Set<number> = new Set(); // To track incorrect letters for the temporary red effect

  constructor(public game: Word2GuessService) {} // rend le service accessible au template

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.userInput) return;

    const isCorrect = this.game.guessLetter(this.userInput);

    if (!this.hasStarted) {
      this.hasStarted = true;
    }
    if(isCorrect){
      this.letterGuessed.emit(true); 
    }
    else{
      this.letterGuessed.emit(false); // Emit false when the letter is incorrect
      const incorrectIndex = this.game.currentIndex;
      this.incorrectLetters.add(incorrectIndex); // Track the index of the incorrect letter
      // Remove the incorrect letter color after a brief moment
      setTimeout(() => {
        this.incorrectLetters.delete(incorrectIndex); // Reset the incorrect letter state
      }, 500); // Temporary red color for 500ms
    }

    

    if (this.game.isWordComplete()) {
      this.wordGuessed.emit(true);
    }
  }

  get word(): string {
    return this.game.getWord();
  }

  get guessedIndexes(): number[] {
    return this.game.getGuessedIndexes();
  }
}