import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StatsMenuModule } from "./components/stats-menu/menu";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarGameComponent } from './components/toolbar_game/toolbar_game.component';
import { LevelBarComponent } from './components/level_bar/level_bar.component';
import { Word2GuessComponent } from './components/word2guess/word2guess.component';
import { JeuEtape1Component } from './pages/jeu_etape1/jeu_etape1.component';
import { JeuEtape2Component } from './pages/jeu_etape2/jeu_etape2.component';
import { JeuEtape3Component } from './pages/jeu_etape3/jeu_etape3.component';
import { InfosComponent } from './components/infos/infos.component';
import { CoeursComponent } from './components/coeurs/coeurs.components';
import { finishComponent } from './components/finishScreen/finishScreen.component';
import { SettingComponent } from './components/setting/setting.component';
import { ReglagePageComponent } from './pages/reglage/reglage.component';
import { HeaderComponent } from './components/header/header.component';
import { ChildComponent } from './components/child/child.component';
import { ChildListComponent } from './components/child-list/child-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MobComponent } from './components/mob/mob.component';
import { GameComponent } from './components/game/game.component';
import { JeuComponent } from './components/jeu/jeu.component';
import { MiniGameComponent } from './components/minigame/minigame.component';
import { UserStatsService } from "../services/stats.service";
import { HomeComponent } from './pages/ac/ac.component';

@NgModule({
  declarations: [
    AppComponent,
    SettingComponent,
    ReglagePageComponent,
    HeaderComponent,
    ChildComponent,
    ChildListComponent,
    ToolbarGameComponent,
    LevelBarComponent,
    Word2GuessComponent,
    JeuEtape1Component,
    JeuEtape2Component,
    JeuEtape3Component,
    InfosComponent,
    CoeursComponent,
    finishComponent,
    GameComponent,
    JeuComponent,
    MobComponent,
    MiniGameComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    //StatsMenuModule 
  ],
  providers: [UserStatsService],
  bootstrap: [AppComponent] 
})
export class AppModule { }