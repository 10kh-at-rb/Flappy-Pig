(function() {
  if (typeof FlappyPig === 'undefined') {
    window.FlappyPig = {};
  }

  var Pig = FlappyPig.Pig = function (game) {
    this.game = game;
    this.top = 100;
    this.left = 100;
    this.width = 50;
    this.height = 40;
    this.color = "pink";
  };

  Pig.prototype.move = function () {
    this.top += 1;

    if (this.collide() || this.isHitGround()) {
      console.log('gameover');
      this.game.gameOver = true;
    }
  };

  Pig.prototype.up = function () {
    this.top -= 20;
  }

  Pig.prototype.render = function (ctx) {

    ctx.fillStyle = "pink";
    ctx.fillRect(
      this.left,
      this.top,
      this.width,
      this.height
    );


  };

  Pig.prototype.collide = function () {
    // if the pig enters the pipe area
    if (
        // if the right side of the pig is greater than the obstacle's left
        ((this.left + this.width) >= this.game.obstacles[0].fromLeft) &&
        // the left side of the pig is less than the right side of the obstacle
        (this.left <= this.game.obstacles[0].fromLeft + this.game.obstacles[0].width)
        // (this.game.obstacles[0].fromLeft + this.game.obstacles[0].width <= this.left)
        ) {
      if (this.game.obstacleTop.height < this.top && this.game.obstacleBottom.fromTop > this.top+this.height) {
        // return true
      } else {
      // find the empty area
        return true;
      }
    }
  };

  Pig.prototype.isHitGround = function () {
    return (this.top + this.height > this.game.yDim);
  };

  var Obstacle = FlappyPig.Obstacle = function (game, top, height) {
    this.game = game;
    this.fromLeft = game.xDim;
    this.fromTop = top;
    this.width = 75;
    this.height = height;
  };

  Obstacle.prototype.move = function () {
    this.fromLeft -= 1;
    if (this.fromLeft + this.width < 0) {
      this.game.obstacles = this.game.generateNewObstacles();
    }

  };



  Obstacle.prototype.render = function (ctx) {
    ctx.fillStyle = "green";
    ctx.fillRect(
      this.fromLeft,
      this.fromTop,
      this.width,
      this.height
    );
  };
})();
