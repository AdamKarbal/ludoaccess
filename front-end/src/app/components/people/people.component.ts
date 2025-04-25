import { Component, Input } from '@angular/core';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent {
  @Input() person!: User;


}
