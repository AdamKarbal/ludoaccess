import {Component, OnInit,Input,OnChanges, SimpleChanges} from '@angular/core';
import { SettingsService } from 'src/services/setting.service';
import { Subscription } from "rxjs";
import { Word2GuessComponent } from '../word2guess/word2guess.component';
import { Word2GuessService } from 'src/services/word2guess.services';
import {GameService} from "../../../services/game.service";


@Component({
    selector: 'app-finishScreen',
    templateUrl: './finishScreen.component.html',
    styleUrls: ['./finishScreen.component.scss'],
})

export class finishComponent implements OnInit,OnChanges{
  message = { title: '', subtitle: '', instruction: '' };
  isFinished : boolean  = false;
  currentFont: string = 'initial';
  private settingsSub!: Subscription;
  private wordCompletedSub!: Subscription;

    constructor(private settingsService : SettingsService, private w2gService:Word2GuessService, private gameService: GameService) {}
    ngOnInit(): void {
      this.settingsSub = this.settingsService.settings$.subscribe(settings => {
        if (settings) {
          this.currentFont = settings.choosefont;
          console.log('Font mise à jour :', this.currentFont);
        }
      });
      this.gameService.isGameFinished$.subscribe(isFinished => {
        this.isFinished = isFinished;
      });
      this.wordCompletedSub = this.w2gService.isWordComplete$.subscribe(isComplete => {
        if(!this.hasInitializedMessage){
          this.chooseMessage(3);
          this.message=this.getFinishScreenText();
          this.hasInitializedMessage = true;
          setTimeout(() => {
            this.fadeOut = true;
          }, 4000);
        }
        // this.reussite = isComplete;
        // if (isComplete) {
        //   this.fadeOut = false;
        //   this.chooseMessage(4);  // Mot complet, message de succès
        //   this.message = this.getFinishScreenText();
        // }
      });
    }

    currentStep: number = 3; // Étape du Niveau 3
    reussite : boolean =false;
    letterGuessed ?: boolean;

    hasStarted : boolean = false ;
    fadeOut : boolean = false;
    hasInitializedMessage: boolean = false;


    ngOnChanges(changes: SimpleChanges): void {
    }


    chooseMessage(etape : number){
      this.currentStep=etape;
    }

  getFinishScreenText(): { title: string, subtitle: string, instruction: string } {
    switch (this.currentStep) {
      case 1:
        return { title: "OUI !", subtitle: "C'est ça", instruction: "Tu es sur la bonne voie !" };
      case 2:
        return { title: "Dommage !", subtitle: "Il y a une erreur", instruction: "Ne lache pas !" };
      case 3:
        return { title: "BRAVO !", subtitle: "Tu viens de terminer le niveau", instruction: "Tape au clavier le mot que tu as construit pour passer au niveau suivant !" };
      case 4 :
        return { title: "Félicitations !", subtitle: "Tu as fini tous les niveaux", instruction: "Passons à la suite !" };
      default : return { title: "Oups !", subtitle: "Il semblerait qu'il y ait une erreur", instruction: "Redémarre !" };
    }
  }

  ngOnDestroy(): void {
    if (this.settingsSub) {
      this.settingsSub.unsubscribe();
    }
  }
}

