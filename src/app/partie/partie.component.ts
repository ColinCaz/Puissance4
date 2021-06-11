import { Component, OnInit, ViewChild } from '@angular/core';
import { Partie } from './partie';
import { Grille } from '../grille';
import { GrilleComponent } from './grille/grille.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partie',
  templateUrl: './partie.component.html',
  styleUrls: ['./partie.component.css']
})
export class PartieComponent implements OnInit {

  partie: Partie = {
	joueur1:"Colin",
    joueur2:"Lucas",
	grille:{
	  largeur:7,
      hauteur:6,
	  hover:false
    },
	score1:0,
	score2:0,
	tour:1
  };
  
  @ViewChild(GrilleComponent) grilleComponent!:GrilleComponent;
  
  getStr1():string{
	if(this.grilleComponent!=undefined){
	  return this.grilleComponent.getStr1();
	}
	else{
		return "C\'est au tour de ";
	}
  }
  
  getStr2():string{
	if(this.grilleComponent!=undefined){
	  return this.grilleComponent.getStr2();
	}
	else{
		return "";
	}
  }
  
  toString():string{  
	return (this.partie.joueur1=="" ? "Joueur1" : this.partie.joueur1) + "." + (this.partie.joueur2=="" ? "Joueur2" : this.partie.joueur2) + "." + this.partie.grille.largeur + "." + this.partie.grille.hauteur;
  }
  
  retourMenu():void{
	if(confirm('Êtes-vous sûr de vouloir retourner au menu ?\nCela va mettre fin à la partie !')) {
      this.router.navigate(['/parametres', this.toString()]);
	}
  }
  
  nouvelleManche():void{
	if(confirm('Êtes-vous sûr de vouloir commencer une nouvelle manche ?\nCela va réinitialliser la grille !')) {
      this.grilleComponent.nouvelleManche();
    }
  }
  
  nouvellePartie():void{
	if(confirm('Êtes-vous sûr de vouloir commencer une nouvelle partie ?\nCela va réinitialliser la grille et le score !')) {
      this.grilleComponent.nouvellePartie();
	}
  }

  constructor(private activatedRoute:ActivatedRoute, public router: Router) {
	//this.partie=this.activatedroute.snapshot.paramMap.get("partie");
  }

  ngOnInit(): void {
	this.activatedRoute.paramMap.subscribe(params => {
	var str=params.get('partie');
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