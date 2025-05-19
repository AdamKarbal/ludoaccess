import { Component } from '@angular/core';
import { MiniGameService } from '../../../services/minigame.service';
import { CoeurService } from '../../../services/coeurs.services';
import { GameService } from '../../../services/game.service';
import { MobService } from 'src/services/mob.service';

@Component({
  selector: 'app-jeu',
  templateUrl: './jeu.component.html',
  styleUrls: ['./jeu.component.scss'],
})
export class JeuComponent {
  isGameOver = false;
  isActive$ = this.miniGameService.isActive$;
  targetLetter$ = this.miniGameService.targetLetter$;
  currentText$ = this.miniGameService.currentText$;
  isAnimatingError$ = this.miniGameService.isAnimatingError$;
  isAnimatingSuccess$ = this.miniGameService.isAnimatingSuccess$;
  isGameVisible = true;
  private audio: HTMLAudioElement | null = null;
  isAlive$ = this.mobService.isAlive.asObservable();

  constructor(
    private miniGameService: MiniGameService,
    private coeurService: CoeurService,
    private gameService: GameService,
    private mobService: MobService
  ) {}

  startMiniGame() {
    this.miniGameService.start();
  }

  ngOnInit() {
    this.coeurService.isGameOver$.subscribe(isGameOver => {
      this.isGameOver = isGameOver;
    });
    this.audio = new Audio('assets/sons/Step2Audio.mp3');
    this.audio.loop = true;
    this.audio.play();
  }

  onReplay() {
    this.coeurService.resetLives();
    this.isGameOver = false;
    this.resetGameUI();
  }

  resetGameUI() {
        this.isGameVisible = false;
    setTimeout(() => {
      this.isGameVisible = true;
    });
  }

isStep2Active = true;

resetStep2() {
  this.isStep2Active = false;
  setTimeout(() => {
    this.isStep2Active = true;
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