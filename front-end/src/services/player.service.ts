import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CollisionService, CollisionObject } from './collision.service';
import {Platform, PlatformService} from './platform.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private positionSubject = new BehaviorSubject<{ x: number; y: number }>({ x: 0, y: 0 });
  position$ = this.positionSubject.asObservable();
  private speed = 5;
  private gravity = 1;
  private velocityY = 0;
  private jumpForce = -10;
  private onGround = false;
  private groundY = 0;
  private platforms: Platform[] = [];

  constructor(
    private collisionService: CollisionService,
    private platformService: PlatformService
  ) {
    this.platforms.push({ x: 10, y: 60, width: 10, height: 5, coinLetter: 'A' });
    this.platforms.push({ x: 25, y: 72, width: 15, height: 5, coinLetter: 'R' });
    this.platforms.push({ x: 40, y: 60, width: 18, height: 5, coinLetter: 'B' });
    this.platforms.push({ x: 58.5, y: 50, width: 10, height: 5, coinLetter: 'R' });
    this.platforms.push({ x: 68.5, y: 40, width: 16, height: 5, coinLetter: 'E' });
    console.log(this.platforms);
    // Gravité ttes les 32 frames
    setInterval(() => {
      this.applyGravity();
    }, 32);
  }

  // Fct pr traiter les input
  movePlayer(key: string): void {
    const currentPosition = this.positionSubject.getValue();
    let { x, y } = currentPosition;
    console.log(this.platforms[0]);
    switch (key) {
      case 'ArrowUp':
        if (this.onGround || y === 0) {
          this.velocityY = this.jumpForce;
          this.onGround = false;
        }
        break;
      case 'ArrowLeft':
        x -= this.speed;
        break;
      case 'ArrowRight':
        x += this.speed;
        console.log("x"+x);
        break;
    }


    this.positionSubject.next({ x, y });
  }


  applyGravity(): void {
    const currentPosition = this.positionSubject.getValue();
    let { x, y } = currentPosition;


    if (!this.onGround) {
      this.velocityY += this.gravity;
    }


    y += this.velocityY;


    const player: CollisionObject = { x, y, width: 47, height: 18 };
    if (this.collisionService.isOnGround(player,this.platformService.getPlatforms())) {
      console.log("Coucou");
      y = this.platformService.getPlatforms()[0].y - 18;
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
