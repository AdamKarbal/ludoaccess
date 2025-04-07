import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CollisionService, CollisionObject } from './collision.service';
import {PlatformService} from './platform.service';
import {Collidable} from "../models/collidable.model";

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
  private playerWidthVw: number = 0;
  private playerHeightVh: number = 0;


  constructor(
    private collisionService: CollisionService,
    private platformService: PlatformService
  ) {
    // Gravité ttes les 32 frames
    setInterval(() => {
      this.applyGravity();
    }, 32);
  }
  ngAfterViewInit() {
    this.getPlayerDimensions();
  }
  getPlayerDimensions(): void {
    const playerElement = document.querySelector('.player') as HTMLElement;

    if (playerElement) {
      const playerWidthPx = playerElement.offsetWidth;
      const playerHeightPx = playerElement.offsetHeight;

      this.playerWidthVw = (playerWidthPx / window.innerWidth) * 100;
      this.playerHeightVh = (playerHeightPx / window.innerHeight) * 100;

      console.log('Player size in vw/vh:', this.playerWidthVw, this.playerHeightVh);
    }
  }

  // Fct pr traiter les input
  movePlayer(key: string): void {
    const currentPosition = this.positionSubject.getValue();
    let { x, y } = currentPosition;
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


    const player: CollisionObject = { x, y, width: this.playerWidthVw, height: this.playerHeightVh };
    if (this.collisionService.isOnGround(player,this.platformService.getPlatforms())) {
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
