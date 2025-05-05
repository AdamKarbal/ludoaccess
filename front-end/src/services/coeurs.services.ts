import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SettingsService } from './setting.service';
import { ChildSettings } from '../models/setting.model';

@Injectable({
  providedIn: 'root'
})
export class CoeurService {
  private maxLives = 6;
  public livesSubject = new BehaviorSubject<number>(this.maxLives);
  lives$ = this.livesSubject.asObservable();
  public isGameOverSubject = new BehaviorSubject<boolean>(false);
  isGameOver$ = this.isGameOverSubject.asObservable();

  private settings: ChildSettings | null = null;

  constructor(private settingsService: SettingsService) {
    this.settingsService.settings$.subscribe(settings => {
      this.settings = settings;
    });
  }

  loseLife() {
    if (this.settings && this.settings.enableLifeLoss === false) {
      console.log('Perte de vie false');
      return; 
    }
    const currentLives = this.livesSubject.getValue();
    if (currentLives > 0) {
      this.livesSubject.next(currentLives - 1);
      if (currentLives - 1 === 0) {
        console.log('Plus de vie');
        this.isGameOverSubject.next(true); 
      }
    }
  }

  resetLives() {
    this.livesSubject.next(this.maxLives);
    this.isGameOverSubject.next(false); 
  }
}
