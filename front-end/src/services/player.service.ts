import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CollisionService } from './collision.service';
import { PlatformService } from './platform.service';
import { PlayerComponent } from '../app/components/player/player.component';
import { GameService } from './game.service';
import { CoinCollectionService } from './coincollection.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private groundY = 81;
  private pressedKeys = new Set<string>();
  private positionSubject = new BehaviorSubject<{ x: number; y: number }>({
    x: 0,
    y: this.groundY,
  });
  position$ = this.positionSubject.asObservable();

  private speed = 2;
  private gravity = 0.5;
  private velocityY = 0;
  private jumpForce = -8;
  private onGround = true;
  private player?: PlayerComponent;

  constructor(
    private collisionService: CollisionService,
    private platformService: PlatformService,
    private gameService: GameService,
    private coinCollectionService : CoinCollectionService
  ) {
    setInterval(() => {
      this.updateMovement();
      this.applyGravity();
    }, 16); // ~60 FPS    
  }

  setPlayer(player: PlayerComponent): void {
    this.player = player;
  }

  getPlayer(): PlayerComponent | undefined {
    return this.player;
  }

  movePlayer(key: string): void {
    const currentPosition = this.positionSubject.getValue();
    let { x, y } = currentPosition;

    key = key.toLowerCase();

    switch (key) {
      case 'arrowUp':
        case ' ':
        case 'space':
        if (this.onGround) {
          this.velocityY = this.jumpForce;
          this.onGround = false;
        }
        break;

      case 'arrowLeft':
        case 'q':
        x = Math.max(0, x - this.speed);
        break;

      case 'arrowRight':
        case 'd':
        x = Math.min(100, x + this.speed);
        break;
    }

    this.positionSubject.next({ x, y });
  }

  private updateMovement(): void {
    let { x, y } = this.positionSubject.getValue();
  
    const leftPressed = this.pressedKeys.has('arrowleft') || this.pressedKeys.has('q');
    const rightPressed = this.pressedKeys.has('arrowright') || this.pressedKeys.has('d');
    const jumpPressed = this.pressedKeys.has('arrowup') || this.pressedKeys.has('z') || this.pressedKeys.has(' ') || this.pressedKeys.has('space');
  
    if (leftPressed) {
      x = Math.max(0, x - this.speed);
    }
  
    if (rightPressed) {
      x = Math.min(100, x + this.speed);
    }
  
    if (jumpPressed && this.onGround) {
      this.velocityY = this.jumpForce;
      this.onGround = false;
    }
  
    this.positionSubject.next({ x, y });
  }
  

  applyGravity(): void {
    if (!this.player) return;

    let { x, y } = this.positionSubject.getValue();

    if (!this.onGround) {
      this.velocityY += this.gravity;
    }

    y += this.velocityY;

    const platform = this.collisionService.getGroundPlatform(
      this.player,
      this.platformService.platforms,
      this.velocityY
    );

    if (platform) {
      const platformTop = platform.y;
      const playerHeight = this.player.height;

      if (this.velocityY >= 0 && (y + playerHeight) >= platformTop) {
        y=platform.y-platform.height-3; // 3-> height du player
        this.velocityY = 0;
        this.onGround = true;
      }
    } else if (y >= this.groundY) {
      y = this.groundY;
      this.velocityY = 0;
      this.onGround = true;
    } else {
      this.onGround = false;
    }

    this.positionSubject.next({ x, y });
  }

  pressKey(key: string): void {
    this.pressedKeys.add(key.toLowerCase());
  }
  
  releaseKey(key: string): void {
    this.pressedKeys.delete(key.toLowerCase());
  }  

  collectCoin(): void {
    if (!this.player) return;

    this.gameService.existentCoins.forEach((coin, index) => {
      // Vérifier la collision entre le joueur et la pièce
      if (this.player?.checkCollision(coin)){
        console.log(`Pièce collectée : ${coin}`);

        this.gameService.collectedCoins.push(coin);
        this.gameService.existentCoins.splice(index, 1);
        this.coinCollectionService.addCollected(coin);
      }
    });
  }
}
