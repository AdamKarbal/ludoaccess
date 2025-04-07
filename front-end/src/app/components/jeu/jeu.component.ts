import { Component } from '@angular/core';
import { MiniGameService } from '../../../services/minigame.service';

@Component({
  selector: 'app-jeu',
  templateUrl: './jeu.component.html',
  styleUrls: ['./jeu.component.scss'],
})
export class JeuComponent {
  isActive$ = this.miniGameService.isActive$;
  targetLetter$ = this.miniGameService.targetLetter$;
  currentText$ = this.miniGameService.currentText$;
  isAnimatingError$ = this.miniGameService.isAnimatingError$;
  isAnimatingSuccess$ = this.miniGameService.isAnimatingSuccess$;
  constructor(private miniGameService: MiniGameService) {}
  startMiniGame() {
    this.miniGameService.start();
  }
}
