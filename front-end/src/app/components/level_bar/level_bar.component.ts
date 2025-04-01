import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-levelbar",
    templateUrl: "./level_bar.component.html",
    styleUrls: ["./level_bar.component.scss"],
})
export class LevelBarComponent {
  constructor() {}
  ngOnInit(): void {}
  progress: number = 35;
  level:number = 0;
  increaseProgress(amount: number) {
    this.progress += amount;

    if (this.progress >= 100) {
      this.levelUp();
    }
  }
  levelUp() {
    this.level++;
    this.progress = 0; // Réinitialise la progression pour le nouveau niveau
  }
}