import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ergo } from 'src/models/ergo.model';
import { ERGOTHERAPIST_LIST } from 'src/mocks/ergo.mock';
import { serverUrl, httpOptionsBase } from 'src/configs/server.config';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class ErgoService {

  private ergos: Ergo[] = [];

  public ergos$: BehaviorSubject<Ergo[]>
    = new BehaviorSubject<Ergo[]>([]);

  public ergotherapistSelected$: BehaviorSubject<Ergo | null> = new BehaviorSubject<Ergo | null>(null);

  private ergoUrl = serverUrl + '/ergos';
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.retrieveErgotherapists();
  }

  retrieveErgotherapists(): void {
    this.http.get<Ergo[]>(this.ergoUrl).subscribe((ergoList) => {
      this.ergos = ergoList;
      this.ergos$.next(this.ergos);
    });
  }

  setSelectedErgotherapist(ergoId: number): void {
    const selectedErgo = this.ergos.find(e => e.id === ergoId) || null;
    this.ergotherapistSelected$.next(selectedErgo);
  }
}
