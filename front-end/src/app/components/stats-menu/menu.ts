import {Component, Input} from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "stats-menu",
  templateUrl: "menu.html",
  styleUrls: ["menu.scss"],
  standalone: true
})

export class StatsMenuModule {
  @Input() titre: String = "Stats";
  type:String = "Users";

  constructor(private router: Router) {}

  onGoBack(): void {
    this.router.navigate(['/']);
  }

}



