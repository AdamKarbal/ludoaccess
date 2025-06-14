import { Injectable } from '@angular/core';
import { BehaviorSubject, interval,combineLatest } from 'rxjs';
import { FreezeGameService } from './freeze-game.services';
import { Collidable } from '../models/collidable.model';
import { PlayerService } from './player.service';
import { MiniGameService } from './minigame.service';
import { GameService } from './game.service';


@Injectable({
  providedIn: 'root',
})

export class MobService implements Collidable {
  private position = { x: window.innerWidth-200, y: window.innerHeight - 120, frame: 0, isFacingRight: true };
  private speedX = 2;
  private initialPosition = {...this.position};
  private totalFrames = 9;
  private frameSpeed = 10;
  private frameCounter = 0;
  private _width = 70; 
  private _height = 70
  private mobPosition = new BehaviorSubject(this.position);
  position$ = this.mobPosition.asObservable();
  isAlive = new BehaviorSubject<boolean>(true);
  private hasTriggeredMiniGame = false;

  constructor(private freezeGameService: FreezeGameService,  private playerService: PlayerService, private miniGameService: MiniGameService, private gameService: GameService) {
    this.startMoving();
    this.miniGameService.onMiniGameEnd$.subscribe((isEnded) => {
      if (isEnded) {
        this.miniGameService.onMiniGameEnd$.next(false); 
        this.position.isFacingRight = false;

        this.reset();
      }
    });
        this.gameService.currentStep$.subscribe(currentStep => {
          if (currentStep === 2) {
            console.log('Step 2 détectée, reset du mob.');
            this.reset();
          }
    });

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
    return this._width; 
  }
  get height(): number {
    return this._height;
  }
  

  private startMoving() {
    const ticker$ = interval(16); // boucle de jeu (~60fps)
  
    combineLatest([
      ticker$,
      this.freezeGameService.isPaused$,
      this.freezeGameService.isCrossed$,
      this.freezeGameService.isInfo$,
      this.miniGameService.isActive$,
      this.gameService.currentStep$, 
    ]).subscribe(([_, isPaused, isCrossed, isInfo, isMiniGameActive,currentStep]) => {
      if (isPaused || isCrossed || isInfo || isMiniGameActive|| currentStep!=2) return;
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
      if (!this.hasTriggeredMiniGame) {
        console.log('Collision entre mob et joueur');
        this.miniGameService.start();
        this.hasTriggeredMiniGame = true;
      }
    } else {
      this.hasTriggeredMiniGame = false; // Reset le flag quand il n'y a plus collision
    }

      this.mobPosition.next({ ...this.position });
    });
  }
  
  respawn(): void {
    this.position = { ...this.initialPosition };
    this.mobPosition.next({ ...this.position });
    this.isAlive.next(true); // Notifie que le mob est de retour
  }

destroy() {
  this.isAlive.next(false); // Notifie que le mob n'est plus actif
}
reset(): void {
  this.respawn();
  this.position.frame = 0;
  this.position.isFacingRight = true;
  this.speedX = 2;
  this.frameCounter = 0;
  this.miniGameService.reset(); // Réinitialise le mini-jeu
  
}



}
