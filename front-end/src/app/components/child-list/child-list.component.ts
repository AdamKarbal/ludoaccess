import {Component, OnInit } from '@angular/core';
import {ChildService} from 'src/services/child.services';
import {Child} from 'src/models/child.model';

@Component({
  selector: 'app-child-list',
  templateUrl: './child-list.component.html',
  styleUrls: ['./child-list.component.scss']
})

export class ChildListComponent implements OnInit {

  public childList: Child[] = [];
  public selectedChildId: string | null = null; 

  constructor(private childService: ChildService) {
    this.childService.childs$.subscribe((childs: Child[]) => {
      this.childList = childs;
    });
  }

  ngOnInit(): void {}

  onChildClicked(childId: string): void {
    this.selectedChildId = this.selectedChildId === childId ? null : childId;
  }

  deleteChild(child: Child): void {
    this.childService.deleteChild(child);
  }
}
