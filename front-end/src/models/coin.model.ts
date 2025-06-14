import { Collidable } from "./collidable.model";

export class Coin implements Collidable{
  collecting: boolean = false;
  private _x: number;
  private _y: number;
  private _width: number = 36;
  private _height: number = 36;
  private _letter: string = '';
  collected: boolean = false;

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

    set x(value: number) {
      this._x = value;
    }
    set y(value: number) {
      this._y = value;
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


    action(other: Collidable): void {
    }

  }
