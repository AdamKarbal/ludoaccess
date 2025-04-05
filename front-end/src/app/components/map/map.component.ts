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
      //this.platformService.generateRandomPlatforms("voiture");
      //this.platforms = this.platformService.getPlatforms();

      this.platforms.push({ x: 250, y: 675, width: 10, height: 5, coinLetter: 'A' });
      this.platforms.push({ x: 1000, y: 675, width: 15, height: 5, coinLetter: 'R' });
      this.platforms.push({ x: 560, y: 575, width: 18, height: 5, coinLetter: 'B' });
      this.platforms.push({ x: 1250, y: 575, width: 10, height: 5, coinLetter: 'R' });
      this.platforms.push({ x: 1500, y: 475, width: 16, height: 5, coinLetter: 'E' });
    }
  }