// kills spacerocks; also inherits form moving_objects
import MovingObject from './moving_object';

class Bullet extends MovingObject {
  constructor(options) {
    options.radius = Bullet.RADIUS;
    super(options);
    this.isWrappable = false;
  }
}

Bullet.RADIUS = 3;
Bullet.SPEED = 15;

export default Bullet;
