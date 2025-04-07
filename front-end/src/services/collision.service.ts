import {Injectable} from "@angular/core";
import {Platform} from "./platform.service";

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
  // Check if the player is on the ground (collision with platform)
  isOnGround(player: CollisionObject, platforms: Platform[]): boolean {
    for (const platform of platforms) {
      // Check if player is above the platform and within its x bounds
      if (
        player.x < platform.x + platform.width &&
        player.x + player.width > platform.x &&
        player.y + player.height <= platform.y + platform.height &&
        player.y + player.height > platform.y
      ) {
        return true; // Player is on the platform
      }
    }
    return false; // Player is not on the ground
  }
}
