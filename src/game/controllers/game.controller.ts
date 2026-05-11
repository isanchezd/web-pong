import { Ball } from "../class/entities/ball";
import { Player } from "../class/entities/player";
import { FPS } from "../constants";
import { BallColissionHandler } from "../handlers/ball-colission.handler";
import { ScoreHandler } from "../handlers/score-handler";
import { CanvasCleanerHelper } from "../helpers/canvas-cleaner.helper";
import { BallRender } from "../renders/ball.render";
import { PlayerRender } from "../renders/player.render";
import { BallController } from "./ball.controller";
import { CounterController } from "./counter.controller";
import { PlayerController } from "./player.controller";

export class GameController {
  private _canvas: HTMLCanvasElement;
  private _player1Controller: PlayerController;
  private _player2Controller: PlayerController;
  private _ballController: BallController;
  private _counterJ1Controller: CounterController;
  private _counterJ2Controller: CounterController;
  private _playerRender: PlayerRender;
  private _ballRender: BallRender;
  private _intervalRef: number;

  constructor(
    canvas: HTMLCanvasElement,
    player1Controller: PlayerController,
    player2Controller: PlayerController,
    ballController: BallController,
    counterJ1Controller: CounterController,
    counterJ2Controller: CounterController,
    playerRender: PlayerRender,
    ballRender: BallRender
  ) {
    this._canvas = canvas;
    this._player1Controller = player1Controller;
    this._player2Controller = player2Controller;
    this._ballController = ballController;
    this._counterJ1Controller = counterJ1Controller;
    this._counterJ2Controller = counterJ2Controller;
    this._playerRender = playerRender;
    this._ballRender = ballRender;
  }

  public start(): void {
    this._intervalRef = setInterval(() => {
      this._gameLoop(this._canvas.getContext('2d'), this._player1Controller.player, this._player2Controller.player, this._ballController.ball)
    }, 1000 / FPS);

  }

  public stop(): void {
    clearInterval(this._intervalRef);
  }

  private _gameLoop(ctx: CanvasRenderingContext2D, player1: Player, player2: Player, ball: Ball): void {
    this._player1Controller.update();
    this._player2Controller.update();
    CanvasCleanerHelper.clean(this._canvas);
    this._playerRender.render({
      ctx,
      color: player1.color,
      x: player1.x,
      y: player1.y
    });
    this._playerRender.render({
      ctx,
      color: player2.color,
      x: player2.x,
      y: player2.y
    });
    this._ballRender.render({
      ctx,
      color: ball.color,
      x: ball.x,
      y: ball.y
    });
    this._ballController.move();
    BallColissionHandler.handle(this._ballController, this._player1Controller, this._player2Controller);
    ScoreHandler.handle(this._ballController, this._counterJ1Controller, this._counterJ2Controller);
  }

}
