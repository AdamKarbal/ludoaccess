import { Component } from '@angular/core';
import { MiniGameService } from '../../../services/minigame.service';
import { CoeurService } from '../../../services/coeurs.services';
import { GameService } from '../../../services/game.service';

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

  constructor(
    private miniGameService: MiniGameService,
    private coeurService: CoeurService,
    private gameService: GameService
  ) {}

  startMiniGame() {
    this.miniGameService.start();
  }

  ngOnInit() {
    this.coeurService.isGameOver$.subscribe(isGameOver => {
      this.isGameOver = isGameOver;
    });
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
}