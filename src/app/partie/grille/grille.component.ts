import { Component, OnInit, Input } from '@angular/core';
import { Grille } from '../../grille';
import { Partie } from '../partie';
import { DonneesService } from '../../donnees.service';

@Component({
  selector: 'app-grille',
  templateUrl: './grille.component.html',
  styleUrls: ['./grille.component.css']
})
export class GrilleComponent implements OnInit {

  @Input() partie: Partie = {
	joueur1:"Joueur1",
    joueur2:"Joueur2",
	grille:{
	  largeur:7,
      hauteur:6,
	  hover:false
    },
	score1:0,
	score2:0,
	tour:1,
	gameOver:false
  };
  
  tableau:Array<Array<number>> = new Array(this.partie.grille.largeur);
  
  get(i:number,j:number):number{
    return this.tableau[i][j];
  }
  
  click(i:number):void{
	if(this.partie.gameOver){
	  this.nouvelleManche();
	  return;
	}
	if(i<this.partie.grille.largeur && (this.tableau[i][0]==0 || this.tableau[i][0]==3)){
	  for(var j = 0; j < this.partie.grille.hauteur; j++){
        if(this.tableau[i][j]!=0 && this.tableau[i][j]!=3 && j-1>=0){
          this.tableau[i][j-1] = this.partie.tour;
		  if(j>1){
		    this.tableau[i][j-2]=3;
		  }
		  this.check(this.partie.tour);
		  break;
        }
		if(j==this.partie.grille.hauteur-1){
		  this.tableau[i][j] = this.partie.tour;
		  this.tableau[i][j-1]=3;
		  this.check(this.partie.tour);
		}
	  }
	  this.setTab();
	}
  }
  
  mouseEnter(i:number):void{
	if(i<this.partie.grille.largeur && (this.tableau[i][0]==0 || this.tableau[i][0]==3)){
	  for(var j = 0; j < this.partie.grille.hauteur; j++){
        if(this.tableau[i][j]!=0 && j-1>=0){
          this.tableau[i][j-1] = 3;
		  break;
        }
		if(j==this.partie.grille.hauteur-1){
		  this.tableau[i][j] = 3;
		}
	  }
	}
  }
  
  mouseLeave():void{
	for(var i = 0; i < this.partie.grille.largeur; i++){
	  for(var j = 0; j < this.partie.grille.hauteur; j++){
		if(this.tableau[i][j]==3){
		  this.tableau[i][j]=0;
		}
	  }
	}
  }
  
  check(n:number):void{
	if(this.checkVertical(n) || this.checkHorizontal(n) || this.checkDiagonal(n)){
	  n==1 ? this.setScore(this.partie.score1+1,this.partie.score2) : this.setScore(this.partie.score1,this.partie.score2+1);
	  this.setGameOver(true);
	}
	else{
	  if(this.partie.tour==1){
	    this.setTour(2);
	  }
	  else{
	    this.setTour(1);
	  }
	}
  }
  
  checkVertical(n:number):boolean{
	for(var i=0; i<this.partie.grille.largeur; i++){
	  var count=0;
	  for(var j = 0; j < this.partie.grille.hauteur; j++){
		if(this.tableau[i][j]==n){
		  count++;
		  if(count==4){
			return true;
			break;
		  }
		}
		else{
		  count=0;
		}
	  }
	}
	return false;
  }
  
  checkHorizontal(n:number):boolean{
	for(var i=0; i<this.partie.grille.hauteur; i++){
	  var count=0;
	  for(var j = 0; j < this.partie.grille.largeur; j++){
		if(this.tableau[j][i]==n){
		  count++;
		  if(count==4){
			return true;
		  }
		}
		else{
		  count=0;
		}
	  }
	}
	return false;
  }
  
  checkDiagonal(n:number):boolean{
	for(var i=0; i<this.partie.grille.largeur-3; i++){
	  for(var j = 0; j < this.partie.grille.hauteur-3; j++){
	    if(this.tableau[i][j]==n && this.tableau[i+1][j+1]==n && this.tableau[i+2][j+2]==n && this.tableau[i+3][j+3]==n){
		  return true;
		}
	  }
	}
	for(var i=3; i<this.partie.grille.largeur; i++){
	  for(var j = 0; j < this.partie.grille.hauteur-3; j++){
	    if(this.tableau[i][j]==n && this.tableau[i-1][j+1]==n && this.tableau[i-2][j+2]==n && this.tableau[i-3][j+3]==n){
		  return true;
		}
	  }
	}
	return false;
  }
  
  nouvelleManche():void{
	this.setGameOver(false);
	this.setTour(this.partie.tour==1 ? 2 : 1);
	for(var i = 0; i < this.partie.grille.largeur; i++){
      for(var j = 0; j < this.partie.grille.hauteur; j++){
        this.tableau[i][j] = 0;
      }
    }
	this.setTab();
  }
  
  nouvellePartie():void{
	this.nouvelleManche();
	this.setTour(1);
	this.setScore(0,0);
  }
  
  largeur7():boolean {
	return this.partie.grille.largeur>=7;
  }
  
  setScore(score1:number, score2:number){
	this.donneesService.setScore(score1, score2);
	this.partie.score1=score1;
	this.partie.score2=score2;
  }
  
  setTour(tour:number){
	this.donneesService.setTour(tour);
	this.partie.tour=tour;
  }
  
  setTab(){
	this.donneesService.setTab(this.tableau);
  }
  
  setGameOver(gameOver:boolean){
	this.partie.gameOver=gameOver;
	this.donneesService.setGameOver(gameOver);
  }
  
  getAll():void{
	this.donneesService.getJoueur1().subscribe(joueur1 => this.partie.joueur1 = joueur1);
	this.donneesService.getJoueur2().subscribe(joueur2 => this.partie.joueur2 = joueur2);
	this.donneesService.getGrille().subscribe(grille => this.partie.grille = grille);
	this.donneesService.getGameOver().subscribe(gameOver => this.partie.gameOver = gameOver);
	this.donneesService.getTab().subscribe(tab => this.tableau = tab);
    this.donneesService.getScore().subscribe(score => {this.partie.score1 = score[0]; this.partie.score2 = score[1];});
	this.donneesService.getTour().subscribe(tour => this.partie.tour = tour);
  }

  constructor(private donneesService: DonneesService) {}

  ngOnInit(): void {
	this.getAll();
  }

}