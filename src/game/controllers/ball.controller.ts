import { BALL_SPEED, X_BALL, Y_BALL } from "../constants";
import { Ball } from "../class/entities/ball";

export class BallController {
  public xSpeed: number = BALL_SPEED;
  public ySpeed: number = BALL_SPEED;
  private _ball: Ball;

  public get ball(): Ball {
    return this._ball;
  }

  constructor(ball: Ball) {
    this._ball = ball;
  }

  public move(): void {
    this._ball.x += this.xSpeed;
    this._ball.y += this.ySpeed;
  }

  public reset(): void {
    this._ball.x = X_BALL;
    this._ball.y = Y_BALL;
  }

}
