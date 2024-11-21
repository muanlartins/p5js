import * as p5 from "p5";
import { generateRandomPosition } from "./utils";
import { DIRECTION_SPEEDS, LAST_COLUMN_TILE, LAST_ROW_TILE, MAXIMUM_POSITIONS, SNAKE_SIZE, TILE_SIZE } from "./constants";

export enum Direction {
  N = 'N',
  E = 'E',
  S = 'S',
  W = 'W'
}

export class Snake {
  p5: p5;
  x: number;
  y: number;
  xSpeed!: number;
  ySpeed!: number;
  lastPositions: { 
    [positionIndex: number]: {
      x: number;
      y: number;
    }
  } = {};
  size: number;
  direction!: Direction;

  constructor(p5: p5) {
    this.p5 = p5;

    const randomPosition = generateRandomPosition(this.p5);
    this.x = randomPosition.x;
    this.y = randomPosition.y;

    this.size = SNAKE_SIZE;

    this.goRight();
  }

  update() {
    const nextPosition = this.nextPosition();

    this.x = nextPosition.x;
    this.y = nextPosition.y;

    this.registerPositions();

    this.updateDirection();
  }

  nextPosition() {
    const x = this.x + this.xSpeed * TILE_SIZE;
    const y = this.y + this.ySpeed * TILE_SIZE;

    return this.teleport(x, y);
  }

  lastPosition() {
    return this.lastPositions[1];
  }

  turnAround() {
    this.xSpeed *= -1;
    this.ySpeed *= -1;
  }

  teleport(x: number, y: number) {
    if (x < 0) {
      x = LAST_ROW_TILE;
    } 
    if (x > LAST_ROW_TILE) {
      x = 0;
    }
    if (y < 0) {
      y = LAST_COLUMN_TILE;
    }
    if (y > LAST_COLUMN_TILE) {
      y = 0;
    }

    return { x, y };
  }

  eat() {
    this.size++;
  }

  registerPositions() {
    for (let i = MAXIMUM_POSITIONS; i >= 1; i--) {
      this.lastPositions[i] = this.lastPositions[i-1];
    }

    this.lastPositions[0] = {
      x: this.x,
      y: this.y
    };
  }

  show() {
    this.p5.fill("#663399");
    for (let i = 0; i < this.size; i++) {
      const position = this.lastPositions[i];

      if (position) {
        this.p5.rect(position.x, position.y, TILE_SIZE, TILE_SIZE);
      }
    }
  }

  go(direction: Direction) {
    if (this.canTurn(direction)) {
      this.xSpeed = DIRECTION_SPEEDS[direction].xSpeed;
      this.ySpeed = DIRECTION_SPEEDS[direction].ySpeed;
    }
  }

  goUp() {
    this.go(Direction.N);
  }

  goDown() {
    this.go(Direction.S);
  }

  goRight() {
    this.go(Direction.E);
  }

  goLeft() {
    this.go(Direction.W);
  }

  updateDirection() {
    const position = this.lastPositions[0];
    const previousPosition = this.lastPositions[1];

    if (!position || !previousPosition) return;

    const isPointingRight = 
      (position.x > 0 && position.x < LAST_ROW_TILE && position.x > previousPosition.x) ||
      (position.x == 0 && previousPosition.x == LAST_ROW_TILE)

    const isPointingLeft = 
      (position.x > 0 && position.x < LAST_ROW_TILE && position.x < previousPosition.x) ||
      (position.x == LAST_ROW_TILE && previousPosition.x == 0)

    const isPointingDown = 
      (position.y > 0 && position.y < LAST_COLUMN_TILE && position.y > previousPosition.y) ||
      (position.y == 0 && previousPosition.y == LAST_COLUMN_TILE)

    const isPointingUp = 
      (position.y > 0 && position.y < LAST_COLUMN_TILE && position.y < previousPosition.y) ||
      (position.y == LAST_COLUMN_TILE && previousPosition.y == 0)

    if (isPointingUp) {
      this.direction = Direction.N;
    } else if (isPointingDown) {
      this.direction = Direction.S;
    } else if (isPointingRight) {
      this.direction = Direction.E;
    } else if (isPointingLeft) {
      this.direction = Direction.W;
    } 
  }

  canTurn(direction: Direction) {
    const snakeHasOneTile = this.size === 1;
    const snakeHasMultipleTiles = this.size > 1;
    const isTurningInOppositeDirections = 
      (direction === Direction.S && this.direction === Direction.N) ||
      (direction === Direction.N && this.direction === Direction.S) ||
      (direction === Direction.E && this.direction === Direction.W) ||
      (direction === Direction.W && this.direction === Direction.E);

    return snakeHasOneTile || (snakeHasMultipleTiles && !isTurningInOppositeDirections);
  }
}