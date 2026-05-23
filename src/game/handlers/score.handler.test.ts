import { describe, expect, it } from "vitest";

import { Ball } from "../class/entities/ball";
import { CANVAS_WIDTH } from "../constants";
import { ScoreHandler } from "./score.handler";

describe("ScoreHandler", () => {
  it("returns J2 when ball exits by left side", () => {
    const ball = new Ball(-21, 100, "#000", 20);

    expect(ScoreHandler.handle(ball, CANVAS_WIDTH)).toBe("J2");
  });

  it("returns J1 when ball exits by right side", () => {
    const ball = new Ball(CANVAS_WIDTH + 21, 100, "#000", 20);

    expect(ScoreHandler.handle(ball, CANVAS_WIDTH)).toBe("J1");
  });

  it("returns null when ball is still inside bounds", () => {
    const ball = new Ball(CANVAS_WIDTH / 2, 100, "#000", 20);

    expect(ScoreHandler.handle(ball, CANVAS_WIDTH)).toBeNull();
  });
});
