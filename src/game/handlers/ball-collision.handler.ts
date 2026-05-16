import { CANVAS_HEIGHT } from "../constants";
import { BallController } from "../controllers/ball.controller";
import { PlayerController } from "../controllers/player.controller";


export abstract class BallCollisionHandler {

  public static handle(ballController: BallController, player1Controller: PlayerController, player2Controller: PlayerController) {
        // down
        if (ballController.ball.y + ballController.ball.radius >= CANVAS_HEIGHT) {
          ballController.ball.y = CANVAS_HEIGHT - ballController.ball.radius;
          ballController.ySpeed = -ballController.ySpeed;
        }
    
        // up
        if (ballController.ball.y - ballController.ball.radius <= 0) {
          ballController.ball.y = ballController.ball.radius;
          ballController.ySpeed = -ballController.ySpeed;
        }

        const ballLeft = ballController.ball.x - ballController.ball.radius;
        const ballRight = ballController.ball.x + ballController.ball.radius;
        const ballTop = ballController.ball.y - ballController.ball.radius;
        const ballBottom = ballController.ball.y + ballController.ball.radius;

        const player1Left = player1Controller.player.x;
        const player1Right = player1Controller.player.x + player1Controller.player.width;
        const player1Top = player1Controller.player.y;
        const player1Bottom = player1Controller.player.y + player1Controller.player.height;

        const player2Left = player2Controller.player.x;
        const player2Right = player2Controller.player.x + player2Controller.player.width;
        const player2Top = player2Controller.player.y;
        const player2Bottom = player2Controller.player.y + player2Controller.player.height;

        const overlapsLeftPaddle =
          ballRight >= player1Left &&
          ballLeft <= player1Right &&
          ballBottom >= player1Top &&
          ballTop <= player1Bottom;

        const overlapsRightPaddle =
          ballRight >= player2Left &&
          ballLeft <= player2Right &&
          ballBottom >= player2Top &&
          ballTop <= player2Bottom;

        // Pala izquierda
        if (overlapsLeftPaddle && ballController.xSpeed < 0) {
          ballController.ball.x = player1Right + ballController.ball.radius;
          ballController.xSpeed = -ballController.xSpeed;
        }

        // Pala derecha
        if (overlapsRightPaddle && ballController.xSpeed > 0) {
          ballController.ball.x = player2Left - ballController.ball.radius;
          ballController.xSpeed = -ballController.xSpeed;
        }
  }
}
