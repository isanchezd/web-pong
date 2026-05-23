import { Ball } from "../class/entities/ball";
import { Player } from "../class/entities/player";

export interface ScoreState {
  j1: number;
  j2: number;
}

export interface GameState {
  player1: Player;
  player2: Player;
  ball: Ball;
  score: ScoreState;
}
