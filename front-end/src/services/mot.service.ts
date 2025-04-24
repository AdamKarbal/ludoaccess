import { Injectable } from '@angular/core';
import { BANQUE_MOTS } from '../app/data/banque';

@Injectable({ providedIn: 'root' })
export class MotService {
  getMotParNiveau(niveau: 1 | 2 | 3): string {
    const mots = BANQUE_MOTS[`niveau${niveau}`];
    const index = Math.floor(Math.random() * mots.length);
    return mots[index].toUpperCase();
  }
}
