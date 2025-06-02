import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CollisionService } from './collision.service';
import { PlatformService } from './platform.service';
import { PlayerComponent } from '../app/components/player/player.component';
import { GameService } from './game.service';
import { CoinCollectionService } from './coincollection.service';
import { SettingsService } from './setting.service';
import { ChildSettings } from '../models/setting.model';
import { MiniGameService } from './minigame.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private groundY = 81;
  private _pressedKeys = new Set<string>();
  private positionSubject = new BehaviorSubject<{ x: number; y: number }>({
    x: 0,
    y: this.groundY,
  });
  position$ = this.positionSubject.asObservable();

  private speed = 0.4;
  private gravity = 0.5;
  private velocityY = 0;
  private jumpForce = -4;
  private onGround = true;
  private player?: PlayerComponent;
  private _settings: ChildSettings | null = null;
  private isMiniGameActive = false; 


constructor(
    private collisionService: CollisionService,
    private platformService: PlatformService,
    private gameService: GameService,
    private coinCollectionService: CoinCollectionService,
    private settingsService: SettingsService,
    private miniGameService: MiniGameService
  ) {
    this.miniGameService.isActive$.subscribe((active) => {
      this.isMiniGameActive = active;
    });

    setInterval(() => {
      if (!this.isMiniGameActive) {
        this.updateMovement();
        this.applyGravity();
      }
    }, 32);

    this.settingsService.settings$.subscribe((settings) => {
      this._settings = settings;
    });
  }

  getPressedKeys(): Set<string> {
    return this._pressedKeys;
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
      case 'arrowup':
      case ' ':
      case 'space':
        if (this.onGround) {
          this.velocityY = this.jumpForce;
          //this.onGround = false;
        }
        break;

      case 'arrowleft':
      case 'q':
        x = Math.max(0, x - this.speed);
        break;

      case 'arrowright':
      case 'd':
        x = Math.min(100, x + this.speed);
        break;
    }

    this.positionSubject.next({ x, y });
  }


  private updateMovement(): void {
    let { x, y } = this.positionSubject.getValue();

    const leftPressed = this._pressedKeys.has('arrowleft') || this._pressedKeys.has('q');
    const rightPressed = this._pressedKeys.has('arrowright') || this._pressedKeys.has('d');
    const jumpPressed = this._pressedKeys.has('arrowup') || this._pressedKeys.has('z') || this._pressedKeys.has(' ') || this._pressedKeys.has('space');

    if (leftPressed) {
      x = Math.max(0, x - this.speed);
    }

    if (rightPressed) {
      x = Math.min(100, x + this.speed);
    }

    if (jumpPressed && this.onGround) {
      this.velocityY = this.jumpForce;
      //this.onGround = false;
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
    this._pressedKeys.add(key.toLowerCase());
  }

  releaseKey(key: string): void {
    this._pressedKeys.delete(key.toLowerCase());
  }

  resetPlayer(): void {
    this.positionSubject.next({ x: 0, y: this.groundY });
    this.velocityY = 0;
    this.onGround = true;
    this._pressedKeys.clear();
  }
}
