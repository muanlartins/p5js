import * as p5 from "p5";
import { FRAME_RATE, HEIGHT, TILE_SIZE, WIDTH } from "./constants";
import { Snake } from "./snake";
import { Food } from "./food";

export const snakeGameSketch = function(p5: p5) {
  let snake: Snake;
  let food: Food;

  p5.setup = () => {
    p5.createCanvas(WIDTH, HEIGHT);
    snake = new Snake(p5);
    food = new Food(p5);

    p5.frameRate(FRAME_RATE);
  }

  p5.draw = () => {
    setupGrid();

    checkSnakeEatingFood();
    checkCollision();

    snake.update();
    snake.show();

    food.update();
    food.show();
  }

  p5.keyPressed = () => {
    if (p5.keyCode == p5.UP_ARROW) {
      snake.goUp();
    } else if (p5.keyCode == p5.DOWN_ARROW) {
      snake.goDown();
    } else if (p5.keyCode == p5.RIGHT_ARROW) {
      snake.goRight();
    } else if (p5.keyCode == p5.LEFT_ARROW) {
      snake.goLeft();
    } 
  }

  function setupGrid() {
    p5.background(15);

    p5.stroke(240);

    for (let i = 0; i < WIDTH; i += TILE_SIZE) {
      p5.line(i, 0, i, HEIGHT);
    }

    for (let i = 0; i < HEIGHT; i += TILE_SIZE) {
      p5.line(0, i, WIDTH, i);
    }
  }

  function checkSnakeEatingFood() {
    if (
      snake.nextPosition().x == food.getX() && 
      snake.nextPosition().y == food.getY()
    ) {
      snake.eat();
      food.spawn();
    }
  }

  function checkCollision() {
    const nextPosition = snake.nextPosition();
    const nextPositionIsOccupied = Object.entries(snake.lastPositions)
      .find(([positionIndexString, position]) => {
        const positionIndex = Number(positionIndexString)

        const positionIsOccupied = positionIndex < snake.size;
        const positionIsEqualNextPosition = 
          position &&
          nextPosition &&
          position.x === nextPosition.x &&
          position.y === nextPosition.y;

        return positionIsOccupied && positionIsEqualNextPosition;
      }
    );

    if (nextPositionIsOccupied) {
      p5.setup();
    }
  }
}