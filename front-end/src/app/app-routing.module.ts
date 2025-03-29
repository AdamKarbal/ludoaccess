import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatsMenuModule } from './components/stats-menu/menu';
import { StatsComponent} from "./pages/stats/stats";

const routes: Routes = [
  {path: 'StatsMenu', component: StatsMenuModule},
  {path: 'StatsComponent', component: StatsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
