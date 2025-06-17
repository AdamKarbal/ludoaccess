import { Component } from '@angular/core';
import { SettingsService } from 'src/services/setting.service';
import { Subscription } from "rxjs";

const BACKGROUNDS = [
  'assets/ressources/Blue_earth.jpg',
  'assets/ressources/Forest.jpg',
  'assets/ressources/Orange_earth.jpg'
];

@Component({
  selector: 'app-home',
  templateUrl: './ac.component.html',
  styleUrls: ['./ac.component.scss']
})
export class HomeComponent {
  private audio: HTMLAudioElement | null = null;
  menuOpen = false;
  private settingsSub?: Subscription;
  displayed: boolean = false;

  backgrounds = BACKGROUNDS;
  currentBgIndex = 0;
  nextBgIndex = 1;
  fade = false;
  fadeBgUrl = this.backgrounds[this.nextBgIndex];

  constructor(private settingsService: SettingsService) {}
  ngOnInit() {
    this.settingsSub = this.settingsService.settings$.subscribe(settings => {
      this.displayed = settings?.showRanking ?? false;
    });
    this.audio = new Audio('assets/sons/LobbyAudio.mp3');
    this.audio.loop = true;
    this.audio.play();

    setInterval(() => {
      this.fadeBgUrl = this.backgrounds[this.nextBgIndex];
      this.fade = true;
      setTimeout(() => {
        this.currentBgIndex = this.nextBgIndex;
        this.nextBgIndex = (this.nextBgIndex + 1) % this.backgrounds.length;
        this.fade = false;
      }, 1000); 
    }, 6000); 
  }

  get currentBg() {
    return this.backgrounds[this.currentBgIndex];
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  ngOnDestroy(): void {
    if (this.audio) { 
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = null;
    }
  }
}