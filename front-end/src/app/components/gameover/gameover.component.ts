import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-gameover',
  templateUrl: './gameover.component.html',
  styleUrls: ['./gameover.component.scss'],
})

export class GameoverComponent {
    @Input() message: string = "Game Over !";
    @Output() replay = new EventEmitter<void>();
  
    onReplay() {
      this.replay.emit();
    }
}