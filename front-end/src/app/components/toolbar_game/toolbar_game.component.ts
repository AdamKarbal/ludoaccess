import { Component, OnInit } from "@angular/core";
import { FreezeGameService } from "src/services/freeze-game.services"; 
import { Router } from "@angular/router";
import { GameService } from "src/services/game.service";

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

  constructor(private freezeGame: FreezeGameService, private router: Router, private gameService : GameService) {
    this.freezeGame.isPaused$.subscribe(paused => {
      this.isPaused = paused;
      console.log(`Paused: ${this.isPaused}`);
    });
    this.freezeGame.isCrossed$.subscribe(crossed => {
      this.isCrossed = crossed;
      console.log(`Crossed: ${this.isCrossed}`);
    });
    this.freezeGame.isInfo$.subscribe(info => {
      this.isInfo = info;
      console.log(`Info: ${this.isInfo}`);
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

  OnInfoClick() {
    this.isInfo=!this.isInfo; // Toggle the info state
    console.log("Info clicked");
    this.freezeGame.setInfoState(this.isInfo); // Update the info state in the service
  }

  navigateToSettings() {
    this.freezeGame.resume(); // Resume the game before navigating
    this.gameService.changeStep('/reglage');  // Redirige vers la page des paramètres
  }
  navigateToHome() {
    this.freezeGame.resume(); // Resume the game before navigating
    this.gameService.changeStep('/');;  // Redirige vers la page des paramètres
  }
  navigateToStats() {
    this.freezeGame.resume(); // Resume the game before navigating
    this.gameService.changeStep('/stats');  // Redirige vers la page des paramètres
  }
}