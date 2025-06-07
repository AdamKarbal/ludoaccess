import { PlayerComponent } from "../app/components/player/player.component";
import { Collidable } from "../models/collidable.model";
import { Injectable } from "@angular/core";
import { Platform } from "src/models/platform.model";
import { CoinCollectionService } from "./coincollection.service";
import { Coin } from "src/models/coin.model";
import { PlatformService } from "./platform.service";
import { Subscription } from "rxjs";

export interface CollisionObject {
  x: number;
  y: number;
  width: number;
  height: number;
}

@Injectable({
  providedIn: 'root',
})
export class CollisionService {

  platforms: Platform[];
  private isCheckingCollision: boolean = false;
  private collisionCheckInterval: any;
  private coinsSub?: Subscription;

  constructor(
    private platformService: PlatformService,
    private coinCollectionService: CoinCollectionService
  ) {
    this.platforms = this.platformService.platforms;
  }

  getGroundPlatform(player: PlayerComponent, platforms: Platform[], playerVelocityY: number): Platform | null {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const playerLeft = player.x;
    const playerRight = player.x + player.width;
    const playerBottom = player.y + player.height;
    const prevPlayerBottom = playerBottom - playerVelocityY;

    const tolerance = 2;
    let closestPlatform: Platform | null = null;
    let minDeltaY = Number.POSITIVE_INFINITY;

    for (const platform of platforms) {
      const platformPx = {
        x: platform.x / 100 * screenWidth,
        y: platform.y / 100 * screenHeight,
        width: platform.width / 100 * screenWidth,
        height: platform.height / 100 * screenHeight
      };

      const platLeft = platformPx.x;
      const platRight = platformPx.x + platformPx.width;
      const platTop = platformPx.y;

      const horizontallyAligned =
        playerRight > platLeft + tolerance &&
        playerLeft < platRight - tolerance;
      if (playerVelocityY < 0) continue;
      const playerTop = player.y;
      const prevPlayerBottom = playerBottom - playerVelocityY;
      const wasAbove = prevPlayerBottom <= platTop + tolerance;
      const isNowBelow = playerBottom >= platTop - tolerance;
      if (playerTop > platTop) continue;

      if (horizontallyAligned && wasAbove && isNowBelow) {
        const deltaY = Math.abs(playerBottom - platTop);
        if (deltaY < minDeltaY) {
          minDeltaY = deltaY;
          closestPlatform = platform;
        }
      }
    }

    return closestPlatform;
  }

  areColliding(a: Collidable, b: Collidable): boolean {
    console.log(a.x, a.y);
    console.log(b.x, b.y);
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }

  startCollisionCheck(player: PlayerComponent): void {
    console.log("Liste des coins", this.coinCollectionService.existentCoins$);
    // Nettoie les anciens abonnements/intervals
    this.stopCollisionCheck();

    // S'abonne à la liste observable des coins
    this.coinsSub = this.coinCollectionService.existentCoins$.subscribe(coins => {
      // On arrête l'ancien intervalle s'il existe
      if (this.collisionCheckInterval) {
        clearInterval(this.collisionCheckInterval);
      }
      // On relance l'intervalle avec la nouvelle liste de coins
      this.collisionCheckInterval = setInterval(() => {
        this.isCheckingCollision = true;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const playerBottom = player.y + player.height;
        const playerRight = player.x + player.width;

        for (const coin of coins) {
          // Convert percentage-based platform values into pixels
          const coinPx = {
            x: coin.x / 100 * screenWidth,
            y: coin.y / 100 * screenHeight,
            width: coin.width / 100 * screenWidth,
            height: coin.height / 100 * screenHeight
          };

          const coinRight = coinPx.x + coinPx.width;
          const coinTop = coinPx.y;

          const horizontallyAligned = player.x < coinRight && playerRight > coinPx.x;
          const verticallyTouching = (playerBottom - coinTop <= 1);

          if (horizontallyAligned && verticallyTouching) {
            if (!coin.isCollected) {
              console.log("Collision with: ", coin.letter);
              coin.collecting = true;
              const audio = new Audio('assets/sons/coin_received.mp3');
              audio.play();
              setTimeout(() => {
                coin.collect();
                this.coinCollectionService.addCollected(coin);
              }, 300);
            }
          }
        }
      }, 500);
    });
  }

  stopCollisionCheck(): void {
    if (this.collisionCheckInterval) {
      clearInterval(this.collisionCheckInterval);
      this.isCheckingCollision = false;
    }
    if (this.coinsSub) {
      this.coinsSub.unsubscribe();
      this.coinsSub = undefined;
    }
  }

  isTouchingPlatformSide(player: PlayerComponent,platforms: Platform[],direction: 'left' | 'right'): boolean {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const playerTop = player.y;
    const playerBottom = player.y + player.height;
    const playerLeft = player.x;
    const playerRight = player.x + player.width;
    for (const platform of platforms) {
      const platX = platform.x / 100 * screenWidth;
      const platY = platform.y / 100 * screenHeight;
      const platW = platform.width / 100 * screenWidth;
      const platH = platform.height / 100 * screenHeight;
      const platLeft = platX;
      const platRight = platX + platW;
      const platTop = platY;
      const platBottom = platY + platH;
      const verticallyAligned =
        playerBottom > platTop + 2 &&
        playerTop < platBottom - 2;
      if (!verticallyAligned) continue;

      if (
        (direction === 'left' && playerLeft <= platRight && playerRight > platRight) ||
        (direction === 'right' && playerRight >= platLeft && playerLeft < platLeft)
      ) {
        return true;
      }
    }
    return false;
  }
}
