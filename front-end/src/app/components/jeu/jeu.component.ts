import { Component } from '@angular/core';
import { MiniGameService } from '../../../services/minigame.service';
import { CoeurService } from '../../../services/coeurs.services';

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
  constructor(private miniGameService: MiniGameService, private coeurService : CoeurService) {}
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
  }
}
