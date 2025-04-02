import { Component, ElementRef, ViewChild, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { CoeurService } from '../../../services/coeurs.services'; 

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
<<<<<<< HEAD
  private backgroundImage!: HTMLImageElement;
  private ground!: Ground;
  private platforms: Platform[] = [];
  private coins: Coin[] = [];
=======
  private player: Player = new Player();
  private backgroundImage!: HTMLImageElement;
  gameOver: boolean = false;
  lives: number = 6;

  constructor(private coeurService: CoeurService) {
    this.coeurService.lives$.subscribe(lives => {
      this.lives = lives;
      if (this.lives <= 0) {
        this.gameOver = true;
      }
    });
  }
>>>>>>> 5ab12ef87d2419b60f2cd9f4db8728b3d8eaad91

  ngOnInit() {
    this.miniGame = new MiniGame(() => {
      this.mob = new Mob(1300, 500);
<<<<<<< HEAD
    });

    this.ground = new Ground();

    this.platforms.push(new Platform(400, 400, 200));
    this.platforms.push(new Platform(700, 300, 200));

    this.coins.push(new Coin(450,50, "A"));
    this.coins.push(new Coin(750,50, "B"));
=======
    }, this.player, this.coeurService);
>>>>>>> 5ab12ef87d2419b60f2cd9f4db8728b3d8eaad91
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
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.draw();
    });
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
    if (this.gameOver) return;

    if (!this.miniGame.isActive) {
      this.mob.update();
      if (this.detectCollision()) {
        this.miniGame.start();
      }
    } else {
      this.miniGame.update();
    }
  }

  private draw() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (this.gameOver) {
      this.drawGameOver();
      return;
    }

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

    this.ground.draw(this.ctx);
    this.platforms.forEach(platform => platform.draw(this.ctx));
    this.coins.forEach(coin => coin.draw(this.ctx));

    if (this.miniGame.isActive) {
      this.miniGame.draw(this.ctx);
    } else {
      this.mob.draw(this.ctx);
    }
  }

  private drawGameOver() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = this.ctx;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '80px "Luckiest Guy", cursive';
    ctx.fillStyle = 'red';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 50);
    ctx.font = '30px "Luckiest Guy", cursive';
    ctx.fillStyle = 'white';
    ctx.fillText('Cliquez pour recommencer', canvas.width / 2, canvas.height / 2 + 50);
  }

  private detectCollision(): boolean {
    const player = { x: 1000, y: 500, width: 100, height: 100 };
    return !(this.mob.x + this.mob.width < player.x ||
             this.mob.x > player.x + player.width ||
             this.mob.y + this.mob.height < player.y ||
             this.mob.y > player.y + player.height);
  }

  handleCanvasClick() {
    if (this.gameOver) {
      this.restartGame();
    }
  }

  restartGame() {
    this.gameOver = false;
    this.coeurService.resetLives();
    this.mob = new Mob(1300, 500);
    this.miniGame.cleanup();
    this.miniGame = new MiniGame(() => {
      this.mob = new Mob(1300, 500);
    }, this.player, this.coeurService);
    this.ngAfterViewInit(); 
  }
}

////////////// CLASSES POUR LES ÉLÉMENTS (Mettez vos classes ici sinon c'est le bordel) ///////////////////////

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
    this.speedX = 2;
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
<<<<<<< HEAD
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
=======
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
>>>>>>> 5ab12ef87d2419b60f2cd9f4db8728b3d8eaad91
  }
}

class Ground {
  private x: number = 0;
  private y: number;
  private width: number;
  private height: number = 70;
  private image!: HTMLImageElement;
  private pattern!: CanvasPattern | null;
  private borderColor: string = "rgb(50, 85, 150)";

  constructor() {
    this.y = window.innerHeight - this.height;
    this.width = window.innerWidth;

    this.image = new Image();
    this.image.src = '../../assets/ressources/texture_roche.jpg';

    this.image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.filter = "hue-rotate(180deg)";
        ctx.drawImage(this.image, 0, 0);
        this.pattern = ctx.createPattern(canvas, 'repeat');
      }
    };
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.pattern) {
      ctx.fillStyle = this.pattern;
      ctx.fillRect(this.x, this.y, this.width, this.height);

      ctx.fillStyle = this.borderColor;
      ctx.fillRect(this.x, this.y, this.width, 7);


      ctx.strokeStyle = this.borderColor;
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }
}





class Coin{
  private x : number;
  private y : number;
  private letter : string;
  private collected: boolean = false;
  private image!: HTMLImageElement;

  constructor(x: number, y: number, letter: string){
    this.x = x;
    this.y = y;
    this.letter = letter;

    this.image = new Image();
    this.image.src = this.getImagePath(letter);
  }

  private getImagePath(letter: string): string {
    return '../../assets/ressources/Coins/' + letter + '.jpg';
  }

  draw(ctx: CanvasRenderingContext2D){
    if(!this.collected && this.image.complete){
      ctx.drawImage(this.image, this.x, this.y);
    }
  }
}

class Platform {
  private x: number;
  private y: number;
  private width: number;
  private height: number = 40;
  private image!: HTMLImageElement;
  private pattern!: CanvasPattern | null;
  private borderColor: string = "rgb(50, 85, 150)";

  constructor(x: number, y: number, width: number) {
    this.x = x;
    this.y = y;
    this.width = width;

    this.image = new Image();
    this.image.src = '../../assets/ressources/texture_roche.jpg';

    this.image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.filter = "hue-rotate(180deg)";
        ctx.drawImage(this.image, 0, 0);
        this.pattern = ctx.createPattern(canvas, 'repeat');
      }
    };
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.pattern) {
      ctx.fillStyle = this.pattern;
      ctx.fillRect(this.x, this.y, this.width, this.height);

      ctx.fillStyle = this.borderColor;
      ctx.fillRect(this.x, this.y, this.width, 3);


      ctx.strokeStyle = this.borderColor;
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }
}


//////////////////////// FIN DES CLASSES POUR LES ÉLÉMENTS /////////////////


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
  private player: Player;
  private coeurService: CoeurService;

  constructor(onEndCallback: () => void, player: Player, coeurService: CoeurService) {
    this.onEndCallback = onEndCallback;
    this.player = player;
    this.coeurService = coeurService;
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
    // Logique de mise à jour si nécessaire
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
    ctx.font = "20px 'Luckiest Guy', cursive";
    ctx.fillStyle = "white";
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
    const canvas = document.querySelector('canvas');
    if (canvas) {
      this.letterX = canvas.width / 2;
      this.letterY = canvas.height / 2;
    }
  }

  private handleKeyPress(event: KeyboardEvent) {
    if (!this.isActive) return;

    const key = event.key.toUpperCase();
    if (key === this.targetLetter) {
      this.isAnimatingSuccess = true;
      this.currentText = this.successText;
      setTimeout(() => {
        this.isAnimatingSuccess = false;
        this.player.applyDamage(1);
        this.nextLetter();
      }, 300);
    } else {
      this.isAnimatingError = true;
      this.currentText = this.errorText;
      setTimeout(() => {
        this.isAnimatingError = false;
        this.coeurService.loseLife(); 
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
<<<<<<< HEAD
=======

class Player {
  private health: number;

  constructor() {
    this.health = 6;
  }

  applyDamage(amount: number) {
    this.health = Math.max(0, this.health - amount);
  }
}
>>>>>>> 5ab12ef87d2419b60f2cd9f4db8728b3d8eaad91
