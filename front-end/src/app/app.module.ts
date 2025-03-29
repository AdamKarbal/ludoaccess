import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SettingComponent} from './component/setting/setting.component';
import { ReglagePageComponent } from './pages/reglage/reglage.component';
import { HeaderComponent } from './component/header/header.component';  
import { ChildComponent } from './component/child/child.component';
import {ChildListComponent} from './component/child-list/child-list.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent, SettingComponent, ReglagePageComponent, HeaderComponent,ChildComponent,ChildListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
