import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {mockUserStats} from '../mocks/stats.mock'

@Injectable({
  providedIn: 'root'
})
export class UserStatsService {
  private statsSubject = new BehaviorSubject<{ name: string, errors: number }[]>([]);
  stats$ = this.statsSubject.asObservable();

  constructor() {
    this.processMockData();
  }

  private processMockData() {
    const data = mockUserStats.listError.map((error, index) => ({
      name: error,
      errors: mockUserStats.listNbError[index]
    }));
    this.statsSubject.next(data);
  }
}
