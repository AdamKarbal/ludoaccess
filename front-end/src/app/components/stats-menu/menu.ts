import {Component, Input} from "@angular/core";

@Component({
  selector: "stats-menu",
  templateUrl: "menu.html",
  styleUrls: ["menu.scss"],
})
export class StatsMenuModule {
  @Input() titre: String = "Stats";
  type:String = "Users";

}
