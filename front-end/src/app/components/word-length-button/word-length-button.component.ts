import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-word-length-button',
  templateUrl: './word-length-button.component.html',
  styleUrls: ['./word-length-button.component.scss']
})
export class WordLengthButtonComponent {
  @Input() length!: number;
  @Input() isSelected: boolean = false;

  @Output() lengthSelected = new EventEmitter<number>();

  onClick(): void {
    this.lengthSelected.emit(this.length);
  }
}
