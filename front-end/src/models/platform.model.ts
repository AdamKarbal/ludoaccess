import { Collidable } from "./collidable.model";

export class Platform implements Collidable{
      x !: number;
      y !: number;
       width!: number;
       height: number = 5;
       coinLetterFirst : string = '';
       coinLetterSecond : string = ''
    
    constructor(
       x : number,
       y : number,
       width: number,
       height: number = 5,
       coinLetterFirst : string = '',
       coinLetterSecond : string = ''
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
    
      getCoinLetterFirst(): string {
        return this.coinLetterFirst;
      }  

      getCoinLetterSecond(): string {
        return this.coinLetterSecond;
      }  
      setCoinLetterFirst(letter: string): void {
        this.coinLetterFirst = letter;
      }
    
      setCoinLetterSecond(letter: string): void {
        this.coinLetterSecond = letter;
      }
    
      
      hasSlot(): boolean {
        return !this.coinLetterFirst || !this.coinLetterSecond;
      }
    
    
      addLetter(letter: string): boolean {
        if (!this.coinLetterFirst) {
          this.coinLetterFirst = letter;
          return true;
        } else if (!this.coinLetterSecond) {
          this.coinLetterSecond = letter;
          return true;
        }
        return false;
      }
    
   
      getLetterCount(): number {
        return [this.coinLetterFirst, this.coinLetterSecond].filter(l => l).length;
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
  