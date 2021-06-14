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
  
  set(joueur1:string,joueur2:string,grille:Grille):void{
	localStorage.setItem('joueur1', joueur1);
	localStorage.setItem('joueur2', joueur2);
	localStorage.setItem('largeur', String(grille.largeur));
	localStorage.setItem('hauteur', String(grille.hauteur));
  }
  
  getJoueur1():Observable<string>{
	return of(""+localStorage.getItem('joueur1'));
  }
  
  getJoueur2():Observable<string>{
	return of(""+localStorage.getItem('joueur2'));
  }
  
  getGrille():Observable<Grille>{
	let grille: Grille = {
	  largeur:Number(localStorage.getItem('largeur')),
	  hauteur:Number(localStorage.getItem('hauteur')),
	  hover:false
	}
	return of(grille);
  }

  constructor() {}
  
}