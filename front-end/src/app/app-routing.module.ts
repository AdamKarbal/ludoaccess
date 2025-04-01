import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReglagePageComponent } from './pages/reglage/reglage.component';
import { PlayerStatsComponent} from "./pages/player-stats/player-stats.component";
import { JeuEtape1Component } from './pages/jeu_etape1/jeu_etape1.component';
import { JeuEtape2Component } from './pages/jeu_etape2/jeu_etape2.component';
import { JeuEtape3Component } from './pages/jeu_etape3/jeu_etape3.component';
import { GameComponent } from './components/game/game.component';
import { Jeu} from './pages/jeu/jeu.component';


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
