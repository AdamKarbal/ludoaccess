import {Component, OnInit} from '@angular/core';
import {UserStatsService} from "../../../services/stats.service";
import {ActivatedRoute} from "@angular/router";
import {Progression} from "../../../models/progression.model";
import {Interaction} from "../../../models/interaction.model";

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss']
})

export class PlayerStatsComponent implements OnInit {

  lengths: number[] = [];
  selectedLength: number | null = null;
  constructor(private userStatsService: UserStatsService,
              private route: ActivatedRoute,) {}

  ngOnInit(): void {
    const childIdParam = this.route.snapshot.paramMap.get('childId');
    if (childIdParam) {
      const childId = parseInt(childIdParam, 10);
      this.userStatsService.fetchStatsForChild(childId);
    }

    this.userStatsService.lengths$.subscribe(lengths => {
      this.lengths = lengths;
      this.selectedLength = lengths[0] ?? null;
    });
    this.setId(1);
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
  get child() {
    return this.userStatsService.getUserStatsPayload().child;
  }

  get progression(): Progression[] {
    return this.userStatsService.getUserStatsPayload().progression;
  }

  get interactions(): Interaction[] {
    return this.userStatsService.getUserStatsPayload().interaction;
  }

}
