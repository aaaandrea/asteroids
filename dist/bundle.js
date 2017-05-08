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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (Util);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object__ = __webpack_require__(2);
// kills spacerocks; also inherits form moving_objects


class Bullet extends __WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* default */] {
  constructor(options) {
    options.radius = Bullet.RADIUS;
    super(options);
    this.isWrappable = false;
  }
}

Bullet.RADIUS = 3;
Bullet.SPEED = 15;

/* harmony default export */ __webpack_exports__["a"] = (Bullet);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
// Base class for anything that moves
// Key methods are move(), draw(ctx), isCollideWith(otherMovingObject)


class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
    this.isWrappable = true;
  }

  collideWith(otherObject) {
    // default do nothing
  }

  // draw(ctx) {
  //
  // }

  draw(ctx) {
    // method of the Canvas 2D API adds an arc to the path which is
    // centered at (x, y) position with radius r starting at startAngle
    // and ending at endAngle going in the given direction by anticlockwise
    // (defaulting to clockwise).
    // ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }

  isCollidedWith(otherObject) {
    const centerDist = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  }

  move(timeDelta) {
    // Increment the pos by the vel.
    // Calculate the timeDelta (milliseconds since last move)
    // Velocity of the object is how far it should move in 1/60th of a second

    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
        offsetX = this.vel[0] * velocityScale,
        offsetY = this.vel[1] * velocityScale;

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

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

const NORMAL_FRAME_TIME_DELTA = 1000/60;

/* harmony default export */ __webpack_exports__["a"] = (MovingObject);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bullet__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(0);
// Player class; inherits from moving object





const randomColor = () => {
  const hexDigits = "0123456789ABCDEF";

  let color = "#";
  for (let i = 0; i < 3; i ++) {
    color += hexDigits[Math.floor((Math.random() * 16))];
  }

  return color;
};

class Ship extends __WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* default */] {
  constructor(options) {
    options.radius = Ship.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = options.color || randomColor();
    // options.theta = 75;
    super(options);
  }

  draw(ctx) {
    // ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false
    );
    // let theta = 75;
    // ctx.moveTo(this.pos[0] + 15 * Math.sinh(-(90 + theta)), this.pos[1] + 15 * Math.cosh((90 + theta)));
    // ctx.lineTo(this.pos[0]+ 15 * Math.sinh(-(30+270+ theta)), this.pos[1] + 15 * Math.cosh(-(30+270+theta)));
    // ctx.lineTo(this.pos[0] + 15 * Math.sinh(-(-30 + 270+ theta)), this.pos[1] + 15 * Math.cosh(-(-30+270+theta)));
    ctx.fill();
  }


  fireBullet() {
    const norm = __WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].norm(this.vel);

    if (norm == 0) {
      // Can't fire unless moving.
      return;
    }

    const relVel = __WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].scale(
      __WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].dir(this.vel),
      __WEBPACK_IMPORTED_MODULE_1__bullet__["a" /* default */].SPEED
    );

    const bulletVel = [
      relVel[0] + this.vel[0], relVel[1] + this.vel[1]
    ];

    const bullet = new __WEBPACK_IMPORTED_MODULE_1__bullet__["a" /* default */]({
      pos: this.pos,
      vel: bulletVel,
      color: this.color,
      game: this.game
    });

    this.game.add(bullet);
  }

  power(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  }

  relocate() {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  }
}

Ship.RADIUS = 10;

/* harmony default export */ __webpack_exports__["a"] = (Ship);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__asteroid__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bullet__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ship__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(0);





