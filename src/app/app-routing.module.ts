import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParametresComponent } from './parametres/parametres.component';
import { PartieComponent } from './partie/partie.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { AuthService } from './auth.service';

const routes: Routes = [
  { path: '', redirectTo: '/parametres', pathMatch: 'full' },
  { path: 'inscription', component: SignupComponent },
  { path: 'connexion', component: SigninComponent },
  { path: 'mot-de-passe-oublie', component: ForgotpasswordComponent },
  { path: 'parametres', canActivate: [AuthService], component: ParametresComponent },
  { path: 'partie', canActivate: [AuthService], component: PartieComponent },
  { path: '**', redirectTo: '/parametres', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
