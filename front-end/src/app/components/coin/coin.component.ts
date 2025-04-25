import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.scss'],
})
export class CoinComponent implements OnInit {
  
  @Input() coinLetter!: string;  

  constructor() {}

  ngOnInit(): void {
    console.log('Image path:', this.imagePath);
  }

  get imagePath(): string {
    return this.coinLetter ? `assets/ressources/Coins/${this.coinLetter}.png` : '';
  }
}
