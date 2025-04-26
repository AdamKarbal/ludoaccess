import { Component, Input, OnInit } from '@angular/core';
import { Coin } from 'src/models/coin.model';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.scss'],
})
export class CoinComponent implements OnInit {
  
    @Input() coin!: Coin; 

  constructor() {}

  ngOnInit(): void {
    console.log('Image path:', this.imagePath);
  }

  get imagePath(): string {
    return this.coin.letter ? `assets/ressources/Coins/${this.coin.letter}.png` : '';
  }
}
