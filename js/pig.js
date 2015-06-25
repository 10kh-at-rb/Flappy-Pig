(function() {
  if (typeof FlappyPig === 'undefined') {
    window.FlappyPig = {};
  }

  var Pig = FlappyPig.Pig = function () {
    this.centerX = 100;
    this.centerY = 100;
    this.radius = 30;
    this.color = "pink";
  };

  Pig.prototype.move = function () {
    this.centerY += 1;
  };

  Pig.prototype.render = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.centerX,
      this.centerY,
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

  var Obstacle = FlappyPig.Obstacle = function (xDim, yDim, max, min, top) {
    var topHeight = Math.floor(Math.random()*(max*yDim - min*yDim)) + min*yDim;
    this.fromLeft = xDim - 100;
    this.fromTop = 0;
    this.width = 75;
    this.height = topHeight;
    if (!top) {
      this.fromTop = yDim - this.height;
    }
  };

  Obstacle.prototype.move = function () {
    this.fromLeft -= 10;
  };

  Obstacle.prototype.render = function (ctx) {
    ctx.fillStyle = "green";
    ctx.fillRect(
      this.fromLeft,
      this.fromTop,
      this.width,
      this.height
    );
  }
})();
