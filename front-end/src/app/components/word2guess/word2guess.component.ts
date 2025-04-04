import { Component, OnInit,Input,Output,EventEmitter,OnChanges,SimpleChanges} from "@angular/core";

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
  hasStarted : boolean = false ;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('CHANGEMENT userInput:', changes['userInput']);

    if (!this.userInput || this.userInput.length === 0) {
      return; // On ne fait rien si vide
    }

    const isCorrect = this.checkLetter(this.userInput);

    // On commence à émettre seulement si l'utilisateur a VRAIMENT tapé une lettre
    if (!this.hasStarted) {
      this.hasStarted = true;
    }

    if (this.hasStarted) {
      console.log(">>> EMIT letterGuessed =", isCorrect);
      this.letterGuessed.emit(isCorrect); // Ne sera jamais émis avant une vraie lettre
    }

    if (this.checkWord()) {
      this.wordGuessed.emit(true);
    }
}


  checkLetter(letter: string): boolean {
    letter = letter.toUpperCase();
    if (!letter.match(/[A-Z]/)) {
      return false; // ignore tout ce qui n'est pas une lettre
    }
    // Vérifie si la lettre est correcte ET au bon endroit
    if (letter && this.word[this.currentIndex] === letter) {
      this.guessedIndexes.push(this.currentIndex); // Ajoute l'index trouvé
      this.currentIndex++; // Passe à la lettre suivante
      this.updateHiddenWord();
      return true;
    }
    return false;

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