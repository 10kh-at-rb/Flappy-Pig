(function() {
  if (typeof FlappyPig === 'undefined') {
    window.FlappyPig = {};
  }

  var Pig = FlappyPig.Pig = function (game) {
    this.game = game;
    this.top = 400;
    this.left = 350;
    this.width = 90;
    this.height = 65;
    this.isUp = false;
    this.color = "pink";
  };

  Pig.prototype.move = function () {
    this.top += 5;
    this.counter = 0;

    if (this.collide() || this.isHitGround()) {
      // console.log('gameover');
      this.game.gameOver = true;
      // this.game.fired = false;

    }

  };

  Pig.prototype.up = function () {
    this.top -= 200;
    this.isUp = true;
    // console.log(this.isUp);
  }

  Pig.prototype.render = function (ctx) {

    console.log(this.isUp);
    ctx.fillStyle = "rgba(0, 0, 0, 0)";
    ctx.fillRect(
      this.left,
      this.top,
      this.width,
      this.height
    );

    if (this.isUp) {
      if (this.game.interval % 6 === 0 || this.game.interval % 7 === 0 || this.game.interval % 8 === 0 || this.game.interval % 9 === 0 || this.game.interval % 10 === 0) {
        ctx.drawImage(this.game.pigFlyImage, this.left, this.top, this.width, this.height);
      } else {
        ctx.drawImage(this.game.pigFlyDownImage, this.left, this.top, this.width, this.height);
      }

    } else if (!this.isUp) {
      // debugger;
      ctx.drawImage(this.game.pigFallImage, this.left, this.top, this.width, this.height);
    }

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
    return (this.top + this.height > this.game.yDim - 100);
  };

  var Obstacle = FlappyPig.Obstacle = function (game, top, height) {
    this.game = game;
    this.fromLeft = game.xDim;
    this.fromTop = top;
    this.width = 87;
    this.height = height;
  };

  Obstacle.prototype.move = function () {
    this.fromLeft -= 2;
  };



  Obstacle.prototype.render = function (ctx) {
    ctx.fillStyle = "rgba(0, 0, 0, 0)";
    ctx.fillRect(
      this.fromLeft,
      this.fromTop,
      this.width,
      this.height
    );
  };
})();
