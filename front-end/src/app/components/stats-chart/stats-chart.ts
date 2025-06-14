import { Component, OnInit, OnDestroy, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { UserStatsService } from "../../../services/stats.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-stats-chart',
  template: `
    <div class="chart-container">
      <canvas id="errorPositionChart"></canvas>
    </div>

    <div class="chart-container">
      <canvas id="interactionChart"></canvas>
    </div>
  `,
  styles: [
    `.chart-container { width: 100%; height: 400px; margin-bottom: 40px; }`
  ]
})
export class UserStatsChartComponent implements OnInit, OnDestroy, OnChanges {
  @Input() selectedLength: number | null = null;

  stats: { name: string; errors: number }[] = [];
  private chart1: Chart | null = null;
  private chart2: Chart | null = null;
  private subscription: Subscription = new Subscription();

  constructor(private userStatsService: UserStatsService) {
    Chart.register(...registerables);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedLength']) {
      this.renderCharts();
    }
  }

  ngOnInit(): void {
    this.subscription = this.userStatsService.stats$.subscribe(data => {
      this.stats = data;
      this.renderCharts();
    });
  }

  renderCharts() {
    this.renderErrorPositionChart();
    this.renderInteractionChart();
  }

  renderErrorPositionChart() {
    const canvas = document.getElementById('errorPositionChart') as HTMLCanvasElement;
    if (!canvas) return;

    const filteredStats = this.selectedLength == null
      ? this.stats
      : this.stats.filter(stat => stat.name.startsWith(`L${this.selectedLength}-P`));

    if (this.chart1) this.chart1.destroy();

    this.chart1 = new Chart(canvas, {
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

  renderInteractionChart() {
    const canvas = document.getElementById('interactionChart') as HTMLCanvasElement;
    if (!canvas) return;

    const data = this.userStatsService.getCompactedInteractions();

    if (this.chart2) this.chart2.destroy();

    this.chart2 = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: data.map(d => d.action),
        datasets: [
          {
            label: 'Succès',
            data: data.map(d => d.success),
            backgroundColor: 'rgba(0, 200, 83, 0.6)',
            stack: 'Stack 0'
          },
          {
            label: 'Échecs',
            data: data.map(d => d.failures),
            backgroundColor: 'rgba(255, 82, 82, 0.6)',
            stack: 'Stack 0'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Interactions par action'
          }
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
