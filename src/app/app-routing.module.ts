import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParametresComponent } from './parametres/parametres.component';
import { PartieComponent } from './partie/partie.component';

const routes: Routes = [
  { path: '', redirectTo: '/parametres/..7.6', pathMatch: 'full' },
  { path: 'parametres/:parametres', component: ParametresComponent },
  { path: 'partie/:partie', component: PartieComponent },
  { path: '**', redirectTo: '/parametres/..7.6', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
