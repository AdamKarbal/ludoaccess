import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FreezeGameService } from "src/services/freeze-game.services"; 
import { Router } from "@angular/router";
import { GameService } from "src/services/game.service";
import { FinalMessageService } from "src/services/final-message.service";
import { filter, take } from "rxjs";

@Component({
  selector: 'app-gameover',
  templateUrl: './gameover.component.html',
  styleUrls: ['./gameover.component.scss'],
})

export class GameoverComponent {
    @Input() message: string = "Game Over !";
    @Output() replay = new EventEmitter<void>();
  
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
        this.gameService.isGameFinished$.subscribe(finished => {
            this.isGameFinished = finished;
            console.log(`Game Finished: ${this.isGameFinished}`);
        });
    }

    OnContinueClick() {
        console.log("Continue clicked, want to continue set to true.");
        this.finalMessageService.setWantToContinue();
        // this.setGameFinished(false);
    }
    OnStopClick() {
        console.log("Stop clicked, want to exit set to true.");
        this.finalMessageService.setWantToExit();
        // this.setGameFinished(false);
    }

    setGameFinished(bool : boolean){
        this.isGameFinished=bool;
    }
}