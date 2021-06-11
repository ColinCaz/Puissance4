import { Component, OnInit } from '@angular/core';
import { Grille } from '../grille';
import { GRILLES } from '../mock-grilles';
import { Partie } from '../partie/partie';
import { GrilleComponent } from '../partie/grille/grille.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.css']
})
export class ParametresComponent implements OnInit {

  partie: Partie = {
	joueur1:"",
    joueur2:"",
	grille:{
	  largeur:7,
      hauteur:6,
	  hover:false
    },
	score1:0,
	score2:0,
	tour:1
  };
  
  toString():string{  
	return (this.partie.joueur1=="" ? "Joueur1" : this.partie.joueur1) + "." + (this.partie.joueur2=="" ? "Joueur2" : this.partie.joueur2) + "." + this.partie.grille.largeur + "." + this.partie.grille.hauteur;
  }
  
  onSelect(grille: Grille): void {
    this.partie.grille = grille;
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
  
  isSelected(grille: Grille):boolean{
	return grille.largeur==this.partie.grille.largeur && grille.hauteur==this.partie.grille.hauteur;
  }
  
  grilles = GRILLES;

  constructor(private activatedRoute:ActivatedRoute) {
	//this.partie=this.activatedroute.snapshot.paramMap.get("parametres");
  }

  ngOnInit(): void {
	this.activatedRoute.paramMap.subscribe(params => {
	var str=params.get('parametres');
	if(str!=null){
	  this.partie={
	    joueur1:str.split('.')[0],
        joueur2:str.split('.')[1],
	    grille:{
	      largeur:Number(str.split('.')[2]),
          hauteur:Number(str.split('.')[3]),
	      hover:false
        },
	    score1:0,
	    score2:0,
	    tour:1
      }; 
	}
    });
  }

}