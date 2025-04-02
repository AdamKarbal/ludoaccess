import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Child } from 'src/models/child.model';
import { serverUrl, httpOptionsBase } from 'src/configs/server.config';
import { CHILD_LIST } from 'src/mocks/child.mock';

@Injectable({
  providedIn: 'root'
})
export class ChildService {

  private childs: Child[] = CHILD_LIST

  public childs$: BehaviorSubject<Child[]>
    = new BehaviorSubject<Child[]>(CHILD_LIST);

  public childSelected$: Subject<Child> = new Subject();

  private childUrl = serverUrl + '/childs';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.retrieveChilds();
  }

  retrieveChilds(): void {
    // this.http.get<Child[]>('').subscribe((childList) => {
    //   this.childs = childList;
    //   this.childs$.next(this.childs);
    // });
  }

  addChilds(child: Child): void {
    this.http.post<Child>(this.childUrl, child, this.httpOptions).subscribe(() => this.retrieveChilds());
  }

  setSelectedChild(childId: string): void {
    const urlWithId = this.childUrl + '/' + childId;
    this.http.get<Child>(urlWithId).subscribe((child) => {
      this.childSelected$.next(child);
    });
  }

  // deleteChild(child: Child): void {
  //   const urlWithId = this.childUrl + '/' + child.id;
  //   this.http.delete<Child>(urlWithId, this.httpOptions).subscribe(() => this.retrieveChilds());
  // }

  deleteChild(child: Child): void {
    this.childs = this.childs.filter(c => c.id !== child.id);
    this.childs$.next([...this.childs]);
  }
  

}
