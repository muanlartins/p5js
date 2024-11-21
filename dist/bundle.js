/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/p5/lib/p5.min.js":
/*!***************************************!*\
  !*** ./node_modules/p5/lib/p5.min.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*! p5.js v1.11.1 October 31, 2024 */

/***/ }),

/***/ "./snake-game/constants.ts":
/*!*********************************!*\
  !*** ./snake-game/constants.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   COLUMN_TILE_COUNT: () => (/* binding */ COLUMN_TILE_COUNT),
/* harmony export */   DIRECTION_SPEEDS: () => (/* binding */ DIRECTION_SPEEDS),
/* harmony export */   FRAME_RATE: () => (/* binding */ FRAME_RATE),
/* harmony export */   HEIGHT: () => (/* binding */ HEIGHT),
/* harmony export */   LAST_COLUMN_TILE: () => (/* binding */ LAST_COLUMN_TILE),
/* harmony export */   LAST_ROW_TILE: () => (/* binding */ LAST_ROW_TILE),
/* harmony export */   MAXIMUM_POSITIONS: () => (/* binding */ MAXIMUM_POSITIONS),
/* harmony export */   ROW_TILE_COUNT: () => (/* binding */ ROW_TILE_COUNT),
/* harmony export */   SNAKE_SIZE: () => (/* binding */ SNAKE_SIZE),
/* harmony export */   TILE_SIZE: () => (/* binding */ TILE_SIZE),
/* harmony export */   WIDTH: () => (/* binding */ WIDTH)
/* harmony export */ });
/* harmony import */ var _snake__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./snake */ "./snake-game/snake.ts");

const WIDTH = 400;
const HEIGHT = 400;
const FRAME_RATE = 15;
const SNAKE_SIZE = 1;
const TILE_SIZE = 20;
const ROW_TILE_COUNT = WIDTH / TILE_SIZE;
const COLUMN_TILE_COUNT = HEIGHT / TILE_SIZE;
const LAST_ROW_TILE = (ROW_TILE_COUNT - 1) * TILE_SIZE;
const LAST_COLUMN_TILE = (ROW_TILE_COUNT - 1) * TILE_SIZE;
const MAXIMUM_POSITIONS = (WIDTH / TILE_SIZE) * (HEIGHT / TILE_SIZE);
const DIRECTION_SPEEDS = {
    [_snake__WEBPACK_IMPORTED_MODULE_0__.Direction.N]: {
        xSpeed: 0,
        ySpeed: -1
    },
    [_snake__WEBPACK_IMPORTED_MODULE_0__.Direction.E]: {
        xSpeed: 1,
        ySpeed: 0
    },
    [_snake__WEBPACK_IMPORTED_MODULE_0__.Direction.S]: {
        xSpeed: 0,
        ySpeed: 1
    },
    [_snake__WEBPACK_IMPORTED_MODULE_0__.Direction.W]: {
        xSpeed: -1,
        ySpeed: 0
    }
};


/***/ }),

/***/ "./snake-game/food.ts":
/*!****************************!*\
  !*** ./snake-game/food.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Food: () => (/* binding */ Food)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./snake-game/utils.ts");

class Food {
    constructor(p5) {
        this.VERTICAL_OFFSET = 3;
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
        const randomPosition = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.generateRandomPosition)(this.p5);
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


/***/ }),

/***/ "./snake-game/sketch.ts":
/*!******************************!*\
  !*** ./snake-game/sketch.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   snakeGameSketch: () => (/* binding */ snakeGameSketch)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./snake-game/constants.ts");
/* harmony import */ var _snake__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./snake */ "./snake-game/snake.ts");
/* harmony import */ var _food__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./food */ "./snake-game/food.ts");



