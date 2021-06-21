import { Injectable } from '@angular/core';
import { Partie } from './partie/partie';
import { Grille } from './grille';
import { GRILLES } from './mock-grilles';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DonneesService {
	
  partie:Partie = {
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
  
  savePartieToServer():void{
    this.httpClient
      .put('https://puissance-4-ccf24-default-rtdb.europe-west1.firebasedatabase.app/partie.json', this.partie)
      .subscribe(
      () => {
        console.log('Enregistrement terminé !');
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }
  
  getPartieFromServer():void{
	this.httpClient
      .get<Partie>('https://puissance-4-ccf24-default-rtdb.europe-west1.firebasedatabase.app/partie.json')
      .subscribe(
        (partie) => {
          this.partie=partie;
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
    );
  }

  setJoueur1(joueur1:string):void{
	this.partie.joueur1=joueur1;
	this.savePartieToServer();
	//localStorage.setItem('joueur1', joueur1);
  }
  
  setJoueur2(joueur2:string):void{
	this.partie.joueur2=joueur2;
	this.savePartieToServer();
	//localStorage.setItem('joueur2', joueur2);
  }
  
  setGrille(grille:Grille):void{
	this.partie.grille=grille;
	this.savePartieToServer();
	//localStorage.setItem('largeur', String(grille.largeur));
	//localStorage.setItem('hauteur', String(grille.hauteur));
  }
  
  setTab(tab:Array<Array<number>>):void{
	this.partie.tableau=tab;
	this.savePartieToServer();
	/*for(var i=0; i<tab.length; i++){
	  for(var j=0; j<tab[0].length; j++){
	    localStorage.setItem("\'tab["+i+"]["+j+"]\'", String(tab[i][j]==3?0:tab[i][j]));
	  }
	}*/
  }
  
  setScore(score1:number, score2:number):void{
	this.partie.score1=score1;
	this.partie.score2=score2;
	this.savePartieToServer();
	//localStorage.setItem('score1', String(score1));
	//localStorage.setItem('score2', String(score2));
  }
  
  setTour(tour:number):void{
	this.partie.tour=tour;
	this.savePartieToServer();
	//localStorage.setItem('tour', String(tour));
  }
  
  setGameOver(gameOver:boolean):void{
	this.partie.gameOver=gameOver;
	this.savePartieToServer();
	//localStorage.setItem('gameOver', String(gameOver));
  }
  
  setPartie(partie:Partie){
	this.partie=partie;
	this.savePartieToServer();
  }
  
  getJoueur1():Observable<string>{
	//this.getPartieFromServer();
	return of(this.partie.joueur1);
	//return of("" + (localStorage.getItem('joueur1')==null ? "" : localStorage.getItem('joueur1')));
  }
  
  getJoueur2():Observable<string>{
	//this.getPartieFromServer();
	return of(this.partie.joueur2);
	//return of("" + (localStorage.getItem('joueur2')==null ? "" : localStorage.getItem('joueur2')));
  }
  
  getGrille():Observable<Grille>{
	//this.getPartieFromServer();
	return of(this.partie.grille);
	/*let grille: Grille = {
	  largeur:Number(localStorage.getItem('largeur')==null ? 7 : localStorage.getItem('largeur')),
	  hauteur:Number(localStorage.getItem('hauteur')==null ? 6 : localStorage.getItem('hauteur')),
	  hover:false
	}
	return of(grille);*/
  }
  
  getTab():Observable<Array<Array<number>>>{
	//this.getPartieFromServer();
	return of(this.partie.tableau);
	/*let largeur:number=Number(localStorage.getItem('largeur')==null ? 7 : localStorage.getItem('largeur'));
	let hauteur:number=Number(localStorage.getItem('hauteur')==null ? 6 : localStorage.getItem('hauteur'));
	let tab:Array<Array<number>> = new Array(largeur);
	for(var i = 0; i < largeur; i++){
      tab[i] = new Array(hauteur);
    }
	for(var i = 0; i < largeur; i++){
      for(var j = 0; j < hauteur; j++){
        tab[i][j] = Number(localStorage.getItem("\'tab["+i+"]["+j+"]\'")==null ? 0 : localStorage.getItem("\'tab["+i+"]["+j+"]\'"));
      }
    }
	return of(tab);*/
  }
  
  getScore():Observable<number[]>{
    //this.getPartieFromServer();
	return of([this.partie.score1,this.partie.score2]);
	//return of([Number(localStorage.getItem('score1')==null ? 0 : localStorage.getItem('score1')),Number(localStorage.getItem('score2')==null ? 0 : localStorage.getItem('score2'))]);
  }
  
  getTour():Observable<number>{
    //this.getPartieFromServer();
	return of(this.partie.tour);
	//return of(Number(localStorage.getItem('tour')==null ? 1 : localStorage.getItem('tour')));
  }
  
  getGameOver():Observable<boolean>{
	//this.getPartieFromServer();
	return of(this.partie.gameOver);
	//return of(localStorage.getItem('gameOver')==String(true));
  }
  
  getPartie():Observable<Partie>{
	this.getPartieFromServer();
	return of(this.partie);
  }
  
  getGrilles():Observable<Grille[]>{
    const grilles = of(GRILLES);
    return grilles;
  }

  constructor(private httpClient: HttpClient) {
	this.partie.tableau = new Array(this.partie.grille.largeur);
	for(var i = 0; i < this.partie.grille.largeur; i++){
      this.partie.tableau[i] = new Array(this.partie.grille.hauteur);
    }
	for(var i = 0; i < this.partie.grille.largeur; i++){
      for(var j = 0; j < this.partie.grille.hauteur; j++){
        this.partie.tableau[i][j] = 0;
      }
    }
	this.getPartieFromServer();
  }
  
}