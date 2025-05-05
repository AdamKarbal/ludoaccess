import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { SettingsService } from 'src/services/setting.service';
import { Subscription } from 'rxjs';
import { Platform } from 'src/models/platform.model';
import { PlatformService } from 'src/services/platform.service';
import { GameService } from 'src/services/game.service';
import {Collidable} from "../../../models/collidable.model";

@Component({
  selector: 'app-plateformes',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss'],
})
export class PlatformComponent implements OnInit, OnDestroy {
  platforms: Platform[] = [];
  currentBackground: string = 'Aléatoire';
  currentFilter: string = '';
  private settingsSub!: Subscription;

  constructor(
    private platformService: PlatformService,
    private gameService: GameService,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    console.log('Plateformes:', this.gameService.w2g);
    this.platforms = this.platformService.genererPlateformes(this.gameService.w2g);

    this.settingsSub = this.settingsService.settings$.subscribe(settings => {
      if (settings) {
        this.currentBackground = this.settingsService.getCurrentBackground();
        this.setFilterBasedOnBackground(this.currentBackground);
        console.log('Background mis à jour dans platform :', this.currentBackground);
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

  action(cible: Collidable): void {
    console.log(`Platform touched by:`, cible);
  }
}
