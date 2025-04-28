import { Component, OnInit, OnChanges, ChangeDetectorRef } from "@angular/core";
import { filter, take as rxjsTake, tap } from "rxjs/operators";
import { GameService } from "src/services/game.service";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"],
})

export class GameComponent{
    private _isEtape1 : boolean;
    private _isEtape2 : boolean;
    private _isEtape3 : boolean;

    constructor(private gameService : GameService, private cdr: ChangeDetectorRef) {
        this._isEtape1 = true;
        this._isEtape2 = false;
        this._isEtape3 = false;
    }

    ngOnInit() : void{
        this.gameService.fillSample();
        this.gameService.playStep1();
        this.gameService.isStep1Completed$.pipe(filter(step1done => step1done),rxjsTake(1)).subscribe(() => {
                console.log("Step 1 completed, moving to step 2.");
                this.setStep(2);
                    setTimeout(()=>this.gameService.playStep2());
            });
    
        this.gameService.isStep2Completed$.pipe(filter(step2done => step2done),rxjsTake(1)).subscribe(() => {
                console.log("Step 2 completed, moving to step 3.");
                this.setStep(3);
                    setTimeout(()=>this.gameService.playStep3());
            });
            this.gameService.isStep3Completed$.pipe(filter(step3done => step3done),rxjsTake(1)).subscribe(() => {
                console.log("Step 3 completed, moving to step 2 again.");
                this.setStep(2);
                    setTimeout(()=>this.gameService.playStep2());
            }
            );

    }
    

    getStep() : number {
        if(this._isEtape1 === true && this._isEtape2 === false && this._isEtape3 === false) return 1;
        else if(this._isEtape1 === false && this._isEtape2 === true && this._isEtape3 === false) return 2;
        else if(this._isEtape1 === false && this._isEtape2 === false && this._isEtape3 === true) return 3;
        else{
            console.error("Unexpected behavior of steps");
            return -1;
        }
    }

    setStep(step : number) : void{
        switch(step){
            case 1:
                this._isEtape1 = true;
                this._isEtape2 = false;
                this._isEtape3 = false;
                break;
            case 2:
                this._isEtape1 = false;
                this._isEtape2 = true;
                this._isEtape3 = false;
                break; 
            case 3:
                this._isEtape1 = false;
                this._isEtape2 = false;
                this._isEtape3 = true;
                break;
            default:
                console.error("Wrong step passed into setter.");
                break;
        }
    }

}


