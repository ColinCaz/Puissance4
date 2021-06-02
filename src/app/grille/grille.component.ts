import { Component, OnInit } from '@angular/core';
import { Grille } from '../grille';

@Component({
  selector: 'app-grille',
  templateUrl: './grille.component.html',
  styleUrls: ['./grille.component.css']
})
export class GrilleComponent implements OnInit {
	
  grille: Grille = {
    largeur: 6,
    hauteur: 5
  };

  constructor() { }

  ngOnInit(): void {
  }

}
