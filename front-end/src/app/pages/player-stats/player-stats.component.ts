import { Component } from '@angular/core';
import { mockUserStats } from '../../../mocks/stats.mock';
import {UserStatsService} from "../../../services/stats.service";

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss']
})
export class PlayerStatsComponent {
  progression = mockUserStats.progression;
  interactions = mockUserStats.interaction;
  child= mockUserStats.child;
  constructor(private userStatsService: UserStatsService) {}

  ngOnInit(): void {
    this.userStatsService.setId(1);
  }

  setId(id: number): void {
    this.userStatsService.setId(id);
  }
}
