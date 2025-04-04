import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { KeyboardService } from './keyboard.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private positionSubject = new BehaviorSubject<{ x: number; y: number }>({ x: 0, y: 0 });
  position$ = this.positionSubject.asObservable();
  private speed = 10;

  constructor(private keyboardService: KeyboardService) {
    this.keyboardService.key$.subscribe((key) => {
      if (!key) return;

      const currentPosition = this.positionSubject.getValue();
      let { x, y } = currentPosition;

      switch (key) {
        case 'ArrowUp':
          y -= this.speed;
          break;
        case 'ArrowDown':
          y += this.speed;
          break;
        case 'ArrowLeft':
          x -= this.speed;
          break;
        case 'ArrowRight':
          x += this.speed;
          break;
      }

      this.positionSubject.next({ x, y });
    });
  }
}
