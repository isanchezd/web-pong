import { Game } from './game/game';

const BOARD_SELECTOR = 'board';
const COUNTER_J1_SELECTOR = 'counter-J1';
const COUNTER_J2_SELECTOR = 'counter-J2';

function getRequiredCanvasById(id: string): HTMLCanvasElement {
  const element = document.getElementById(id);
  if (!(element instanceof HTMLCanvasElement)) {
    throw new Error(`Missing required canvas element: #${id}`);
  }

  return element;
}

function getRequiredElementById(id: string): HTMLElement {
  const element = document.getElementById(id);
  if (!(element instanceof HTMLElement)) {
    throw new Error(`Missing required element: #${id}`);
  }

  return element;
}

window.addEventListener('load', () => {
  const game = new Game({
    board: getRequiredCanvasById(BOARD_SELECTOR),
    counterJ1: getRequiredElementById(COUNTER_J1_SELECTOR),
    counterJ2: getRequiredElementById(COUNTER_J2_SELECTOR)
  });

  window.addEventListener('beforeunload', () => {
    game.destroy();
  });

  game.run();
});
