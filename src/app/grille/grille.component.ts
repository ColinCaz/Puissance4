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
    hauteur:6,
	hover:false
  };
  onSelect(grille: Grille): void {
    this.selectedGrille = grille;
  }
  
  hauteur5(grille: Grille):boolean {
	return grille.hauteur>=5;
  }
  
  hauteur6(grille: Grille):boolean {
	return grille.hauteur>=6;
  }
  
  largeur7(grille: Grille):boolean {
	return grille.largeur>=7;
  }
  
  setHover(b: boolean, grille: Grille):void{
	grille.hover=b;
  }
  
  getHover(grille: Grille):boolean{
	return grille.hover;
  }
  
  grilles = GRILLES;

  constructor() { }

  ngOnInit(): void {
  }

}
