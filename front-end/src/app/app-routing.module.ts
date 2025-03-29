import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReglagePageComponent } from './pages/reglage/reglage.component';
import { StatsMenuModule } from './components/stats-menu/menu';
import { StatsComponent} from "./pages/stats/stats";


const routes: Routes = [
  {path: 'StatsMenu', component: StatsMenuModule},
  {path: 'StatsComponent', component: StatsComponent}
  {path : 'reglage', component : ReglagePageComponent},
  ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
