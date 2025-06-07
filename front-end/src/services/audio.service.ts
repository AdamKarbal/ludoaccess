import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AudioService {
  private audio: HTMLAudioElement | null = null;

  setAudio(audio: HTMLAudioElement) {
    this.audio = audio;
  }

  setVolume(volume: number) {
    if (this.audio) {
      this.audio.volume = volume;
    }
  }

  getVolume(): number {
    return this.audio ? this.audio.volume : 1; 
  }

  getAudio(): HTMLAudioElement | null {
    return this.audio;
  }
}