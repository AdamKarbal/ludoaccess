import { Component } from '@angular/core';
import { ChildService } from 'src/services/child.services';
import { MotService } from 'src/services/mot.service';
import { Word } from 'src/models/word.model';
import { Child } from 'src/models/child.model';
import { Level } from 'src/models/level.model';

@Component({
    selector: 'app-reglage',
    templateUrl: './reglage.component.html',
    styleUrls: ['./reglage.component.scss']
})
export class ReglagePageComponent {
    allWords: Word[] = this.wordService.wordsList;
    formVisible = false;

    newChild: Partial<Child> = {
        firstName: '',
        lastName: '',
        age: undefined
    };

    newLevel: Partial<Level> = {
        childId: this.newChild.id,
        level: 0,
    };


    constructor(private childService: ChildService, private wordService: MotService) {
        this.wordService.words$.subscribe(words => {
        this.allWords = words;});
     }

    toggleForm(): void {
        this.formVisible = !this.formVisible;
    }


    onAddChild(): void {
        if (!this.newChild.firstName || !this.newChild.lastName || !this.newChild.age) {
            alert('Veuillez remplir tous les champs.');
            return;
        }
        
            
        const child: Partial<Child> = {
            firstName: this.newChild.firstName,
            lastName: this.newChild.lastName,
            age: this.newChild.age,
            imageUrl: "assets/ressources/e1.jpg",
            level: 0,
            lastPlayed: new Date(),
            playDuration: 0,
            frequency: 0,
            role: 'child'
        };
        this.childService.addChilds(child as Child);
        console.log('Enfant ajouté dans Reglage (sans ID) :', child);
        this.formVisible = false;
        this.newChild = { firstName: '', lastName: '', age: undefined };
    }
}
