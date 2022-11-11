class Pendulum {
  constructor(x, y, r, angle, weight, port) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.angle = angle;
    this.initalAngel = angle;
    this.weight = weight;
    this.port = port;

    this.velocity = 0.0;
    this.acceleration = 0.0;
    this.damping = 0.995;
  }

  update() {
    const gravity = 0.4 + this.weight;
    this.acceleration = ((-1 * gravity) / this.r) * Math.sin(this.angle);
    this.velocity += this.acceleration;
    this.velocity *= this.damping;
    this.angle += this.velocity;
  }

  calculateXCoordinate() {
    return this.r * Math.sin(this.angle) + this.x;
  }

  calculateYCoordinate() {
    return this.r * Math.cos(this.angle) + this.y;
  }

  resetPendulum() {
    this.velocity = 0.0;
    this.acceleration = 0.0;
    this.damping = 0.995;
    this.angle = this.initalAngel;
  }

  nearbyPendulumUrls() {
    if (this.port === '8000') {
      return ['http://127.0.0.1:8001/coordinates'];
    }
    if (this.port === '8001') {
      return [
        'http://127.0.0.1:8000/coordinates',
        'http://127.0.0.1:8002/coordinates',
      ];
    }
    if (this.port === '8002') {
      return [
        'http://127.0.0.1:8001/coordinates',
        'http://127.0.0.1:8003/coordinates',
      ];
    }
    if (this.port === '8003') {
      return [
        'http://127.0.0.1:8002/coordinates',
        'http://127.0.0.1:8004/coordinates',
      ];
    }
    if (this.port === '8004') {
      return [
        'http://127.0.0.1:8003/coordinates',
      ];
    }
    return [];
  }
}

module.exports = Pendulum;
