import { Component,OnInit,HostListener } from "@angular/core";
import { KeyboardInputService } from "src/services/keyboard-input-w2g.service";
import { SettingsService } from "src/services/setting.service";
import { ChildSettings } from "src/models/setting.model";

@Component({
  selector: "app-jeu_etape3",
    templateUrl: "./jeu_etape3.component.html",
    styleUrls: ["./jeu_etape3.component.scss"],
})
export class JeuEtape3Component implements OnInit{
  userInput: string = '';
  showTimer: boolean = false; 
  public settings: ChildSettings | null = null;
  showW2g: boolean = true; // Variable pour contrôler l'affichage de la div

  constructor(private keyboardInputService: KeyboardInputService, private settingsService : SettingsService) {
  }

  ngOnInit(): void {
    this.settingsService.settings$.subscribe((settings) => {
      this.settings = settings;
      this.showTimer = !!this.settings?.showTimer;
      this.showW2g= !!this.settings?.clearWordAfterRecovery; 
      console.log('showTimer:', this.showTimer); 
    });
  
    this.keyboardInputService.userInput$.subscribe((input) => {
      this.userInput = input;
    });
  }
}
