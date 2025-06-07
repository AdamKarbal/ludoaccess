import { Injectable } from "@angular/core";
import { PlayerComponent } from "src/app/components/player/player.component";
import { LevelBarComponent } from "src/app/components/level_bar/level_bar.component";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class LevelService{
    private _progress : number;
    level:number = 0;
    private levelService$= new BehaviorSubject(0);

    constructor() {
        this._progress = 20;
    }

    increaseProgress(progress: number) {
        this._progress += progress;

        if (this.progress >= 100) {
          this.levelUp();
        }
    }

    levelUp() {
        this.level++;
        this._progress = 0; // Réinitialise la progression pour le nouveau niveau
        this.levelService$.next(this.level);
      }

    get progress() : number{
        return this._progress;
    }
  get level$() {
    return this.levelService$.asObservable();
  }


}
