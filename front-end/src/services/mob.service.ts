import { Injectable } from '@angular/core';
import { BehaviorSubject, interval,combineLatest } from 'rxjs';
import { FreezeGameService } from './freeze-game.services';
import { Collidable } from '../models/collidable.model';
import { PlayerService } from './player.service';
import { MiniGameService } from './minigame.service';


@Injectable({
  providedIn: 'root',
})

export class MobService implements Collidable {
  private position = { x: window.innerWidth-150, y: window.innerHeight - 150, frame: 0, isFacingRight: true };
  private speedX = 2;
  private totalFrames = 9;
  private frameSpeed = 10;
  private frameCounter = 0;
  private mobPosition = new BehaviorSubject(this.position);
  position$ = this.mobPosition.asObservable();

  constructor(private freezeGameService: FreezeGameService,  private playerService: PlayerService, private miniGameService: MiniGameService) {
    this.startMoving();
  }
  action!: (cible: Collidable) => void;

  checkCollision(other: Collidable): boolean {
    return (
      this.position.x < other.x + other.width &&
      this.position.x + this.width > other.x &&
      this.position.y < other.y + other.height &&
      this.position.y + this.height > other.y
    );
  }
  get x(): number {
    return this.position.x;
  }
  get y(): number {
    return this.position.y;
  }
  get width(): number {
    return this.width; 
  }
  get height(): number {
    return this.height;
  }
  

  private startMoving() {
    const ticker$ = interval(16); // boucle de jeu (~60fps)
  
    combineLatest([
      ticker$,
      this.freezeGameService.isPaused$,
      this.freezeGameService.isCrossed$,
      this.freezeGameService.isInfo$,
      this.miniGameService.isActive$ 
    ]).subscribe(([_, isPaused, isCrossed, isInfo, isMiniGameActive]) => {
      if (isPaused || isCrossed || isInfo || isMiniGameActive) return; 
  
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
      const player = this.playerService.getPlayer();
      if (player && this.checkCollision(player)) {
        console.log('Collision entre mob et joueur');
        this.miniGameService.start();
      }
      this.mobPosition.next({ ...this.position });
    });
  }
  
}
