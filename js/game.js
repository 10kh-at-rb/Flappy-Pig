(function () {
  if (typeof FlappyPig === 'undefined') {
    window.FlappyPig = {};
  }

  var Game = FlappyPig.Game = function (xDim, yDim) {
    this.xDim = xDim;
    this.yDim = yDim;
    this.obstacles = this.generateNewObstacles();
    this.pig = new FlappyPig.Pig(this);

    $(window).keydown(function (e) {
      this.pig.up();
    }.bind(this));
  };

  Game.prototype.render = function (ctx) {
    ctx.clearRect(0, 0, this.xDim, this.yDim);
    this.obstacles.forEach(function (obstacle) {
      obstacle.render(ctx);
    })


    this.pig.render(ctx);
  };

  Game.prototype.movePig = function () {
    var game = this;
    this.pig.move();
  };

  Game.prototype.moveObstacles = function () {
    var game = this;
    this.obstacles.forEach(function (obstacle) {
      obstacle.move();
    })
    if (this.obstacles[0].fromLeft <= 0) {
      this.obstacles = this.generateNewObstacles();
    }
  }

  Game.prototype.generateNewObstacles = function () {
    var topPipeHeight =  Math.floor(Math.random()*(0.8*this.yDim - 0.2*this.yDim)) + 0.2*this.yDim; // generates random height
    this.obstacleTop = new FlappyPig.Obstacle(this.xDim, 0, topPipeHeight);

    var bottomPipeTop = topPipeHeight + 100;
    var bottomPipeHeight = this.yDim - bottomPipeTop;
    this.obstacleBottom = new FlappyPig.Obstacle(this.xDim, bottomPipeTop, bottomPipeHeight);

    return [this.obstacleTop, this.obstacleBottom];
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
