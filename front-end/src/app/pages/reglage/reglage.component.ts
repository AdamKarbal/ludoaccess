import { Component } from '@angular/core';
import { ChildService } from 'src/services/child.services';
import { MotService } from 'src/services/mot.service';
import { Word } from 'src/models/word.model';
import { Child } from 'src/models/child.model';

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
        const randomIndex = Math.floor(Math.random() * 4) + 1;
        const imageUrl = `assets/ressources/e${randomIndex}.jpg`;
        const child: Partial<Child> = {
            firstName: this.newChild.firstName,
            lastName: this.newChild.lastName,
            age: this.newChild.age,
            imageUrl: imageUrl,
            level: 1,
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