// holds collections of objects in game
// key methods include step() - which calls move() on the collections.
  // checkCollisions() checks colliding objects,
  // and draw() which draws the game.

  class Game {
    constructor() {
      this.asteroids = [];
      this.bullets = [];
      this.ships = [];

      this.addAsteroids();
    }

    add(object) {
      if (object instanceof __WEBPACK_IMPORTED_MODULE_0__asteroid__["a" /* default */]) {
        this.asteroids.push(object);
      } else if (object instanceof __WEBPACK_IMPORTED_MODULE_1__bullet__["a" /* default */]) {
        this.bullets.push(object);
      } else if (object instanceof __WEBPACK_IMPORTED_MODULE_2__ship__["a" /* default */]) {
        this.ships.push(object);
      } else {
        throw "unknown type of object";
      }
    }

    addAsteroids() {
      for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
        this.add(new __WEBPACK_IMPORTED_MODULE_0__asteroid__["a" /* default */]({ game: this }));
      }
    }

    addShip() {
      const ship = new __WEBPACK_IMPORTED_MODULE_2__ship__["a" /* default */]({
        pos: this.randomPosition(),
        game: this
      });

      this.add(ship);

      return ship;
    }

    allObjects() {
      return [].concat(this.ships, this.asteroids, this.bullets);
    }

    checkCollisions() {
      const allObjects = this.allObjects();
      for (let i = 0; i < allObjects.length; i++) {
        for (let j = 0; j < allObjects.length; j++) {
          const obj1 = allObjects[i];
          const obj2 = allObjects[j];

          if (obj1.isCollidedWith(obj2)) {
            const collision = obj1.collideWith(obj2);
            if (collision) return;
          }
        }
      }
    }

    draw(ctx) {
      ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
      ctx.fillStyle = Game.BG_COLOR;
      ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

      this.allObjects().forEach((object) => {
        object.draw(ctx);
      });
    }

    isOutOfBounds(pos) {
      return (pos[0] < 0) || (pos[1] < 0) ||
        (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
    }

    moveObjects(delta) {
      this.allObjects().forEach((object) => {
        object.move(delta);
      });
    }

    randomPosition() {
      return [
        Game.DIM_X * Math.random(),
        Game.DIM_Y * Math.random()
      ];
    }

    remove(object) {
      if (object instanceof __WEBPACK_IMPORTED_MODULE_1__bullet__["a" /* default */]) {
        this.bullets.splice(this.bullets.indexOf(object), 1);
      } else if (object instanceof __WEBPACK_IMPORTED_MODULE_0__asteroid__["a" /* default */]) {
        this.asteroids.splice(this.asteroids.indexOf(object), 1);
      } else if (object instanceof __WEBPACK_IMPORTED_MODULE_2__ship__["a" /* default */]) {
        this.ships.splice(this.ships.indexOf(object), 1);
      } else {
        throw "unknown type of object";
      }
    }

    step(delta) {
      this.moveObjects(delta);
      this.checkCollisions();
    }

    wrap(pos) {
      return [
        __WEBPACK_IMPORTED_MODULE_3__util__["a" /* default */].wrap(pos[0], Game.DIM_X), __WEBPACK_IMPORTED_MODULE_3__util__["a" /* default */].wrap(pos[1], Game.DIM_Y)
      ];
    }
  }



  Game.BG_COLOR = "#DFE6FF";
  Game.DIM_X = window.innerWidth - 100;
  Game.DIM_Y = window.innerHeight - 110;
  Game.FPS = 32;
  Game.NUM_ASTEROIDS = 10;


/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 5 */
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
    this.ship = this.game.addShip();
  }

  bindKeyHandlers() {
    const ship = this.ship;

    Object.keys(GameView.MOVES).forEach((k) => {
      let move = GameView.MOVES[k];
      key(k, () => { ship.power(move); });
    });

    key("space", () => { ship.fireBullet() });
  }

  start() {
    this.bindKeyHandlers();
    this.lastTime = 0;
    //start the animation
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    //every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  }
}

GameView.MOVES = {
  "w": [ 0, -1],
  "a": [-1,  0],
  "s": [ 0,  1],
  "d": [ 1,  0],
};

/* harmony default export */ __webpack_exports__["a"] = (GameView);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ship__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__bullet__ = __webpack_require__(1);




// spacerock which inherits from Moving Objects

const DEFAULTS = {
  COLOR: '#466AFB',
  RADIUS: 8,
  SPEED: 1
};

class Asteroid extends __WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* default */] {
    constructor(options = {}) {
      options.color = DEFAULTS.COLOR;
      options.pos = options.pos || options.game.randomPosition();
      options.radius = DEFAULTS.RADIUS;
      options.vel = options.vel || __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].randomVec(DEFAULTS.SPEED);
			super(options);
    }

    collideWith(otherObject) {
      if (otherObject instanceof __WEBPACK_IMPORTED_MODULE_2__ship__["a" /* default */]) {
        otherObject.relocate();
            return true;
      } else if (otherObject instanceof __WEBPACK_IMPORTED_MODULE_3__bullet__["a" /* default */]) {
            this.remove();
            otherObject.remove();
            return true;
        }
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Asteroid);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_view__ = __webpack_require__(5);



// entry file
document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementsByTagName("canvas")[0];
  const ctx = canvasEl.getContext("2d");

  canvasEl.width = __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */].DIM_X;
  canvasEl.height = __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */].DIM_Y;

  const playOrReset = () => {
    const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */]();
    new __WEBPACK_IMPORTED_MODULE_1__game_view__["a" /* default */](game, ctx).start();
  };

  key("enter", playOrReset);
});


/***/ })
/******/ ]);