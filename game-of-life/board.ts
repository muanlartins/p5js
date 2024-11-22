import * as p5 from "p5";
import { Cell } from "./cell";
import { COLUMN_TILE_COUNT, ROW_TILE_COUNT } from "./constants";

export class Board {
  public p5: p5;
  public cells!: Cell[][];

  constructor(p5: p5) {
    this.p5 = p5;
    this.setupInitialBoard();  
  }

  public update() {
    let nextCells: Cell[][] = [];

    for (let row = 0; row < ROW_TILE_COUNT; row++) {
      const nextCellsRow: Cell[] = [];

      for (let column = 0; column < COLUMN_TILE_COUNT; column++) {
        const currentCell = this.cells[row][column];

        const nextCell = this.generateNextCell(currentCell);

        nextCellsRow.push(nextCell);
      }

      nextCells.push(nextCellsRow);
    }

    this.cells = nextCells;
  }

  public getAliveNeighborsCount(cell: Cell) {
    const row = cell.row;
    const column = cell.column;

    const previousRow = (row - 1 + ROW_TILE_COUNT) % ROW_TILE_COUNT;
    const nextRow = (row + 1 + ROW_TILE_COUNT) % ROW_TILE_COUNT;

    const previousColumn = (column - 1 + COLUMN_TILE_COUNT) % COLUMN_TILE_COUNT;
    const nextColumn = (column + 1 + COLUMN_TILE_COUNT) % COLUMN_TILE_COUNT;

    let aliveNeighborsCount = 0;

    aliveNeighborsCount += (this.cells[previousRow][column].isAlive ? 1 : 0);
    aliveNeighborsCount += (this.cells[nextRow][column].isAlive ? 1 : 0);
    aliveNeighborsCount += (this.cells[row][previousColumn].isAlive ? 1 : 0);
    aliveNeighborsCount += (this.cells[row][nextColumn].isAlive ? 1 : 0);
    aliveNeighborsCount += (this.cells[previousRow][previousColumn].isAlive ? 1 : 0);
    aliveNeighborsCount += (this.cells[previousRow][nextColumn].isAlive ? 1 : 0);
    aliveNeighborsCount += (this.cells[nextRow][previousColumn].isAlive ? 1 : 0);
    aliveNeighborsCount += (this.cells[nextRow][nextColumn].isAlive ? 1 : 0);

    return aliveNeighborsCount;
  }

  public generateNextCell(currentCell: Cell) {
    const nextCell = new Cell(this.p5, currentCell.row, currentCell.column);

    const currentCellAliveNeighborsCount = this.getAliveNeighborsCount(currentCell);
    nextCell.setAliveNeighborsCount(currentCellAliveNeighborsCount);

    nextCell.isAlive = this.isNextCellAlive(currentCell);

    return nextCell;
  }

  public isNextCellAlive(cell: Cell) {
    if (
      cell.isAlive && 
      (cell.aliveNeighborsCount < 2 || cell.aliveNeighborsCount > 3)
    ) {
      cell.die();
    } else if (!cell.isAlive && cell.aliveNeighborsCount == 3) {
      cell.live();
    }

    return cell.isAlive;
  }

  public show() {
    for (let row = 0; row < ROW_TILE_COUNT; row++) {
      for (let column = 0; column < COLUMN_TILE_COUNT; column++) {
        this.cells[row][column].show();
      }
    }
  }

  private setupInitialBoard() {
    this.cells = [];

    for (let row = 0; row < ROW_TILE_COUNT; row++) {
      const cellsRow: Cell[] = [];

      for (let column = 0; column < COLUMN_TILE_COUNT; column++) {
        const cell: Cell = new Cell(this.p5, row, column);

        cellsRow.push(cell);
      }

      this.cells.push(cellsRow);
    }
  }
}