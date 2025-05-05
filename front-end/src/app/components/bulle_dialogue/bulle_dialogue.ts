import {Component, OnInit,Input,OnChanges, SimpleChanges} from '@angular/core';
import { SettingsService } from 'src/services/setting.service'; 
import { Word2GuessService } from 'src/services/word2guess.services';
import { Subscription } from "rxjs";


@Component({
    selector: 'app-bulle_dialogue',
    templateUrl: './bulle_dialogue.component.html',
    styleUrls: ['./bulle_dialogue.component.scss'],
})

export class BulleDialogueComponent implements OnInit,OnChanges{

  message = { text: '' };
  private letterGuessedSub!: Subscription;
  private wordCompletedSub!: Subscription;
  private settingsSub!: Subscription;

  letterGuessed: boolean | null = null;
  reussite: boolean = false;

    constructor(private settingsService: SettingsService,private word2GuessService: Word2GuessService 
    ){

    }
    ngOnInit(): void {
        this.currentStep = 3; 
        this.message=this.getMessage();
        this.settingsSub = this.settingsService.settings$.subscribe(settings => {
          if (settings) {
            this.currentFont = settings.choosefont;
            this.currentSize = settings.lettersize;
            console.log('Font mise à jour :', this.currentFont);
          }
        });
    this.letterGuessedSub = this.word2GuessService.letterGuessed$.subscribe(isCorrect => {
      if (isCorrect === null) return;  // Ignorer si pas encore de lettre devinée
      this.letterGuessed = isCorrect;
      this.chooseMessage(isCorrect ? 1 : 2);  // Message en fonction de la lettre devinée
      this.message = this.getMessage();
    });

    this.wordCompletedSub = this.word2GuessService.isWordComplete$.subscribe(isComplete => {
      this.reussite = isComplete;
      if (isComplete) {
        this.chooseMessage(4);  // Mot complet, message de succès
        this.message = this.getMessage();
      }
    });
}
    currentFont: string = 'initial';
    currentStep: number = 3; // Étape du Niveau 3
    currentSize : number = 16;

    hasStarted : boolean = false ;

    ngOnChanges(changes: SimpleChanges): void {
      if (changes['letterGuessed']) {
        console.log("CHANGEMENT letterGuessed: ", changes['letterGuessed']);

        // Ignore les premiers changements tant que le joueur n'a pas commencé
        if (!this.hasStarted && changes['letterGuessed'].currentValue !== undefined) {
          this.hasStarted = true;
        }

        if (this.hasStarted) {
          if (this.letterGuessed === false) {
            this.chooseMessage(2); // Mauvaise lettre
          } else if (this.letterGuessed === true) {
            this.chooseMessage(1); // Bonne lettre
          }
          this.message = this.getMessage();
        }
      }

      if (changes['reussite'] && this.reussite) {
        this.chooseMessage(4);
        this.message = this.getMessage();
      }
    }
    


    chooseMessage(etape : number){
      this.currentStep=etape;
    }

    getMessage() {
      switch (this.currentStep) {
        case 1:
          return { text: 'C\'est ça !' };
        case 2:
          return { text: 'Tu y\'es presque !' };
        case 3:
          return { text: 'Tape ce mot au clavier pour continuer à jouer !' };
        case 4:
          return { text: 'Bravo passons à la suite !' };
        default:
          return { text: 'Oups ...' };
      }
    }

    ngOnDestroy(): void {
      if (this.settingsSub) {
        this.settingsSub.unsubscribe(); 
      }
      this.letterGuessedSub?.unsubscribe();
    this.wordCompletedSub?.unsubscribe();
    }
}