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
  private groundY = 83.3;
  private _pressedKeys = new Set<string>();
  private positionSubject = new BehaviorSubject<{ x: number; y: number }>({
    x: 0,
    y: this.groundY,
  });
  position$ = this.positionSubject.asObservable();

  private speed = 0.4;
  private velocityY = 0;
  private gravity = 1.2;
  private jumpForce = -18;
  onGround = true;
  private player?: PlayerComponent;
  private _settings: ChildSettings | null = null;
  private isMiniGameActive = false;

  // Jump tracking
  private wasJumpPressedLastFrame = false;
  private hasJumped = false;
  private hasTouchedPlatform = false;
  private failedJumps = 0;
  private successfulJumps = 0;

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
      this.jumpForce = this._settings?.jumpDifficulty ? -20 : -18;
    });
  }

  getFailedJumps(): number {
    return this.failedJumps;
  }

  getSuccessfulJumps(): number {
    return this.successfulJumps;
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

    if (leftPressed && !this.collisionService.isTouchingPlatformSide(this.player!, this.platformService.platforms, 'left')) {
      x = Math.max(0, x - this.speed);
    }

    if (rightPressed && !this.collisionService.isTouchingPlatformSide(this.player!, this.platformService.platforms, 'right')) {
      x = Math.min(100, x + this.speed);
    }

    if (jumpPressed && !this.wasJumpPressedLastFrame) {
      if (this.onGround) {
        this.velocityY = this.jumpForce;
        this.hasJumped = true;
        this.hasTouchedPlatform = false;
      }
    }

    this.wasJumpPressedLastFrame = jumpPressed;
    this.positionSubject.next({ x, y });
  }

  applyGravity(): void {
    if (!this.player) return;
    let { x, y } = this.positionSubject.getValue();
    if (!this.onGround) {
      this.velocityY += this.gravity;
    }
    const screenHeight = window.innerHeight;
    let yPx = (y / 100) * screenHeight;
    yPx += this.velocityY;
    const playerTop = yPx;
    const playerBottom = yPx + this.player.height;
    const playerLeft = (x / 100) * window.innerWidth;
    const playerRight = playerLeft + this.player.width;
    const platform = this.collisionService.getGroundPlatform(this.player, this.platformService.platforms, this.velocityY);

    if (platform) {
      const platformTop = platform.y / 100 * screenHeight;
      const playerHeight = this.player.height;

      if (this.velocityY >= 0 && (yPx + playerHeight) >= platformTop) {
        yPx = platformTop - playerHeight;
        this.velocityY = 0;
        this.onGround = true;
        if (this.hasJumped) {
          this.successfulJumps++;
        }
        this.hasJumped = false;
      }
    } else if (yPx >= this.groundY / 100 * screenHeight) {
      if (this.hasJumped && !this.hasTouchedPlatform) {
        this.failedJumps++;
      }
      yPx = this.groundY / 100 * screenHeight;
      this.velocityY = 0;
      this.onGround = true;
      this.hasJumped = false;
    } else {
      this.onGround = false;
    }

    for (const plat of this.platformService.platforms) {
      const platPx = {
        x: plat.x / 100 * window.innerWidth,
        y: plat.y / 100 * screenHeight,
        width: plat.width / 100 * window.innerWidth,
        height: plat.height / 100 * screenHeight
      };
      const platLeft = platPx.x;
      const platRight = platPx.x + platPx.width;
      const platTop = platPx.y;
      const platBottom = platPx.y + platPx.height;

      const horizontallyAligned = playerRight > platLeft + 2 && playerLeft < platRight - 2;

      if (
        horizontallyAligned &&
        this.velocityY < 0 &&
        playerTop <= platBottom &&
        playerTop >= platTop
      ) {
        yPx = platBottom;
        this.velocityY = 0;
        this.hasTouchedPlatform = true;
        this.failedJumps++;
        break;
      }
    }

    y = (yPx / screenHeight) * 100;
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
    this.wasJumpPressedLastFrame = false;
    this.hasJumped = false;
    this.hasTouchedPlatform = false;
    this.failedJumps = 0;
    this.successfulJumps = 0;
  }
}
