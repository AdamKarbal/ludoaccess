import { Component, OnInit } from "@angular/core";
import { Platform } from "src/models/platform.model";
import { PlatformService } from "src/services/platform.service";
import { MotService } from "src/services/mot.service";
import { GameService } from "src/services/game.service";


@Component({
  selector: 'app-plateformes',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss'],
})
export class PlatformComponent implements OnInit {
  platforms: Platform[] = [];

  constructor(private platformService: PlatformService, private gameService : GameService) {}

  ngOnInit(): void {
    this.platforms = this.platformService.genererPlateformes(this.gameService.w2g);
  }

  // getX():number {
  //   return this.x;
  // }
  // getY():number {
  //   return this.y;
  // }
}
