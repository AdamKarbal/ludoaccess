import { Component, OnInit } from '@angular/core';
import { CoeurService } from '../../../services/coeurs.services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-coeurs',
  templateUrl: './coeurs.component.html',
  styleUrls: ['./coeurs.component.scss'],
})
export class CoeursComponent implements OnInit {
  lives$: Observable<number>;
  
  constructor(private coeurService: CoeurService) {
    this.lives$ = this.coeurService.lives$;
  }

  ngOnInit(): void {}
  
  getHeartImage(position: number): string {
    const currentLives = this.coeurService.livesSubject.getValue();
    
    if (position === 0) {
      if (currentLives >= 2) return 'full.png';
      if (currentLives === 1) return 'mid.png';
      return 'empty.png';
    }
    else if (position === 1) { 
      if (currentLives >= 4) return 'full.png';
      if (currentLives === 3) return 'mid.png';
      return 'empty.png';
    }
    else { 
      if (currentLives >= 6) return 'full.png';
      if (currentLives === 5) return 'mid.png';
      return 'empty.png';
    }
  }
}