import { Component } from '@angular/core';
import { FreezeGameService } from 'src/services/freeze-game.services';
import { FinalMessageService } from 'src/services/final-message.service';

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

  isContinue = false;
  isStop = false;

  constructor(private freezeGame: FreezeGameService,private finalMessageService: FinalMessageService) {
    this.finalMessageService.wantToContinue$.subscribe(continueGame => {
      this.isContinue = continueGame;
    });
    this.finalMessageService.wantToExit$.subscribe(stopGame => {
      this.isStop = stopGame;
    });
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
