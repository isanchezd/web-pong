export interface RenderBaseContext {
  ctx: CanvasRenderingContext2D;
  color: string;
  x: number;
  y: number;
}

export interface RectRenderContext extends RenderBaseContext {
  width: number;
  height: number;
}

export interface CircleRenderContext extends RenderBaseContext {
  radius: number;
}
