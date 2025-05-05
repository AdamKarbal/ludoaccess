import { Component, OnInit, OnChanges, ChangeDetectorRef } from "@angular/core";
import { Subscription } from "rxjs";
import { filter, take as rxjsTake, tap} from "rxjs/operators";
import { combineLatest } from "rxjs";
import { GameService } from "src/services/game.service";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"],
})

export class GameComponent implements OnInit {
    private _isEtape1: boolean;
    private _isEtape2: boolean;
    private _isEtape3: boolean;
    private _stepSubscriptions: Subscription[] = [];

    constructor(private gameService: GameService, private cdr: ChangeDetectorRef) {
        this._isEtape1 = true;
        this._isEtape2 = false;
        this._isEtape3 = false;
    }

    ngOnInit(): void {
        this.gameService.fillSample();
        this.gameService.playStep1();
        this.setupStepTransitions();
    }

    ngOnDestroy(): void {
        this._stepSubscriptions.forEach(sub => sub.unsubscribe());
    }

    private setupStepTransitions(): void {
        this._stepSubscriptions.push(
            this.gameService.isStep1Completed$.pipe(
                filter(step1done => step1done),
                rxjsTake(1)
            ).subscribe(() => {
                console.log("Step 1 completed, moving to step 2.");
                this.setStep(2);
                this.gameService.playStep2();
            })
        );
        this._stepSubscriptions.push(
            this.gameService.isStep2Completed$.pipe(
                filter(step2done => step2done)
            ).subscribe(() => {
                console.log("Step 2 completed, moving to step 3.");
                this.setStep(3);
                this.gameService.playStep3();
            })
        );
        this._stepSubscriptions.push(
            this.gameService.isStep3Completed$.pipe(
                filter(step3done => step3done)
            ).subscribe(() => {
                console.log("Swaoeakazoeka");
                
                if (this.gameService.wordTarget.length > 0) {
                    console.log("Travail plus.");
                    this.setStep(2);
                    this.gameService.playStep2();
                } else {
                    console.log("jeu fini ezzzz");
                    
                }
            })
        );
        combineLatest([
            this.gameService.isGameFinished$,
            this.gameService.wantToContinue$
          ])
          .pipe(
            filter(([isFinished, wantToContinue]) => isFinished && wantToContinue),
            rxjsTake(1)
          )
          .subscribe(() => {
            console.log("Jeu terminé et utilisateur veut continuer !");
            this.gameService.continue();
            this.setStep(1);
            this.gameService.fillSample();
            this.gameService.playStep1();
            this.setupStepTransitions(); // Redémarre les transitions d'étape
          });
          combineLatest([
            this.gameService.isGameFinished$,
            this.gameService.wantToExit$
          ])
          .pipe(
            filter(([isFinished, wantToExit]) => isFinished && wantToExit),
            rxjsTake(1)
          )
          .subscribe(() => {
            console.log("Jeu terminé et utilisateur veut quitter !");
            this.setStep(1);
            this.gameService.changeStep("/acceuil"); // Redémarre le jeu
            
            this.gameService.resetGame(); // Redémarre le jeu
          });
    }

    getStep(): number {
        if (this._isEtape1 && !this._isEtape2 && !this._isEtape3) return 1;
        else if (!this._isEtape1 && this._isEtape2 && !this._isEtape3) return 2;
        else if (!this._isEtape1 && !this._isEtape2 && this._isEtape3) return 3;
        else {
            return -1;
        }
    }

    setStep(step: number): void {
        this._isEtape1 = false;
        this._isEtape2 = false;
        this._isEtape3 = false;

        switch (step) {
            case 1:
                this._isEtape1 = true;
                break;
            case 2:
                this._isEtape2 = true;
                break;
            case 3:
                this._isEtape3 = true;
                break;
            default:
                console.error("Wrong step passed into setter.");
                break;
        }
        this.cdr.detectChanges();
    }

    
    
}

