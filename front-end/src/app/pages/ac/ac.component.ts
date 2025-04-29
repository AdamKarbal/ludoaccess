import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './ac.component.html',
  styleUrls: ['./ac.component.scss']
})
export class HomeComponent {
  private audio: HTMLAudioElement | null = null;

  menuOpen = false;

  ngOnInit() {
    this.audio = new Audio('assets/sons/LobbyAudio.mp3');
    this.audio.loop = true;
    this.audio.play();
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