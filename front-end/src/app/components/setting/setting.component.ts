import { Component, Input, OnInit } from '@angular/core';
import { SettingsService } from '../../../services/setting.service';
import { ChildSettings } from '../../../models/setting.model';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})

export class SettingComponent implements OnInit {

  @Input() childId!: number;
  currentSettings!: ChildSettings;

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settingsService.loadSettings(this.childId);
    this.settingsService.settings$.subscribe(settings => {
      if (settings) this.currentSettings = settings;
    });
  }


  onSettingChange(): void {
    this.settingsService.saveSettings(this.currentSettings);
  }

  onResetSettings(): void {
    this.settingsService.resetSettings(this.childId);
    this.settingsService.loadSettings(this.childId);
    this.settingsService.settings$.subscribe(settings => {
      if (settings) this.currentSettings = settings;
    });

  }

  goToPage():void{

  }

}
