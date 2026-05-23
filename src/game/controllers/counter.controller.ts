import { Counter } from "../class/entities/counter";

export class CounterController {
  private _counter: Counter;
  private _domCounterRef: HTMLElement;

  public get point(): number {
    return this._counter.point;
  }
  
  constructor(domReference: HTMLElement) {
    this._counter = new Counter();
    this._domCounterRef = domReference;
    this._domCounterRef.textContent = this._counter.point.toString();
  }

  public setPoint(point: number): void {
    this._counter.point = point;
    this._domCounterRef.textContent = this._counter.point.toString();
  }

  public updateCounter(): void {
    this.setPoint(this._counter.point + 1);
  }
  
}
