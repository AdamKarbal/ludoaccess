import { Component, ElementRef, HostListener, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PlayerService } from '../../../services/player.service';
import { Collidable } from "../../../models/collidable.model";

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
      bottom: 16vh;
      left: 0;
      width: 3vw;
      height: 3vh;
    }
    .player img {
      width: 100%;
    }
  `]
})
export class PlayerComponent implements OnInit, Collidable {

  position = { x: 0, y: 0 };

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.playerService.setPlayer(this);
    this.playerService.position$.subscribe((pos) => {
      this.position = pos;
    });
  }


  @HostListener('document:keydown', ['$event'])
  onKeyPress(event: KeyboardEvent): void {
    this.playerService.movePlayer(event.key);
  }

  // Collidable interface properties
  get x(): number {
    return this.position.x;
  }

  get y(): number {
    return this.position.y;
  }

  get width(): number {
    return 3; // car 3vw
  }

  get height(): number {
    return 3; // car 3vh
  }

  action(): void {
    // action liée au joueur (optionnel selon ton interface)
  }
}
