/*import {Component, HostListener, OnInit} from '@angular/core';
import { PlayerService } from '../../../services/player.service';

@Component({
  selector: 'app-player',
  template: `
    <div #player class="player" [style.transform]="'translate(' + position.x + 'vw, ' + position.y + 'vh)'">
      <img src="../../../assets/ressources/megaman_de_face.png" alt="Player">
    </div>

  `,
  styles: [`
    .player {
      position: absolute;
      bottom: 14vh;
      width:3.5vw;
      height:3.5vh;
    }
    .player img {
      width: 100%;
    }
  `]
})
export class PlayerComponent implements OnInit {
  position = { x: 0, y: window.innerHeight * 0.1 };

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.playerService.position$.subscribe((pos) => {
      this.position = pos;
    });
  }
  @HostListener('document:keydown', ['$event'])
  onKeyPress(event: KeyboardEvent): void {
    const key = event.key;
    this.playerService.movePlayer(key);  // Pass key to the PlayerService
  }
  public getY():number {
    return this.position.y;
  }
}*/
