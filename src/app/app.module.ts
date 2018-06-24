import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { MdSidenavModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DirectiveModule} from './directive/directive.module.ts.module'
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    MdSidenavModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DirectiveModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
