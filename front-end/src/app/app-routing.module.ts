import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReglagePageComponent } from './pages/reglage/reglage.component';
import { StatsMenuModule } from './components/stats-menu/menu';
import { StatsComponent} from "./pages/stats/stats";
import { GameComponent } from './component/game/game.component';


const routes: Routes = [
  {path: 'StatsMenu', component: StatsMenuModule},
  {path: 'StatsComponent', component: StatsComponent},
  {path : 'reglage', component : ReglagePageComponent},
  {path : 'game', component : GameComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
