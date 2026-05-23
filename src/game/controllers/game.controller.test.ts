import { afterEach, describe, expect, it, vi } from "vitest";

import { Ball } from "../class/entities/ball";
import { Player } from "../class/entities/player";
import { BallCollisionHandler } from "../handlers/ball-collision.handler";
import { ScoreHandler } from "../handlers/score.handler";
import { CanvasCleanerHelper } from "../helpers/canvas-cleaner.helper";
import { BallRender } from "../renders/ball.render";
import { PlayerRender } from "../renders/player.render";
import { BallController } from "./ball.controller";
import { CounterController } from "./counter.controller";
import { GameController } from "./game.controller";
import { PlayerController } from "./player.controller";

function buildGameController() {
  const ctx = {} as CanvasRenderingContext2D;
  const canvas = {
    getContext: vi.fn(() => ctx)
  } as unknown as HTMLCanvasElement;

  const player1 = new Player("J1", 0, 100, "#f00");
  const player2 = new Player("J2", 950, 100, "#00f");
  const ball = new Ball(500, 300, "#000", 20);

  const player1Controller = {
    player: player1,
    update: vi.fn(),
    destroy: vi.fn()
  } as unknown as PlayerController;

  const player2Controller = {
    player: player2,
    update: vi.fn(),
    destroy: vi.fn()
  } as unknown as PlayerController;

  const ballController = {
    ball,
    xSpeed: 4,
    ySpeed: 2,
    move: vi.fn(),
    reset: vi.fn()
  } as unknown as BallController;

  const counterJ1Controller = {
    point: 0,
    setPoint: vi.fn()
  } as unknown as CounterController;

  const counterJ2Controller = {
    point: 0,
    setPoint: vi.fn()
  } as unknown as CounterController;

  const playerRender = {
    render: vi.fn()
  } as unknown as PlayerRender;

  const ballRender = {
    render: vi.fn()
  } as unknown as BallRender;

  const controller = new GameController(
    canvas,
    player1Controller,
    player2Controller,
    ballController,
    counterJ1Controller,
    counterJ2Controller,
    playerRender,
    ballRender
  );

  return {
    controller,
    canvas,
    player1Controller,
    player2Controller,
    ballController,
    counterJ1Controller,
    counterJ2Controller,
    playerRender,
    ballRender
  };
}

describe("GameController", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("throws when canvas context is unavailable", () => {
    const canvas = {
      getContext: vi.fn(() => null)
    } as unknown as HTMLCanvasElement;

    const noopPlayerController = {
      player: new Player("J1", 0, 0, "#f00"),
      update: vi.fn(),
      destroy: vi.fn()
    } as unknown as PlayerController;

    const ballController = {
      ball: new Ball(0, 0, "#000", 20),
      xSpeed: 1,
      ySpeed: 1,
      move: vi.fn(),
      reset: vi.fn()
    } as unknown as BallController;

    const counterController = { point: 0, setPoint: vi.fn() } as unknown as CounterController;
    const playerRender = { render: vi.fn() } as unknown as PlayerRender;
    const ballRender = { render: vi.fn() } as unknown as BallRender;

    expect(() => {
      new GameController(
        canvas,
        noopPlayerController,
        noopPlayerController,
        ballController,
        counterController,
        counterController,
        playerRender,
        ballRender
      );
    }).toThrow("Unable to acquire 2D rendering context");
  });

  it("runs one loop tick and renders entities", () => {
    vi.useFakeTimers();
    const data = buildGameController();

    const collisionSpy = vi.spyOn(BallCollisionHandler, "handle").mockImplementation(() => undefined);
    const scoreSpy = vi.spyOn(ScoreHandler, "handle").mockReturnValue(null);
    const cleanSpy = vi.spyOn(CanvasCleanerHelper, "clean").mockImplementation(() => undefined);

    data.controller.start();
    vi.advanceTimersByTime(20);

    expect(data.player1Controller.update).toHaveBeenCalledTimes(1);
    expect(data.player2Controller.update).toHaveBeenCalledTimes(1);
    expect(data.ballController.move).toHaveBeenCalledTimes(1);
    expect(collisionSpy).toHaveBeenCalledTimes(1);
    expect(scoreSpy).toHaveBeenCalledTimes(1);
    expect(cleanSpy).toHaveBeenCalledTimes(1);
    expect(data.playerRender.render).toHaveBeenCalledTimes(2);
    expect(data.ballRender.render).toHaveBeenCalledTimes(1);
  });

  it("applies score effect and resets ball when a point is detected", () => {
    vi.useFakeTimers();
    const data = buildGameController();

    vi.spyOn(BallCollisionHandler, "handle").mockImplementation(() => undefined);
    vi.spyOn(CanvasCleanerHelper, "clean").mockImplementation(() => undefined);
    vi.spyOn(ScoreHandler, "handle").mockReturnValue("J1");

    data.controller.start();
    vi.advanceTimersByTime(20);

    expect(data.counterJ1Controller.setPoint).toHaveBeenCalledWith(1);
    expect(data.ballController.reset).toHaveBeenCalledTimes(1);
    expect(data.ballController.xSpeed).toBe(-4);
  });

  it("cleans resources on destroy", () => {
    const data = buildGameController();

    data.controller.destroy();

    expect(data.player1Controller.destroy).toHaveBeenCalledTimes(1);
    expect(data.player2Controller.destroy).toHaveBeenCalledTimes(1);
  });
});
