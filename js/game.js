(function () {
  if (typeof FlappyPig === 'undefined') {
    window.FlappyPig = {};
  }

  var Game = FlappyPig.Game = function (canvas) {
    this.canvas = canvas;
    this.xDim = this.canvas.width;
    this.yDim = this.canvas.height;
    this.obstacles = this.generateNewObstacles();
    this.pig = new FlappyPig.Pig(this);
    this.score = 0;
    this.gameOver = false;

    this.fired = false;
    $(window).keydown(function (e) {
      if (this.fired) {
        this.pig.up();
      } else {
        this.start();
        this.fired = true;
      }
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
    });

    if ((this.obstacleTop.fromLeft + this.obstacleTop.width) === 0) {
      this.obstacles = this.generateNewObstacles();

    }

    if (this.pig.left === this.obstacleTop.fromLeft + this.obstacleTop.width) {
      this.score += 1;
      // debugger;
      console.log(this.score);
    }
  };

  Game.prototype.generateNewObstacles = function () {
    var topPipeHeight =  Math.floor(Math.random()*(0.8*this.yDim - 0.2*this.yDim)) + 0.2*this.yDim; // generates random height
    this.obstacleTop = new FlappyPig.Obstacle(this, 0, topPipeHeight);

    var bottomPipeTop = topPipeHeight + 100;
    var bottomPipeHeight = this.yDim - bottomPipeTop;
    this.obstacleBottom = new FlappyPig.Obstacle(this,bottomPipeTop, bottomPipeHeight);

    return [this.obstacleTop, this.obstacleBottom];
  };

  Game.prototype.start = function () {
    var ctx = this.canvas.getContext("2d");

    window.setInterval((function () {
      this.movePig();
      this.moveObstacles();
      this.render(ctx);
    }).bind(this), 1000/60);
  };
})();
