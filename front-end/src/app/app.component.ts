import { Component } from '@angular/core';
import { FreezeGameService } from 'src/services/freeze-game.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string = '';
  public showSuccess = false;

  isPaused = false;

  constructor(private freezeGame: FreezeGameService) {
    this.freezeGame.isPaused$.subscribe(paused => {
      this.isPaused = paused;
    });
  }

  showHideSuccess() {
    this.showSuccess = !this.showSuccess;
  }
}
