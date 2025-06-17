import { Component,OnInit,HostListener } from "@angular/core";
import { KeyboardInputService } from "src/services/keyboard-input-w2g.service";
import { SettingsService } from "src/services/setting.service";
import { ChildSettings } from "src/models/setting.model";
import {GameService} from "../../../services/game.service";

@Component({
  selector: "app-jeu_etape3",
    templateUrl: "./jeu_etape3.component.html",
    styleUrls: ["./jeu_etape3.component.scss"],
})
export class JeuEtape3Component implements OnInit{
  userInput: string = '';
  private audio: HTMLAudioElement | null = null;
  showTimer: boolean = false;
  public settings: ChildSettings | null = null;
  showW2g: boolean = true;
  isGameFinished : boolean = false;
  isGameOver: boolean = false;

  constructor(private keyboardInputService: KeyboardInputService, private settingsService: SettingsService,
              private gameService: GameService) {
  }

  ngOnInit(): void {
    this.audio = new Audio('assets/sons/Step3Audio.mp3');
    this.audio.loop = true;

    this.gameService.gameOverObs$.subscribe((isOver) => {
      this.isGameOver=isOver;
    });

    this.gameService.isGameFinished$.subscribe(isFinished => {
      this.isGameFinished = isFinished;

      if(!isFinished) {
        this.audio?.play().catch(err => {
          console.warn('Erreur lors de la lecture audio :', err);
        });
      }
      else {
        this.audio?.pause();
      }

    });


    this.settingsService.settings$.subscribe((settings) => {
      this.settings = settings;
      this.showTimer = !!this.settings?.showTimer;
      this.showW2g= (!this.settings?.clearWordAfterRecovery);
      console.log('showTimer:', this.showTimer);
    });

    this.keyboardInputService.userInput$.subscribe((input) => {
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

