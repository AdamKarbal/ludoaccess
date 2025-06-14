import {Component, Output, EventEmitter, Input} from '@angular/core';


@Component({
  selector: 'app-period-selector',
  templateUrl:'./periodSelector.component.html',
  styleUrls: ['./periodSelector.component.scss']
})
export class PeriodSelectorComponent {
  @Output() periodChange = new EventEmitter<string>();

  periods = [
    { label: 'Aujourd’hui', value: 'today'},
    { label: 'Dernière semaine', value: 'lastWeek'},
    { label: 'Dernier mois', value: 'lastMonth'}
  ];

  @Input() selectedPeriod: string = 'today';

  selectPeriod(period: string, event?: Event) {
    if (event) {
      console.log(event);
      event.preventDefault();
    }

    this.selectedPeriod = period;
    this.periodChange.emit(period);
  }
}
