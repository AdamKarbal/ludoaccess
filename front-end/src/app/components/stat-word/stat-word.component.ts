import {Component, OnInit} from '@angular/core';
import {GameService} from "../../../services/game.service";
import {Word2GuessService} from "../../../services/word2guess.services";
import {LevelService} from "../../../services/levels.service";

@Component({
  selector: 'app-stat-word',
  templateUrl: './stat-word.component.html',
  styleUrl: './stat-word.component.scss'
})
export class StatWordComponent implements OnInit {
  nbMissedL: number = 0;
  missedWords: string[] = [];
  formattedMissedWords: string = '';
  progress : number = 0;

  constructor(private gameService: GameService, private w2gService: Word2GuessService,
              private levelService : LevelService) {}

  ngOnInit() {
    this.gameService.wordForStat$.subscribe(words => {
      this.missedWords = words;
      this.updateFormattedWords();
    });

    this.w2gService.missedLetterCount$.subscribe(count => {
      this.nbMissedL = count;
    });

    this.progress = this.levelService.progress;
  }

  updateFormattedWords() {
    this.formattedMissedWords = this.missedWords
      .join(', ');
  }
}
