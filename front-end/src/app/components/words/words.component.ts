import { Component } from '@angular/core';
import { ChildService } from 'src/services/child.services';
import { MotService } from 'src/services/mot.service';
import { Word } from 'src/models/word.model';
import { Child } from 'src/models/child.model';

@Component({
  selector : 'app-words',
  templateUrl : './words.component.html',
  styleUrls : ['./words.component.scss']
})

export class WordsComponent {
  selectedChild : Child | null = null;

  constructor(private childService: ChildService, private wordService: MotService) {
    this.wordService.words$.subscribe(words => {
      this.allWords = words;});


    this.childService.childSelected$.subscribe(child => {
      console.log('child selected:', child);
      this.selectedChild = child;
    })
  }

  allWords: Word[] = this.wordService.wordsList;
  formVisibleMot = false;
  filtrerClicked = true;

  newChild: Partial<Child> = {
    firstName: '',
    lastName: '',
    age: undefined
  };

  newWord: Word = {
    value: '',
    level: 0,
    childId: null,
  };

  toDelWord: Word ={
    value: '',
    level: 1,
    childId: null,
  }

  toggleFormMot(): void {
    this.formVisibleMot = !this.formVisibleMot;
  }

  onAddWord(): void {
    if (!this.newWord.value || !this.newWord.level) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
    const word: Word = {
      value: this.newWord.value,
      level: Number(this.newWord.level),
      childId: this.selectedChild ? this.selectedChild.id : null
    };
    this.wordService.addWord(word as Word);
    console.log('Mot ajouté à la base de données :', word);
    this.formVisibleMot = false;
    this.newWord = { value: '', level: 1, childId: null };
  }

  onFiltrer(): void {
    this.filtrerClicked = true;
  }

  onDeleteWord(word: Word): void {
    this.wordService.deleteWord(word);
    console.log('Mot supprimé :', word);
  }

  get easyWords() {
    return this.allWords.filter(w => Number(w.level) === 1 && (w.childId == null || w.childId === this.selectedChild?.id));
  }

  get mediumWords() {
    return this.allWords.filter(w => Number(w.level) === 2 && (w.childId == null || w.childId === this.selectedChild?.id));
  }

  get hardWords() {
    return this.allWords.filter(w => Number(w.level) === 3 && (w.childId == null || w.childId === this.selectedChild?.id));
  }

}
