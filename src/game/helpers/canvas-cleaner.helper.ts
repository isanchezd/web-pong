import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../constants';

export class CanvasCleanerHelper {
    public static clean(ctx: CanvasRenderingContext2D): void {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}
