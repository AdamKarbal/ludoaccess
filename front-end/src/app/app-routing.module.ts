import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReglagePageComponent } from './pages/reglage/reglage.component';
import { StatsMenuModule } from './components/stats-menu/menu';
import { StatsComponent} from "./pages/stats/stats";
import { JeuEtape1Component } from './pages/jeu_etape1/jeu_etape1.component';
import { JeuEtape2Component } from './pages/jeu_etape2/jeu_etape2.component';
import { JeuEtape3Component } from './pages/jeu_etape3/jeu_etape3.component';
import { GameComponent } from './component/game/game.component';


const routes: Routes = [
  {path: 'StatsMenu', component: StatsMenuModule},
  {path: 'StatsComponent', component: StatsComponent},
  {path : 'reglage', component : ReglagePageComponent},
  {path : 'jeu_etape1', component : JeuEtape1Component},
  {path : 'jeu_etape2', component : JeuEtape2Component},
  {path : 'jeu_etape3', component : JeuEtape3Component},
  {path : 'game', component : GameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
