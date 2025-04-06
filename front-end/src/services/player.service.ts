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
  private gravity = 1;
  private velocityY = 0;
  private groundY = 0;

  constructor(private keyboardService: KeyboardService) {
    this.keyboardService.key$.subscribe((key) => {
      if (!key) return;

      const currentPosition = this.positionSubject.getValue();
      let { x, y } = currentPosition;

      switch (key) {
        case 'z':
          if (y >= this.groundY) {
            this.velocityY = -15;
          }
          break;
        case 'q':
          x -= this.speed;
          break;
        case 'd':
          x += this.speed;
          break;
      }

      this.positionSubject.next({ x, y });
    });


    setInterval(() => {
      const pos = this.positionSubject.getValue();

      this.velocityY += this.gravity;
      let newY = pos.y + this.velocityY;


      if (newY >= this.groundY) {
        newY = this.groundY;
        this.velocityY = 0;
      }

      this.positionSubject.next({ x: pos.x, y: newY });
    }, 16);
  }
}
