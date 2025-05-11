
import {PlayerComponent} from "../app/components/player/player.component";
import {Collidable} from "../models/collidable.model";
import { Injectable } from "@angular/core";
import { GameService } from "./game.service";
import { Platform } from "src/models/platform.model";
import { CoinCollectionService } from "./coincollection.service";
import { Coin } from "src/models/coin.model";
import { PlatformService } from "./platform.service";

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
  coins : Coin[];
  private isCheckingCollision : boolean = false;
  private collisionCheckInterval: any;

  constructor(private platformService : PlatformService, private coinCollectionService : CoinCollectionService) {
    this.platforms = this.platformService.platforms;
    this.coins = this.coinCollectionService.existentCoins;
  }

  getGroundPlatform(player: PlayerComponent, platforms: Platform[],playerVelocityY:number): Platform | null {
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
        /*console.log("joueur bottom",playerBottom);
        console.log("joueur right",playerRight);
        console.log("plat top",platformTop);
        console.log("plat right",platformRight);*/
        //console.log("✅ COLLISION with platform", platform.getCoinFirst());
        return platform;
      }
    }

    return null;
  }

  areColliding(a: Collidable, b: Collidable): boolean {
    console.log(a.x,a.y);
    console.log(b.x,b.y);
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );}

  startCollisionCheck(player : PlayerComponent, coins : Coin[]) : void{
    console.log("Liste de coins depuis collisionService: ", coins);
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
              if(!coin.isCollected){
                console.log("Collision with: " , coin.letter);
                coin.collecting = true;
                const audio = new Audio('assets/sons/coin_received.mp3');
                audio.play();
          
                setTimeout(() => {
                  coin.collect();
                  this.coinCollectionService.addCollected(coin);
                }, 300)
              }
            }
          }    
    }, 500);
  }

  stopCollisionCheck(): void {
    if (this.collisionCheckInterval) {
      clearInterval(this.collisionCheckInterval);
      this.isCheckingCollision = false;
    }
  }
  

}
