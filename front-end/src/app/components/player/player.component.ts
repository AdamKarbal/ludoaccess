import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { PlayerService } from '../../../services/player.service';
import { Collidable } from 'src/models/collidable.model';
import { MobComponent } from '../mob/mob.component';
import { PlatformComponent } from '../platform/platform.component';
import { CollisionService } from 'src/services/collision.service';
import { CoinCollectionService } from 'src/services/coincollection.service';
import { Subscription } from 'rxjs';
import { Animationconfig } from 'src/models/animation.model';

interface AnimationStates {
  stand: Animationconfig;
  run: Animationconfig;
  runReversed: Animationconfig;
  jump: Animationconfig;
  jumpReversed: Animationconfig;
}

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit, OnDestroy, Collidable {
  position = { x: 0, y: 0 };
  animationConfig: AnimationStates = {
    stand: {
      frameCount: 8,
      frameSpeed: 10,
      framePrefix: 'assets/ressources/megamanstand/megamanstand'
    },
    run: {
      frameCount: 12,
      frameSpeed: 5,
      framePrefix: 'assets/ressources/megamanrun/megamanrun'
    },
    runReversed: {
      frameCount: 12,
      frameSpeed: 5,
      framePrefix: 'assets/ressources/megamanrunreversed/megamanrunreversed'
    },
    jump: {
      frameCount: 7,
      frameSpeed: 18,
      framePrefix: 'assets/ressources/megamanjump/megamanjump'
    },
    jumpReversed: {
      frameCount: 7,
      frameSpeed: 20,
      framePrefix: 'assets/ressources/megamanjumpreversed/megamanjumpreversed'
    }
  };

  scale = 1;
  currentAnimation: keyof AnimationStates = 'stand';
  frame: number = 0;
  private frameCounter = 0;
  isFacingRight: boolean = true;
  isMoving: boolean = false;

  private coinsSub?: Subscription;

  constructor(
    private playerService: PlayerService,
    private collisionService: CollisionService,
    private coinCollectionService: CoinCollectionService
  ) { }

  ngOnInit(): void {
    this.playerService.setPlayer(this);
    this.playerService.position$.subscribe((pos) => {
      this.position = pos;
    });

    setInterval(() => {
      this.updateAnimation();
    }, 1000 / 60);

    this.coinsSub = this.coinCollectionService.existentCoins$.subscribe(() => {
      this.restartCollisionCheck();
    });
  }

  ngOnDestroy(): void {
    this.coinsSub?.unsubscribe();
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
    if (
      (event.key === 'ArrowUp' || event.key.toLowerCase() === 'z' || event.key === ' ') &&
      this.playerService.onGround
    ) {
      if (this.currentAnimation === 'jump' || this.currentAnimation === 'jumpReversed') {
        this.frame = 0;
        this.frameCounter = 0;
      }
    }
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    this.playerService.releaseKey(event.key);
    const keys = this.playerService.getPressedKeys();
    this.isMoving = keys.has('arrowleft') || keys.has('q') || keys.has('arrowright') || keys.has('d');
  }

  private updateAnimationState(): void {
    if (!this.playerService.onGround) {
      const wasJump = this.currentAnimation === 'jump' || this.currentAnimation === 'jumpReversed';
      this.currentAnimation = this.isFacingRight ? 'jump' : 'jumpReversed';
      if (!wasJump) {
        this.frame = 0;
        this.frameCounter = 0;
      }
    } else if (!this.isMoving) {
      this.currentAnimation = 'stand';
    } else {
      this.currentAnimation = this.isFacingRight ? 'run' : 'runReversed';
    }
  }

  private updateAnimation(): void {
    const keys = this.playerService.getPressedKeys();
    this.isMoving = keys.has('arrowleft') || keys.has('q') || keys.has('arrowright') || keys.has('d');
    this.updateAnimationState();
    const config = this.animationConfig[this.currentAnimation];
    if (config.frameSpeed > 0) {
      this.frameCounter++;
      if (this.frameCounter >= config.frameSpeed) {
        this.frameCounter = 0;
        if (this.currentAnimation === 'jump' || this.currentAnimation === 'jumpReversed') {
          if (this.frame < config.frameCount - 1) {
            this.frame++;
          }
        } else {
          this.frame = (this.frame + 1) % config.frameCount;
        }
      }
    }
    if (this.playerService.onGround && (this.currentAnimation === 'jump' || this.currentAnimation === 'jumpReversed')) {
      this.frame = 0;
    }
  }

  getCurrentSprite(): string {
    const config = this.animationConfig[this.currentAnimation];
    const frameIndex = Math.max(1, Math.min(this.frame + 1, config.frameCount));
    return `${config.framePrefix}${frameIndex}.png`;
  }


  get x(): number {
    return (this.position.x / 100) * window.innerWidth;
  }

  get y(): number {
    return (this.position.y / 100) * window.innerHeight;
  }

  get width(): number {
    return 52 * this.scale;
  }
  get height(): number {
    return 48 * this.scale;
  }
  readonly offsetX = Math.floor((76 - 52) / 2);
  readonly offsetY = Math.floor((76 - 48) / 2);
  public restartCollisionCheck(): void {
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
