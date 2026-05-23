import { Render } from "../interfaces/render";
import { RectRenderContext } from "../interfaces/render-context";

export class PlayerRender implements Render<RectRenderContext> {

    public render(context: RectRenderContext): void {
        context.ctx.beginPath();
        context.ctx.fillStyle = context.color;
        context.ctx.fillRect(context.x, context.y, context.width, context.height);
        context.ctx.closePath();
    }
}
