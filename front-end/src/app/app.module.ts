import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StatsMenuModule} from "./components/stats-menu/menu";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StatsComponent} from "./pages/stats/stats";

@NgModule({
  declarations: [
    AppComponent, StatsMenuModule, StatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent,StatsMenuModule]
})
export class AppModule { }
