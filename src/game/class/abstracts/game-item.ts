export abstract class GameItem {
    public x: number;
    public y: number
    protected _height: number
    protected _width: number
    protected _color: string;

    public get height(): number {
        return this._height;
    }

    public get width(): number {
        return this._width;
    }

    public get color(): string {
        return this._color;
    }

    constructor(x: number, y: number, height: number, width: number, color: string) {
        this.x = x;
        this.y = y;
        this._height = height;
        this._width = width;
        this._color = color;
    }
    
}
