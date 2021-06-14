import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParametresComponent } from './parametres/parametres.component';
import { PartieComponent } from './partie/partie.component';

const routes: Routes = [
  { path: '', redirectTo: '/parametres', pathMatch: 'full' },
  { path: 'parametres', component: ParametresComponent },
  { path: 'partie', component: PartieComponent },
  { path: '**', redirectTo: '/parametres', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
