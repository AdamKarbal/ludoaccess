import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { filter, take as rxjsTake, tap } from "rxjs/operators";
import { combineLatest } from "rxjs";
import { GameService } from "src/services/game.service";
import { Router } from "@angular/router";
import { FreezeGameService } from "src/services/freeze-game.services";
import { PlayerService } from "src/services/player.service";
import { NgZone } from '@angular/core';
import { MiniGameService } from "src/services/minigame.service";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"],
})
export class GameComponent implements OnInit, OnDestroy {
    private _isEtape1: boolean = true;
    private _isEtape2: boolean = false;
    private _isEtape3: boolean = false;
    private _stepSubscriptions: Subscription[] = [];

    constructor(private gameService: GameService, private cdr: ChangeDetectorRef,private router: Router,private freezeGameService: FreezeGameService,private playerService: PlayerService, private ngZone: NgZone, private miniGameService: MiniGameService) {
        console.warn("GameComponent initialized");
        this._isEtape1 = true;
        this._isEtape2 = false;
        this._isEtape3 = false;
    }


    ngOnInit(): void {
        console.warn("C'est parti");
        this.gameService.resetGame();
        this.gameService.destroyStep$ = new Subject<void>();

        this.gameService.motService.words$.subscribe(words => { //Ne remplit le sample que si des mots sont disponibles
            if (words.length > 0) {
                console.log("Les mots sont prêts !");
                this.gameService.fillSample();
                this.gameService.playStep1();
                this.setupStepTransitions();
            }
        });
    }

    ngOnDestroy(): void {
        this._stepSubscriptions.forEach(sub => sub.unsubscribe());
    }

    private setupStepTransitions(): void {
        this._stepSubscriptions.forEach(sub => sub.unsubscribe());

        this._stepSubscriptions = [];

        this._stepSubscriptions.push(
            this.freezeGameService.isNewEvent$.pipe(filter(newEvent => newEvent), rxjsTake(1))
            .subscribe(() => {
                console.log("User exited the game.");
                this.gameService.stopStep(); //peut être stopstep
                this.setStep(1);
                this.playerService.resetPlayer();
            })
        );

        this._stepSubscriptions.push(
            this.gameService.isStep1Completed$.pipe(filter(step1done => step1done), rxjsTake(1))
            .subscribe(() => {
                console.log("Step 1 completed, moving to step 2.");
                this.playerService.resetPlayer();
                this.setStep(2);
                this.gameService.playStep2();
            })
        );

        this._stepSubscriptions.push(
            this.gameService.isStep2Completed$.pipe(filter(step2done => step2done))
            .subscribe(() => {
                console.log("Step 2 completed, moving to step 3.");
                this.setStep(3);
                this.gameService.playStep3();
            })
        );

        this._stepSubscriptions.push(
            this.gameService.isStep3Completed$.pipe(filter(step3done => step3done))
            .subscribe(() => {
                console.log("Étape 3 terminée !");
                if (this.gameService.wordTarget.length > 0) {
                    console.log("Travail plus.");
                    this.playerService.resetPlayer();
                    this.setStep(2);
                    this.gameService.playStep2();
                } else {
                    console.log("Jeu terminé !");
                }
            })
        );
        
      
      this._stepSubscriptions.push(combineLatest([

            this.gameService.isGameFinished$,
            this.gameService.wantToContinue$,
            this.gameService.gameOverObs$,
        ])
        .pipe(filter(([isFinished, wantToContinue,gameOver]) => (isFinished && wantToContinue)||(gameOver&&wantToContinue)),tap(([isFinished, wantToContinue, gameOver]) => {
    console.log('isFinished:', isFinished);
    console.log('wantToContinue:', wantToContinue);
    console.log('gameOver:', gameOver);
  }), rxjsTake(1))
        .subscribe(() => {
            console.log("Jeu terminé et utilisateur veut continuer !");

            // 1. Masquer d’abord toutes les étapes
            this.setStep(-1);

            // ✅ Empêche les déclenchements parasites
            this.ngZone.runOutsideAngular(() => {
                    requestAnimationFrame(() => {
                        this.ngZone.run(() => {
                        this.gameService.resetGame();
                        this.setStep(1);
                        this.gameService.fillSample();
                        this.gameService.playStep1();
                        this.setupStepTransitions();
                        });
                    });
                    });
          }));
          this._stepSubscriptions.push(combineLatest([
            this.gameService.isGameFinished$,
            this.gameService.wantToExit$,
            this.gameService.gameOverObs$,
        ])
        .pipe(filter(([isFinished, wantToExit,gameOver]) => (isFinished && wantToExit)||(gameOver&&wantToExit)), rxjsTake(1))
        .subscribe(() => {
            console.log("Jeu terminé et utilisateur veut quitter !");
            this.setStep(1);
            // this.gameService.resetGame(); // Redémarre le jeu
            this.gameService.changeStep("/acceuil"); 
          }));

    }

    getStep(): number {
        if (this._isEtape1 && !this._isEtape2 && !this._isEtape3) return 1;
        else if (!this._isEtape1 && this._isEtape2 && !this._isEtape3) return 2;
        else if (!this._isEtape1 && !this._isEtape2 && this._isEtape3) return 3;
        else return -1;
    }

    setStep(step: number): void {
     console.log("setStep called with: ", step);
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
