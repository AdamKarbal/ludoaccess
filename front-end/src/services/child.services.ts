import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Child } from 'src/models/child.model';
import { SettingsService } from './setting.service';
import { ChildSettings } from 'src/models/setting.model';
import {httpOptionsBase} from "../configs/server.config";
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChildService {

  private childs: Child[] = []

  public childs$: BehaviorSubject<Child[]>
    = new BehaviorSubject<Child[]>([]);

  public childSelected$: BehaviorSubject<Child | null> = new BehaviorSubject<Child | null>(null);

  private childUrl = environment.serverUrl + '/childs';
  private settingsUrl = environment.serverUrl + '/settings';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient,private settingsService: SettingsService) {
    this.retrieveChilds();
  }

  retrieveChilds(): void {
     this.http.get<Child[]>(this.childUrl).subscribe((childList) => {
       this.childs = childList;
       this.childs$.next(this.childs);
     });


  }

  addChilds(child: Child): void {
    this.http.post<Child>(this.childUrl, child, this.httpOptions).subscribe((newChild) => {
      console.log('Enfant ajouté dans le service :', newChild);
      this.retrieveChilds();
    });
  }


  setSelectedChild(childId: number): void {
    const urlWithId = this.childUrl + '/' + childId;
    this.http.get<Child>(urlWithId).subscribe((child) => {
      this.childSelected$.next(child);
    });
  }

   deleteChild(child: Child): void {
     const urlWithId = this.childUrl + '/' + child.id;
     this.http.delete<Child>(urlWithId, this.httpOptions).subscribe(() => this.retrieveChilds());
   }

  // deleteChild(child: Child): void {
  //   this.childs = this.childs.filter(c => c.id !== child.id);
  //   this.childs$.next([...this.childs]);
  // }


}
