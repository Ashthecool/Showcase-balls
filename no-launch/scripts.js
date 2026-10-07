class Ball {
  constructor(x, y, r, ballColor, v_x, v_y, gravityOn = true) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = ballColor;
    this.speedX = v_x;
    this.speedY = v_y;
    this.gravityOn = gravityOn;
    this.gravity = 0.5;
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }

  update() {
    if (this.gravityOn) {
      this.speedY += this.gravity;
    }

    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > width - this.r) {
      this.x = width - this.r;
      this.speedX *= -0.8;
    } else if (this.x < this.r) {
      this.x = this.r;
      this.speedX *= -0.8;
    }

    if (this.y > height - this.r) {
      this.y = height - this.r;
      this.speedY *= -0.8;
    } else if (this.y < this.r) {
      this.y = this.r;
      this.speedY *= -0.8;
    }
  }

};


function setup() {
    createCanvas(640, 500);

    bold1 = new Ball(200, 100, 20, 'black', 3, 0, true);
}

function draw() {
    background(220);

    bold1.update();
    bold1.display();
}
