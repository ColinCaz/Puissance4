import { Injectable } from '@angular/core';
import { Grille } from './grille';
import { GRILLES } from './mock-grilles';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonneesService {
  
  getGrilles():Observable<Grille[]>{
  const grilles = of(GRILLES);
  return grilles;
}

  setJoueur1(joueur1:string):void{
	localStorage.setItem('joueur1', joueur1);
  }
  
  setJoueur2(joueur2:string):void{
	localStorage.setItem('joueur2', joueur2);
  }
  
  setGrille(grille:Grille):void{
	localStorage.setItem('largeur', String(grille.largeur));
	localStorage.setItem('hauteur', String(grille.hauteur));
  }
  
  setGameOver(gameOver:boolean):void{
	localStorage.setItem('gameOver', String(gameOver));
  }
  
  setTab(tab:Array<Array<number>>):void{
	for(var i=0; i<tab.length; i++){
	  for(var j=0; j<tab[0].length; j++){
	    localStorage.setItem("\'tab["+i+"]["+j+"]\'", String(tab[i][j]==3?0:tab[i][j]));
	  }
	}
  }
  
  setScore(score1:number, score2:number){
	localStorage.setItem('score1', String(score1));
	localStorage.setItem('score2', String(score2));
  }
  
  setTour(tour:number){
	localStorage.setItem('tour', String(tour));
  }
  
  getJoueur1():Observable<string>{
	return of("" + (localStorage.getItem('joueur1')==null ? "" : localStorage.getItem('joueur1')));
  }
  
  getJoueur2():Observable<string>{
	return of("" + (localStorage.getItem('joueur2')==null ? "" : localStorage.getItem('joueur2')));
  }
  
  getGrille():Observable<Grille>{
	let grille: Grille = {
	  largeur:Number(localStorage.getItem('largeur')==null ? 7 : localStorage.getItem('largeur')),
	  hauteur:Number(localStorage.getItem('hauteur')==null ? 6 : localStorage.getItem('hauteur')),
	  hover:false
	}
	return of(grille);
  }
  
  getGameOver():Observable<boolean>{
	return of(localStorage.getItem('gameOver')==String(true));
  }
  
  getTab():Observable<Array<Array<number>>>{
	let largeur:number=Number(localStorage.getItem('largeur')==null ? 7 : localStorage.getItem('largeur'));
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
	return of(tab);
  }
  
  getScore():Observable<number[]>{
    return of([Number(localStorage.getItem('score1')==null ? 0 : localStorage.getItem('score1')),Number(localStorage.getItem('score2')==null ? 0 : localStorage.getItem('score2'))]);
  }
  
  getTour():Observable<number>{
    return of(Number(localStorage.getItem('tour')==null ? 1 : localStorage.getItem('tour')));
  }

  constructor() {}
  
}