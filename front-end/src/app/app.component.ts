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
  isExited = false;
  isInfo = false;

  isGameFinished = false;
  


  constructor(private freezeGame: FreezeGameService) {
  
    this.freezeGame.isPaused$.subscribe(paused => {
      this.isPaused = paused;
    });
    this.freezeGame.isCrossed$.subscribe(exited => {
      this.isExited = exited;
    });
    this.freezeGame.isInfo$.subscribe(info => {
      this.isInfo = info;
    });

  }

  showHideSuccess() {
    this.showSuccess = !this.showSuccess;
  }
}
