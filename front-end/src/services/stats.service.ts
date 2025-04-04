import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { mockUserStats } from '../mocks/stats.mock';

@Injectable({
  providedIn: 'root'
})
export class UserStatsService {
  private statsSubject = new BehaviorSubject<{ name: string; errors: number }[]>([]);
  stats$ = this.statsSubject.asObservable();
  private id: number;

  constructor() {
    this.id = 1;
  }

  setId(id: number): void {
    this.id = id;
    this.processMockData(this.id);
  }

  private processMockData(id: number): void {
    switch (id) {
      case 1: {
        const data = mockUserStats.listLetterErrors.map((error, index) => ({
          name: error,
          errors: mockUserStats.listNbError[index]
        }));
        this.statsSubject.next(data);
        break;
      }
      case 2: {
        const data = mockUserStats.listErrorPosition.map((errorCount, index) => ({
          name: errorCount,
          errors: mockUserStats.listErrorOccurences[index]
        }));
        this.statsSubject.next(data);
        break;
      }
      default:
        console.error("Unknown id", id);
        break;
    }
  }
}
