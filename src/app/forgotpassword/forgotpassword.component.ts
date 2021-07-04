import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  forgotForm!: FormGroup;
  errorMessage!: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
	this.authService.signOutUser();
  }
  
  connexion() {
	this.router.navigate(['/connexion']);
  }

  initForm() {
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    const email = this.forgotForm.get('email');
    if(email!=null){
      this.authService.forgotPassword(email.value).then(
        () => {
          this.router.navigate(['/connexion']);
        },
        (error) => {
          this.errorMessage = error;
        }
      );
	}
  }
}