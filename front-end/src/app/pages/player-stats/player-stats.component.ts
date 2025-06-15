import {Component, Input, OnInit} from '@angular/core';
import {UserStatsService} from "../../../services/stats.service";
import {ActivatedRoute} from "@angular/router";
import {Progression} from "../../../models/progression.model";
import {Interaction} from "../../../models/interaction.model";
import {compactInteractions, filterByDateRange, compactProgressions} from "../../../services/util";


@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss']
})

export class PlayerStatsComponent implements OnInit {
  selectedPeriod: string ='today';
  lengths: number[] = [];
  selectedLength: number | null = null;
  filteredInteractions: Interaction[] = [];
  filteredProgressions: Progression[] = [];
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
    setTimeout(() => {
      this.onPeriodChange('today')
    },80);
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
  onPeriodChange(period: string) {
    this.selectedPeriod = period;
    this.filterStatsByPeriod(period);
    console.log("Important",this.selectedPeriod);
  }

  filterStatsByPeriod(period: string) {
    let fromDate: Date;
    const toDate = new Date();

    switch (period) {
      case 'today':
        fromDate = new Date();
        fromDate.setHours(0, 0, 0, 0);
        break;
      case 'lastWeek':
        fromDate = new Date();
        fromDate.setDate(toDate.getDate() - 7);
        fromDate.setHours(0, 0, 0, 0);
        break;
      case 'lastMonth':
        fromDate = new Date();
        fromDate.setMonth(toDate.getMonth() - 1);
        fromDate.setHours(0, 0, 0, 0);
        break;
        default:
          console.log("mauvais input");
          break;
    }
    this.filteredInteractions = compactInteractions(filterByDateRange(this.interactions,fromDate!.toISOString(),toDate.toISOString()));
    this.filteredProgressions = compactProgressions(filterByDateRange(this.progression,fromDate!.toISOString(),toDate.toISOString()));
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
