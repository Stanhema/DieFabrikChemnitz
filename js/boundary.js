class Boundary {
    constructor(start, end) {
      this.point1 = start;
      this.point2 = end;
  
      this.body = this.createBody();
      World.add(world, this.body);
    }
  
    createBody() {
      const dx = this.point2.x - this.point1.x;
      const dy = this.point2.y - this.point1.y;
      const length = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);
      const centerX = (this.point1.x + this.point2.x) / 2;
      const centerY = (this.point1.y + this.point2.y) / 2;
  
      return Bodies.rectangle(centerX, centerY, length, 10, {
        isStatic: true,
        angle: angle,
      });
    }

    show() {line(this.point1.x, this.point1.y, this.point2.x, this.point2.y); }
  }