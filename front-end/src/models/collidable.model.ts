export interface Collidable {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  checkCollision(other: Collidable): boolean;
}
