import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FreezeGameService {
  private isPausedSubject = new BehaviorSubject<boolean>(false);
  private isCrossedSubject = new BehaviorSubject<boolean>(false);
  private isInfoSubject = new BehaviorSubject<boolean>(false);

  isPaused$ = this.isPausedSubject.asObservable();
  isCrossed$ = this.isCrossedSubject.asObservable();
  isInfo$ = this.isInfoSubject.asObservable();

  constructor() {}

  pause() {
    this.isPausedSubject.next(true);
  }

  resume() {
    this.isPausedSubject.next(false);
  }
  }