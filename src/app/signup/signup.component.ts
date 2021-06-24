import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
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
    this.signupForm = this.formBuilder.group({
      prenom: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]]
    }, {
      validator: this.mustMatch('password','password2')
    });
  }
  
  mustMatch(password:string, password2:string){
	return (formGroup: FormGroup) => {
      const p=formGroup.controls[password];
      const p2=formGroup.controls[password2];
      if (p2.errors && !p2.errors.mustMatch) {
        return;
      }
      if(p.value!==p2.value){
        p2.setErrors({mustMatch:true});
      }else{
        p2.setErrors(null);
      }
    }
  }

  onSubmit() {
	const prenom = this.signupForm.get('prenom');
    const email = this.signupForm.get('email');
    const password = this.signupForm.get('password');
    if(prenom !=null && email!=null && password!=null){
      this.authService.createNewUser(prenom.value, email.value, password.value).then(
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