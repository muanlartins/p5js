import * as p5 from "p5";
import { snakeGameSketch } from "./snake-game/sketch";

const parent = document.getElementById('canvas') as HTMLDivElement;
new p5(snakeGameSketch, parent);
