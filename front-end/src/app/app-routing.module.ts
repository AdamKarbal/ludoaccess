import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReglagePageComponent } from './pages/reglage/reglage.component';
// import { PlayerStatsComponent} from "./pages/player-stats/player-stats.component";
import { JeuEtape1Component } from './pages/jeu_etape1/jeu_etape1.component';
import { JeuEtape2Component } from './pages/jeu_etape2/jeu_etape2.component';
import { JeuEtape3Component } from './pages/jeu_etape3/jeu_etape3.component';
import { GameComponent } from './components/game/game.component';
import { MobComponent } from './components/mob/mob.component';
import { JeuComponent } from './components/jeu/jeu.component';
import { HomeComponent } from './pages/ac/ac.component';
import { UserStatsChartComponent } from './components/stats-chart/stats-chart';

const routes: Routes = [
  {path : 'reglage', component : ReglagePageComponent},
  // {path: 'stats', component: PlayerStatsComponent},
  {path : 'jeu_etape1', component : JeuEtape1Component},
  {path : 'jeu_etape2', component : JeuEtape2Component},
  {path : 'jeu_etape3', component : JeuEtape3Component},
  {path : 'game', component : GameComponent},
  {path : 'mob', component : MobComponent},
  {path : 'jeuComponent', component : JeuComponent},
  { path: '', component: HomeComponent }, // Page d'accueil

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
