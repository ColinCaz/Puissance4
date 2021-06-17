import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PartieComponent } from './partie/partie.component';
import { ParametresComponent } from './parametres/parametres.component';
import { GrilleComponent } from './partie/grille/grille.component';

@NgModule({
  declarations: [
    AppComponent,
    PartieComponent,
    ParametresComponent,
    GrilleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
	RouterModule,
	AppRoutingModule,
	HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
