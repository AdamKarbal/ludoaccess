import { Component,OnInit,HostListener } from "@angular/core";

@Component({
  selector: "app-jeu_etape1",
    templateUrl: "./jeu_etape1.component.html",
    styleUrls: ["./jeu_etape1.component.scss"],
})
export class JeuEtape1Component {
  constructor() {}
  ngOnInit(): void {}
  
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

    
    onWordCompleted(isCompleted : boolean){
      if(isCompleted){
        this.wordCompleted=true;
      }
      else this.wordCompleted=false;
    }

    onLetterGuessed(isLetterGuessed: boolean){
      this.letterGuessed = isLetterGuessed;
    }
}

