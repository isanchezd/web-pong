import { CANVAS_HEIGHT, PLAYER_HEIGHT, PLAYER_SPEED } from "../constants";
import { Player } from "../class/entities/player";

export class PlayerController {
  private _keyCodeUp: string;
  private _keyCodeDown: string;
  private _player: Player;
  private _pressedKeys: Set<string> = new Set();
  private _boundKeyDown: (e: KeyboardEvent) => void;
  private _boundKeyUp: (e: KeyboardEvent) => void;

  public get player(): Player {
    return this._player;
  }

  constructor(player: Player, keyCodeUp: string, keyCodeDown: string) {
    this._player = player;
    this._keyCodeUp = keyCodeUp;
    this._keyCodeDown = keyCodeDown;
    this._boundKeyDown = (e: KeyboardEvent) => this._pressedKeys.add(e.code);
    this._boundKeyUp = (e: KeyboardEvent) => this._pressedKeys.delete(e.code);
    document.addEventListener('keydown', this._boundKeyDown);
    document.addEventListener('keyup', this._boundKeyUp);
  }

  public update(): void {
    if (this._pressedKeys.has(this._keyCodeUp)) {
      this._moveUp();
    }
    if (this._pressedKeys.has(this._keyCodeDown)) {
      this._moveDown();
    }
  }

  public destroy(): void {
    document.removeEventListener('keydown', this._boundKeyDown);
    document.removeEventListener('keyup', this._boundKeyUp);
  }

  private _moveUp() {
    this._player.y = Math.max(0, this._player.y - PLAYER_SPEED);
  }

  private _moveDown() {
    this._player.y = Math.min(CANVAS_HEIGHT - PLAYER_HEIGHT, this._player.y + PLAYER_SPEED);
  }

}
