import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { mockUserStats } from '../mocks/stats.mock';
import {GameService} from "./game.service";
import {httpOptionsBase, serverUrl} from "../configs/server.config";
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class UserStatsService {
  private statsSubject = new BehaviorSubject<{ name: string; errors: number }[]>([]);
  stats$ = this.statsSubject.asObservable();
  private lengthsSubject = new BehaviorSubject<number[]>([]);
  lengths$ = this.lengthsSubject.asObservable();
  private id: number;
  private lengths: number[] = [];
  private userUrl = serverUrl + "/stats";
  private httpOptions = httpOptionsBase;

  constructor(private gameService: GameService,
              private http: HttpClient) {
    this.id = 1;


  }


  setId(id: number): void {
    this.id = id;
    this.processMockData(this.id);
  }

  private processMockData(id: number): void {
    switch (id) {
      case 1: {
        const data = Object.entries(mockUserStats.listLetterErrors).map(
          ([letter, count]) => ({name: letter, errors: count as number})
        );
        this.statsSubject.next(data);
        break;
      }

      case 2: {
        const data: { name: string; errors: number }[] = [];

        for (const [length, positions] of Object.entries(mockUserStats.errorOcurrencesByPosition)) {
          const posMap = positions as Record<string, number>;
          this.lengths.push(Number(length));
          for (const [position, count] of Object.entries(posMap)) {
            data.push({name: `L${length}-P${position}`, errors: count});
          }
        }

        this.statsSubject.next(data);
        console.log('processMockData(2) appelé');
        this.lengthsSubject.next(this.lengths);
        break;
      }
    }
  }
}
