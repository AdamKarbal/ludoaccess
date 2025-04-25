import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ergo } from 'src/models/ergo.model';
import { ERGOTHERAPIST_LIST } from 'src/mocks/ergo.mock';

@Injectable({
  providedIn: 'root'
})

export class ErgoService {

  private ergotherapists: Ergo[] = ERGOTHERAPIST_LIST;

  public ergotherapists$: BehaviorSubject<Ergo[]>
    = new BehaviorSubject<Ergo[]>(ERGOTHERAPIST_LIST); 

  public ergotherapistSelected$: BehaviorSubject<Ergo | null> = new BehaviorSubject<Ergo | null>(null);

  constructor() {}
  retrieveErgotherapists(): void {
    this.ergotherapists$.next(this.ergotherapists);
  }

  setSelectedErgotherapist(ergoId: string): void {
    const selectedErgo = this.ergotherapists.find(e => e.id === ergoId) || null;
    this.ergotherapistSelected$.next(selectedErgo);
  }
}
