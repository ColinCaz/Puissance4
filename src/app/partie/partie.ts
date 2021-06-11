import { Grille } from '../grille';

export interface Partie {
  joueur1: string;
  joueur2: string;
  grille: Grille;
  score1: number;
  score2: number;
  tour:number;
}