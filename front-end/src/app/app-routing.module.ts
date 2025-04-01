import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReglagePageComponent } from './pages/reglage/reglage.component';
import { PlayerStatsComponent} from "./pages/player-stats/player-stats.component";


const routes: Routes = [
  {path : 'reglage', component : ReglagePageComponent},
  {path: 'stats', component: PlayerStatsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
