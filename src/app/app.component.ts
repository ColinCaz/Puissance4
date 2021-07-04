import { Component } from '@angular/core';
import firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    const config = {
      apiKey: "AIzaSyDK5sWVF_P6QcgYpezcK4Oj2P6x8F-DPi0",
      authDomain: "puissance-4-ccf24.firebaseapp.com",
      databaseURL: "https://puissance-4-ccf24-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "puissance-4-ccf24",
      storageBucket: "puissance-4-ccf24.appspot.com",
      messagingSenderId: "589634394847",
      appId: "1:589634394847:web:aaaaa29e7246aa96abe76a"
    };
    firebase.initializeApp(config);
  }
}
