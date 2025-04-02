import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-word2guess",
    templateUrl: "./word2guess.component.html",
    styleUrls: ["./word2guess.component.scss"],
})
export class Word2GuessComponent {
  constructor() {}
  ngOnInit(): void {}
  word: string = "ARBRE"; // Mot à deviner
  hiddenWord: string = "_ _ _ _ _"; // Affichage caché
  guessedIndexes: number[] = []; // Indices des lettres trouvées
  currentIndex: number = 0; // L'index où on doit deviner la lettre

  checkLetter(event: any) {
    const letter = event.target.value.toUpperCase();
    event.target.value = ''; // Efface l'entrée après chaque saisie

    // Vérifie si la lettre est correcte ET au bon endroit
    if (letter && this.word[this.currentIndex] === letter) {
      this.guessedIndexes.push(this.currentIndex); // Ajoute l'index trouvé
      this.currentIndex++; // Passe à la lettre suivante
    }
  }
}