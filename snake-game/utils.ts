import * as p5 from "p5";
import { COLUMN_TILE_COUNT, ROW_TILE_COUNT, TILE_SIZE } from "./constants";

export function generateRandomPosition(p5: p5) {
  const randomRowTile = Math.floor(p5.random(0, ROW_TILE_COUNT - 1));
  const randomColumnTile = Math.floor(p5.random(0, COLUMN_TILE_COUNT - 1));

  return {
    x: randomRowTile * TILE_SIZE,
    y: randomColumnTile * TILE_SIZE
  }
}