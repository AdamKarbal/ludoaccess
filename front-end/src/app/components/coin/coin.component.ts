import { Component, Input, OnInit } from '@angular/core';
import { Coin } from 'src/models/coin.model';
import { CoinCollectionService } from 'src/services/coincollection.service';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.scss'],
})
export class CoinComponent implements OnInit {
  showAura: boolean = false;
  auraX : number = 0;
  auraY : number = 0;

  @Input() coin!: Coin; 

  constructor(private coinCollectionService : CoinCollectionService) {}

  ngOnInit(): void {
    console.log('Image path:', this.imagePath);
  }

  get imagePath(): string {
    if (this.coin.letter && this.coin.letter.match(/^[a-zàâçéèêëîïôûùüÿñæœ]$/i)) {
        if (this.coin.letter.match(/^[a-zàâçéèêëîïôûùüÿñæœ]$/)) {
            return `assets/ressources/Coins/${this.coin.letter}Min.png`;
        }
        if (this.coin.letter.match(/^[A-ZÀÂÇÉÈÊËÎÏÔÛÙÜŸÑÆŒ]$/)) {
            return `assets/ressources/Coins/${this.coin.letter}.png`;
        }
    }
    return ''; 
  }

  onClickCollect(event : MouseEvent): void {
    if (!this.coin.isCollected) { // On veut cliquer seulement si PAS encore collecté
      console.log('Coin clicked !');
      this.coin.collecting = true;
   
      const audio = new Audio('assets/sons/coin_received.mp3');
      audio.play();

      setTimeout(() => {
        this.coin.collect();
        this.coinCollectionService.addCollected(this.coin);
      }, 300)
    }
  }


}
