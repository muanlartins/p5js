import * as p5 from "p5";
import { TILE_SIZE } from "./constants";

export class Cell {
  public p5: p5;

  public isAlive: boolean;

  public x: number;
  public y: number;

  public row: number;
  public column: number;

  public aliveNeighborsCount: number;

  constructor(p5: p5, row: number, column: number) {
    this.p5 = p5;
    
    this.isAlive = p5.random([false, true]);

    this.row = row;
    this.column = column;

    const coordinates = this.getCoordinates(row, column);
    this.x = coordinates.x;
    this.y = coordinates.y;

    this.aliveNeighborsCount = 0;
  }

  public setAliveNeighborsCount(aliveNeighborsCount: number) {
    this.aliveNeighborsCount = aliveNeighborsCount;
  }

  private getCoordinates(row: number, column: number) {
    return { 
      x: row * TILE_SIZE,
      y: column * TILE_SIZE
    };
  }

  public show() {
    if (this.isAlive) {
      this.p5.fill(15);
    } else {
      this.p5.fill(240);
    }

    this.p5.strokeWeight(0);
    this.p5.rect(this.x, this.y, TILE_SIZE, TILE_SIZE);

    // this.showAliveNeighborsCounter();
  }

  public showAliveNeighborsCounter() {
    if (this.isAlive) {
      this.p5.fill(240);
    } else {
      this.p5.fill(15);
    }

    this.p5.textSize(14);
    this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
    this.p5.text(this.aliveNeighborsCount, this.x + TILE_SIZE/2, this.y + TILE_SIZE/2);
  }

  public live() {
    this.isAlive = true;
  }

  public die() {
    this.isAlive = false;
  }
}