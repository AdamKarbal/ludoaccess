import { Component, Input, OnInit, SimpleChanges,OnChanges } from "@angular/core";
import { LevelService } from "src/services/levels.service";

@Component({
  selector: "app-levelbar",
    templateUrl: "./level_bar.component.html",
    styleUrls: ["./level_bar.component.scss"],
})
export class LevelBarComponent implements OnInit {
  @Input() wordCompleted: boolean = false;

  constructor(public levelBarService : LevelService) {}

  ngOnInit(): void {
    console.log(this.levelBarService.level);
    console.log(this.levelBarService.progress);
  }

  // ngOnChanges(changes:SimpleChanges){
  //   if(changes['wordCompleted'] && this.wordCompleted) this.levelBarService.increaseProgress(20);
  // }
}