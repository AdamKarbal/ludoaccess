import { Component, Input, OnInit } from '@angular/core';
import { Coin } from 'src/models/coin.model';
import { CoinCollectionService } from 'src/services/coincollection.service';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.scss'],
})
export class CoinComponent implements OnInit {
  
    @Input() coin!: Coin; 

  constructor(private coinCollectionService : CoinCollectionService) {}

  ngOnInit(): void {
    console.log('Image path:', this.imagePath);
  }

  get imagePath(): string {
    return this.coin.letter ? `assets/ressources/Coins/${this.coin.letter}.png` : '';
  }

  onClickCollect(): void {
    if (!this.coin.isCollected) { // On veut cliquer seulement si PAS encore collecté
      console.log('Coin clicked !');
      this.coin.collect();
      this.coinCollectionService.addCollected(this.coin);
    }
  }
  
}
