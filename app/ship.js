// Player class; inherits from moving object
import MovingObject from './moving_object';
import Bullet from './bullet';
import Util from './util';


const randomColor = () => {
  const hexDigits = "0123456789ABCDEF";

  let color = "#";
  for (let i = 0; i < 3; i ++) {
    color += hexDigits[Math.floor((Math.random() * 16))];
  }

  return color;
};

class Ship extends MovingObject {
  constructor(options) {
    options.radius = Ship.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = options.color || randomColor();
    super(options);
  }

  // draw(ctx) {
    // method of the Canvas 2D API adds an arc to the path which is
    // centered at (x, y) position with radius r starting at startAngle
    // and ending at endAngle going in the given direction by anticlockwise
    // (defaulting to clockwise).
    // ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
    // ctx.fillStyle = this.color;

    // ctx.beginPath();
    // ctx.arc(
    //   this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    // );
    //
    // ctx.moveTo(75, 50);
    // ctx.lineTo(100, 75);
    // ctx.lineTo(100, 25);
    // ctx.fill();
  // }


  fireBullet() {
    const norm = Util.norm(this.vel);

    if (norm == 0) {
      // Can't fire unless moving.
      return;
    }

    const relVel = Util.scale(
      Util.dir(this.vel),
      Bullet.SPEED
    );

    const bulletVel = [
      relVel[0] + this.vel[0], relVel[1] + this.vel[1]
    ];

    const bullet = new Bullet({
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

Ship.RADIUS = 8;

export default Ship;
