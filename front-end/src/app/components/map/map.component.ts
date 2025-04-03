import {Component, OnInit} from '@angular/core';
import { PlatformService , Platform} from '../../../services/platform.service';


@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})

export class MapComponent implements OnInit {
    platforms: Platform[] = [];
  
    constructor(private platformService: PlatformService) {}
  
    ngOnInit(): void {
      this.platformService.generateRandomPlatforms("voiture");
      this.platforms = this.platformService.getPlatforms();
    }
  }