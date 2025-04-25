import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CollisionService } from './collision.service';
import { PlatformService } from './platform.service';
import { PlayerComponent } from '../app/components/player/player.component';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private groundY = 85; // position du sol (en vh)

  private positionSubject = new BehaviorSubject<{ x: number; y: number }>({
    x: 0,
    y: this.groundY,
  });
  position$ = this.positionSubject.asObservable();

  private speed = 2;
  private gravity = 0.5;
  private velocityY = 0;
  private jumpForce = -8;
  private onGround = false;
  private player?: PlayerComponent;

  constructor(
    private collisionService: CollisionService,
    private platformService: PlatformService
  ) {
    setInterval(() => {
      this.applyGravity();
    }, 32);
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

    switch (key) {
      case 'ArrowUp':
        if (this.onGround) {
          this.velocityY = this.jumpForce;
          this.onGround = false;
        }
        break;
      case 'ArrowLeft':
        x = Math.max(0, x - this.speed);
        break;
      case 'ArrowRight':
        x = Math.min(100, x + this.speed);
        break;
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

    // ⚠️ Convert player to pixels for platform collision
    const plateforme = this.collisionService.getGroundPlatform(
      this.player,
      this.platformService.getPlatforms()
    );

    if (plateforme) {
      const platformTopPx = (plateforme.y / 100) * window.innerHeight;
      const playerHeightPx = (this.player.height / 100) * window.innerHeight;
      const yPixels = platformTopPx - playerHeightPx;

      // Convert back to vh for display
      y = yPixels / window.innerHeight * 100;

      this.velocityY = 0;
      this.onGround = true;
    } else if (y >= this.groundY) {
      y = this.groundY;
      this.velocityY = 0;
      this.onGround = true;
    } else {
      this.onGround = false;
    }

    this.positionSubject.next({ x, y });
  }
}
