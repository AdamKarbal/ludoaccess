import { Component, OnInit, Input } from '@angular/core';
import {Collidable} from "../../../models/collidable.model";

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss']
})
export class PlatformComponent implements OnInit,Collidable {
  @Input() x!: number;
  @Input() y!: number;
  @Input() width!: number;
  @Input() height!: number;
  @Input() coinLetter!: string;

  constructor() { }

  ngOnInit(): void {
    //console.log('coinLetter:', this.coinLetter);
  }

  getX():number {
    return this.x;
  }
  getY():number {
    return this.y;
  }

  action(cible: Collidable): void {
    console.log(`Platform touched by:`, cible);
  }
}
