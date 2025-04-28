import { Component, OnInit, HostListener } from '@angular/core';
import { PlayerService } from '../../../services/player.service';
import { Collidable } from '../../../models/collidable.model';
import {MobComponent} from "../mob/mob.component";
import {PlatformComponent} from "../platform/platform.component";

@Component({
  selector: 'app-player',
  template: `
    <div class="player" [style.transform]="'translate(' + position.x + 'vw, ' + position.y + 'vh)'">
      <img src="../../../assets/ressources/megaman_de_face.png" alt="Player">
    </div>
  `,
  styles: [`
    .player {
      position: absolute;
      top: 0;
      width: 3vw;
      height: 3vh;
    }
    .player img {
      width: 100%;
    }
  `]
})

export class PlayerComponent implements OnInit, Collidable {
  position = { x: 0, y: 20 }; // position initiale du joueur

  constructor(private playerService: PlayerService) {}

  checkCollision(other: Collidable): boolean {
    return (
      this.x < other.x + other.width &&
      this.x + this.width > other.x &&
      this.y < other.y + other.height &&
      this.y + this.height > other.y
    );
  }

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

  get x(): number {
    return (this.position.x / 100) * window.innerWidth;
  }

  get y(): number {
    return (this.position.y / 100) * window.innerHeight;
  }

  get width(): number {
    return (3 / 100) * window.innerWidth;
  }

  get height(): number {
    return (3 / 100) * window.innerHeight;
  }


  action(cible:Collidable): void {
    if(cible instanceof MobComponent) {
      console.log(cible+"touchée");
    }
    if(cible instanceof PlatformComponent) {
      console.log("plateforme"+cible+"touchee");
    }
  }
}
