import { Component, OnInit } from "@angular/core";
import { Platform } from "src/models/platform.model";
import { PlatformService } from "src/services/platform.service";
import { MotService } from "src/services/mot.service";


@Component({
  selector: 'app-plateformes',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss'],
})
export class PlatformComponent implements OnInit {
  platforms: Platform[] = [];

  constructor(private platformService: PlatformService, private motService : MotService) {}

  ngOnInit(): void {
    this.platforms = this.platformService.genererPlateformes(this.motService.getMotParNiveau(3));
  }
}
