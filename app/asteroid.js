import MovingObject from './moving_object';
import Util from './util';
// spacerock which inherits from Moving Objects

const DEFAULTS = {
  COLOR: '#7B97FF',
  RADIUS: 2,
  SPEED: 2
};


class Asteroid extends MovingObject {
  constructor(options = {}) {
    super(options);
    this.color = DEFAULTS.COLOR;
    this.pos = options.pos || options.game.randomPosition();
    this.radius = DEFAULTS.RADIUS;
    this.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);
  }

}

export default Asteroid;
