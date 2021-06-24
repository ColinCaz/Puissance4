import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  createNewUser(prenom: string, email: string, password: string){
    return new Promise<void>(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
			var user = firebase.auth().currentUser;
			if(user){
			  user.updateProfile({
			    displayName: prenom
			  }).then(function(){}).catch(function(error) {
			  });
			}
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }
  
  getName():string{
    var user = firebase.auth().currentUser;
    if (user != null) {
  	  return user.displayName==null?"":user.displayName;
    }
	return "";
  }
  
  signInUser(email: string, password: string) {
    return new Promise<void>(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }
  
  forgotPassword(email: string) {
    return new Promise<void>(
      (resolve, reject) => {
        firebase.auth().sendPasswordResetEmail(email).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }
  
  signOutUser() {
    firebase.auth().signOut();
  }
  
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().onAuthStateChanged(
          (user) => {
            if(user) {
              resolve(true);
            } else {
              this.router.navigate(['/connexion']);
              resolve(false);
            }
          }
        );
      }
    );
  }

  constructor(private router:Router) {}
  
}
