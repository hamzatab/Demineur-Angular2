import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { GrilleComponent } from './grille/grille.component';
import { CaseComponent } from './case/case.component';
import {TimerService } from './timer.service';


@NgModule({
  declarations: [
    AppComponent,
    GrilleComponent,
    CaseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [TimerService],
  bootstrap: [AppComponent],

})
export class AppModule { }
