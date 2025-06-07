import { Component, OnInit, OnDestroy } from '@angular/core';
import { SettingsService } from 'src/services/setting.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-xpbooster',
    templateUrl: './xpbooster.component.html',
    styleUrls: ['./xpbooster.component.scss'],
})


export class XpBooster implements OnInit, OnDestroy {
    settings: any;
    private settingsSubscription: Subscription | undefined;

    constructor(private settingsService: SettingsService) {}

    ngOnInit(): void {
        /*this.settingsSubscription = this.settingsService.getSettings().subscribe(
            (settings) => {
                this.settings = settings;
            },
            (error) => {
                console.error('Failed to load settings:', error);
            }
        );*/
    }

    ngOnDestroy(): void {
        if (this.settingsSubscription) {
            this.settingsSubscription.unsubscribe();
        }
    }
}