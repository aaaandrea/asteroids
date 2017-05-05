/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__asteroid__ = __webpack_require__(2);



// holds collections of objects in game
// key methods include step() - which calls move() on the collections.
  // checkCollisions() checks colliding objects,
  // and draw() which draws the game.


class Game {
  constructor() {
    this.asteroids = [];

    this.addAsteroids();
  }

  addAsteroids() {
    for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
      let asteroid = new __WEBPACK_IMPORTED_MODULE_0__asteroid__["a" /* default */]({ game: this });
      this.asteroids.push(asteroid);
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.asteroids.forEach((el) => {
      el.draw(ctx);
    });

  }

  moveObjects(delta) {
    this.asteroids.forEach((el) => {
      el.move(delta);
    });
  }

  randomPosition() {
    return [
      Game.DIM_X * Math.random(),
      Game.DIM_Y * Math.random()
    ];
  }
}

Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.NUM_ASTEROIDS = 10;

Game.BG_COLOR = '#000000';
Game.FPS = 33;


/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// stores a game instance
// stores the canvas context
// installs all key listeners for moving and firing the ship
// installs a timer to call step()

class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
  }

  start() {
    this.bindKeyHandlers();
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  bindKeyHandlers() {
    const ship = this.ship;

    Object.keys(GameView.MOVES).forEach((k) => {
      let move = GameView.MOVES[k];
      key(k, () => { ship.power(move); });
    });

    key("space", () => { ship.fireBullet(); })
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }
}


GameView.MOVES = {
  "w": [0, -1],
  "a": [-1, 0],
  "s": [0, 1],
  "d": [1, 0],
};

/* harmony default export */ __webpack_exports__["a"] = (GameView);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__util__);


// spacerock which inherits from Moving Objects

const DEFAULTS = {
  COLOR: '#7B97FF',
  RADIUS: 2,
  SPEED: 2
};


class Asteroid extends __WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* default */] {
  constructor(options = {}) {
    super(options);
    this.color = DEFAULTS.COLOR;
    this.pos = options.pos || options.game.randomPosition();
    this.radius = DEFAULTS.RADIUS;
    this.vel = options.vel || __WEBPACK_IMPORTED_MODULE_1__util___default.a.randomVec(DEFAULTS.SPEED);
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Asteroid);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_view__ = __webpack_require__(1);



// entry file
document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */].DIM_X;
  canvasEl.height = __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */].DIM_Y;

  const ctx = canvasEl.getContext("2d");
  const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */]();
  new __WEBPACK_IMPORTED_MODULE_1__game_view__["a" /* default */](game, ctx).start();
});


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Base class for anything that moves
// Key methods are move(), draw(ctx), isCollideWith(otherMovingObject)

const NORMAL_FRAME_TIME_DELTA = 1000/60;

class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
  }

  draw(ctx) {
    // method of the Canvas 2D API adds an arc to the path which is
    // centered at (x, y) position with radius r starting at startAngle
    // and ending at endAngle going in the given direction by anticlockwise
    // (defaulting to clockwise).
    // ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

    ctx.fillColor = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      0,
      (2 * Math.PI),
      true
    );
    ctx.fill();
  }

  move(timeDelta) {
    // Increment the pos by the vel.
    // Calculate the timeDelta (milliseconds since last move)
    // Velocity of the object is how far it should move in 1/60th of a second

    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
    offsetX = this.vel[0] * velocityScale,
    offsetY = this.vel[1] * velocityScale;

    this.pos = [(this.pos[0] + offsetX), (this.pos[1] + offsetY)];

    if (this.game.isOutOfBounds(this.pos)) {
      if (this.isWrappable) {
        this.pos = this.game.wrap(this.pos);
      } else {
        this.remove();
      }
    }
  }

  remove() {
    this.game.remove(this);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (MovingObject);


/***/ }),
/* 5 */
/***/ (function(module, exports) {

// Utility code, including vector math
const Util = {

  dir (vec) {
    const norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
  },

  dist (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },

  norm (vec) {
    return Util.dist([0, 0], vec);
  },

  randomVec (length) {
    // produce a random vector with the legnth
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },

   scale (vec, m) {
     // scale the legth of the vector by the amount m.
     return [vec[0] * m, vec[1] * m];
   },

  wrap (coord, max) {
    if (coord < 0) {
      return max - (coord % max);
    } else if (coord > max) {
      return coord % max;
    } else {
      return coord;
    }
  }
};

module.exports = Util;


/***/ })
/******/ ]);