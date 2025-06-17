import { Injectable } from "@angular/core";
import {BehaviorSubject} from "rxjs";
import { serverUrl, httpOptionsBase } from 'src/configs/server.config';
import { HttpClient } from "@angular/common/http";
import { Level } from "../models/level.model";
import {Injector} from "@angular/core";
import { AuthService } from "./auth.service";
import { ChildActivationEnd } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class LevelService{
    private levelUrl = serverUrl + '/level';
    authService: AuthService|null = null;
    private _progress : number=20;
    private httpOptions = httpOptionsBase;
    public level$ = new BehaviorSubject<number>(0);
    public levels$ : BehaviorSubject<Level[]> = new BehaviorSubject<Level[]>([]);
    private currentLevel: Level = { childId: null, niveau: 0, date: new Date() };

    constructor(private http: HttpClient, private Injector: Injector) {
      this.authService = this.Injector.get(AuthService);
      this.retrieveLevels(this.authService?.getCurrentUserId() || 0);
      // this.level = this.getLevelById(this.authService!.getCurrentUser()!.id)?.level || 0;
    }

    increaseProgress(progress: number) {
      const halfLife = 10;
      const floorXp  = 5;

      const reward = Math.max(
      Math.ceil(progress * Math.pow(0.5, this.currentLevel.niveau / halfLife)),
      floorXp
      );
      console.log('In progress');
        this.currentLevel.niveau += reward;
        this.level$.next(this.currentLevel.niveau);
        this.addLevel(this.currentLevel);
    }


    get progress() : number{
        return this._progress;
    }

  retrieveLevels(childId:number): void {
    this.http.get<Level[]>(this.levelUrl+'/'+childId).subscribe((levelList) => {
      console.log('Niveaux récupérés dans le service :', levelList);
      this.levels$.next(levelList);
      this.currentLevel = levelList.filter(level => level.childId === childId).sort((a, b) =>                            // tri décroissant sur la date
                 new Date(b.date).getTime() -
                 new Date(a.date).getTime()
          )[0]                                       // premier = plus récent
          ?? { childId: null, niveau: 0, date: new Date().toISOString() }; // si pas de niveau, on initialise
      console.log('Niveau current:', this.currentLevel);
      this.level$.next(this.currentLevel.niveau);
    });
  }

  getLevelById(id: number): Level | undefined {
    return this.levels$.getValue().find(level => level.childId === id);
  }

  addLevel(level: Level): void {
    const body={
      childId: level.childId,
      niveau : level.niveau,
      date: level.date
    };
    this.http.post<Level>(this.levelUrl, body, this.httpOptions).subscribe((newLevel) => {
      console.log('Niveau ajouté dans le service :', newLevel);
    });
  }



  initBar() {
    console.log("init :"+this.currentLevel);
    this.level$.next(this.currentLevel.niveau);
  }

  resetProgress() {
      this._progress=0;
  }

  getCurrentLevel(): number {
    return this.currentLevel.niveau || 0;
  }


}
