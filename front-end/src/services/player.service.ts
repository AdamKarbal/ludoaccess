import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CollisionService, CollisionObject } from './collision.service';
import {PlatformService} from './platform.service';
import {Collidable} from "../models/collidable.model";
import {PlayerComponent} from "../app/components/player/player.component";

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
  private player?: PlayerComponent;

  setPlayer(player: PlayerComponent): void {
    this.player = player;
  }

  getPlayer(): PlayerComponent | undefined {
    return this.player;
  }


  constructor(
    private collisionService: CollisionService,
    private platformService: PlatformService
  ) {
    // Gravité ttes les 32 frames
    setInterval(() => {
      this.applyGravity();
    }, 32);
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


    /*console.log(this.player!.x+"x");
    console.log(this.player!.y+"y");*/

    const plateforme = this.collisionService.getGroundPlatform(this.player!, this.platformService.getPlatforms());
    if (plateforme != null) {
      y = plateforme.y - this.player!.height;
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
