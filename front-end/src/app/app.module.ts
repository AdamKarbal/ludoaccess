import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StatsMenuModule} from "./components/stats-menu/menu";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SettingComponent} from './component/setting/setting.component';
import { ReglagePageComponent } from './pages/reglage/reglage.component';
import { HeaderComponent } from './component/header/header.component';  
import { ChildComponent } from './component/child/child.component';
import {ChildListComponent} from './component/child-list/child-list.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StatsComponent} from "./pages/stats/stats";


@NgModule({
  declarations: [
    AppComponent, SettingComponent, ReglagePageComponent, HeaderComponent,ChildComponent,ChildListComponent,StatsMenuModule, StatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent,StatsMenuModule]
})
export class AppModule { }
