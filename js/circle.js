class Circle {
    constructor(x, y, r) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.texture = createImg("./img/FACE.png");
      this.texture.hide(); // Hide the image element
      let options = {
        friction: 0,
        restitution: 0.6,
      };
      this.body = Bodies.circle(this.x, this.y, this.r, options);
      Composite.add(world, this.body);
    }
  
    show() {
      let pos = this.body.position;
      let angle = this.body.angle;
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      imageMode(CENTER);
      image(this.texture, 0, 0, this.r * 3, this.r * 3);
      pop();
    }
  }