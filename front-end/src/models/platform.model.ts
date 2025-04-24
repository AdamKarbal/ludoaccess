export class Platform {
    
    constructor(
      private x : number,
      private y : number,
      private width: number,
      private height: number = 5,
      private coinLetter : string
    ) {}

      getX(): number {
        return this.x;
      }
    
      getY(): number {
        return this.y;
      }
    
      getWidth(): number {
        return this.width;
      }
    
      getHeight(): number {
        return this.height;
      }
    
      getCoinLetter(): string {
        return this.coinLetter;
      }  
}
  