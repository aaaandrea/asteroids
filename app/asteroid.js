import MovingObject from './moving_object';
import Util from './util';
import Ship from './ship';
import Bullet from './bullet';
// spacerock which inherits from Moving Objects

const DEFAULTS = {
  COLOR: '#7B97FF',
  RADIUS: 7,
  SPEED: 1
};

class Asteroid extends MovingObject {
    constructor(options = {}) {
      options.color = DEFAULTS.COLOR;
      options.pos = options.pos || options.game.randomPosition();
      options.radius = DEFAULTS.RADIUS;
      options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);
			super(options);
    }

    collideWith(otherObject) {
      if (otherObject instanceof Ship) {
        otherObject.relocate();
            return true;
      } else if (otherObject instanceof Bullet) {
            this.remove();
            otherObject.remove();
            return true;
        }
    }
}

export default Asteroid;
