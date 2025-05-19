import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FreezeGameService {
  private isPausedSubject = new BehaviorSubject<boolean>(false);
  private isCrossedSubject = new BehaviorSubject<boolean>(false);
  private isInfoSubject = new BehaviorSubject<boolean>(false);

private isNewEventSubject = new BehaviorSubject<boolean>(false);
  isNewEvent$ = this.isNewEventSubject.asObservable();

  isPaused$ = this.isPausedSubject.asObservable();
  isCrossed$ = this.isCrossedSubject.asObservable();
  isInfo$ = this.isInfoSubject.asObservable();

  constructor() {}

  pause() {
    this.isPausedSubject.next(true);
  }

  resume() {
    // this.isNewEventSubject.next(true);
    this.isPausedSubject.next(false);
    this.isCrossedSubject.next(false); // Reset the crossed state when resuming
    // this.isNewEventSubject.next(false);
  }
  exit() {
    this.isCrossedSubject.next(true);
    
  }
  quit(){
    this.isNewEventSubject.next(true);
    this.isCrossedSubject.next(false);
    this.isNewEventSubject.next(false);
  }

  setInfoState(isInfo: boolean) {
    this.isInfoSubject.next(isInfo);
  }
  }