const snakeGameSketch = function (p5) {
    let snake;
    let food;
    p5.setup = () => {
        p5.createCanvas(_constants__WEBPACK_IMPORTED_MODULE_0__.WIDTH, _constants__WEBPACK_IMPORTED_MODULE_0__.HEIGHT);
        snake = new _snake__WEBPACK_IMPORTED_MODULE_1__.Snake(p5);
        food = new _food__WEBPACK_IMPORTED_MODULE_2__.Food(p5);
        p5.frameRate(_constants__WEBPACK_IMPORTED_MODULE_0__.FRAME_RATE);
    };
    p5.draw = () => {
        setupGrid();
        checkSnakeEatingFood();
        checkCollision();
        snake.update();
        snake.show();
        food.update();
        food.show();
    };
    p5.keyPressed = () => {
        if (p5.keyCode == p5.UP_ARROW) {
            snake.goUp();
        }
        else if (p5.keyCode == p5.DOWN_ARROW) {
            snake.goDown();
        }
        else if (p5.keyCode == p5.RIGHT_ARROW) {
            snake.goRight();
        }
        else if (p5.keyCode == p5.LEFT_ARROW) {
            snake.goLeft();
        }
    };
    function setupGrid() {
        p5.background(15);
        p5.stroke(240);
        for (let i = 0; i < _constants__WEBPACK_IMPORTED_MODULE_0__.WIDTH; i += _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE) {
            p5.line(i, 0, i, _constants__WEBPACK_IMPORTED_MODULE_0__.HEIGHT);
        }
        for (let i = 0; i < _constants__WEBPACK_IMPORTED_MODULE_0__.HEIGHT; i += _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE) {
            p5.line(0, i, _constants__WEBPACK_IMPORTED_MODULE_0__.WIDTH, i);
        }
    }
    function checkSnakeEatingFood() {
        if (snake.nextPosition().x == food.getX() &&
            snake.nextPosition().y == food.getY()) {
            snake.eat();
            food.spawn();
        }
    }
    function checkCollision() {
        const nextPosition = snake.nextPosition();
        const nextPositionIsOccupied = Object.entries(snake.lastPositions)
            .find(([positionIndexString, position]) => {
            const positionIndex = Number(positionIndexString);
            const positionIsOccupied = positionIndex < snake.size;
            const positionIsEqualNextPosition = position &&
                nextPosition &&
                position.x === nextPosition.x &&
                position.y === nextPosition.y;
            return positionIsOccupied && positionIsEqualNextPosition;
        });
        if (nextPositionIsOccupied) {
            p5.setup();
        }
    }
};


/***/ }),

/***/ "./snake-game/snake.ts":
/*!*****************************!*\
  !*** ./snake-game/snake.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Direction: () => (/* binding */ Direction),
/* harmony export */   Snake: () => (/* binding */ Snake)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./snake-game/utils.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./snake-game/constants.ts");


