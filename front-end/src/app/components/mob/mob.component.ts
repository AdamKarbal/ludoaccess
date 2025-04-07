import { Component, OnInit } from '@angular/core';
import { MobService } from '../../../services/mob.service';

@Component({
  selector: 'app-mob',
  templateUrl: './mob.component.html',
  styleUrls: ['./mob.component.scss'],
})
export class MobComponent implements OnInit {
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
}
