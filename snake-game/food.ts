import * as p5 from "p5";
import { generateRandomPosition } from "./utils";

export class Food {
  VERTICAL_OFFSET = 3;

  p5: p5;
  x!: number;
  y!: number;

  constructor(p5: p5) {
    this.p5 = p5;

    this.spawn();
  }

  update() {
    
  }

  show() {
    this.p5.textSize(16);
    this.p5.textAlign(this.p5.LEFT, this.p5.TOP);
    this.p5.text('🍎', this.x, this.y);
  }

  spawn() {
    const randomPosition = generateRandomPosition(this.p5);

    this.x = randomPosition.x;
    this.y = randomPosition.y + this.VERTICAL_OFFSET;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y - this.VERTICAL_OFFSET;
  }
}