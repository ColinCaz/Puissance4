import { Component, OnInit, ViewChild } from '@angular/core';
import { Partie } from './partie';
import { Grille } from '../grille';
import { GrilleComponent } from './grille/grille.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DonneesService } from '../donnees.service';

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
  
  retourMenu():void{
	if(confirm('Êtes-vous sûr de vouloir retourner au menu ?\nCela va mettre fin à la partie !')) {
	  this.set(this.partie.joueur1, this.partie.joueur2, this.partie.grille)
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
  
  set(joueur1:string, joueur2:string, grille:Grille):void{
	if(joueur1==""){
	  joueur1="Joueur1";
	}
	if(joueur2==""){
	  joueur2="Joueur2";
	}
	this.donneesService.set(joueur1, joueur2, grille);
  }
  
  getAll():void{
	this.donneesService.getJoueur1().subscribe(joueur1 => this.partie.joueur1 = joueur1);
	this.donneesService.getJoueur2().subscribe(joueur2 => this.partie.joueur2 = joueur2);
	this.donneesService.getGrille().subscribe(grille => this.partie.grille = grille);
  }

  constructor(private activatedRoute:ActivatedRoute, public router: Router, private donneesService: DonneesService) {}

  ngOnInit(): void {
	this.getAll();
  }

}