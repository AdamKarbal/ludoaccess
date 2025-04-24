import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

export class Word2GuessService {
    private word: string= 'Açbre';
    private guessedIndexes: number[] = [];
    public currentIndex = 0;
  
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
  }
  