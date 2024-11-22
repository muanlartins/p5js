import * as p5 from "p5";
import { COLUMN_TILE_COUNT, FRAME_RATE, HEIGHT, ROW_TILE_COUNT, TILE_SIZE, WIDTH } from "./constants";
import { Cell } from "./cell";
import { Board } from "./board";

export const gameOfLifeSketch = function(p5: p5) {
  let board: Board;

  p5.setup = () => {
    p5.createCanvas(WIDTH, HEIGHT);
    p5.frameRate(FRAME_RATE);
    
    board = new Board(p5);
  }

  p5.draw = () => {
    p5.background(240);

    board.update();
    board.show();
  }
}