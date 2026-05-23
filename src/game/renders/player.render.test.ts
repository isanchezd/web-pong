import { describe, expect, it, vi } from "vitest";

import { PlayerRender } from "./player.render";

describe("PlayerRender", () => {
  it("draws a filled rectangle with provided context values", () => {
    const beginPath = vi.fn();
    const fillRect = vi.fn();
    const closePath = vi.fn();

    const ctx = {
      beginPath,
      fillRect,
      closePath,
      fillStyle: ""
    } as unknown as CanvasRenderingContext2D;

    const render = new PlayerRender();
    render.render({
      ctx,
      color: "#FF2D00",
      x: 10,
      y: 20,
      width: 30,
      height: 40
    });

    expect(beginPath).toHaveBeenCalledTimes(1);
    expect(fillRect).toHaveBeenCalledWith(10, 20, 30, 40);
    expect(closePath).toHaveBeenCalledTimes(1);
    expect((ctx as { fillStyle: string }).fillStyle).toBe("#FF2D00");
  });
});
