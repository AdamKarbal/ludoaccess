import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environnement, httpOptionsBase } from 'src/configs/server.config';
import { HttpClient } from "@angular/common/http";
import { Level } from "../models/level.model";
import { Injector } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})

export class LevelService{
    private levelUrl = environnement.serverUrl + '/level';
    authService: AuthService|null = null;
    private _progress : number=0;
    private httpOptions = httpOptionsBase;
    public level$ = new BehaviorSubject<number>(0);
    public levels$ : BehaviorSubject<Level[]> = new BehaviorSubject<Level[]>([]);
    private currentLevel: Level = { childId: null, niveau: 0, date: new Date() };
     public levelsByChild: Map<number, Level[]> = new Map();

    constructor(private http: HttpClient, private Injector: Injector) {
      this.authService = this.Injector.get(AuthService);
    }

    increaseProgress(progress: number) {
      const halfLife = 100;
      const floorXp  = 50;

    const reward = Math.max(
      Math.ceil(progress * Math.pow(0.5, this.currentLevel.niveau / halfLife)),
      floorXp
      );
      console.log('In progress');
        this.currentLevel.niveau += reward;
        this._progress+=reward;
        this.level$.next(this.currentLevel.niveau);
        this.addLevel(this.currentLevel);
    }


  get progress(): number {
    return this._progress;
  }

  retrieveLevels(childId: number): void {
    console.warn("retrieveLevels");
    this.http.get<Level[]>(this.levelUrl + '/' + childId).subscribe((levelList) => {
      this.levelsByChild.set(childId, levelList);
      this.levels$.next(levelList);
      this.currentLevel = levelList.filter(level => level.childId === childId).sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )[0] ?? { childId: null, niveau: 0, date: new Date() };
      this.level$.next(this.currentLevel.niveau);
      console.log(this.currentLevel);
    });
  }

  retrieveLevelsForClassement(childId : number) : void {
    console.warn("retrieveLevelsforClassement");
    this.http.get<Level[]>(this.levelUrl + '/' + childId).subscribe((levelList) => {
      this.levelsByChild.set(childId, levelList);
      this.levels$.next(levelList);
      const currentLevel = levelList.filter(level => level.childId === childId).sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )[0] ?? { childId: null, niveau: 0, date: new Date() };
      console.log(currentLevel);
    });
  }

  getLastLevel(id: number): Level {
    const levels = this.levelsByChild.get(id) ?? [];
    return levels.sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0] ?? { childId: null, niveau: 0, date: new Date() };
  }

  getLastWeek(id: number): Level {
    const levels = this.levelsByChild.get(id) ?? [];
    if (!levels.length) {
      return { childId: null, niveau: 0, date: new Date() };
    }
    const now = new Date();
    const targetDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return (
      levels.reduce((prev, curr) => {
        const prevDiff = Math.abs(new Date(prev.date).getTime() - targetDate.getTime());
        const currDiff = Math.abs(new Date(curr.date).getTime() - targetDate.getTime());
        return currDiff < prevDiff ? curr : prev;
      }) ?? { childId: null, niveau: 0, date: new Date() }
    );
  }

  getLastMonth(id: number): Level {
    const levels = this.levelsByChild.get(id) ?? [];
    if (!levels.length) {
      return { childId: null, niveau: 0, date: new Date() };
    }
    const now = new Date();
    const targetDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    return (
      levels.reduce((prev, curr) => {
        const prevDiff = Math.abs(new Date(prev.date).getTime() - targetDate.getTime());
        const currDiff = Math.abs(new Date(curr.date).getTime() - targetDate.getTime());
        return currDiff < prevDiff ? curr : prev;
      }) ?? { childId: null, niveau: 0, date: new Date() }
    );
  }

  getLastDay(id: number): Level {
    const levels = this.levelsByChild.get(id) ?? [];
    if (!levels.length) {
      return { childId: null, niveau: 0, date: new Date() };
    }
    const now = new Date();
    const targetDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    return (
      levels.reduce((prev, curr) => {
        const prevDiff = Math.abs(new Date(prev.date).getTime() - targetDate.getTime());
        const currDiff = Math.abs(new Date(curr.date).getTime() - targetDate.getTime());
        return currDiff < prevDiff ? curr : prev;
      }) ?? { childId: null, niveau: 0, date: new Date() }
    );
  }

  getLevelById(id: number): Level | undefined {
    return this.levels$.getValue().find(level => level.childId === id);
  }

  addLevel(level: Level): void {
    const body = {
      childId: level.childId,
      niveau: level.niveau,
      date: level.date
    };
    this.http.post<Level>(this.levelUrl, body, this.httpOptions).subscribe((newLevel) => {
      console.log('Niveau ajouté dans le service :', newLevel);
    });
  }



  initBar() {
    console.log("init :" + this.currentLevel);
    this.level$.next(this.currentLevel.niveau);
  }

  resetProgress() {
    this._progress = 0;
  }

  getCurrentLevel(): number {
    return this.currentLevel.niveau || 0;
  }

  getRealLevel():number{
    return this.currentLevel.niveau === 1000 ? 1 : Math.floor(this.currentLevel.niveau / 1000);
  }


}
