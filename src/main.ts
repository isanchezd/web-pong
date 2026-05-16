import { Game } from './game/game';


window.addEventListener('load', () => {
    const boardElement = document.getElementById('board');
    if (!(boardElement instanceof HTMLCanvasElement)) {
        throw new Error('Missing required canvas element: #board');
    }

    const game = new Game(boardElement);
    game.run();
});
