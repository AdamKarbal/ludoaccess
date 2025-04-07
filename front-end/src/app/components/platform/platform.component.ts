import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss']
})
export class PlatformComponent implements OnInit {
  @Input() x!: number;
  @Input() y!: number;
  @Input() width!: number;
  @Input() height!: number;
  @Input() coinLetter!: string;

  constructor() { }

  ngOnInit(): void {
    //console.log('coinLetter:', this.coinLetter);
  }
}
