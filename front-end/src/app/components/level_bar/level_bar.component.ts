import { Component, Input, OnInit, SimpleChanges,OnChanges } from "@angular/core";
import { LevelService } from "src/services/levels.service";
import { ChildService } from "src/services/child.services";

@Component({
  selector: "app-levelbar",
    templateUrl: "./level_bar.component.html",
    styleUrls: ["./level_bar.component.scss"],
})
export class LevelBarComponent implements OnInit {
  @Input() wordCompleted: boolean = false;

  constructor(public levelBarService : LevelService,private childService: ChildService) {

  }

  ngOnInit(): void {
    console.log(this.levelBarService.level);
    console.log(this.levelBarService.progress);
    const selectedChild = this.childService.childSelected$.value;
    if (selectedChild && typeof selectedChild.id === 'number') {
      this.levelBarService.saveLevelToBackend(selectedChild.id).subscribe({
        next: () => console.log('Niveau sauvegardé !'),
        error: err => console.error('Erreur lors de la sauvegarde du niveau', err)
      });
    } else {
      console.error('Aucun enfant sélectionné ou ID invalide');
    }
  }

  // ngOnChanges(changes:SimpleChanges){
  //   if(changes['wordCompleted'] && this.wordCompleted) this.levelBarService.increaseProgress(20);
  // }
}