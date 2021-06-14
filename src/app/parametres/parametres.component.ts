import { Component, OnInit } from '@angular/core';
import { Grille } from '../grille';
import { DonneesService } from '../donnees.service';
import { Partie } from '../partie/partie';
import { GrilleComponent } from '../partie/grille/grille.component';
import { ActivatedRoute } from '@angular/router';
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
	score1:0,
	score2:0,
	tour:1
  };
  
  onSelect(grille: Grille): void {
    this.partie.grille = grille;
	this.set(this.partie.joueur1, this.partie.joueur2, this.partie.grille);
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
  
  grilles: Grille[] = [];
  
  get():void{
	this.donneesService.getJoueur1().subscribe(joueur1 => this.partie.joueur1 = joueur1);
	this.donneesService.getJoueur2().subscribe(joueur2 => this.partie.joueur2 = joueur2);
	this.donneesService.getGrille().subscribe(grille => this.partie.grille = grille);
	this.donneesService.getGrilles().subscribe(grilles => this.grilles = grilles);
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
  
  click():void{
	this.set(this.partie.joueur1, this.partie.joueur2, this.partie.grille);
	this.router.navigate(['/partie']);
  }

  constructor(private activatedRoute:ActivatedRoute, public router: Router, private donneesService: DonneesService) {}

  ngOnInit(): void {
	this.get();
  }
  
}