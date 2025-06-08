import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReglagePageComponent } from './pages/reglage/reglage.component';
import { PlayerStatsComponent} from "./pages/player-stats/player-stats.component";
import { JeuEtape1Component } from './pages/jeu_etape1/jeu_etape1.component';
import { JeuEtape2Component } from './pages/jeu_etape2/jeu_etape2.component';
import { JeuEtape3Component } from './pages/jeu_etape3/jeu_etape3.component';
import { MiniGameComponent } from './components/minigame/minigame.component';
import { JeuComponent } from './components/jeu/jeu.component';
import { HomeComponent } from './pages/ac/ac.component';
import { LoginComponent } from './pages/login/login.component';
import { GameComponent } from './pages/game/game.component';
import { WordsComponent } from './components/words/words.component';



const routes: Routes = [
  {path : 'reglage', component : ReglagePageComponent},
  {path: 'stats/:childId', component: PlayerStatsComponent},
  {path : 'jeu_etape1', component : JeuEtape1Component},
  {path : 'jeu_etape2', component : JeuEtape2Component},
  {path : 'jeu_etape3', component : JeuEtape3Component},
  {path : 'mob', component : MiniGameComponent},
  {path : 'jeuComponent', component : JeuComponent},
  {path: '', component: LoginComponent },
  {path: 'acceuil', component: HomeComponent },
  {path: 'jeu', component: GameComponent},
  { path: 'mots', component: WordsComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
