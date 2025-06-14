import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-retour',
  templateUrl: './retour.component.html',
  styleUrl: './retour.component.scss'
})
export class RetourComponent {
  constructor(public location: Location) {}

  revenirEnArriere() : void{
    this.location.back();
  }
}
