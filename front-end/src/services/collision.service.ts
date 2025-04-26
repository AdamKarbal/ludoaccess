import {Injectable} from "@angular/core";
import {Platform} from "./platform.service";
import {PlayerComponent} from "../app/components/player/player.component";

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

  getGroundPlatform(player: PlayerComponent, platforms: Platform[]): Platform | null {
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
        playerBottom >= platformTop &&
        player.y < platformTop &&
        (playerBottom - platformTop <= 10); // Small threshold

      if (horizontallyAligned && verticallyTouching) {
        console.log(`✅ Collision detected with platform '${platform.coinLetter}'`);
        return platform;
      }
    }

    return null;
  }



}

