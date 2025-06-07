import { Component, OnInit } from '@angular/core';
import { UserStatsService} from "../../../services/stats.service";

@Component({
  selector: 'app-word-length-list',
  templateUrl: './word-length-list.component.html',
  styleUrls: ['./word-length-list.component.scss']
})
export class WordLengthListComponent implements OnInit {
  lengths: number[] = [];
  selectedLength: number | null = null;

  constructor(private userStatsService: UserStatsService) {}

  showList = false;

  ngOnInit(): void {
    this.userStatsService.lengths$.subscribe(lengths => {
      this.lengths = lengths;
      this.showList = lengths.length > 0;
    });
  }


  handleLengthSelected(length: number): void {
    this.selectedLength = length;
    console.log('Longueur sélectionnée :', length);
  }
}
