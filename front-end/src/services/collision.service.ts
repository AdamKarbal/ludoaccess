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
    for (const platform of platforms) {
      if (
        platform.x<=player.x+player.width&&
        player.x+player.width<=platform.x+platform.width&&
        Math.abs(player.y-player.height)>=platform.y+platform.height
      ) {
        return platform;
      }
    }
    return null;
  }

}
