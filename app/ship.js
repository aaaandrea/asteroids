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
    // options.color = options.color || randomColor();
    options.color = options.color || "#FE8E83";
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

Ship.RADIUS = 10;

export default Ship;
