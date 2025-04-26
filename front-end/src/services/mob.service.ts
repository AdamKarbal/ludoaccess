import { Injectable } from '@angular/core';
import { BehaviorSubject, interval,combineLatest } from 'rxjs';
import { FreezeGameService } from './freeze-game.services';

@Injectable({
  providedIn: 'root',
})

export class MobService {
  private position = { x: 100, y: window.innerHeight - 130, frame: 0, isFacingRight: true };
  private speedX = 2;
  private totalFrames = 9;
  private frameSpeed = 10;
  private frameCounter = 0;
  private mobPosition = new BehaviorSubject(this.position);
  position$ = this.mobPosition.asObservable();

  constructor(private freezeGameService: FreezeGameService) {
    this.startMoving();
  }

  private startMoving() {
    
    const ticker$ = interval(16); // boucle de jeu (~60fps)
    
    // Combine le ticker avec l'état de pause
    combineLatest([ticker$, this.freezeGameService.isPaused$,this.freezeGameService.isCrossed$]).subscribe(([_, isPaused, isCrossed]) => {
      if (isPaused||isCrossed) return;

      this.position.x += this.speedX;
      if (this.position.x + 150 > window.innerWidth || this.position.x < 0) {
        this.speedX *= -1;
        this.position.isFacingRight = !this.position.isFacingRight;
      }
      this.frameCounter++;
      if (this.frameCounter >= this.frameSpeed) {
        this.frameCounter = 0;
        this.position.frame = (this.position.frame + 1) % this.totalFrames;
      }

      this.mobPosition.next({ ...this.position });
    });
  }
}
