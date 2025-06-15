import { Component, OnInit, OnDestroy } from '@angular/core';
import { SettingsService } from 'src/services/setting.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
})
export class BackgroundComponent implements OnInit, OnDestroy {
  currentBackground: string = '';  
  private settingsSub!: Subscription;

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settingsSub = this.settingsService.settings$.subscribe(settings => {
      if (settings) {
        console.log("entre dans settings (background.component.ts)");
        this.currentBackground = this.settingsService.getCurrentBackground();  
        console.log('Background mis à jour :', this.currentBackground);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.settingsSub) {
      this.settingsSub.unsubscribe();
    }
  }
}
