import { Collidable } from "./collidable.model";

export class Coin implements Collidable{
    x: number;
    y: number;
    width: number;
    height: number;
    letter: string;
    collected: boolean = false;
  
    constructor(x: number, y: number, letter: string) {
      this.x = x;
      this.y = y;
      this.letter = letter;
      this.width = 50; 
      this.height = 50; 
    }
  
    collect(): void {
      this.collected = true;
    }
  
    get imagePath(): string {
      return `assets/ressources/Coins/${this.letter}.png`;
    }

    checkCollision(other: Collidable): boolean {
        return (
            this.x < other.x + other.width &&
            this.x + this.width > other.x &&
            this.y < other.y + other.height &&
            this.y + this.height > other.y
        );
    }

    getX(): number{
        return this.x;
    }
    getY(): number{
        return this.y;
    }
    getHeight(): number{
        return this.height;
    }
    getWidth(): number{
        return this.width;
    }
    
  }
  