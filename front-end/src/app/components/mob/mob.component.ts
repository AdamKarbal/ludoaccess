import { Component, OnInit } from '@angular/core';
import { MobService } from '../../../services/mob.service';
import {Collidable} from "../../../models/collidable.model";

@Component({
  selector: 'app-mob',
  templateUrl: './mob.component.html',
  styleUrls: ['./mob.component.scss'],
})
export class MobComponent implements OnInit,Collidable {
  x: number = 0;
  y: number = 0;
  frame: number = 0;
  isFacingRight: boolean = true;

  constructor(private mobService: MobService) {}

  ngOnInit(): void {
    this.mobService.position$.subscribe(position => {
      this.x = position.x;
      this.y = position.y;
      this.frame = position.frame;
      this.isFacingRight = position.isFacingRight;
    });
  }

  action(cible: Collidable): void {
  }

  get height(): number {
    return (90/100)*window.innerHeight;
  }

  get width(): number {
    return (90/100)*window.innerWidth;
  }
}
