import { Injectable } from '@angular/core';
//import { BANQUE_MOTS } from '../app/data/banque';
import { Word } from '../models/word.model';
import { HttpClient } from '@angular/common/http';
import { serverUrl, httpOptionsBase } from 'src/configs/server.config';
import { BehaviorSubject, Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class MotService {
  private wordUrl = serverUrl + '/words';
  //private readonly _w2g: string = this.getMotParNiveau(Math.floor(Math.random() * 3) + 1 as 1 | 2 | 3);
  private httpOptions = httpOptionsBase;
  private words: Word[] = [];
  public words$: BehaviorSubject<Word[]>
      = new BehaviorSubject<Word[]>([]);

  public wordSelected$: Subject<Word> = new Subject();

  constructor(private http : HttpClient) {
    this.retrieveWords();
  }

  retrieveWords(): void {
       this.http.get<Word[]>(this.wordUrl).subscribe((wordList) => {
         this.words = wordList;
         this.words$.next(this.words);
       });
    }

  addWord(word: Word): void {
    this.http.post<Word>(this.wordUrl, word, this.httpOptions).subscribe((newWord) => {
      console.log('Mot ajouté dans le service :', newWord);
      this.retrieveWords();
    });
  }

  setSelectedWord(word: String): void {
      const urlWithValue = this.wordUrl + '/' + word;
      this.http.get<Word>(urlWithValue).subscribe((word) => {
        this.wordSelected$.next(word);
      });
    }

  getMotParNiveau(level: 1 | 2 | 3): string {
    // Filtrer les mots du niveau demandé
    const motsNiveau = this.words.filter(word => word.level === level);
    if (motsNiveau.length === 0) {
      return ''; // Ou gérer le cas où il n'y a pas de mot pour ce niveau
    }
    const index = Math.floor(Math.random() * motsNiveau.length);
    return motsNiveau[index].value;
  }

  deleteWord(word: Word): void {
       const urlWithValue = this.wordUrl + '/' + word.value;
       this.http.delete<Word>(urlWithValue, this.httpOptions).subscribe(() => this.retrieveWords());
  }
}
