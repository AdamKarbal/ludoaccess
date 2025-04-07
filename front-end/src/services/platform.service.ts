import { Injectable } from '@angular/core';

export interface Platform {
  x: number;
  y: number;
  width: number;
  height: number;
  coinLetter : string;
}

@Injectable({
  providedIn: 'root'
})

export class PlatformService {
  private platforms: Platform[] = [];

  constructor() { }

  generateRandomPlatforms(word : string): void {

    /*const fixedHeight = 5;

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
      const coinLetter = word[i].toUpperCase();

      this.platforms.push({ x: xCoord, y: yCoord, width: width, height: fixedHeight, coinLetter: coinLetter });
    }*/
    this.platforms.push({ x: 10, y: 60, width: 10, height: 5, coinLetter: 'A' });
    this.platforms.push({ x: 25, y: 72, width: 15, height: 5, coinLetter: 'R' });
    this.platforms.push({ x: 40, y: 60, width: 18, height: 5, coinLetter: 'B' });
    this.platforms.push({ x: 58.5, y: 50, width: 10, height: 5, coinLetter: 'R' });
    this.platforms.push({ x: 68.5, y: 40, width: 16, height: 5, coinLetter: 'E' });
  }

  getPlatforms(): Platform[] {
    return this.platforms;
  }
}


