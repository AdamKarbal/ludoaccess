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

  chooseFont: string = 'Nintendo'; 
  currentBackground: string = 'Aléatoire'; 

  constructor() {}

  loadSettings(childId: string): void {
    const settings = this.settings[childId] || this.getDefaultSettings(childId);
    this.currentSettings$.next(settings);
    this.updateFont(settings.choosefont); 
    this.updateBackGround(settings.chooseBackGround);
    console.log('Paramètres chargés: font =', this.chooseFont, ', background =', this.currentBackground);
  }

  get settings$(): Observable<ChildSettings | null> {
    return this.currentSettings$.asObservable();
  }

  saveSettings(settings: ChildSettings): void {
    this.settings[settings.id] = settings;
    this.currentSettings$.next(settings);
    this.updateFont(settings.choosefont); 
    this.updateBackGround(settings.chooseBackGround);
    console.log('Paramètres sauvegardés:', settings);
  }

  resetSettings(childId: string): void {
    const defaultSettings = this.getDefaultSettings(childId);
    this.saveSettings(defaultSettings);
  }

  private getDefaultSettings(childId: string): ChildSettings {
    return {
      id: childId,
      showTimer: false, // fait
      showRanking: false,
      enableLifeLoss: false,
      jumpDifficulty: false,
      clearWordAfterRecovery: false,
      adaptDifficulty: false,
      simplifyGameAfter: 30,
      wordWritingTime: 30,
      wordDifficulty: 'Facile',
      preferredWordLength: 8,
      minWordLength: 3,
      maxWordLength: 10,
      displaymotsec: 10, // fait 
      lettersize: 20,
      choosefont: 'Nintendo', 
      chooseBackGround: 'Aléatoire',  
    };
  }

  private updateFont(fontName: string): void {
    const allowedFonts = [
      'Lucky Boy', 'Nintendo', 'Arial', 'Comic Sans MS', 'Courier New', 
      'Georgia', 'Times New Roman', 'Verdana', 'Calibri', 
      'cursif ecriture A', 'cursif ecriture B', 'Minecraft'
    ];
        if (allowedFonts.includes(fontName)) {
      this.chooseFont = fontName;
    } else {
      this.chooseFont = 'Nintendo'; 
    }
    console.log('Font mise à jour:', this.chooseFont);
  }

  private updateBackGround(backgroundName: string): void {
    const allowedBackgrounds = ['Forest', 'Blue_earth', 'Orange_earth'];
    if (backgroundName === 'Aléatoire') {
      this.currentBackground = this.getRandomBackground();  
    } else {
      this.currentBackground = backgroundName; 
    console.log('Background mis à jour:', this.currentBackground);
  }}

  private getRandomBackground(): string {
    const backgrounds = ['Forest', 'Orange_earth', 'Blue_earth'];
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    return backgrounds[randomIndex];
  }

  public getCurrentBackground(): string {
    return this.currentBackground;
}}
