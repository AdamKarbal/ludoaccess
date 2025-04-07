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
import { HomeComponent } from './pages/ac/ac.component';
import { BackgroundComponent } from './components/background/background.component';
import { MapComponent } from './components/map/map.component';
import { GroundComponent } from './components/ground/ground.component';
import { PlatformComponent } from './components/platform/platform.component';
import { CoinComponent } from './components/coin/coin.component';
import {UserStatsChartComponent} from "./components/stats-chart/stats-chart";
import {PlayerStatsComponent} from "./pages/player-stats/player-stats.component";
import {PlayerComponent} from "./components/player/player.component";
import { BulleDialogueComponent } from './components/bulle_dialogue/bulle_dialogue';

@NgModule({
  declarations: [
    CoinComponent,
    PlatformComponent,
    GroundComponent,
    MapComponent,
    BackgroundComponent,
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
    StatsMenuModule,
    finishComponent,
    GameComponent,
    JeuComponent,
    MobComponent,
    MiniGameComponent,
    HomeComponent,
    PlayerStatsComponent,
    UserStatsChartComponent,
    PlayerComponent,
    BulleDialogueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    // StatsMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
