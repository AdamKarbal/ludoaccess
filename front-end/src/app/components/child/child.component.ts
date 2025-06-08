import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Child } from 'src/models/child.model';
import { Router } from '@angular/router';
import {ChildService} from "../../../services/child.services";

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})

export class ChildComponent {

  @Input() child!: { id: number } & Child;
  @Input() isSelected: boolean = false;

  @Output() deleteChild: EventEmitter<Child> = new EventEmitter<Child>();
  @Output() childClicked = new EventEmitter<number>();

  constructor(private router : Router, private childService: ChildService) { }

  onClick(): void {
    this.childClicked.emit(this.child.id);
  }


  delete(event: MouseEvent): void {
    event.stopPropagation();
    if (confirm(`Supprimer ${this.child.firstName} ${this.child.lastName} ?`)) {
      this.deleteChild.emit(this.child);
    }
  }

  goToWords() : void {
    this.childService.setSelectedChild(this.child.id);
    this.router.navigate(['/mots']);
  }

}
