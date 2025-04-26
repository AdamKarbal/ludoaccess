import { Collidable } from "./collidable.model";
import { CoinCollectionService } from "src/services/coincollection.service";

export class Coin implements Collidable{
  private _x: number;
  private _y: number;
  private _width: number = 50;
  private _height: number = 50;
  private _letter: string = '';
  private collected: boolean = false;
  
    constructor(x: number, y: number, letter: string) {
      this._x = x;
      this._y = y;
      this._letter = letter;
    }
  
    get imagePath(): string {
      return `assets/ressources/Coins/${this.letter}.png`;
    }

    get x(): number {
      return this._x;
    }
  
    get y(): number {
      return this._y;
    }
  
    get width(): number {
      return this._width;
    }
  
    get height(): number {
      return this._height;
    }

    get letter(): string {
      return this._letter;
    }

    get isCollected(): boolean{
      return this.collected;
    }

    collect(): void{
      this.collected = true;
    }

    setLetter(letter: string): void {
      this._letter = letter;
    }

    checkCollision(other: Collidable): boolean {
      return (
          this.x < other.x + other.width &&
          this.x + this.width > other.x &&
          this.y < other.y + other.height &&
          this.y + this.height > other.y
      );
    } 

  }
  