import { Component, ElementRef, ViewChild, AfterViewInit, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('gameCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private running: boolean = true;
  private miniGameActive: boolean = false;
  private collisionDetected: boolean = false;
  private mob = new Mob(1300, 500);

  private backgroundImage!: HTMLImageElement;
  private targetLetter: string = '';
  private remainingLetters: number = 0;
  private totalLetters: number = 0;
  private isAnimatingError: boolean = false;
  private isAnimatingSuccess: boolean = false;
  private letterX: number = 0;
  private letterY: number = 0;

  private img1: HTMLImageElement = new Image();
  private img2: HTMLImageElement = new Image();

  private miniGameText: string = "Tu as été touché par un monstre !\nTape vite sur les touches du clavier\nqui s'affichent pour ne pas perdre de vie !";

  ngOnInit() {
    window.addEventListener('keydown', this.handleKeyPress.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('keydown', this.handleKeyPress.bind(this));
  }

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.ctx = canvas.getContext('2d')!;
    this.backgroundImage = new Image();
    this.backgroundImage.src = '../../../assets/ressources/back3.jpg';
    this.backgroundImage.onload = () => this.startGameLoop();
    this.img1.src = '../../../assets/ressources/megaman_de_face.png';
    this.img2.src = '../../../assets/ressources/bulle_dialogue.png';
  }

  private startGameLoop() {
    const loop = () => {
      this.update();
      this.draw();
      requestAnimationFrame(loop);
    };
    loop();
  }

  private update() {
    if (!this.miniGameActive) {
      this.mob.update();
      if (this.detectCollision()) {
        this.startMiniGame();
      }
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
      this.ctx.drawImage(this.backgroundImage, x, y, width, height);
    }

    this.mob.draw(this.ctx);

    if (this.miniGameActive) {
      this.drawMiniGame();
    }
  }

  private drawMiniGame() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    this.ctx.fillRect(this.letterX - 50, this.letterY - 50, 100, 100);

    this.ctx.drawImage(this.img1, 1300, 500, 300, 200);
    this.ctx.drawImage(this.img2, 1030, 350, 375, 200);

    this.ctx.font = "15px 'Luckiest Guy', cursive";
    this.ctx.fillStyle = "black";
    const lines = this.miniGameText.split('\n');
    let textX = 1057;
    let textY = 400;
    lines.forEach((line, index) => this.ctx.fillText(line, textX, textY + index * 25));

    if (this.isAnimatingError) {
      this.ctx.strokeStyle = "red";
      this.ctx.lineWidth = 5;
      this.ctx.strokeRect(this.letterX - 50, this.letterY - 50, 100, 100);
    } else if (this.isAnimatingSuccess) {
      this.ctx.strokeStyle = "green";
      this.ctx.lineWidth = 5;
      this.ctx.strokeRect(this.letterX - 50, this.letterY - 50, 100, 100);
    }

    this.ctx.font = "80px 'Luckiest Guy', cursive";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(this.targetLetter, this.letterX - 20, this.letterY + 30);
  }

  private detectCollision(): boolean {
    const player = { x: 1000, y: 500, width: 100, height: 100 };
    return !(this.mob.x + this.mob.width < player.x || this.mob.x > player.x + player.width || this.mob.y + this.mob.height < player.y || this.mob.y > player.y + player.height);
  }

  private startMiniGame() {
    this.miniGameActive = true;
    this.totalLetters = Math.floor(Math.random() * 6) + 5;
    this.remainingLetters = this.totalLetters;
    this.generateRandomLetter();
  }

  private generateRandomLetter() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.targetLetter = letters.charAt(Math.floor(Math.random() * letters.length));
    this.letterX = Math.random() * (window.innerWidth - 100) + 50;
    this.letterY = Math.random() * (window.innerHeight - 100) + 50;
  }

  private handleKeyPress(event: KeyboardEvent) {
    if (!this.miniGameActive) return;

    const key = event.key.toUpperCase();
    if (key === this.targetLetter) {
      this.isAnimatingSuccess = true;
      setTimeout(() => {
        this.isAnimatingSuccess = false;
        this.nextLetter();
      }, 300);
    } else {
      this.isAnimatingError = true;
      setTimeout(() => {
        this.isAnimatingError = false;
      }, 300);
    }
  }

  private nextLetter() {
    if (this.remainingLetters > 1) {
      this.remainingLetters--;
      this.generateRandomLetter();
    } else {
      this.endMiniGame();
    }
  }

  private endMiniGame() {
    this.miniGameActive = false;
    this.running = true;
    this.mob = new Mob(1300, 500);
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
