import { Component, OnInit } from '@angular/core';
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
  public peopleList$: Observable<User[]>; // Une liste observable de tous les utilisateurs

  constructor(
    private childService: ChildService,
    private ergotherapistService: ErgoService
  ) {
    // Combine les deux services, les enfants et les ergothérapeutes
    this.peopleList$ = this.combinePeopleLists();
  }

  ngOnInit(): void {}

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
