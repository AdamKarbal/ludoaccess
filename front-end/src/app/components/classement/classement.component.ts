import { Component } from '@angular/core';
import { ClassementService } from 'src/services/classement.service';
import { Child } from 'src/models/child.model';

@Component({
  selector: 'app-classement',
  templateUrl: './classement.component.html',
  styleUrls: ['./classement.component.scss']
})
export class ClassementComponent {
  filtre: 'jour' | 'semaine' | 'mois' | 'general' = 'semaine';
  filtreOptions: Array<'jour' | 'semaine' | 'mois' | 'general'> = ['jour', 'semaine', 'mois', 'general'];

  constructor(public classementService: ClassementService) {}

  get classementEntries(): [Child, number[]][] {
    const filtreIndex = { jour: 0, semaine: 1, mois: 2, general: 3 }[this.filtre];
    return Array.from(this.classementService.lvlByChid.entries())
      .sort((a, b) => (b[1][filtreIndex] ?? 0) - (a[1][filtreIndex] ?? 0));
  }

  changerFiltre(f: 'jour' | 'semaine' | 'mois' | 'general') {
    this.filtre = f;
  }
}
