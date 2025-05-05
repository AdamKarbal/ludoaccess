import { Injectable } from '@angular/core';
import { BANQUE_MOTS } from '../app/data/banque';

@Injectable({ providedIn: 'root' })
export class MotService {
  private readonly _w2g: string = this.getMotParNiveau(Math.floor(Math.random() * 3) + 1 as 1 | 2 | 3);
  
  getWord() : string{
    return this._w2g;
  }

  getMotParNiveau(niveau: 1 | 2 | 3): string {
    const mots = BANQUE_MOTS[`niveau${niveau}`];
    const index = Math.floor(Math.random() * mots.length);
    return mots[index];
  }
}
