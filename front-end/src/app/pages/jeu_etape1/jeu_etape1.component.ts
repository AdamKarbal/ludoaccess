import { Component,OnInit,HostListener } from "@angular/core";
import { KeyboardInputService } from "src/services/keyboard-input-w2g.service";

@Component({
  selector: "app-jeu_etape1",
    templateUrl: "./jeu_etape1.component.html",
    styleUrls: ["./jeu_etape1.component.scss"],
})
export class JeuEtape1Component implements OnInit{
  private audio: HTMLAudioElement | null = null;

  constructor(private keyboardInputService: KeyboardInputService) {}
  
    userInput: string = ''; // Entrée de l'utilisateur
    
    ngOnInit(): void {
      this.audio = new Audio('assets/sons/Step2Audio.mp3');
      this.audio.loop = true;
      this.audio.play();
      this.keyboardInputService.userInput$.subscribe(input => {
        this.userInput = input;
      });
    }

    ngOnDestroy(): void {
      if (this.audio) {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.audio = null;
      }
    }
  
}

