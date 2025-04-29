import { Component,OnInit,HostListener } from "@angular/core";
import { KeyboardInputService } from "src/services/keyboard-input-w2g.service";

@Component({
  selector: "app-jeu_etape3",
    templateUrl: "./jeu_etape3.component.html",
    styleUrls: ["./jeu_etape3.component.scss"],
})
export class JeuEtape3Component implements OnInit{
  userInput: string = '';
  private audio: HTMLAudioElement | null = null;

  constructor(private keyboardInputService: KeyboardInputService) {}

  ngOnInit(): void {
    this.audio = new Audio('assets/sons/Step3Audio.mp3');
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