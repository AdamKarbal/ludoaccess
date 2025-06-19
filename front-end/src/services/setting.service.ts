import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ChildSettings } from '../models/setting.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private currentSettings$ = new BehaviorSubject<ChildSettings | null>(null);

  chooseFont: string = 'Nintendo';
  currentBackground: string = 'Aléatoire';
  private letterSizePx: number = 20;

  private settingsUrl = environment.serverUrl + '/settings';

  constructor(private http: HttpClient) { }

  loadSettings(childId: number): void {
    this.http.get<ChildSettings>(`${this.settingsUrl}/${childId}`).subscribe(
      (settings) => {
        this.currentSettings$.next(settings);
        this.updateFont(settings.choosefont);
        this.updateBackGround(settings.chooseBackGround);
        this.getFontSize(settings.lettersize);
        console.log('Paramètres chargés depuis le backend:', settings);
      },
      (error) => {
        console.error('Erreur lors du chargement des paramètres:', error);
      }
    );
  }

  get settings$(): Observable<ChildSettings | null> {
    return this.currentSettings$.asObservable();
  }

  saveSettings(settings: ChildSettings): void {
    this.http.put(`${this.settingsUrl}/${settings.id}`, settings).subscribe(
      () => {
        this.currentSettings$.next(settings);
        this.updateFont(settings.choosefont);
        this.updateBackGround(settings.chooseBackGround);
        console.log('Paramètres sauvegardés dans le backend:', settings);
      },
      (error) => {
        console.error('Erreur lors de la sauvegarde des paramètres:', error);
      }
    );
  }

  resetSettings(childId: number): void {
    const defaultSettings = this.getDefaultSettings(childId);
    this.saveSettings(defaultSettings);
  }

  public getDefaultSettings(childId: number): ChildSettings {
    return {
      id: childId,
      showTimer: true,
      showRanking: false,
      enableLifeLoss: false,
      jumpDifficulty: false,
      clearWordAfterRecovery: false,
      adaptDifficulty: false,
      displaymotsec: 10,
      simplifyGameAfter: 30,
      wordWritingTime: 30,
      wordDifficulty: 'Facile',
      lettersize: 'Moyen',
      choosefont: 'Nintendo',
      chooseBackGround: 'Aléatoire',
      numberOfWords: 15,
    };
  }

  private updateFont(fontName: string): void {
    const allowedFonts = ['Lucky Boy', 'Nintendo', 'Arial', 'Comic Sans MS', 'Courier New','Georgia', 'Times New Roman', 'Verdana', 'Calibri','cursif ecriture A', 'cursif ecriture B', 'Minecraft'
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
    }
  }

  private getRandomBackground(): string {
    const backgrounds = ['Forest', 'Orange_earth', 'Blue_earth'];
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    return backgrounds[randomIndex];
  }

  public getCurrentBackground(): string {
    return this.currentBackground;
  }

  public lowerDifficulty(settings: ChildSettings): void {
    if (settings.wordDifficulty === 'Facile') {
      settings.wordDifficulty = 'Facile';
    } else if (settings.wordDifficulty === 'Moyen') {
      settings.wordDifficulty = 'Facile';
    } else {
      settings.wordDifficulty = 'Moyen';
    }
    console.log('La difficulté a été réduite à :', settings.wordDifficulty);
  }

  public upDifficulty(settings: ChildSettings): void {
    if (settings.wordDifficulty === 'Facile') {
      settings.wordDifficulty = 'Moyen';
    } else if (settings.wordDifficulty === 'Moyen') {
      settings.wordDifficulty = 'Difficile';
    } else {
      settings.wordDifficulty = 'Difficile';
    }
    console.log('La difficulté a été augmentée à :', settings.wordDifficulty);
  }

  private getFontSize(size: string): void {
    if (size === 'Petit') {
      this.letterSizePx = 12;
    } else if (size === 'Moyen') {
      this.letterSizePx = 16;
    } else if (size === 'Grand') {
      this.letterSizePx = 20;
    } else {
      this.letterSizePx = 16;
    }
    console.log('Taille de la lettre mise à jour:', this.letterSizePx);
  }

  getLetterSizePx(): number {
    return this.letterSizePx;
  }
}
