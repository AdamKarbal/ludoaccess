import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Child } from 'src/models/child.model';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})

export class ChildComponent {

  @Input() child!: { id: string } & Child;
  @Input() isSelected: boolean = false; 

  @Output() deleteChild: EventEmitter<Child> = new EventEmitter<Child>();
  @Output() childClicked = new EventEmitter<string>();

  constructor() {}

  onClick(): void {
    this.childClicked.emit(this.child.id);
  }
  

  delete(event: MouseEvent): void {
    event.stopPropagation();
    if (confirm(`Supprimer ${this.child.firstName} ${this.child.lastName} ?`)) {
      this.deleteChild.emit(this.child);
    }
  }
}
