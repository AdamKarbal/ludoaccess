import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../../services/player.service';

@Component({
  selector: 'app-player',
  template: `
      <div class="player" [style.transform]="'translate(' + position.x + 'px, ' + position.y + 'px)'"></div>
  `,
  styles:[
    `.player {
        width: 50px;
        height: 50px;
        background-size: cover;
        background-position: center;
        background-image: url('../../../assets/ressources/megaman_de_face.png');
        position: absolute;
      transition: transform 0.3s ease-in-out;
      }`]
})
export class PlayerComponent implements OnInit {
  position = { x: 0, y: 0 };

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.playerService.position$.subscribe((pos) => {
      console.log(this.position);
      this.position = pos;
    });
  }
}
