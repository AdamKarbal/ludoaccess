import { Component, OnInit, OnDestroy } from '@angular/core';
import { SettingsService } from 'src/services/setting.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
})
export class BackgroundComponent implements OnInit, OnDestroy {
  currentBackground: string = 'Aléatoire'; 
  private settingsSub!: Subscription;

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settingsSub = this.settingsService.settings$.subscribe(settings => {
      if (settings) {
        console.log("entre dans settings")
        if (settings.chooseBackGround === 'Aléatoire') {
          this.currentBackground = this.getRandomBackground();
        } else {
          this.currentBackground = settings.chooseBackGround;
        }
        console.log('Background mis à jour :', this.currentBackground);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.settingsSub) {
      this.settingsSub.unsubscribe();
    }
  }

  private getRandomBackground(): string {
    const backgrounds = ['Forest', 'Orange_earth', 'Blue_earth'];
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    return backgrounds[randomIndex];
  }
}
