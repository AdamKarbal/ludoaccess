import { Injectable } from "@angular/core";
import {BehaviorSubject} from "rxjs";
import { serverUrl, httpOptionsBase } from 'src/configs/server.config';
import { HttpClient } from "@angular/common/http";
import { Level } from "../models/level.model";
import {Injector} from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})

export class LevelService{
    private levelUrl = serverUrl + '/level';
    authService: AuthService|null = null;
    private _progress : number=20;
    private httpOptions = httpOptionsBase;
    level:number = 0;
    public levels$ : BehaviorSubject<Level[]> = new BehaviorSubject<Level[]>([]);
    private currentLevel: Level = { childId: null, level: 0 };

    constructor(private http: HttpClient, private Injector: Injector) {
      this.authService = this.Injector.get(AuthService);
      this.level = 20;
    }

    increaseProgress(progress: number) {
        this.level += progress;
        this.addLevel({ childId: this.authService!.getCurrentUser()!.id, level: this.level });
    }

    // levelUp() {
    //     this.level++;
    //     this._progress = 0; // Réinitialise la progression pour le nouveau niveau
    //     this.levels$.next(this.currentLevel);
    //   }

    get progress() : number{
        return this._progress;
    }
  get level$() {
    return this.levels$.asObservable();
  }
  retrieveLevels(childId:number): void {
    this.http.get<Level[]>(this.levelUrl+'/'+childId).subscribe((levelList) => {
      console.log('Niveaux récupérés dans le service :', levelList);
      this.levels$.next(levelList);
      this.currentLevel = levelList.find(level => level.childId === childId) || { childId: null, level: 0 };
    });
  }

  getLevelById(id: number): Level | undefined {
    return this.levels$.getValue().find(level => level.childId === id);
  }

  addLevel(level: Level): void {
    const body={
      childId: level.childId,
      niveau : level.level
    }
    this.http.post<Level>(this.levelUrl, body, this.httpOptions).subscribe((newLevel) => {
      console.log('Niveau ajouté dans le service :', newLevel);
    });
  }

  saveLevelToBackend(childId: number) {
    // On envoie le niveau actuel au backend
    return this.http.put(`${this.levelUrl}/${childId}`, { level: this.level });
  }


}
