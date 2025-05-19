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
    formVisible = false;
    formVisibleMot = false;

    newChild: Partial<Child> = {
        firstName: '',
        lastName: '',
        age: undefined
    };

    newWord: Word = {
        value: '',
        level: 0
    };

    constructor(private childService: ChildService, private wordService: MotService) { }

    toggleForm(): void {
        this.formVisible = !this.formVisible;
    }

    toggleFormMot(): void {
        this.formVisibleMot = !this.formVisibleMot;
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

    onAddWord(): void {
        if (!this.newWord.value || !this.newWord.level) {
            alert('Veuillez remplir tous les champs.');
            return;
        }
        const word: Word = {
            value: this.newWord.value,
            level: this.newWord.level,
        };

        this.wordService.addWord(word as Word);
        console.log('Mot ajouté à la base de données :', word);
        this.formVisibleMot = false;
        this.newWord = { value: '', level: 0};
    }

}
