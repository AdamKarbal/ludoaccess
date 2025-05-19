import { Component, OnInit, HostListener } from '@angular/core';
import { PlayerService } from '../../../services/player.service';
import { Collidable } from 'src/models/collidable.model';
import { MobComponent } from '../mob/mob.component';
import { PlatformComponent } from '../platform/platform.component';
import { CollisionService } from 'src/services/collision.service';
import { CoinCollectionService } from 'src/services/coincollection.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit, Collidable {
  position = { x: 0, y: 20 }; 
  frame: number = 0; 
  isFacingRight: boolean = true; 
  totalFrames = 10; 
  frameWidth = 51; 
  private frameHeight = 51; 
  private frameSpeed = 3; 
  private frameCounter = 0; 
  isMoving: boolean = false; 

  constructor(private playerService: PlayerService, private collisionService : CollisionService, private coinCollectionService : CoinCollectionService) {}

  ngOnInit(): void {
    this.playerService.setPlayer(this);
    this.playerService.position$.subscribe((pos) => {
      this.position = pos;
    });
    setInterval(() => {
      this.updateAnimation();
    }, 16); 
    console.log("Affichage des coins depuis le service coinCollection :", this.coinCollectionService.existentCoins);
  }
  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    this.playerService.pressKey(event.key);
    if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'd') {
      this.isFacingRight = true; 
      this.isMoving = true; 
    } else if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'q') {
      this.isFacingRight = false; 
      this.isMoving = true; 
    }
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    this.playerService.releaseKey(event.key);
    const leftPressed = this.playerService.getPressedKeys().has('arrowleft') || this.playerService.getPressedKeys().has('q');
    const rightPressed = this.playerService.getPressedKeys().has('arrowright') || this.playerService.getPressedKeys().has('d');
    if (!leftPressed && !rightPressed) {
      this.isMoving = false; 
    }
  }

  private updateAnimation(): void {
    const leftPressed = this.playerService.getPressedKeys().has('arrowleft') || this.playerService.getPressedKeys().has('q');
    const rightPressed = this.playerService.getPressedKeys().has('arrowright') || this.playerService.getPressedKeys().has('d');
    if (leftPressed || rightPressed) {
      this.frameCounter++;
      if (this.frameCounter >= this.frameSpeed) {
        this.frameCounter = 0;
        this.frame = (this.frame + 1) % this.totalFrames;
      }
    } else {
      this.frame = 0;
    }
  }

  get x(): number {
    return (this.position.x / 100) * window.innerWidth;
  }

  get y(): number {
    return (this.position.y / 100) * window.innerHeight;
  }

  get width(): number {
    return this.frameWidth;
  }

  public restartCollisionCheck() {
  this.collisionService.stopCollisionCheck();
  this.collisionService.startCollisionCheck(this, this.coinCollectionService.existentCoins);
}

  get height(): number {
    return this.frameHeight;
  }

  action(cible: Collidable): void {
    if (cible instanceof MobComponent) {
      console.log(cible + ' touchée');
    }
    if (cible instanceof PlatformComponent) {
      console.log('plateforme ' + cible + ' touchée');
    }
  }

  checkCollision(other: Collidable): boolean {
    return (
      this.x < other.x + other.width &&
      this.x + this.width > other.x &&
      this.y < other.y + other.height &&
      this.y + this.height > other.y
    );
  }
}