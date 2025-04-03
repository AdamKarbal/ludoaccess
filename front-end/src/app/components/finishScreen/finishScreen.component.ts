import {Component, OnInit,Input,OnChanges, SimpleChanges} from '@angular/core';

@Component({
    selector: 'app-finishScreen',
    templateUrl: './finishScreen.component.html',
    styleUrls: ['./finishScreen.component.scss'],
})

export class finishComponent implements OnInit,OnChanges{
    constructor(){}
    ngOnInit(): void {
      this.chooseMessage(3);
      this.getFinishScreenText();
}
    currentStep: number = 3; // Étape du Niveau 3
    @Input() reussite : boolean =false;
    @Input() letterGuessed : boolean =false;


    ngOnChanges(changes: SimpleChanges): void {
      if(changes['reussite'] && this.reussite){
        this.chooseMessage(4);
        this.getFinishScreenText();}
        else if (changes['letterGuessed']&& this.letterGuessed==false){
          this.chooseMessage(2);
          this.getFinishScreenText();
        }
        else if(changes['letterGuessed']&& this.letterGuessed){
          this.chooseMessage(1);
          this.getFinishScreenText();
        }
        else{
          this.getFinishScreenText();
        }
        
    }
    

    chooseMessage(etape : number){
      this.currentStep=etape;
    }
  nextStep() {
    switch(this.currentStep){
      case 1 : 
      this.currentStep=2;
      break;
      case 2: 
      this.currentStep=3;
      break;
      case 3: 
      this.currentStep=1;
      break
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
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

