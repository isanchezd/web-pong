import { describe, expect, it } from "vitest";

import { Ball } from "../class/entities/ball";
import { X_BALL, Y_BALL } from "../constants";
import { BallController } from "./ball.controller";

describe("BallController", () => {
  it("moves ball using current speed", () => {
    const ball = new Ball(100, 200, "#000", 20);
    const controller = new BallController(ball);

    controller.xSpeed = 4;
    controller.ySpeed = -3;
    controller.move();

    expect(ball.x).toBe(104);
    expect(ball.y).toBe(197);
  });

  it("resets ball to initial coordinates", () => {
    const ball = new Ball(100, 200, "#000", 20);
    const controller = new BallController(ball);

    controller.reset();

    expect(ball.x).toBe(X_BALL);
    expect(ball.y).toBe(Y_BALL);
  });
});
