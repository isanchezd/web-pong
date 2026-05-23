import { Render } from "../interfaces/render";
import { CircleRenderContext } from "../interfaces/render-context";

export class BallRender implements Render<CircleRenderContext> {

    public render(context: CircleRenderContext): void {
        context.ctx.beginPath();
        context.ctx.arc(context.x, context.y, context.radius, 0, 2 * Math.PI, false);
        context.ctx.fillStyle = context.color;
        context.ctx.fill();
        context.ctx.closePath();
    }
}
