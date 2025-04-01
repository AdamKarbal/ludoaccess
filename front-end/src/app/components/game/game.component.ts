import { Component, ElementRef, ViewChild, AfterViewInit, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('gameCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private mob = new Mob(1300, 500);
  private miniGame!: MiniGame;

  private backgroundImage!: HTMLImageElement;

  ngOnInit() {
    this.miniGame = new MiniGame(() => {
      this.mob = new Mob(1300, 500);
    });
  }

  ngOnDestroy() {
    this.miniGame.cleanup();
  }

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.ctx = canvas.getContext('2d')!;
    
    this.backgroundImage = new Image();
    this.backgroundImage.src = '../../../assets/ressources/back3.jpg';
    this.backgroundImage.onload = () => this.startGameLoop();
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
    if (!this.miniGame.isActive) {
      this.mob.update();
      if (this.detectCollision()) {
        //this.miniGame.start();
      }
    } else {
      this.miniGame.update();
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

    if (this.miniGame.isActive) {
      this.miniGame.draw(this.ctx);
    } else {
      this.mob.draw(this.ctx);
    }
  }

  private detectCollision(): boolean {
    const player = { x: 1000, y: 500, width: 100, height: 100 };
    return !(this.mob.x + this.mob.width < player.x || 
             this.mob.x > player.x + player.width || 
             this.mob.y + this.mob.height < player.y || 
             this.mob.y > player.y + player.height);
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

class MiniGame {
  isActive: boolean = false;
  targetLetter: string = '';
  remainingLetters: number = 0;
  totalLetters: number = 0;
  isAnimatingError: boolean = false;
  isAnimatingSuccess: boolean = false;
  letterX: number = 0;
  letterY: number = 0;
  
  private img1: HTMLImageElement;
  private img2: HTMLImageElement;
  private baseText: string = "Tu as été touché par un monstre !\nTape vite sur les touches du clavier\nqui s'affichent pour ne pas perdre de vie !";
  private successText: string = "Bien joué ! Continue comme ça !";
  private errorText: string = "Oops ! Mauvaise touche ! Essaie encore !";
  private currentText: string = "";
  private onEndCallback: () => void;
  private keyHandler: (event: KeyboardEvent) => void;

  constructor(onEndCallback: () => void) {
    this.onEndCallback = onEndCallback;
    this.img1 = new Image();
    this.img1.src = '../../../assets/ressources/megaman_de_face.png';
    this.img2 = new Image();
    this.img2.src = '../../../assets/ressources/bulle_dialogue.png';
    
    this.keyHandler = this.handleKeyPress.bind(this);
    window.addEventListener('keydown', this.keyHandler);
    this.currentText = this.baseText;
  }

  start() {
    this.isActive = true;
    this.totalLetters = Math.floor(Math.random() * 6) + 5;
    this.remainingLetters = this.totalLetters;
    this.currentText = this.baseText;
    this.generateRandomLetter();
  }

  cleanup() {
    window.removeEventListener('keydown', this.keyHandler);
  }

  update() {
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(this.letterX - 50, this.letterY - 50, 100, 100);

    ctx.drawImage(this.img1, 1300, 500, 300, 200);
    ctx.drawImage(this.img2, 1030, 350, 375, 200);

    ctx.font = "15px 'Luckiest Guy', cursive";
    ctx.fillStyle = "black";
    const lines = this.currentText.split('\n');
    let textX = 1057;
    let textY = 400;
    lines.forEach((line, index) => ctx.fillText(line, textX, textY + index * 25));

    if (this.isAnimatingError) {
      ctx.strokeStyle = "red";
      ctx.lineWidth = 5;
      ctx.strokeRect(this.letterX - 50, this.letterY - 50, 100, 100);
    } else if (this.isAnimatingSuccess) {
      ctx.strokeStyle = "green";
      ctx.lineWidth = 5;
      ctx.strokeRect(this.letterX - 50, this.letterY - 50, 100, 100);
    }

    ctx.font = "80px 'Luckiest Guy', cursive";
    ctx.fillStyle = "white";
    ctx.fillText(this.targetLetter, this.letterX - 20, this.letterY + 30);
  }

  private generateRandomLetter() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.targetLetter = letters.charAt(Math.floor(Math.random() * letters.length));
    this.letterX = Math.random() * (window.innerWidth - 100) + 50;
    this.letterY = Math.random() * (window.innerHeight - 100) + 50;
  }

  private handleKeyPress(event: KeyboardEvent) {
    if (!this.isActive) return;

    const key = event.key.toUpperCase();
    if (key === this.targetLetter) {
      this.isAnimatingSuccess = true;
      this.currentText = this.successText;
      setTimeout(() => {
        this.isAnimatingSuccess = false;
        this.nextLetter();
      }, 300);
    } else {
      this.isAnimatingError = true;
      this.currentText = this.errorText;
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
      this.end();
    }
  }

  private end() {
    this.isActive = false;
    this.onEndCallback();
  }
}