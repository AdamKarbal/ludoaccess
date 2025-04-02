import { Injectable } from '@angular/core';

export interface Platform {
  x: number;
  y: number;
  width: number;
  height: number;
  coinImage : string;
}

@Injectable({
  providedIn: 'root'
})

export class PlatformService {
  private platforms: Platform[] = [];

  constructor() { }

  generateRandomPlatforms(word : string): void {

    const fixedHeight = 5;

    for (let i = 0; i < word.length; i++) {
      const screenWidth = window.innerWidth;
      const minW = 150;
      const maxW = screenWidth - 450; 
      let xCoord = Math.floor(Math.random() * (maxW - minW + 1)) + minW;

      const screenHeight = window.innerHeight;
      const minH = 350;
      const maxH = screenHeight - 250; 
      let yCoord = Math.floor(Math.random() * (maxH - minH + 1)) + minH;

      let width = Math.floor(Math.random() * 12) + 8;
      const coinImagePath = `src/assets/ressources/Coins/${word[i]}.png`;

      this.platforms.push({ x: xCoord, y: yCoord, width: width, height: fixedHeight, coinImage: coinImagePath });
    }
  }

  getPlatforms(): Platform[] {  
    return this.platforms;
  }
}


