export interface Collidable {
  x: number;    
  y: number;   
  width: number;
  height: number;
  checkCollision(other: Collidable): boolean;  

  getX(): number;
  getY(): number;
  getWidth(): number;
  getHeight(): number;
}
