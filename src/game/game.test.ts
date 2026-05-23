import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants";
import { GameController } from "./controllers/game.controller";
import { Game } from "./game";

describe("Game integration", () => {
  beforeEach(() => {
    Object.defineProperty(globalThis, "document", {
      configurable: true,
      value: {
        addEventListener: vi.fn(),
        removeEventListener: vi.fn()
      }
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("wires game controller lifecycle and sets board dimensions", () => {
    const startSpy = vi.spyOn(GameController.prototype, "start");
    const stopSpy = vi.spyOn(GameController.prototype, "stop");
    const destroySpy = vi.spyOn(GameController.prototype, "destroy");

    const board = {
      width: 0,
      height: 0,
      getContext: vi.fn(() => ({}))
    } as unknown as HTMLCanvasElement;

    const counterJ1 = { textContent: "" } as HTMLElement;
    const counterJ2 = { textContent: "" } as HTMLElement;

    const game = new Game({ board, counterJ1, counterJ2 });

    expect(board.width).toBe(CANVAS_WIDTH);
    expect(board.height).toBe(CANVAS_HEIGHT);

    game.run();
    expect(startSpy).toHaveBeenCalledTimes(1);

    game.stop();
    expect(stopSpy).toHaveBeenCalledTimes(1);

    game.destroy();
    game.destroy();
    expect(destroySpy).toHaveBeenCalledTimes(1);

    game.run();
    expect(startSpy).toHaveBeenCalledTimes(1);
  });
});
