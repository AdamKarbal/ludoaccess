import { Injectable } from '@angular/core';
import { GameService } from './game.service';
import { FreezeGameService } from './freeze-game.services';
import { CoinCollectionService } from './coincollection.service';
import { Coin } from 'src/models/coin.model';

@Injectable({
    providedIn: 'root'
  })

export class Word2GuessService {
    private word: string;
    private display: string;
    private collectedCoins : Coin[];
    private guessedIndexes: number[] = [];
    public currentIndex = 0;
    public isPaused: boolean = false;
    public isCrossed: boolean = false;
    public isI: boolean = false;

    constructor(private gameService: GameService,private freezeGameService: FreezeGameService) {
      this.freezeGameService.isPaused$.subscribe(paused => {
        this.isPaused = paused;
      });
      this.freezeGameService.isCrossed$.subscribe(exited => {
        this.isCrossed = exited;
      });
      this.freezeGameService.isInfo$.subscribe(info => {
        this.isI = info;
      });
      this.word = this.gameService.w2g;
      this.display = "_".repeat(this.word.length);
      this.collectedCoins = [];
    }
  
    getWord(): string {
        return this.word;
      }
    
      getGuessedIndexes(): number[] {
        return this.guessedIndexes;
      }
    
      guessLetter(letter: string): boolean {
        if (!letter.match(/^\p{L}$/u)) return false;
        console.log(`Comparing "${letter}" with "${this.word[this.currentIndex]}"`);
    // Comparer la lettre entrée avec celle du mot, en tenant compte de la casse
        if (letter === this.word[this.currentIndex]) {
        this.guessedIndexes.push(this.currentIndex);
        this.currentIndex++;
        return true;
        }
        return false;
      }
    
      isWordComplete(): boolean {
        return this.guessedIndexes.length === this.word.length;
      }
    
      reset(word: string = 'ArBRE') {
        this.word = word;
        this.guessedIndexes = [];
        this.currentIndex = 0;
      }

      getCurrentDisplay(): string {
        let display = '';
        for (let i = 0; i < this.word.length; i++) {
          if (this.guessedIndexes.includes(i)) {
            display += this.word[i] + ' '; // lettre trouvée
          } else {
            display += '_ '; // lettre non trouvée
          }
        }
        return display.trim();
      }      


  }
  