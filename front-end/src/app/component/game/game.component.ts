import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements AfterViewInit {
  @ViewChild('gameCanvas', { static: false })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private running: boolean = true;
  private mob = new Mob(1300, 500); 
  private backgroundImage!: HTMLImageElement; 
  private miniGameActive: boolean = false;
  private collisionDetected: boolean = false;
  private img1: HTMLImageElement = new Image();
  private img2: HTMLImageElement = new Image();
  
  private miniGameText: string = "Tu a été touché par un monstre ! \nTapes vite sur les touches du \nclavier qui s'affichent pour ne\npas perdre de points de vie !";

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.ctx = canvas.getContext('2d')!;
    this.backgroundImage = new Image();
    this.backgroundImage.src = '../../../assets/ressources/back3.jpg';
    this.backgroundImage.onload = () => {
      this.startGameLoop();
    };
    this.img1.src = '../../../assets/ressources/megaman_de_face.png'; 
    this.img2.src = '../../../assets/ressources/bulle_dialogue.png'; 
  }

  private startGameLoop() {
    const loop = () => {
      if (!this.running) return;
      this.update();
      this.draw();
      requestAnimationFrame(loop);
    };
    loop();
  }

  private update() {
    if (!this.miniGameActive) {
      this.mob.update(); 
//  if (this.detectCollision()) {
//     this.stopGame();
//      this.startMiniGame();
//    }
    }
  } 

  private draw() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    if (this.backgroundImage.complete) {
      const ratio = Math.max(
        canvas.width / this.backgroundImage.width,
        canvas.height / this.backgroundImage.height
      );
      const width = this.backgroundImage.width * ratio;
      const height = this.backgroundImage.height * ratio;
      const x = (canvas.width - width) / 2;
      const y = (canvas.height - height) / 2;
      this.ctx.drawImage(
        this.backgroundImage,
        x, y,
        width, height
      );
    }
    
    this.mob.draw(this.ctx);
    if (this.collisionDetected) {
      this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);
      this.ctx.drawImage(this.img1, 1300, 500, 300, 200); 
      this.ctx.drawImage(this.img2, 1030, 350, 375, 200);
      this.ctx.font = "20px 'Luckiest Guy', cursive"; 
      this.ctx.fillStyle = "black"; 
      const lines = this.miniGameText.split('\n');  
      let lineHeight = 25; 
      let textX = 1057;  
      let textY = 400;   
  
      lines.forEach((line, index) => {
        this.ctx.fillText(line, textX, textY + index * lineHeight);  
      });
    }
  }

  private detectCollision(): boolean {
    const player = { x: 1000, y: 500, width: 100, height: 100 }; 
    const mob = this.mob;
    return !(mob.x + mob.width < player.x || 
             mob.x > player.x + player.width || 
             mob.y + mob.height < player.y || 
             mob.y > player.y + player.height);
  }

  private stopGame() {
    this.running = false;
    this.collisionDetected = true;
  }

  private startMiniGame() {
    this.miniGameActive = true;
  }
}

class Mob {
    x: number;
    y: number;
    width: number;
    height: number;
    speedX: number;
    spriteSheet: HTMLImageElement;
    spriteSheetReversed: HTMLImageElement;
    currentFrame: number;
    totalFrames: number;
    spriteWidth: number;
    spriteHeight: number;
    frameSpeed: number;
    frameCounter: number;
    isFacingRight: boolean;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.width = 150;
        this.height = 150;
        this.speedX = 1;
        this.isFacingRight = true;
        this.spriteSheet = new Image();
        this.spriteSheet.src = '../../../assets/ressources/Worm/Walk.png';
        this.spriteSheetReversed = new Image();
        this.spriteSheetReversed.src = '../../../assets/ressources/Worm/Walk_Reversed.png';
        this.currentFrame = 0;
        this.totalFrames = 9;
        this.spriteWidth = 90;
        this.spriteHeight = 90;
        this.frameSpeed = 10;
        this.frameCounter = 0;
    }

    update() {
        this.x += this.speedX;
        if (this.x + this.width > window.innerWidth || this.x < 0) {
            this.speedX *= -1;
            this.isFacingRight = !this.isFacingRight;
        }
        this.frameCounter++;
        if (this.frameCounter >= this.frameSpeed) {
            this.frameCounter = 0;
            this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        const x = this.currentFrame * this.spriteWidth;
        const y = 0;
        const currentSprite = this.isFacingRight ? this.spriteSheet : this.spriteSheetReversed;
        ctx.drawImage(
            currentSprite, 
            x, 
            y, 
            this.spriteWidth, 
            this.spriteHeight, 
            this.x, 
            this.y, 
            this.width, 
            this.height
        );
    }
}
