import {Component, OnInit,Input,OnChanges, SimpleChanges} from '@angular/core';



@Component({
    selector: 'app-finishScreen',
    templateUrl: './finishScreen.component.html',
    styleUrls: ['./finishScreen.component.scss'],
})

export class finishComponent implements OnInit,OnChanges{
  message = { title: '', subtitle: '', instruction: '' };
    constructor(){}
    ngOnInit(): void {
      
     
}
    currentStep: number = 3; // Étape du Niveau 3
    @Input() reussite : boolean =false;
    @Input() letterGuessed ?: boolean;

    hasStarted : boolean = false ;
    fadeOut : boolean = false;
    hasInitializedMessage: boolean = false;


    ngOnChanges(changes: SimpleChanges): void {
      if(!this.hasInitializedMessage){
        this.chooseMessage(3);
        this.message=this.getFinishScreenText();
        this.hasInitializedMessage = true;
        setTimeout(() => {
          this.fadeOut = true;
        }, 4000);
      }
      if (changes['letterGuessed']) {
        console.log("CHANGEMENT letterGuessed: ", changes['letterGuessed']);
  
        // Ignore les premiers changements tant que le joueur n'a pas commencé
        if (!this.hasStarted && changes['letterGuessed'].currentValue !== undefined) {
          this.hasStarted = true;
        }
  
      //   if (this.hasStarted) {
      //     if (this.letterGuessed === false) {
      //       this.chooseMessage(2); // Mauvaise lettre
      //     } else if (this.letterGuessed === true) {
      //       this.chooseMessage(1); // Bonne lettre
      //     }
      //     this.message = this.getFinishScreenText();
      //   }
       }
  
      if (changes['reussite'] && this.reussite) {
        this.fadeOut = false; // Réinitialiser fadeOut pour le nouvel écran de fin
        this.chooseMessage(4);
        this.message = this.getFinishScreenText();
      }
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
}

