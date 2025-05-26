import { Component } from '@angular/core';
import { mockUserStats } from '../../../mocks/stats.mock';
import {UserStatsService} from "../../../services/stats.service";

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss']
})
export class PlayerStatsComponent {
  childIdInput: string = '';

  formVisible=false;
  progression = mockUserStats.progression;
  interactions = mockUserStats.interaction;
  child= mockUserStats.child;
  constructor(private userStatsService: UserStatsService) {}

  id:number=1;

  setId(id: number): void {
    this.userStatsService.setId(id);
    this.id=id;

  }

  fetchStatsById(): void {
  /*const allMockStats = [mockUserStats]; // Si tu en as plusieurs, ajoute-les ici

  const stats = allMockStats.find(stat => stat.child.id === this.childIdInput);

  if (stats) {
    this.child = stats.child;
    this.progression = stats.progression;
    this.interactions = stats.interaction;
    this.userStatsService.setId(this.id); // conserve l'id actif du graphique
  } else {
    alert("Aucun enfant trouvé avec cet ID.");
  }*/
}

}
