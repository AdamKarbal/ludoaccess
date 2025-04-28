import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent {
  @Input() person!: User;
  @Input() isSelected: boolean = false;  
  @Output() personSelected = new EventEmitter<User>();  

  onClick() {
    this.isSelected = !this.isSelected;  
    this.personSelected.emit(this.person); 
  }
}
