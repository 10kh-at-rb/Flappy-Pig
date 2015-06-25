(function () {
  if (typeof FlappyPig === 'undefined') {
    window.FlappyPig = {};
  }

  var Game = FlappyPig.Game = function (xDim, yDim) {
    this.xDim = xDim;
    this.yDim = yDim;
    this.pig = new FlappyPig.Pig();

    var topPipeHeight =  Math.floor(Math.random()*(0.8*yDim - 0.3*yDim)) + 0.3*yDim; // generates random height
    this.obstacleTop = new FlappyPig.Obstacle(this.xDim, 0, topPipeHeight);

    var bottomPipeTop = topPipeHeight + 100;
    var bottomPipeHeight = this.yDim - bottomPipeTop;
    this.obstacleBottom = new FlappyPig.Obstacle(this.xDim, bottomPipeTop, bottomPipeHeight);
  };

  Game.prototype.render = function (ctx) {
    ctx.clearRect(0, 0, this.xDim, this.yDim);
    this.obstacleTop.render(ctx);
    this.obstacleBottom.render(ctx);
    this.pig.render(ctx);
  };

  Game.prototype.movePig = function () {
    var game = this;
    this.pig.move();
  };

  Game.prototype.moveObstacles = function () {
    var game = this;
    this.obstacleTop.move();
    this.obstacleBottom.move();
  }
  Game.prototype.start = function (canvasEl) {
    var ctx = canvasEl.getContext("2d");

    window.setInterval((function () {
      this.movePig();
      this.moveObstacles();
      this.render(ctx);
    }).bind(this), 1000/60);
  };
})();
