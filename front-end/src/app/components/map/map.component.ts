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

      this.platforms.push({ x: 10, y: 60, width: 10, height: 5, coinLetter: 'A' });
      this.platforms.push({ x: 25, y: 72, width: 15, height: 5, coinLetter: 'R' });
      this.platforms.push({ x: 40, y: 60, width: 18, height: 5, coinLetter: 'B' });
      this.platforms.push({ x: 58.5, y: 50, width: 10, height: 5, coinLetter: 'R' });
      this.platforms.push({ x: 68.5, y: 40, width: 16, height: 5, coinLetter: 'E' });
    }
  }