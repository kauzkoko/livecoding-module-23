let metaballShader;
let balls = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  metaballShader = createShader(
    metaballShaderFile.vertex,
    metaballShaderFile.fragment
  );

  shader(metaballShader);
  let bioms = [
    { x: 30, y: 40, r: 200 },
    { x: 100, y: 120, r: 500 },
    { x: 50, y: 110, r: 1000 },
    { x: 10, y: 120, r: 1500 },
    { x: 80, y: 200, r: 500 },
  ];
  for (let i = 0; i < 2; i++) {
    balls.push(new Ball(bioms[i].x, bioms[i].y, bioms[i].r));
  }

  metaballShader.setUniform("width", width);
  metaballShader.setUniform("height", height);
  metaballShader.setUniform(
    "rs",
    balls.map((b) => b.r)
  );
}

function draw() {
  metaballShader.setUniform(
    "xs",
    balls.map((b) => b.pos.x)
  );
  metaballShader.setUniform(
    "ys",
    balls.map((b) => b.pos.y)
  );
  quad(-1, -1, 1, -1, 1, 1, -1, 1);
  for (const ball of balls) {
    //ball.update(balls);
  }
  balls[0].manualUpdate(mouseX, mouseY);
}

const BASE_SPEED = 0.000000001;

class Ball {
  constructor(x, y, r) {
    this.pos = {
      x: x,
      y: y,
    };

    this.angle = random(0, 2 * Math.PI);

    this.vel = {
      x: BASE_SPEED * cos(this.angle),
      y: BASE_SPEED * sin(this.angle),
    };

    this.r = r;
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    if (this.pos.x < 0 || this.pos.x > width) this.vel.x *= -1;
    if (this.pos.y < 0 || this.pos.y > height) this.vel.y *= -1;

    for (const ball of balls) {
      if (ball == this) return;

      const dx = ball.pos.x - this.pos.x;
      const dy = ball.pos.y - this.pos.y;

      const d = Math.hypot(dx, dy);

      this.vel.x += dx / (d * 20);
      this.vel.y += dy / (d * 20);
    }
  }

  manualUpdate(x, y) {
    this.pos.x = x;
    this.pos.y = height - y;
  }
}
