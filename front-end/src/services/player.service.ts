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
  private jumpForce = -20;
  private onGround = false; // Track if player is on the ground or not
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
    // Start applying gravity after every 16 ms
    setInterval(() => {
      this.applyGravity();
    }, 32); // Approximately 60 FPS (16ms per frame)
  }

  // Move the player based on key input
  movePlayer(key: string): void {
    const currentPosition = this.positionSubject.getValue();
    let { x, y } = currentPosition;
    console.log(currentPosition);
    console.log(this.platforms[1]);
    // Handle player movement
    switch (key) {
      case 'ArrowUp':
        // Jump only if player is on the ground or at the starting position
        if (this.onGround || y === 0) {
          this.velocityY = this.jumpForce; // Jump force applied
          this.onGround = false; // Player is no longer on the ground
        }
        break;
      case 'ArrowLeft':
        x -= this.speed;
        break;
      case 'ArrowRight':
        x += this.speed;
        break;
    }

    // Update the player's position
    this.positionSubject.next({ x, y });
  }

  // Apply gravity to the player and handle jumping
  applyGravity(): void {
    const currentPosition = this.positionSubject.getValue();
    let { x, y } = currentPosition;

    // Apply gravity if player is in the air (not on the ground)
    if (!this.onGround) {
      this.velocityY += this.gravity; // Apply gravity to the player's vertical velocity
    }

    // Update y position based on the vertical velocity
    y += this.velocityY;

    // Check for collision with platforms
    const player: CollisionObject = { x, y, width: 47, height: 18 };
    // Detect collision with any platform
    if (this.collisionService.isOnGround(player,this.platforms)) {
      // Reset player to be on top of the platform
      y = this.platformService.getPlatforms()[0].y - 18; // Assuming 50 is the player's height
      this.velocityY = 0; // Stop vertical movement
      this.onGround = true; // Player is now on the ground
    } else if (y >= this.groundY) {
      // Player has reached the ground
      y = this.groundY;
      this.velocityY = 0;
      this.onGround = true; // Player is now on the ground
    } else {
      this.onGround = false; // Player is in the air
    }

    // Update the player's position with gravity applied
    this.positionSubject.next({ x, y });
  }
}
