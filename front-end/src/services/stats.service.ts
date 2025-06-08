import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
      age: number;
    };
    listLetterErrors: Map<string, number>;
    errorOcurrencesByPosition: Map<number,Map<string,number>>;
    progression: Progression[];
    interaction: Interaction[];
  } = {
    child: {
      id: 0,
      firstName: '',
      lastName: '',
      age: 0
    },
    listLetterErrors: new Map(),
    errorOcurrencesByPosition: new Map(),
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
  fetchStatsForChild(childId: number): void {
    this.http.get(`${this.userUrl}/child/${childId}`, this.httpOptions).subscribe({
      next: (data: any) => {
        // Convert listLetterErrors (object) to Map
        const lle = new Map<string, number>(
          Object.entries(data.listLetterErrors)
        );

        // Convert errorOcurrencesByPosition
        const eobp = new Map<number, Map<string, number>>();
        for (const [lengthStr, rawPositions] of Object.entries(data.errorOcurrencesByPosition)) {
          const positions = rawPositions as Record<string, number>;

          if (positions && typeof positions === 'object') {
            const posMap = new Map<string, number>(Object.entries(positions));
            eobp.set(Number(lengthStr), posMap);
          }
        }


        this.dataToSend = {
          ...data,
          listLetterErrors: lle,
          errorOcurrencesByPosition: eobp
        };

        // Emit transformed values
        this.statsSubject.next(
          Array.from(lle.entries()).map(([letter, count]) => ({ name: letter, errors: count }))
        );

        this.lengthsSubject.next(Array.from(eobp.keys()));
      }

    });
  }


  setId(id: number): void {
    this.id = id;
    this.processData(this.id);
  }
  updateStatsFromGameState(childId: number) {
    this.dataToSend.child.id = childId;
    this.dataToSend.child.firstName = 'Jean'; // or get it from session
    this.dataToSend.child.lastName = 'Matinet';
    this.dataToSend.child.age= 8;
    this.dataToSend.listLetterErrors = this.gameService.getListLetterErrors();
    this.dataToSend.errorOcurrencesByPosition = this.gameService.getErrorOcurrencesByPosition();
    this.dataToSend.progression = this.gameService.getProgression();
    this.dataToSend.interaction = this.gameService.getInteraction();
    this.sendStatsToServer();
  }

  private processData(id: number): void {
    switch (id) {
      case 1: {
        const data = Array.from(this.dataToSend.listLetterErrors.entries()).map(
          ([letter, count]) => ({ name: letter, errors: count })
        );
        this.statsSubject.next(data);
        break;
      }

      case 2: {
        const data: { name: string; errors: number }[] = [];
        this.lengths = [];

        for (const [length, posMap] of this.dataToSend.errorOcurrencesByPosition.entries()) {
          this.lengths.push(length);
          for (const [position, count] of posMap.entries()) {
            data.push({ name: `L${length}-P${position}`, errors: count });
          }
        }


        this.statsSubject.next(data);
        this.lengthsSubject.next(this.lengths);
        break;
      }
    }
  }
}
