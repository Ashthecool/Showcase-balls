var a = false;
const MAX_LEN = 250; // maksimal længde på den grå linje (og dermed udskydningskraft)

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

class Vector{
    constructor(x1, y1, x2, y2, color, width) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.color = color;
        this.strokeWidth = width;
    }
    static draw(x1, y1, x2, y2, color, w) {
        stroke(color);
        strokeWeight(w);
        line(x1, y1, x2, y2);

        // Den grå linje, der fortsætter på den anden side af bolden
        stroke('grey'); 
        strokeWeight(w + 1); 
        
        // Vektoren fra musen til bolden, begrænset til MAX_LEN
        let dir = createVector(x2 - x1, y2 - y1);
        dir.limit(MAX_LEN);

        line(x2, y2, x2 + dir.x, y2 + dir.y);
    }
}


function setup() {
    createCanvas(640, 500);
    
    bold1 = new Ball(200, 100, 20, color(255, 0, 0), 3, 0, true);
    
    // bold2 = new Ball(400, 100, 30, color(0, 0, 255), -2, 2, false);
}

function draw() {
    background(220);
    
    if (!a) {    
        bold1.update();
    }
    
    bold1.display();
    // bold2.update();
    // bold2.display();

    if (mouseIsPressed) {
        if (!a) {
            a = true;
        }

        bold1.speedX = 0;
        bold1.speedY = 0;
        bold1.gravity = 0;
        
        Vector.draw(mouseX, mouseY, bold1.x, bold1.y, 'red', 2);
    }
    
}

function mouseReleased() {
    let launch = createVector(bold1.x - mouseX, bold1.y - mouseY);
    launch.limit(MAX_LEN);
    bold1.speedX = launch.x * 0.1;
    bold1.speedY = launch.y * 0.1;
    bold1.gravity = 0.5;
    a = false;
}
