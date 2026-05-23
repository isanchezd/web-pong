import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Player } from "../class/entities/player";
import { CANVAS_HEIGHT, PLAYER_HEIGHT, PLAYER_SPEED } from "../constants";
import { PlayerController } from "./player.controller";

type KeyListener = (event: KeyboardEvent) => void;

describe("PlayerController", () => {
  const listeners: Partial<Record<string, KeyListener>> = {};
  const addEventListenerMock = vi.fn((type: string, handler: KeyListener) => {
    listeners[type] = handler;
  });
  const removeEventListenerMock = vi.fn();

  beforeEach(() => {
    addEventListenerMock.mockClear();
    removeEventListenerMock.mockClear();
    listeners.keydown = undefined;
    listeners.keyup = undefined;

    Object.defineProperty(globalThis, "document", {
      configurable: true,
      value: {
        addEventListener: addEventListenerMock,
        removeEventListener: removeEventListenerMock
      }
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("moves player up when up key is pressed", () => {
    const player = new Player("J1", 0, 200, "#fff");
    const controller = new PlayerController(player, "KeyQ", "KeyA");

    listeners.keydown?.({ code: "KeyQ" } as KeyboardEvent);
    controller.update();

    expect(player.y).toBe(200 - PLAYER_SPEED);
  });

  it("moves player down and clamps at bottom limit", () => {
    const bottomLimit = CANVAS_HEIGHT - PLAYER_HEIGHT;
    const player = new Player("J1", 0, bottomLimit - 5, "#fff");
    const controller = new PlayerController(player, "KeyQ", "KeyA");

    listeners.keydown?.({ code: "KeyA" } as KeyboardEvent);
    controller.update();

    expect(player.y).toBe(bottomLimit);
  });

  it("removes keyboard listeners on destroy", () => {
    const player = new Player("J1", 0, 200, "#fff");
    const controller = new PlayerController(player, "KeyQ", "KeyA");

    controller.destroy();

    expect(removeEventListenerMock).toHaveBeenCalledTimes(2);
    expect(removeEventListenerMock).toHaveBeenCalledWith("keydown", expect.any(Function));
    expect(removeEventListenerMock).toHaveBeenCalledWith("keyup", expect.any(Function));
  });
});
