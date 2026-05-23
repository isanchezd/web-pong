import { describe, expect, it, vi } from "vitest";

import { BallRender } from "./ball.render";

describe("BallRender", () => {
  it("draws a filled circle with provided context values", () => {
    const beginPath = vi.fn();
    const arc = vi.fn();
    const fill = vi.fn();
    const closePath = vi.fn();

    const ctx = {
      beginPath,
      arc,
      fill,
      closePath,
      fillStyle: ""
    } as unknown as CanvasRenderingContext2D;

    const render = new BallRender();
    render.render({
      ctx,
      color: "#000",
      x: 50,
      y: 60,
      radius: 20
    });

    expect(beginPath).toHaveBeenCalledTimes(1);
    expect(arc).toHaveBeenCalledWith(50, 60, 20, 0, 2 * Math.PI, false);
    expect(fill).toHaveBeenCalledTimes(1);
    expect(closePath).toHaveBeenCalledTimes(1);
    expect((ctx as { fillStyle: string }).fillStyle).toBe("#000");
  });
});
