(function() {
  if (typeof FlappyPig === 'undefined') {
    window.FlappyPig = {};
  }

  var Pig = FlappyPig.Pig = function (game) {
    this.game = game;
    this.centerX = 100;
    this.centerY = 100;
    this.radius = 30;
    this.color = "pink";

  };

  Pig.prototype.move = function () {
    this.centerY += 1;

  };

  Pig.prototype.up = function () {
    this.centerY -= 20;
  }

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

  var Obstacle = FlappyPig.Obstacle = function (xDim, top, height) {
    this.fromLeft = xDim;
    this.fromTop = top;
    this.width = 75;
    this.height = height;
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
