import { Component, Input, OnInit, SimpleChanges,OnChanges } from "@angular/core";

@Component({
  selector: "app-levelbar",
    templateUrl: "./level_bar.component.html",
    styleUrls: ["./level_bar.component.scss"],
})
export class LevelBarComponent implements OnInit, OnChanges {
  constructor() {}
  ngOnInit(): void {}
  @Input() progress: number = 35;
  level:number = 0;
  @Input() wordCompleted: boolean = false;

  ngOnChanges(changes:SimpleChanges){
    if(changes['wordCompleted'] && this.wordCompleted)this.increaseProgress(20)
  }
  increaseProgress(progress: number) {
    this.progress += progress;

    if (this.progress >= 100) {
      this.levelUp();
    }
  }
  levelUp() {
    this.level++;
    this.progress = 0; // Réinitialise la progression pour le nouveau niveau
  }
}