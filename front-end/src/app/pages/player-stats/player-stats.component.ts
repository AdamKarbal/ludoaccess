import {Component, OnInit} from '@angular/core';
import { mockUserStats } from '../../../mocks/stats.mock';
import {UserStatsService} from "../../../services/stats.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss']
})

export class PlayerStatsComponent implements OnInit {
  progression = mockUserStats.progression;
  interactions = mockUserStats.interaction;
  child= mockUserStats.child;
  lengths: number[] = [];
  selectedLength: number | null = null;
  constructor(private userStatsService: UserStatsService) {}

  ngOnInit(): void {
    // D’abord on s’abonne
    this.userStatsService.lengths$
      .subscribe(lengths => {
        this.lengths = lengths;
        this.selectedLength = lengths[0];
      });


    // Puis on appelle setId
    this.setId(1); // 👈 Ça déclenche les longueurs dans le service
  }


  id:number=1;

  setId(id: number): void {
    this.userStatsService.setId(id);

    this.id = id;

    if (id !== 2) {
      this.selectedLength = null;
    }
  }

  handleLengthSelected(length: number): void {
    this.selectedLength = length;
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
