import { describe, expect, it } from "vitest";

import { Ball } from "../class/entities/ball";
import { Player } from "../class/entities/player";
import { CANVAS_HEIGHT, CANVAS_WIDTH, Y_PLAYER } from "../constants";
import { BallController } from "../controllers/ball.controller";
import { PlayerController } from "../controllers/player.controller";
import { BallCollisionHandler } from "./ball-collision.handler";

function createPlayerControllerMock(id: string, x: number): PlayerController {
  return {
    player: new Player(id, x, Y_PLAYER, "#fff")
  } as unknown as PlayerController;
}

describe("BallCollisionHandler", () => {
  it("bounces ball on bottom wall", () => {
    const ball = new Ball(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 19, "#000", 20);
    const ballController = new BallController(ball);
    const player1Controller = createPlayerControllerMock("J1", 0);
    const player2Controller = createPlayerControllerMock("J2", (CANVAS_WIDTH * 95) / 100);

    ballController.ySpeed = 3;

    BallCollisionHandler.handle(ballController, player1Controller, player2Controller);

    expect(ball.y).toBe(CANVAS_HEIGHT - ball.radius);
    expect(ballController.ySpeed).toBe(-3);
  });

  it("bounces ball on top wall", () => {
    const ball = new Ball(CANVAS_WIDTH / 2, 19, "#000", 20);
    const ballController = new BallController(ball);
    const player1Controller = createPlayerControllerMock("J1", 0);
    const player2Controller = createPlayerControllerMock("J2", (CANVAS_WIDTH * 95) / 100);

    ballController.ySpeed = -2;

    BallCollisionHandler.handle(ballController, player1Controller, player2Controller);

    expect(ball.y).toBe(ball.radius);
    expect(ballController.ySpeed).toBe(2);
  });
});
