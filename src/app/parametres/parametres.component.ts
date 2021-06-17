import { Component, OnInit } from '@angular/core';
import { Grille } from '../grille';
import { DonneesService } from '../donnees.service';
import { Partie } from '../partie/partie';
import { GrilleComponent } from '../partie/grille/grille.component';
import { Router } from '@angular/router';

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
    tableau:new Array(7),
	score1:0,
	score2:0,
	tour:1,
	gameOver:false
  };
  
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
  
  onSelect(grille: Grille): void {
    this.partie.grille = grille;
	this.setGrille(this.partie.grille);
  }
  
  grilles: Grille[] = [];
  
  get():void{
	this.donneesService.getPartie().subscribe(partie => this.partie = partie);
	this.donneesService.getGrilles().subscribe(grilles => this.grilles = grilles);
	/*
	this.donneesService.getJoueur1().subscribe(joueur1 => this.partie.joueur1 = joueur1);
	this.donneesService.getJoueur2().subscribe(joueur2 => this.partie.joueur2 = joueur2);
	this.donneesService.getGrille().subscribe(grille => this.partie.grille = grille);
	this.donneesService.getGrilles().subscribe(grilles => this.grilles = grilles);
	
	let tab:Array<Array<number>> = new Array(this.partie.grille.largeur);
	for(var i = 0; i < this.partie.grille.largeur; i++){
      tab[i] = new Array(this.partie.grille.hauteur);
    }
	for(var i = 0; i < this.partie.grille.largeur; i++){
      for(var j = 0; j < this.partie.grille.hauteur; j++){
        tab[i][j] = 0;
      }
    }
	this.donneesService.setTab(tab);
	*/
  }
  
  setGrille(grille:Grille):void{
	this.donneesService.setGrille(grille);
  }
  
  set(joueur1:string, joueur2:string):void{
	if(joueur1==""){
	  joueur1="Joueur1";
	}
	if(joueur2==""){
	  joueur2="Joueur2";
	}
	this.donneesService.setJoueur1(joueur1);
	this.donneesService.setJoueur2(joueur2);
	this.donneesService.setScore(0,0);
	this.donneesService.setTour(1);
	this.partie.tableau = new Array(this.partie.grille.largeur);
	for(var i = 0; i < this.partie.grille.largeur; i++){
      this.partie.tableau[i] = new Array(this.partie.grille.hauteur);
    }
	for(var i = 0; i < this.partie.grille.largeur; i++){
      for(var j = 0; j < this.partie.grille.hauteur; j++){
        this.partie.tableau[i][j] = 0;
      }
    }
	this.donneesService.setTab(this.partie.tableau);
  }
  
  click():void{
	this.set(this.partie.joueur1, this.partie.joueur2);
	this.router.navigate(['/partie']);
  }

  constructor(public router: Router, private donneesService: DonneesService) {}

  ngOnInit(): void {
	this.get();
  }
  
}