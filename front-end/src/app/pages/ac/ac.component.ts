import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './ac.component.html',
  styleUrls: ['./ac.component.scss']
})
export class HomeComponent {
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}