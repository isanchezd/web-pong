import { describe, expect, it } from "vitest";

import { CounterController } from "./counter.controller";

describe("CounterController", () => {
  it("initializes DOM content with zero", () => {
    const domRef = { textContent: "" } as HTMLElement;

    const controller = new CounterController(domRef);

    expect(controller.point).toBe(0);
    expect(domRef.textContent).toBe("0");
  });

  it("sets point and updates DOM", () => {
    const domRef = { textContent: "" } as HTMLElement;
    const controller = new CounterController(domRef);

    controller.setPoint(7);

    expect(controller.point).toBe(7);
    expect(domRef.textContent).toBe("7");
  });

  it("increments point with updateCounter", () => {
    const domRef = { textContent: "" } as HTMLElement;
    const controller = new CounterController(domRef);

    controller.updateCounter();
    controller.updateCounter();

    expect(controller.point).toBe(2);
    expect(domRef.textContent).toBe("2");
  });
});
