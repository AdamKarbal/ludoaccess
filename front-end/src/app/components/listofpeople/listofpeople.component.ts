import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ChildService } from 'src/services/child.services';
import { ErgoService } from 'src/services/ergo.service';
import { User } from 'src/models/user.model'; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listofpeople',
  templateUrl: './listofpeople.component.html',
  styleUrls: ['./listofpeople.component.scss']
})
export class ListOfPeopleComponent implements OnInit {
  public peopleList$: Observable<User[]>; 

  @Output() userSelected = new EventEmitter<User>();  

  selectedId: string | null = null;

  constructor(
    private childService: ChildService,
    private ergotherapistService: ErgoService
  ) {
    this.peopleList$ = this.combinePeopleLists();
  }

  ngOnInit(): void {}

  onPersonSelected(user: User) {
    this.userSelected.emit(user); 
    this.selectedId = user.id;
  }

  private combinePeopleLists(): Observable<User[]> {
    const children$ = this.childService.childs$;
    const ergotherapists$ = this.ergotherapistService.ergotherapists$;

    return new Observable<User[]>((observer) => {
      children$.subscribe((children) => {
        ergotherapists$.subscribe((ergotherapists) => {
          observer.next([...children, ...ergotherapists]);
        });
      });
    });
  }
}
