import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {GameService} from "./game.service";
import {httpOptionsBase, serverUrl} from "../configs/server.config";
import {HttpClient} from "@angular/common/http";
import {Progression} from "../models/progression.model";
import {Interaction} from "../models/interaction.model";
import {User} from "../models/user.model";
import {Child} from "../models/child.model";

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
      },
      error: err => {
        console.warn("❌ fetchStatsForChild failed, child may have no stats yet.");
      }

    });
  }


  setId(id: number): void {
    this.id = id;
    this.processData(this.id);
  }
  updateStatsFromGameState(user:User): void {
    const child=user as Child;
    this.dataToSend.child.id = child.id;
    this.dataToSend.child.firstName = child.firstName;
    this.dataToSend.child.lastName = child.lastName;
    this.dataToSend.child.age= child.age!;
    console.log("Important ",this.gameService.getListLetterErrors());
    this.dataToSend.listLetterErrors = this.gameService.getListLetterErrors();
    this.dataToSend.errorOcurrencesByPosition = this.gameService.getErrorOcurrencesByPosition();
    this.dataToSend.progression = this.gameService.getProgression();
    this.dataToSend.interaction = this.gameService.getInteraction();
  }

  sendStatsToServer(user:User): void {
    const url = `${this.userUrl}/child/${user.id}`;

    // 🔁 Convertir les Map en objets simples pour l'envoi
    const payloadToSend = {
      ...this.dataToSend,
      listLetterErrors: Object.fromEntries(this.dataToSend.listLetterErrors),
      errorOcurrencesByPosition: Object.fromEntries(
        Array.from(this.dataToSend.errorOcurrencesByPosition.entries()).map(
          ([length, map]) => [length, Object.fromEntries(map)]
        )
      )
    };

    this.http.put(url, payloadToSend, this.httpOptions)
      .subscribe({
        next: () => console.log('Stats updated successfully'),
        error: err => console.error('Error updating stats:', err)
      });
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
