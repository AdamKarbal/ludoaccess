import { Component,OnInit,HostListener } from "@angular/core";
import { KeyboardInputService } from "src/services/keyboard-input-w2g.service";

@Component({
  selector: "app-jeu_etape1",
    templateUrl: "./jeu_etape1.component.html",
    styleUrls: ["./jeu_etape1.component.scss"],
})
export class JeuEtape1Component implements OnInit{
  constructor(private keyboardInputService: KeyboardInputService) {}
  
    userInput: string = ''; // Entrée de l'utilisateur
    
    ngOnInit(): void {
      this.keyboardInputService.userInput$.subscribe(input => {
        this.userInput = input;
      });
    }
  
}

