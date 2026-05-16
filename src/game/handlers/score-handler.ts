import { CANVAS_WIDTH } from "../constants";
import { BallController } from "../controllers/ball.controller";
import { CounterController } from "../controllers/counter.controller";

export abstract class ScoreHandler {

  public static handle(ballController: BallController, counterJ1Controller: CounterController, counterJ2Controller: CounterController) {
    if (ballController.ball.x + ballController.ball.radius < 0) {
      counterJ2Controller.updateCounter();
      ballController.reset();
      ballController.xSpeed = Math.abs(ballController.xSpeed);
    }

    if (ballController.ball.x - ballController.ball.radius > CANVAS_WIDTH) {
      counterJ1Controller.updateCounter();
      ballController.reset();
      ballController.xSpeed = -Math.abs(ballController.xSpeed);
    }
  }
}
