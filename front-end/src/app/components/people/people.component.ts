import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent {
  @Input() person!: User;
  @Input() isSelected: boolean = false;  // Ajoute cet input pour recevoir la valeur de isSelected
  @Output() personSelected = new EventEmitter<User>();  // Émet l'utilisateur sélectionné

  onClick() {
    this.isSelected = !this.isSelected;  // Change l'état sélectionné/désélectionné
    this.personSelected.emit(this.person);  // Émet l'utilisateur sélectionné
  }
}
