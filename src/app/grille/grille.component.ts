import { Component, OnInit } from '@angular/core';
import { Grille } from '../grille';
import { GRILLES } from '../mock-grilles';

@Component({
  selector: 'app-grille',
  templateUrl: './grille.component.html',
  styleUrls: ['./grille.component.css']
})
export class GrilleComponent implements OnInit {
	
  selectedGrille?: Grille = {
	largeur:7,
    hauteur:6
  };
  onSelect(grille: Grille): void {
    this.selectedGrille = grille;
  }
  
  grilles = GRILLES;

  constructor() { }

  ngOnInit(): void {
  }

}
