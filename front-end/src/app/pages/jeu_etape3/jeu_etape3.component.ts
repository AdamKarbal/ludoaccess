import { Component,OnInit,HostListener } from "@angular/core";

@Component({
  selector: "app-jeu_etape3",
    templateUrl: "./jeu_etape3.component.html",
    styleUrls: ["./jeu_etape3.component.scss"],
})
export class JeuEtape3Component implements OnInit{
  constructor() {}
  ngOnInit(): void {}
  currentLevelStep: number = 1; // Étape du Niveau 3
  userInput: string = ''; // Entrée de l'utilisateur
  wordCompleted: boolean = false;
  letterGuessed?: boolean = undefined;

  // Utilisation de HostListener pour capter la touche du clavier
  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const key = event.key;

    // Vérifie si la touche est une lettre et si elle est valide
    if (key.length === 1 && /^\p{L}$/u.test(key)) {
      this.userInput = key;  // Met à jour l'entrée de l'utilisateur
      setTimeout(() => {
        this.userInput = '';
      }, 10);
    }
  }
}