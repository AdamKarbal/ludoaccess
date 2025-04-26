import { Component, OnInit, OnDestroy } from '@angular/core';
import { SettingsService } from 'src/services/setting.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ground',
  templateUrl: './ground.component.html',
  styleUrls: ['./ground.component.scss'],
})
export class GroundComponent implements OnInit, OnDestroy {
  currentBackground: string = 'Aléatoire'; 
  currentFilter: string = ''; 
  private settingsSub!: Subscription;

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settingsSub = this.settingsService.settings$.subscribe(settings => {
      if (settings) {
        this.currentBackground = this.settingsService.getCurrentBackground();
        console.log("Settings dans ground : ", this.currentBackground);
        this.setFilterBasedOnBackground(this.currentBackground); 
        console.log('Background mis à jour :', this.currentBackground);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.settingsSub) {
      this.settingsSub.unsubscribe();
    }
  }

  private setFilterBasedOnBackground(background: string): void {
    switch (background) {
      case 'Forest':
        this.currentFilter = 'hue-rotate(0deg)';  
        break;
      case 'Orange_earth':
        this.currentFilter = 'hue-rotate(30deg)'; 
        break;
      case 'Blue_earth':
        this.currentFilter = 'hue-rotate(180deg)'; 
        break;
      default:
        this.currentFilter = ''; 
        break;
    }
  }
}
