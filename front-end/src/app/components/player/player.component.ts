import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { PlayerService } from '../../../services/player.service';
import { Collidable } from 'src/models/collidable.model';
import { MobComponent } from '../mob/mob.component';
import { PlatformComponent } from '../platform/platform.component';
import { CollisionService } from 'src/services/collision.service';
import { CoinCollectionService } from 'src/services/coincollection.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit, OnDestroy, Collidable {
  position = { x: 0, y: 20 }; 
  frame: number = 0; 
  isFacingRight: boolean = true; 
  totalFrames = 10; 
  frameWidth = 51; 
  private frameHeight = 51; 
  private frameSpeed = 3; 
  private frameCounter = 0; 
  isMoving: boolean = false; 

  private coinsSub?: Subscription;

  constructor(
    private playerService: PlayerService,
    private collisionService: CollisionService,
    private coinCollectionService: CoinCollectionService
  ) {}

  ngOnInit(): void {
    this.playerService.setPlayer(this);
    this.playerService.position$.subscribe((pos) => {
      this.position = pos;
    });
    setInterval(() => {
      this.updateAnimation();
    }, 16);

    // Abonnement à la liste observable des coins pour relancer la collision à chaque changement
    this.coinsSub = this.coinCollectionService.existentCoins$.subscribe(() => {
      this.restartCollisionCheck();
    });
  }

  ngOnDestroy(): void {
    if (this.coinsSub) {
      this.coinsSub.unsubscribe();
    }
    this.collisionService.stopCollisionCheck();
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

  get height(): number {
    return this.frameHeight;
  }

  public restartCollisionCheck() {
    this.collisionService.stopCollisionCheck();
    this.collisionService.startCollisionCheck(this);
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