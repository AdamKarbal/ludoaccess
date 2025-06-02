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

    const playerBottom = player.y + player.height;
    const playerRight = player.x + player.width;

    for (const platform of platforms) {
      // Convert percentage-based platform values into pixels
      const platformPx = {
        x: platform.x / 100 * screenWidth,
        y: platform.y / 100 * screenHeight,
        width: platform.width / 100 * screenWidth,
        height: platform.height / 100 * screenHeight
      };

      const platformRight = platformPx.x + platformPx.width;
      const platformTop = platformPx.y;

      const horizontallyAligned =
        player.x < platformRight && playerRight > platformPx.x;

      const verticallyTouching =
        (playerBottom - platformTop <= 1);

      if (horizontallyAligned && verticallyTouching && playerVelocityY >= 0) {
        return platform;
      }
    }

    return null;
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
}
