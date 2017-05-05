import Asteroid from './asteroid';


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
      let asteroid = new Asteroid({ game: this });
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


export default Game;
