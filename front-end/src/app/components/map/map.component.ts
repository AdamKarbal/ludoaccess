import {Component, OnInit} from '@angular/core';
import { filter,take } from 'rxjs';
import { CoeurService } from 'src/services/coeurs.services';
import { GameService } from 'src/services/game.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})


export class MapComponent implements OnInit {

    isGameOver = false;
    isGameFinished = false; 

    constructor(coeurService :CoeurService,gameService : GameService) {
        coeurService.isGameOver$.subscribe(isGameOver => {
            this.isGameOver = isGameOver;
        });
        gameService.isGameFinished$.subscribe(isGameFinished => {
            this.isGameFinished = isGameFinished;
            console.log('Game Finished detected in MapComponent');
        });
    }

    

    ngOnInit(): void {
    }


  }
