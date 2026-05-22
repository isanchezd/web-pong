import { Ball } from './class/entities/ball';
import { Player } from './class/entities/player';
import { 
    CANVAS_WIDTH, 
    CANVAS_HEIGHT,
    X_J1,
    Y_PLAYER,
    COLOR_J1,
    KEY_CODE_UP_J1,
    KEY_CODE_DOWN_J1,
    X_J2,
    COLOR_J2,
    KEY_CODE_UP_J2,
    KEY_CODE_DOWN_J2,
    X_BALL,
    Y_BALL,
    COLOR_BALL,
} from './constants';
import { BallController } from './controllers/ball.controller';
import { CounterController } from './controllers/counter.controller';
import { GameController } from './controllers/game.controller';
import { PlayerController } from './controllers/player.controller';
import { BallRender } from './renders/ball.render';
import { PlayerRender } from './renders/player.render';

export interface GameDomElements {
  board: HTMLCanvasElement;
  counterJ1: HTMLElement;
  counterJ2: HTMLElement;
}


export class Game{
    private _canvas: HTMLCanvasElement;
    private _gameController: GameController;

    constructor(domElements: GameDomElements) {
        this._canvas = domElements.board;
        this._canvas.width = CANVAS_WIDTH;
        this._canvas.height = CANVAS_HEIGHT;
        this._gameController = new GameController(
          this._canvas, 
          new PlayerController(new Player('J1', X_J1, Y_PLAYER, COLOR_J1), KEY_CODE_UP_J1, KEY_CODE_DOWN_J1),
          new PlayerController(new Player('J2', X_J2, Y_PLAYER, COLOR_J2), KEY_CODE_UP_J2, KEY_CODE_DOWN_J2),
          new BallController(new Ball(X_BALL, Y_BALL, COLOR_BALL)),
          new CounterController(domElements.counterJ1),
          new CounterController(domElements.counterJ2),
          new PlayerRender(),
          new BallRender());
    }

    public run(): void {
        this._gameController.start();
    }
    
}
