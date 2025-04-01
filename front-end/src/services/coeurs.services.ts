import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { serverUrl, httpOptionsBase } from 'src/configs/server.config';


@Injectable({
  providedIn: 'root'
})

export class CoeurService {
  private maxLives = 6;
  private livesSubject = new BehaviorSubject<number>(this.maxLives);
  lives$ = this.livesSubject.asObservable();

  loseLife(){
    const currentLives = this.livesSubject.getValue();
    if(currentLives > 0) {
      this.livesSubject.next(currentLives - 1);
    }
  }

  resetLives() {
    this.livesSubject.next(this.maxLives);
  }
    
}