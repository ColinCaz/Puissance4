import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm!: FormGroup;
  errorMessage!: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
	this.authService.signOutUser();
  }
  
  incription() {
	this.router.navigate(['/inscription']);
  }
  
  motdepasse() {
	this.router.navigate(['/mot-de-passe-oublie']);
  }

  initForm() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  
  onSubmit() {
    const email = this.signinForm.get('email');
    const password = this.signinForm.get('password');
    if(email!=null && password!=null){
      this.authService.signInUser(email.value, password.value).then(
        () => {
          this.router.navigate(['/parametres']);
        },
        (error) => {
          this.errorMessage = error;
        }
      );
	}
  }
}