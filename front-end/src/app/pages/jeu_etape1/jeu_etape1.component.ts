import { Component, OnInit, OnDestroy } from "@angular/core";
import { KeyboardInputService } from "src/services/keyboard-input-w2g.service";
import { AudioService } from "src/services/audio.service";

@Component({
  selector: "app-jeu_etape1",
  templateUrl: "./jeu_etape1.component.html",
  styleUrls: ["./jeu_etape1.component.scss"],
})
export class JeuEtape1Component implements OnInit, OnDestroy {
  private audio: HTMLAudioElement | null = null;

  constructor(
    private keyboardInputService: KeyboardInputService,
    private audioService: AudioService 
  ) {}

  userInput: string = ""; 

  ngOnInit(): void {
    this.audio = new Audio("assets/sons/Step2Audio.mp3");
    this.audio.loop = true;
    this.audio.volume = 0.5; 
    this.audio.play();
    this.audioService.setAudio(this.audio); 
    this.keyboardInputService.userInput$.subscribe((input) => {
      this.userInput = input;
    });
  }

  ngOnDestroy(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = null;
      this.audioService.setAudio(null as any); 
    }
  }
}

