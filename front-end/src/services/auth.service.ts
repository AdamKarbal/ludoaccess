import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from '../models/user.model';
import { ChildSettings } from '../models/setting.model';
import { SettingsService } from './setting.service';
import { LevelService} from "./levels.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private settings: ChildSettings | null = null;

  constructor(private settingsService: SettingsService,
              private levelService: LevelService) {
    this.settingsService.settings$.subscribe(settings => {
      this.settings = settings;
    });
    this.levelService.level$.subscribe(level   => {
      console.log("Level du joueur"+level); // là je récupère le level du joueur pour le transmettre aux stats
    });
  }
  setUser(user: User): void {
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getCurrentUserRole(): 'child' | 'ergo' | null {
    return this.currentUserSubject.value?.role || null;
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }

  startDifficultyTimer(settings: ChildSettings): void {
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
  }

}
