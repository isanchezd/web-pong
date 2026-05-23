import { Ball } from "../class/entities/ball";
import { CANVAS_WIDTH } from "../constants";

export type PointWinner = "J1" | "J2";

export abstract class ScoreHandler {
  public static handle(ball: Ball, canvasWidth: number = CANVAS_WIDTH): PointWinner | null {
    if (ball.x + ball.radius < 0) {
      return "J2";
    }

    if (ball.x - ball.radius > canvasWidth) {
      return "J1";
    }

    return null;
  }
}
