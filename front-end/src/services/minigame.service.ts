import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Subscription, take } from 'rxjs';
import { CoeurService } from './coeurs.services';


@Injectable({
  providedIn: 'root',
})
export class MiniGameService {
  isActive$ = new BehaviorSubject<boolean>(false);
  onMiniGameEnd$ = new BehaviorSubject<boolean>(false);
  targetLetter$ = new BehaviorSubject<string>('');
  currentText$ = new BehaviorSubject<string>("Tu as été touché par un monstre !\nTape vite sur les touches du clavier\nqui s'affichent pour ne pas perdre de vie !");
  isAnimatingError$ = new BehaviorSubject<boolean>(false);
  isAnimatingSuccess$ = new BehaviorSubject<boolean>(false);
  GameOver$ = new BehaviorSubject<boolean>(false);
  private totalLetters: number = 0;
  private remainingLetters: number = 0;
  private letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  private gameOverSub?: Subscription;
  constructor(  private coeurService : CoeurService, 
  ) {
    
  }

  start() {
    console.log('start minigame');
    window.removeEventListener('keydown', this.handleKeyPress);
    this.isActive$.next(true);
    this.onMiniGameEnd$.next(false);
    this.totalLetters = Math.floor(Math.random() * 6) + 1;
    this.remainingLetters = this.totalLetters;
    this.currentText$.next("Tu as été touché par un monstre !\nTape vite sur les touches du clavier\nqui s'affichent pour ne pas perdre de vie !");
    this.generateRandomLetter();
    window.addEventListener('keydown', this.handleKeyPress);
    if(this.gameOverSub) {
      this.gameOverSub.unsubscribe();
    }
    this.gameOverSub=this.coeurService.isGameOver$.pipe(filter(done=>done),take(1)).subscribe(isGameOver => {
      console.warn('Game Over triggered in MiniGameService');
      if(isGameOver){
        this.GameOver$.next(isGameOver);
        // this.reset();
      }
    });
  }

  private generateRandomLetter() {
    const randomLetter = this.letters.charAt(Math.floor(Math.random() * this.letters.length));
    this.targetLetter$.next(randomLetter);
  }

  private handleKeyPress = (event: KeyboardEvent) => {
    if (!this.isActive$.value) return;

    const key = event.key.toUpperCase();
    if (key === this.targetLetter$.value) {
      this.isAnimatingSuccess$.next(true);
      this.currentText$.next("Bien joué ! Continue comme ça !");
      setTimeout(() => {
        this.isAnimatingSuccess$.next(false);
        this.nextLetter();
      }, 300);
    } else {
      this.isAnimatingError$.next(true);
      this.coeurService.loseLife();
      this.currentText$.next("Oops ! Mauvaise touche ! Essaie encore !");
      setTimeout(() => {
        this.isAnimatingError$.next(false);
      }, 300);
    }
  };

  private nextLetter() {
    if (this.remainingLetters > 1) {
      this.remainingLetters--;
      this.generateRandomLetter();
    } else {
      this.end();
    }
  }

  private end() {
    this.isActive$.next(false);
    this.onMiniGameEnd$.next(true);
    window.removeEventListener('keydown', this.handleKeyPress);
  }
  reset(): void {
    console.warn('reset minigame');
    if (this.gameOverSub) {
    this.gameOverSub.unsubscribe();
    this.gameOverSub = undefined;
  }
  this.isActive$.next(false);
  this.onMiniGameEnd$.next(false);
  this.targetLetter$.next('');
  this.currentText$.next("Tu as été touché par un monstre !\nTape vite sur les touches du clavier\nqui s'affichent pour ne pas perdre de vie !");
  this.isAnimatingError$.next(false);
  this.isAnimatingSuccess$.next(false);
  this.GameOver$.next(false);
  this.coeurService.resetLives();
  this.totalLetters = 0;
  this.remainingLetters = 0;
  window.removeEventListener('keydown', this.handleKeyPress);
  // this.coeurService.isGameOverSubject.next(false); // Réinitialise l'état de fin de jeu
}

}
