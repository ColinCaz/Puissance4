import { Component, OnInit, Input } from '@angular/core';
import { Grille } from '../../grille';
import { Partie } from '../partie';

@Component({
  selector: 'app-grille',
  templateUrl: './grille.component.html',
  styleUrls: ['./grille.component.css']
})
export class GrilleComponent implements OnInit {

  @Input() partie: Partie = {
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
  
  gameOver:boolean=false;
  
  getStr1():string{
	if(this.gameOver){
	  return "";
	}
	else{
	  return "C\'est au tour de ";
	}
  }
  
  getStr2():string{
	if(this.gameOver){
	  return " a gagné cette manche !";
	}
	else{
	  return "";
	}
  }
  
  tableau:Array<any[]> = new Array(this.partie.grille.largeur);
  
  get(i:number,j:number):number{
    return this.tableau[i][j];
  }
  
  click(i:number,j:number):void{
	if(this.gameOver){
	  this.nouvelleManche();
	  return;
	}
	if(i<this.partie.grille.largeur && j<this.partie.grille.hauteur){
	  if(this.tableau[i][j]==0 || this.tableau[i][j]==3){
		for(var jj = j; jj < this.partie.grille.hauteur; jj++){
          if(this.tableau[i][jj]!=0 && this.tableau[i][jj]!=3){
            this.tableau[i][jj-1] = this.partie.tour;
			if(jj>1){
			  this.tableau[i][jj-2]=3;
			}
			this.check(this.partie.tour);
			break;
          }
		  if(jj==this.partie.grille.hauteur-1){
			this.tableau[i][jj] = this.partie.tour;
			if(jj>0){
			  this.tableau[i][jj-1]=3;
			}
			this.check(this.partie.tour);
		  }
		}
      }
	  else{
		for(var jj = j; jj >= 0; jj--){
          if(this.tableau[i][jj]==0  || this.tableau[i][jj]==3){
            this.tableau[i][jj] = this.partie.tour;
			if(jj>0){
			  this.tableau[i][jj-1]=3;
			}
			this.check(this.partie.tour);
			break;
          }
		}
	  }
	}
  }
  
  mouseEnter(i:number,j:number):void{
	if(i<this.partie.grille.largeur && j<this.partie.grille.hauteur){
	  if(this.tableau[i][j]==0){
		for(var jj = j; jj < this.partie.grille.hauteur; jj++){
          if(this.tableau[i][jj]!=0){
            this.tableau[i][jj-1] = 3;
			break;
          }
		  if(jj==this.partie.grille.hauteur-1){
			this.tableau[i][jj] = 3;
		  }
		}
      }
	  else{
		for(var jj = j; jj >= 0; jj--){
          if(this.tableau[i][jj]==0){
            this.tableau[i][jj] = 3;
			break;
          }
		}
	  }
	}
  }
  
  mouseLeave(i:number,j:number):void{
	for(var i=0; i<this.partie.grille.largeur; i++){
	  for(var j = 0; j < this.partie.grille.hauteur; j++){
		if(this.tableau[i][j]==3){
		  this.tableau[i][j]=0;
		}
	  }
	}
  }
  
  check(n:number):void{
	if(this.checkVertical(n) || this.checkHorizontal(n) || this.checkDiagonal(n)){
	  n==1 ? this.partie.score1++ : this.partie.score2++;
	  this.gameOver=true;
	}
	else{
	  if(this.partie.tour==1){
	    this.partie.tour=2;
	  }
	  else{
	    this.partie.tour=1;
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
	this.gameOver=false;
	this.partie.tour=1;
	for(var i = 0; i < this.partie.grille.largeur; i++){
      for(var j = 0; j < this.partie.grille.hauteur; j++){
        this.tableau[i][j] = 0;
      }
    }
  }
  
  nouvellePartie():void{
	this.nouvelleManche();
	this.partie.score1=0;
	this.partie.score2=0;
  }
  
  hauteur5():boolean {
	return this.partie.grille.hauteur>=5;
  }
  
  hauteur6():boolean {
	return this.partie.grille.hauteur>=6;
  }
  
  largeur7():boolean {
	return this.partie.grille.largeur>=7;
  }

  constructor() { }

  ngOnInit(): void {
    for(var i = 0; i < this.partie.grille.largeur; i++){
      this.tableau[i] = new Array(this.partie.grille.hauteur);
    }
	for(var i = 0; i < this.partie.grille.largeur; i++){
      for(var j = 0; j < this.partie.grille.hauteur; j++){
        this.tableau[i][j] = 0;
      }
    }
  }

}
