import { Grille } from '../grille';

export interface Partie {
  joueur1: string;
  joueur2: string;
  grille: Grille;
  tableau: Array<Array<number>>;
  score1: number;
  score2: number;
  tour:number;
  gameOver:boolean;
}