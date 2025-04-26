import { Component, Input, OnInit } from '@angular/core';
import { Coin } from 'src/models/coin.model';
import { CoinCollectionService } from 'src/services/coincollection.service';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.scss'],
})
export class CoinComponent implements OnInit {
  collecting: boolean = false;
  showAura: boolean = false;
  auraX : number = 0;
  auraY : number = 0;

  @Input() coin!: Coin; 

  constructor(private coinCollectionService : CoinCollectionService) {}

  ngOnInit(): void {
    console.log('Image path:', this.imagePath);
  }

  get imagePath(): string {
    return this.coin.letter ? `assets/ressources/Coins/${this.coin.letter}.png` : '';
  }

  onClickCollect(event : MouseEvent): void {
    if (!this.coin.isCollected) { // On veut cliquer seulement si PAS encore collecté
      console.log('Coin clicked !');
      this.collecting = true;
      //this.showAura = true;
      //this.auraX = event.clientX;
      //this.auraY = event.clientY;

      const audio = new Audio('assets/sons/coin_received.mp3');
      audio.play();

      //simplement pour laisser l'animation se faire les petits coquinous
      setTimeout(() => {
        this.coin.collect();
        this.coinCollectionService.addCollected(this.coin);
      }, 300)

      /*setTimeout(() => {
        this.showAura = false;
      }, 500);*/
    }
  }
  
}
