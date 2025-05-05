import { Component, OnInit } from '@angular/core';
import { MiniGameService } from '../../../services/minigame.service';

@Component({
  selector: 'app-mini-game',
  templateUrl: './minigame.component.html',
  styleUrls: ['./minigame.component.scss'],
})
export class MiniGameComponent implements OnInit {
  constructor(public miniGameService: MiniGameService) {}

  ngOnInit() {}

}
