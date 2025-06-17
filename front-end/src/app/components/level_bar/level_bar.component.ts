import { Component, Input, OnInit, SimpleChanges,OnChanges } from "@angular/core";
import { LevelService } from "src/services/levels.service";
import { ChildService } from "src/services/child.services";
import { AuthService } from "src/services/auth.service";

@Component({
  selector: "app-levelbar",
    templateUrl: "./level_bar.component.html",
    styleUrls: ["./level_bar.component.scss"],
})
export class LevelBarComponent implements OnInit {
  @Input() wordCompleted: boolean = false;

  level: number = 0;

  constructor(public levelBarService : LevelService,private childService: ChildService) {
    this.levelBarService.level$.subscribe((level) => {
      this.level = level;
      console.log('Niveau actuel:', this.level);
    });

  }

  ngOnInit(): void {
    console.log('Initialisation du composant LevelBar');
  }

  get displayLevel(): number {
  return this.level === 1000 ? 1 : Math.floor(this.level / 1000);
}

get displayXP() : number{
  let xp =this.level;
  let coeff = Math.floor(xp/1000);
  if (xp%1000==0){
    xp=0;
    return xp;
  }
  if (xp>1000){
    xp-=1000*coeff;
  }
  return xp/10;
}

  // ngOnChanges(changes:SimpleChanges){
  //   if(changes['wordCompleted'] && this.wordCompleted) this.levelBarService.increaseProgress(20);
  // }
}