var Direction;
(function (Direction) {
    Direction["N"] = "N";
    Direction["E"] = "E";
    Direction["S"] = "S";
    Direction["W"] = "W";
})(Direction || (Direction = {}));
class Snake {
    constructor(p5) {
        this.lastPositions = {};
        this.p5 = p5;
        const randomPosition = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.generateRandomPosition)(this.p5);
        this.x = randomPosition.x;
        this.y = randomPosition.y;
        this.size = _constants__WEBPACK_IMPORTED_MODULE_1__.SNAKE_SIZE;
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
        const x = this.x + this.xSpeed * _constants__WEBPACK_IMPORTED_MODULE_1__.TILE_SIZE;
        const y = this.y + this.ySpeed * _constants__WEBPACK_IMPORTED_MODULE_1__.TILE_SIZE;
        return this.teleport(x, y);
    }
    lastPosition() {
        return this.lastPositions[1];
    }
    turnAround() {
        this.xSpeed *= -1;
        this.ySpeed *= -1;
    }
    teleport(x, y) {
        if (x < 0) {
            x = _constants__WEBPACK_IMPORTED_MODULE_1__.LAST_ROW_TILE;
        }
        if (x > _constants__WEBPACK_IMPORTED_MODULE_1__.LAST_ROW_TILE) {
            x = 0;
        }
        if (y < 0) {
            y = _constants__WEBPACK_IMPORTED_MODULE_1__.LAST_COLUMN_TILE;
        }
        if (y > _constants__WEBPACK_IMPORTED_MODULE_1__.LAST_COLUMN_TILE) {
            y = 0;
        }
        return { x, y };
    }
    eat() {
        this.size++;
    }
    registerPositions() {
        for (let i = _constants__WEBPACK_IMPORTED_MODULE_1__.MAXIMUM_POSITIONS; i >= 1; i--) {
            this.lastPositions[i] = this.lastPositions[i - 1];
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
                this.p5.rect(position.x, position.y, _constants__WEBPACK_IMPORTED_MODULE_1__.TILE_SIZE, _constants__WEBPACK_IMPORTED_MODULE_1__.TILE_SIZE);
            }
        }
    }
    go(direction) {
        if (this.canTurn(direction)) {
            this.xSpeed = _constants__WEBPACK_IMPORTED_MODULE_1__.DIRECTION_SPEEDS[direction].xSpeed;
            this.ySpeed = _constants__WEBPACK_IMPORTED_MODULE_1__.DIRECTION_SPEEDS[direction].ySpeed;
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
        if (!position || !previousPosition)
            return;
        const isPointingRight = (position.x > 0 && position.x < _constants__WEBPACK_IMPORTED_MODULE_1__.LAST_ROW_TILE && position.x > previousPosition.x) ||
            (position.x == 0 && previousPosition.x == _constants__WEBPACK_IMPORTED_MODULE_1__.LAST_ROW_TILE);
        const isPointingLeft = (position.x > 0 && position.x < _constants__WEBPACK_IMPORTED_MODULE_1__.LAST_ROW_TILE && position.x < previousPosition.x) ||
            (position.x == _constants__WEBPACK_IMPORTED_MODULE_1__.LAST_ROW_TILE && previousPosition.x == 0);
        const isPointingDown = (position.y > 0 && position.y < _constants__WEBPACK_IMPORTED_MODULE_1__.LAST_COLUMN_TILE && position.y > previousPosition.y) ||
            (position.y == 0 && previousPosition.y == _constants__WEBPACK_IMPORTED_MODULE_1__.LAST_COLUMN_TILE);
        const isPointingUp = (position.y > 0 && position.y < _constants__WEBPACK_IMPORTED_MODULE_1__.LAST_COLUMN_TILE && position.y < previousPosition.y) ||
            (position.y == _constants__WEBPACK_IMPORTED_MODULE_1__.LAST_COLUMN_TILE && previousPosition.y == 0);
        if (isPointingUp) {
            this.direction = Direction.N;
        }
        else if (isPointingDown) {
            this.direction = Direction.S;
        }
        else if (isPointingRight) {
            this.direction = Direction.E;
        }
        else if (isPointingLeft) {
            this.direction = Direction.W;
        }
    }
    canTurn(direction) {
        const snakeHasOneTile = this.size === 1;
        const snakeHasMultipleTiles = this.size > 1;
        const isTurningInOppositeDirections = (direction === Direction.S && this.direction === Direction.N) ||
            (direction === Direction.N && this.direction === Direction.S) ||
            (direction === Direction.E && this.direction === Direction.W) ||
            (direction === Direction.W && this.direction === Direction.E);
        return snakeHasOneTile || (snakeHasMultipleTiles && !isTurningInOppositeDirections);
    }
}


/***/ }),

/***/ "./snake-game/utils.ts":
/*!*****************************!*\
  !*** ./snake-game/utils.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateRandomPosition: () => (/* binding */ generateRandomPosition)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./snake-game/constants.ts");

function generateRandomPosition(p5) {
    const randomRowTile = Math.floor(p5.random(0, _constants__WEBPACK_IMPORTED_MODULE_0__.ROW_TILE_COUNT - 1));
    const randomColumnTile = Math.floor(p5.random(0, _constants__WEBPACK_IMPORTED_MODULE_0__.COLUMN_TILE_COUNT - 1));
    return {
        x: randomRowTile * _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE,
        y: randomColumnTile * _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE
    };
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! p5 */ "./node_modules/p5/lib/p5.min.js");
/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(p5__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _snake_game_sketch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./snake-game/sketch */ "./snake-game/sketch.ts");


const parent = document.getElementById('canvas');
new p5__WEBPACK_IMPORTED_MODULE_0__(_snake_game_sketch__WEBPACK_IMPORTED_MODULE_1__.snakeGameSketch, parent);

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map