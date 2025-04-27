import { Component } from "@angular/core";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"],
})

export class GameComponent{
    private _isEtape1 : boolean;
    private _isEtape2 : boolean;
    private _isEtape3 : boolean;

    constructor() {
        this._isEtape1 = true;
        this._isEtape2 = false;
        this._isEtape3 = false;
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

