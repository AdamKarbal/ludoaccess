import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ChildService } from 'src/services/child.services';
import { ErgoService } from 'src/services/ergo.service';
import { User } from 'src/models/user.model'; 
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-listofpeople',
  templateUrl: './listofpeople.component.html',
  styleUrls: ['./listofpeople.component.scss']
})
export class ListOfPeopleComponent implements OnInit {
  public peopleList$: Observable<User[]>; 

  @Output() userSelected = new EventEmitter<User>();  

  selectedId: number | null = null;

  constructor(
    private childService: ChildService,
    private ergotherapistService: ErgoService
  ) {
    this.peopleList$ = this.combinePeopleLists();
  }

  ngOnInit(): void {}

onPersonSelected(user: User) {
  if (this.selectedId === user.id) {
    this.userSelected.emit(undefined);
    this.selectedId = null;
  } else {
    this.userSelected.emit(user);
    this.selectedId = user.id;
  }
}

  private combinePeopleLists(): Observable<User[]> {
    const children$ = this.childService.childs$;
    const ergotherapists$ = this.ergotherapistService.ergos$;
    return combineLatest([children$, ergotherapists$]).pipe(
      map(([children, ergotherapists]) => [...children, ...ergotherapists]) 
    );
  }
}