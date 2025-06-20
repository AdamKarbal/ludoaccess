import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FreezeGameService } from "src/services/freeze-game.services"; 
import { Router } from "@angular/router";
import { GameService } from "src/services/game.service";
import { FinalMessageService } from "src/services/final-message.service";
import { CoeurService } from 'src/services/coeurs.services';
import { filter, take } from "rxjs";

@Component({
  selector: 'app-gameover',
  templateUrl: './gameover.component.html',
  styleUrls: ['./gameover.component.scss'],
})

export class GameoverComponent {
    @Input() message: string = "Game Over !";
    @Output() replay = new EventEmitter<void>();
  
    public isGameOver: boolean = false;

    ngOnInit(): void {

    
    }

    constructor(private freezeGame: FreezeGameService,public finalMessageService: FinalMessageService,private coeurService:CoeurService, private router: Router) {
    
        this.freezeGame.isPaused$.subscribe(paused => {
            console.log(`Paused: ${paused}`);
        });
        this.freezeGame.isCrossed$.subscribe(crossed => {
            console.log(`Crossed: ${crossed}`);
        });
        this.coeurService.isGameOver$.subscribe(isGameOver => {
                this.isGameOver = isGameOver;
                console.log(`isGameOver: ${this.isGameOver}`);

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
        this.isGameOver=bool;
    }
    get isGameFinishedValue() : boolean {
        return this.isGameOver;
    }
}