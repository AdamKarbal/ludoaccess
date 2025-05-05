import { Component, Input, OnInit, SimpleChanges,OnChanges } from "@angular/core";
import { ChronoService } from "src/services/chrono.service";

@Component({
  selector: "app-chrono",
    templateUrl: "./chrono.component.html",
    styleUrls: ["./chrono.component.scss"],
})

export class ChronoComponent implements OnInit {
  @Input() wordCompleted: boolean = false;
  public time: number = 0;
  public isRunning: boolean = false;

  constructor(public chronoService: ChronoService) {
    this.chronoService.time$.subscribe((time) => {
        this.time = time;
        }
    );
  }
  displayMinutes(): string {
    const minutes = Math.floor(this.time / 60);
    const seconds = this.time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    ngOnInit(): void {
      };
}