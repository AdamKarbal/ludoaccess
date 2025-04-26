import {Component, OnInit,Input,OnChanges, SimpleChanges} from '@angular/core';
import { SettingsService } from 'src/services/setting.service'; 
import { Subscription } from "rxjs";


@Component({
    selector: 'app-bulle_dialogue',
    templateUrl: './bulle_dialogue.component.html',
    styleUrls: ['./bulle_dialogue.component.scss'],
})

export class BulleDialogueComponent implements OnInit,OnChanges{
  message = { text: '' };
    constructor(private settingsService: SettingsService 
    ){

    }
    ngOnInit(): void {
        this.currentStep = 3; // Étape du Niveau 3
        this.message=this.getMessage();
        this.settingsSub = this.settingsService.settings$.subscribe(settings => {
          if (settings) {
            this.currentFont = settings.choosefont;
            console.log('Font mise à jour :', this.currentFont);
          }
        });
}
  currentFont: string = 'initial';
  private settingsSub!: Subscription;
    currentStep: number = 3; // Étape du Niveau 3
    @Input() reussite : boolean =false;
    @Input() letterGuessed ?: boolean;

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
    }
}