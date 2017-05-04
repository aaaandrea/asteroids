import Asteroid from './asteroid';


// holds collections of objects in game
// key methods include step() - which calls move() on the collections.
  // checkCollisions() checks colliding objects,
  // and draw() which draws the game.
const CONSTANTS = {
  DIM_X: 3,
  DIM_Y: 3,
  NUM_ASTEROIDS: 45
};


class Game {
  constructor() {
    this.asteroids = [];

    this.addAsteroids();
  }

  addAsteroids() {
    for (let i = 0; i < CONSTANTS.NUM_ASTEROIDS; i++) {
      let asteroid = new Asteroid({ game: this });
      this.asteroids.push(asteroid);
    }
  }

  draw(ctx) {

  }

  moveObjects() {

  }
}
