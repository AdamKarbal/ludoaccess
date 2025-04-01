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
  updateProgress(newValue: number) {
    this.progress = Math.max(0, Math.min(100, newValue)); // Assure que la valeur reste entre 0 et 100
  }
}