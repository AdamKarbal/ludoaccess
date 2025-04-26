import { Component, OnInit } from "@angular/core";
import { FreezeGameService } from "src/services/freeze-game.services"; 

@Component({
  selector: "app-toolbar-game",
    templateUrl: "./toolbar_game.component.html",
    styleUrls: ["./toolbar_game.component.scss"],
})
export class ToolbarGameComponent {

  ngOnInit(): void {}

  isPaused = false;
  isCrossed = false;
  isInfo=false;

  constructor(private freezeGame: FreezeGameService) {
    this.freezeGame.isPaused$.subscribe(paused => {
      this.isPaused = paused;
    });
    this.freezeGame.isCrossed$.subscribe(crossed => {
      this.isCrossed = crossed;
    });
    this.freezeGame.isInfo$.subscribe(info => {
      this.isInfo = info;
    });
  }

  OnPauseClick() {
    this.freezeGame.pause()
  }

  OnExitClick() {
    this.freezeGame.exit();
  }
  
  OnResumeClick() {
    this.freezeGame.resume();
    this.isCrossed = false; // Reset the crossed state when resuming
  }
}