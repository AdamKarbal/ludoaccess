import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from '../models/user.model';
import { ChildSettings } from '../models/setting.model';
import { SettingsService } from './setting.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private settings: ChildSettings | null = null;

  constructor(private settingsService: SettingsService) {
    this.settingsService.settings$.subscribe(settings => {
      this.settings = settings;
    });

  }
  setUser(user: User): void {
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getCurrentUserId(): number | null {
    const id = this.currentUserSubject.value?.id;
    console.log("id :", id);
    return id || null;
  }

  getCurrentUserRole(): 'child' | 'ergo' | null {
    return this.currentUserSubject.value?.role || null;
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }

  startDifficultyTimer(settings: ChildSettings): void {
    if(this.getCurrentUserRole()=="child") {
    if (settings.simplifyGameAfter) {
      const simplifyAfterMs = settings.simplifyGameAfter * 60 * 1000;
      console.log(`Changement de difficulté prévu dans ${settings.simplifyGameAfter} minutes.`);
      timer(simplifyAfterMs)
        .pipe(take(1))
        .subscribe(() => {
          console.log('Changement de difficulté déclenché.');
          this.settingsService.lowerDifficulty(settings);
        });
    }
  }}

}
