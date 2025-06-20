import { Injectable } from '@angular/core';
import { LevelService } from './levels.service';
import { ChildService } from './child.services';
import { Child } from 'src/models/child.model';

@Injectable({
  providedIn: 'root'
})
export class ClassementService {
  private _childs: Child[] = [];
  lvlByChid: Map<Child, number[]> = new Map<Child, number[]>(); // 1 tous les jours, 2 semaine , 3 mois, 4 général

  constructor(private levelService: LevelService, private childService: ChildService) {
    this.childService.childs$.subscribe(childs => {
      this._childs = childs;
      for (let child of this._childs) {
        this.levelService.retrieveLevelsForClassement(child.id);
      }
      setTimeout(() => {
        for (let child of this._childs) {
          this.updateLvlByChild(child);
        }
      }, 200);
    });
  }

  updateLvlByChild(child: Child) {
    const lastDay = this.levelService.getLastDay(child.id).niveau;
    const lastWeek = this.levelService.getLastWeek(child.id).niveau;
    const lastMonth = this.levelService.getLastMonth(child.id).niveau;
    const lastLevel = this.levelService.getLastLevel(child.id).niveau;
    this.lvlByChid.set(child, [lastLevel-lastDay, lastLevel-lastWeek, lastLevel-lastMonth, lastLevel]);
  }
}