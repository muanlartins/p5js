import * as p5 from "p5";
import { snakeGameSketch } from "./snake-game/sketch";
import { gameOfLifeSketch } from "./game-of-life/sketch";

const snakeGameDiv = document.getElementById('snake-game') as HTMLDivElement;
new p5(snakeGameSketch, snakeGameDiv);

const gameOfLifeDiv = document.getElementById('game-of-life') as HTMLDivElement;
new p5(gameOfLifeSketch, gameOfLifeDiv);
