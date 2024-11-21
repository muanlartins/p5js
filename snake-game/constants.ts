import { Direction } from "./snake";

export const WIDTH = 400;
export const HEIGHT = 400;

export const FRAME_RATE = 15;

export const SNAKE_SIZE = 1;

export const TILE_SIZE = 20;
export const ROW_TILE_COUNT = WIDTH / TILE_SIZE;
export const COLUMN_TILE_COUNT = HEIGHT / TILE_SIZE;
export const LAST_ROW_TILE = (ROW_TILE_COUNT - 1) * TILE_SIZE;
export const LAST_COLUMN_TILE = (ROW_TILE_COUNT - 1) * TILE_SIZE;

export const MAXIMUM_POSITIONS = (WIDTH / TILE_SIZE) * (HEIGHT / TILE_SIZE);

export const DIRECTION_SPEEDS: { 
    [direction in Direction]: {
      xSpeed: number;
      ySpeed: number;
    } 
  } = {
  [Direction.N]: {
    xSpeed: 0,
    ySpeed: -1
  },
  [Direction.E]: {
    xSpeed: 1,
    ySpeed: 0
  },
  [Direction.S]: {
    xSpeed: 0,
    ySpeed: 1
  },
  [Direction.W]: {
    xSpeed: -1,
    ySpeed: 0
  }
};