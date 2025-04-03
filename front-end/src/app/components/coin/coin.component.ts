import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-coin',
    templateUrl: './coin.component.html',
    styleUrls: ['./coin.component.scss'],
})

export class CoinComponent implements OnInit {
    constructor(){}
    ngOnInit(): void {
        console.log('Image path:', this.imagePath);
    }

    @Input() letter!: string;

    get imagePath(): string {
        return `assets/ressources/Coins/${this.letter}.png`;
    }
}