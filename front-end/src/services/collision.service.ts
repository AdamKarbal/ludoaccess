import {Injectable} from "@angular/core";
import {Platform} from "./platform.service";
import {PlayerComponent} from "../app/components/player/player.component";
import {Collidable} from "../models/collidable.model";


@Injectable({
  providedIn: 'root',
})
export class CollisionService {

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
        /*console.log("joueur bottom",playerBottom);
        console.log("joueur right",playerRight);
        console.log("plat top",platformTop);
        console.log("plat right",platformRight);*/
        console.log("✅ COLLISION with platform", platform.coinLetter);
        return platform;
      }

    }

    return null;
  }
  areColliding(a: Collidable, b: Collidable): boolean {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );}



}
