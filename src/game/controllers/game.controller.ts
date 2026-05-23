import { FPS } from "../constants";
import { BallCollisionHandler } from "../handlers/ball-collision.handler";
import { PointWinner, ScoreHandler } from "../handlers/score.handler";
import { CanvasCleanerHelper } from "../helpers/canvas-cleaner.helper";
import { GameState } from "../interfaces/game-state";
import { BallRender } from "../renders/ball.render";
import { PlayerRender } from "../renders/player.render";
import { BallController } from "./ball.controller";
import { CounterController } from "./counter.controller";
import { PlayerController } from "./player.controller";

export class GameController {
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;
  private _player1Controller: PlayerController;
  private _player2Controller: PlayerController;
  private _ballController: BallController;
  private _counterJ1Controller: CounterController;
  private _counterJ2Controller: CounterController;
  private _playerRender: PlayerRender;
  private _ballRender: BallRender;
  private _intervalRef: ReturnType<typeof setInterval> | null;
  private _isDestroyed: boolean;
  private _state: GameState;

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
    const canvasContext = this._canvas.getContext('2d');
    if (!canvasContext) {
      throw new Error('Unable to acquire 2D rendering context');
    }

    this._ctx = canvasContext;
    this._player1Controller = player1Controller;
    this._player2Controller = player2Controller;
    this._ballController = ballController;
    this._counterJ1Controller = counterJ1Controller;
    this._counterJ2Controller = counterJ2Controller;
    this._playerRender = playerRender;
    this._ballRender = ballRender;
    this._intervalRef = null;
    this._isDestroyed = false;
    this._state = {
      player1: this._player1Controller.player,
      player2: this._player2Controller.player,
      ball: this._ballController.ball,
      score: {
        j1: this._counterJ1Controller.point,
        j2: this._counterJ2Controller.point
      }
    };
  }

  public start(): void {
    if (this._isDestroyed) {
      return;
    }

    if (this._intervalRef !== null) {
      return;
    }

    this._intervalRef = setInterval(() => {
      this._gameLoop();
    }, 1000 / FPS);

  }

  public stop(): void {
    if (this._intervalRef !== null) {
      clearInterval(this._intervalRef);
      this._intervalRef = null;
    }
  }

  public destroy(): void {
    if (this._isDestroyed) {
      return;
    }

    this.stop();
    this._player1Controller.destroy();
    this._player2Controller.destroy();
    this._isDestroyed = true;
  }

  private _gameLoop(): void {
    this._player1Controller.update();
    this._player2Controller.update();
    this._ballController.move();
    BallCollisionHandler.handle(this._ballController, this._player1Controller, this._player2Controller);
    const pointWinner = ScoreHandler.handle(this._state.ball);
    if (pointWinner !== null) {
      this._applyPoint(pointWinner);
    }

    CanvasCleanerHelper.clean(this._ctx);
    this._playerRender.render({
      ctx: this._ctx,
      color: this._state.player1.color,
      x: this._state.player1.x,
      y: this._state.player1.y,
      width: this._state.player1.width,
      height: this._state.player1.height
    });
    this._playerRender.render({
      ctx: this._ctx,
      color: this._state.player2.color,
      x: this._state.player2.x,
      y: this._state.player2.y,
      width: this._state.player2.width,
      height: this._state.player2.height
    });
    this._ballRender.render({
      ctx: this._ctx,
      color: this._state.ball.color,
      x: this._state.ball.x,
      y: this._state.ball.y,
      radius: this._state.ball.radius
    });
  }

  private _applyPoint(pointWinner: PointWinner): void {
    if (pointWinner === "J1") {
      this._state.score.j1 += 1;
      this._counterJ1Controller.setPoint(this._state.score.j1);
      this._ballController.xSpeed = -Math.abs(this._ballController.xSpeed);
    }

    if (pointWinner === "J2") {
      this._state.score.j2 += 1;
      this._counterJ2Controller.setPoint(this._state.score.j2);
      this._ballController.xSpeed = Math.abs(this._ballController.xSpeed);
    }

    this._ballController.reset();
  }

}
