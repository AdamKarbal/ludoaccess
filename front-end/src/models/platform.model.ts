import { Collidable } from './collidable.model';
import { Coin } from './coin.model';

export class Platform implements Collidable {
  private _x: number;
  private _y: number;
  private _width: number;
  private _height: number;
  private coinFirst?: Coin;
  private coinSecond?: Coin;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number = 5,
    coinFirst?: Coin,
    coinSecond?: Coin
  ) {
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    this.coinFirst = coinFirst;
    this.coinSecond = coinSecond;
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

  getCoinFirst(): Coin | undefined {
    return this.coinFirst;
  }

  getCoinSecond(): Coin | undefined {
    return this.coinSecond;
  }

  setCoinFirst(coin: Coin): void {
    this.coinFirst = coin;
  }

  setCoinSecond(coin: Coin): void {
    this.coinSecond = coin;
  }

  hasSlot(): boolean {
    return !this.coinFirst || !this.coinSecond;
  }

  addCoin(coin: Coin): boolean {
    if (!this.coinFirst) {
      this.setCoinFirst(coin);
      return true;
    } else if (!this.coinSecond) {
      this.setCoinSecond(coin);
      return true;
    }
    return false;
  }

  getLetterCount(): number {
    return [this.coinFirst, this.coinSecond].filter(Boolean).length;
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
