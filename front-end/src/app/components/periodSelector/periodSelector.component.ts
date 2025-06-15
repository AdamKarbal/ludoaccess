import {Component, Output, EventEmitter, Input} from '@angular/core';


@Component({
  selector: 'app-period-selector',
  templateUrl:'./periodSelector.component.html',
  styleUrls: ['./periodSelector.component.scss']
})
export class PeriodSelectorComponent {
  @Output() periodChange = new EventEmitter<string>();

  periods = [
    { label: 'Aujourd’hui', value: 'today' as string },
    { label: 'Dernière semaine', value: 'lastWeek' as string },
    { label: 'Dernier mois', value: 'lastMonth' as string }
  ];

  @Input() selectedPeriod: string = 'today';

  selectPeriod(period: string, event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
      console.log(event);
    }
    console.log("Depuis le composant",period);
    this.selectedPeriod = period;
    this.periodChange.emit(period);
  }
}
