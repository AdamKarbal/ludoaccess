import { Component, OnInit } from "@angular/core";
import { FreezeGameService } from "src/services/freeze-game.services"; 
import { Router } from "@angular/router";
import { GameService } from "src/services/game.service";
import { FinalMessageService } from "src/services/final-message.service";
import { filter, take } from "rxjs";

@Component({
  selector: "app-final-screen",
  templateUrl: "./finalScreen.component.html",
  styleUrls: ["./finalScreen.component.scss"],
})
export class FinalScreenComponent implements OnInit {

    public isGameFinished: boolean = false;

    ngOnInit(): void {

    
    }

    constructor(private freezeGame: FreezeGameService,  private gameService : GameService,public finalMessageService: FinalMessageService, private router: Router) {
    
        this.freezeGame.isPaused$.subscribe(paused => {
            console.log(`Paused: ${paused}`);
        });
        this.freezeGame.isCrossed$.subscribe(crossed => {
            console.log(`Crossed: ${crossed}`);
        });
        this.gameService.isGameFinished$.pipe(filter(finished=>finished),take(1)).subscribe(finished => {
            this.isGameFinished = finished;
            console.log(`Game Finished: ${this.isGameFinished}`);
        });
    }

    OnContinueClick() {
        this.finalMessageService.setWantToContinue();
        console.log("Continue clicked, want to continue set to true.");
    }
    OnStopClick() {
        this.isGameFinished=false;
        this.finalMessageService.setWantToExit();
        console.log("Stop clicked, want to exit set to true.");
    }
    
} 

