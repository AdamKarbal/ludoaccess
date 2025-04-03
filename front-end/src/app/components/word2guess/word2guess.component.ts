import { Component, OnInit,Input,Output,EventEmitter} from "@angular/core";

@Component({
  selector: "app-word2guess",
    templateUrl: "./word2guess.component.html",
    styleUrls: ["./word2guess.component.scss"],
})
export class Word2GuessComponent implements OnInit{
  constructor() {}
  ngOnInit(): void {}
  @Input() userInput: string = '';
  @Output() wordGuessed = new EventEmitter<boolean>();
  @Output() letterGuessed= new EventEmitter<boolean>();

  word: string = "ARBRE"; // Mot à deviner
  hiddenWord: string = "_ _ _ _ _"; // Affichage caché
  guessedIndexes: number[] = []; // Indices des lettres trouvées
  currentIndex: number = 0; // L'index où on doit deviner la lettre

  ngOnChanges(): void {
    if (!this.userInput) return;
    let isCorrect=false
    if (this.userInput) {
      isCorrect = this.checkLetter(this.userInput);
    } 
    if (!isCorrect) { 
      // Si la lettre est fausse, on envoie "false"
      this.letterGuessed.emit(false);
    }
    else{
      this.letterGuessed.emit(true);
  }
      if (this.checkWord()) {
        this.wordGuessed.emit(true);
      
  }
}


  checkLetter(letter: string): boolean {
    letter = letter.toUpperCase();

    // Vérifie si la lettre est correcte ET au bon endroit
    if (letter && this.word[this.currentIndex] === letter) {
      this.guessedIndexes.push(this.currentIndex); // Ajoute l'index trouvé
      this.currentIndex++; // Passe à la lettre suivante
      this.updateHiddenWord();
      return true;
    }
    if(letter && this.word[this.currentIndex] !== letter){
      return false;
    }
    return true;

  }
  updateHiddenWord() {
    this.hiddenWord = this.word
      .split('')
      .map((letter, index) =>
        this.guessedIndexes.includes(index) ? '\u2000' : '_'
      )
      .join(' ');
  }
  checkWord():boolean{
    return this.guessedIndexes.length === this.word.length;
    
  }
}