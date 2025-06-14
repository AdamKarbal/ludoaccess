import {Component, OnInit, OnDestroy, Input, SimpleChanges, OnChanges} from '@angular/core';
import { Chart, registerables } from 'chart.js'; // ✅ Import registerables
import { UserStatsService } from "../../../services/stats.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-stats-chart',
  templateUrl: './stats-chart.component.html',
  styleUrls: ['./stats-chart.component.scss']
})

export class UserStatsChartComponent implements OnInit, OnDestroy, OnChanges {
  @Input() selectedLength: number | null = null;

  stats: { name: string; errors: number }[] = [];
  private chart: Chart | null = null;
  private subscription: Subscription = new Subscription();

  constructor(private userStatsService: UserStatsService) {
    Chart.register(...registerables); 
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log("selectedLength changé :", this.selectedLength);
    if (changes['selectedLength']) {
      this.renderChart();
    }
  }

  ngOnInit(): void {
    this.subscription = this.userStatsService.stats$.subscribe(data => {
      console.log('Données reçues dans UserStatsChartComponent :', data);
      this.stats = data;
      this.renderChart();
    });
  }

  renderChart() {
    const canvas = document.getElementById('userStatsChart') as HTMLCanvasElement;
    if (!canvas) return;

    const filteredStats = this.selectedLength == null
      ? this.stats
      : this.stats.filter(stat =>
        stat.name.startsWith(`L${this.selectedLength}-P`)
      );

    if (this.chart) this.chart.destroy();

    this.chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: filteredStats.map(stat => stat.name),
        datasets: [{
          label: `Nb d'erreurs${this.selectedLength != null ? ' (Longueur=' + this.selectedLength + ')' : ''}`,
          data: filteredStats.map(stat => stat.errors),
          borderColor: "#0077cc",
          backgroundColor: "rgba(0, 119, 204, 0.2)"
        }]
      }
    });
  }




  ngOnDestroy() {
    this.subscription.unsubscribe(); 
  }
}
