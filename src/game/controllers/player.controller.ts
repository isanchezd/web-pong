import { CANVAS_HEIGHT, PLAYER_HEIGHT, PLAYER_SPEED } from "../constants";
import { GameItem } from "../class/abstracts/game-item";
import { Player } from "../class/entities/player";

export class PlayerController {
  private _keyCodeLeft: number;
  private _keyCodeRight: number;
  private _player: Player;

  public get player(): Player {
    return this._player;
  }

  constructor(player: Player, keyCodeLeft: number, keyCodeRight: number) {
    this._player = player;
    this._keyCodeLeft = keyCodeLeft;
    this._keyCodeRight = keyCodeRight;
    document.addEventListener('keyup', (event: KeyboardEvent) => this._keyUpEventHandle(event));
  }

  private _keyUpEventHandle(event: KeyboardEvent): void {
    //TODO: Think a refactor to the switch
    switch (event.keyCode) {
      case this._keyCodeLeft:
        this._moveLeft();
        break;
      case this._keyCodeRight:
        this._moveRight();
        break;
      default:
        break;
    }
  }

  private _moveLeft() {
    if (this._player.y - PLAYER_SPEED > 0) {
      this._player.y -= PLAYER_SPEED;
    }
  }

  private _moveRight() {
    if (this._player.y + PLAYER_SPEED < (CANVAS_HEIGHT - PLAYER_HEIGHT)) {
      this._player.y += PLAYER_SPEED;
    }
  }

}
