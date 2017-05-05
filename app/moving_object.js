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

export default MovingObject;
