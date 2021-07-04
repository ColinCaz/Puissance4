import { Component, OnInit, ViewChild } from '@angular/core';
import { Partie } from './partie';
import { Grille } from '../grille';
import { GrilleComponent } from './grille/grille.component';
import { Router } from '@angular/router';
import { DonneesService } from '../donnees.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-partie',
  templateUrl: './partie.component.html',
  styleUrls: ['./partie.component.css']
})
export class PartieComponent implements OnInit {

  partie: Partie = {
	joueur1:"Joueur1",
    joueur2:"Joueur2",
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
  
  getStr1():string{
	if(!this.partie.gameOver){
	  return "C\'est au tour de ";
	}
	return "";
  }
  
  getStr2():string{
	if(this.partie.gameOver){
	  return " a gagné cette manche !";
	}
	return "";
  }
  
  deconnexion(){
	this.authService.signOutUser();
  }
  
  @ViewChild(GrilleComponent) grilleComponent!:GrilleComponent;
  
  retourMenu():void{
	if(confirm('Êtes-vous sûr de vouloir retourner au menu ?\nCela va mettre fin à la partie !')) {
	  this.grilleComponent.nouvellePartie();
      this.router.navigate(['/parametres']);
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
  
  getAll():void{
	//this.partie=this.donneesService.getPartie();
	
	this.donneesService.getJoueur1().subscribe(joueur1 => this.partie.joueur1 = joueur1);
	this.donneesService.getJoueur2().subscribe(joueur2 => this.partie.joueur2 = joueur2);
	this.donneesService.getGrille().subscribe(grille => this.partie.grille = grille);
	this.donneesService.getGameOver().subscribe(gameOver => this.partie.gameOver = gameOver);
    this.donneesService.getScore().subscribe(score => {this.partie.score1 = score[0]; this.partie.score2 = score[1];});
	this.donneesService.getTour().subscribe(tour => this.partie.tour = tour);
	
  }

  constructor(public router: Router, private donneesService: DonneesService, private authService: AuthService) {}

  ngOnInit(): void {
	this.getAll();
  }

}