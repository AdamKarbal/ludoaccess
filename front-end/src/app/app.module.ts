import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarGameComponent } from './components/toolbar_game/toolbar_game.component';
import { LevelBarComponent } from './components/level_bar/level_bar.component';
import { Word2GuessComponent } from './components/word2guess/word2guess.component';

@NgModule({
  declarations: [
    AppComponent,ToolbarGameComponent,LevelBarComponent,Word2GuessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
