import {Component, OnInit} from '@angular/core';
import {GameService} from "../../../services/game.service";
import {Word2GuessService} from "../../../services/word2guess.services";

@Component({
  selector: 'app-stat-word',
  templateUrl: './stat-word.component.html',
  styleUrl: './stat-word.component.scss'
})
export class StatWordComponent implements OnInit {
  nbMissedL: number = 0;
  missedWords: string[] = [];
  formattedMissedWords: string = '';

  constructor(private gameService: GameService, private w2gService: Word2GuessService) {}

  ngOnInit() {
    this.gameService.wordForStat$.subscribe(words => {
      this.missedWords = words;
      this.updateFormattedWords();
    });

    this.w2gService.badLetter$.subscribe(badLetter => {
      this.nbMissedL++;
    })
  }

  updateFormattedWords() {
    this.formattedMissedWords = this.missedWords
      .join(', ');
  }
}
