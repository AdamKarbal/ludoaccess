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
    private audio = new Audio();

    ngOnInit(): void {
      this.audio.src = 'assets/sons/win.mp3';
      this.audio.load();


      this.gameService.isGameFinished$.subscribe(isFinished => {
        this.isGameFinished = isFinished;

        if(isFinished) {
          this.audio?.play().catch(err => {
            console.warn('Erreur lors de la lecture audio :', err);
          });
        }
        else {
          this.audio?.pause();
        }

      });


    }

    constructor(private freezeGame: FreezeGameService,
                private gameService : GameService,
                public finalMessageService: FinalMessageService,
                private router: Router) {

        this.freezeGame.isPaused$.subscribe(paused => {
            console.log(`Paused: ${paused}`);
        });
        this.freezeGame.isCrossed$.subscribe(crossed => {
            console.log(`Crossed: ${crossed}`);
        });

    }

    OnContinueClick() {

        this.finalMessageService.setWantToContinue();
        console.log("Continue clicked, want to continue set to true.");
        this.setGameFinished(false);
    }
    OnStopClick() {

        this.finalMessageService.setWantToExit();
        console.log("Stop clicked, want to exit set to true.");
        this.setGameFinished(false);
    }

    setGameFinished(bool : boolean){
        this.isGameFinished=bool;
    }

}

