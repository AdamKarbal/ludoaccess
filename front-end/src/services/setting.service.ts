import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChildSettings } from '../models/setting.model';
import { CHILD_SETTINGS } from '../mocks/setting.mock';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settings: { [key: string]: ChildSettings } = CHILD_SETTINGS;
  private currentSettings$ = new BehaviorSubject<ChildSettings | null>(null);

  constructor() {}


  loadSettings(childId: string): void {
    const settings = this.settings[childId] || this.getDefaultSettings(childId);
    this.currentSettings$.next(settings);
  }

  get settings$(): Observable<ChildSettings | null> {
    return this.currentSettings$.asObservable();
  }


  saveSettings(settings: ChildSettings): void {
    this.settings[settings.id] = settings;
    this.currentSettings$.next(settings);
    console.log('Paramètres sauvegardés:', settings);
  }

  private getDefaultSettings(childId: string): ChildSettings {
    return {
      id: childId,
      showTimer: false,
      showRanking: false,
      enableLifeLoss: false,
      jumpDifficulty: false,
      clearWordAfterRecovery: false,
      wordWritingTime: 30,
      wordDifficulty: 'Facile',
      preferredWordLength: 8,
      minWordLength: 3,
      maxWordLength: 10,
      simplifyAfterMinutes: 15
    };
  }

  resetSettings(childId: string): void {
    this.saveSettings(this.getDefaultSettings(childId));
  }
}