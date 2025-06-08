import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { mockUserStats } from '../mocks/stats.mock';
import {GameService} from "./game.service";
import {httpOptionsBase, serverUrl} from "../configs/server.config";
import {HttpClient} from "@angular/common/http";
import {Progression} from "../models/progression.model";
import {Interaction} from "../models/interaction.model";

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
  private dataToSend: {
    child: {
      id: number;
      firstName: string;
      lastName: string;
      role: 'child';
    };
    listLetterErrors: { [letter: string]: number };
    errorOcurrencesByPosition: { [length: string]: { [position: string]: number } };
    progression: Progression[];
    interaction: Interaction[];
  } = {
    child: {
      id: 0,
      firstName: '',
      lastName: '',
      role: 'child'
    },
    listLetterErrors: {},
    errorOcurrencesByPosition: {},
    progression: [],
    interaction: []
  };
  getUserStatsPayload() {
    return this.dataToSend;
  }

  sendStatsToServer(): void {
    const url = `${this.userUrl}/${this.id}`;
    this.http.put(url, this.dataToSend, this.httpOptions)
      .subscribe({
        next: () => console.log('Stats updated successfully'),
        error: err => console.error('Error updating stats:', err)
      });
  }


  constructor(private gameService: GameService,
              private http: HttpClient) {
    this.id = 1;
  }


  setId(id: number): void {
    this.id = id;
    this.processMockData(this.id);
  }
  updateStatsFromGameState(childId: number) {
    this.dataToSend.child.id = childId;
    this.dataToSend.child.firstName = 'Jean'; // or get it from session
    this.dataToSend.child.lastName = 'Matinet';
    this.dataToSend.child.role = 'child';
    this.dataToSend.listLetterErrors = this.gameService.getListLetterErrors();
    this.dataToSend.errorOcurrencesByPosition = this.gameService.getErrorOcurrencesByPosition();
    this.dataToSend.progression = this.gameService.getProgression();
    this.dataToSend.interaction = this.gameService.getInteraction();
    this.sendStatsToServer();
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
        this.lengthsSubject.next(this.lengths);
        break;
      }
    }
  }
}
