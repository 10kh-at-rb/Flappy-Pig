(function() {
  if (typeof FlappyPig === 'undefined') {
    window.FlappyPig = {};
  }

  var Pig = FlappyPig.Pig = function (game) {
    this.game = game;

    this.velY = 0;
    this.speed = 7;
    this.top = 400;
    this.left = 280;
    this.width = 90;
    this.height = 65;
    this.countIntervalsBeforeGoingDown = 0;
    this.color = "pink";
  };

  Pig.prototype.move = function () {
    this.counter = 0;

    if (this.velY < this.speed) {
      this.velY++;
    }

    this.top += this.velY;

    if (this.collide() || this.isHitGround()) {
      this.game.gameOver = true;
    }
  };

  Pig.prototype.up = function () {
    this.velY = -17;
    this.countIntervalsBeforeGoingDown = 0;
  }

  Pig.prototype.render = function (ctx) {
    ctx.fillStyle = "rgba(0, 0, 0, 0)";
    ctx.fillRect(
      this.left,
      this.top,
      this.width,
      this.height
    );

    if (this.game.gameOver) {
      if (!this.isHitGround()) {
        ctx.drawImage(this.game.pigSpriteImage, 750, 0, 150, 150, this.left - 30, this.top - 35, 150, 150);
      } else {
        this.game.okayToDisplayLeaderBoard = true;
        ctx.drawImage(this.game.pigSpriteImage, 750, 0, 150, 150, this.left - 30, this.game.yDim - this.game.yDim * 0.225, 150, 150);
      }
      return;
    }

    if (this.velY === this.speed) {
      this.countIntervalsBeforeGoingDown ++;
    }

    if (this.countIntervalsBeforeGoingDown > 20 && this.velY > 0 && this.velY === this.speed) {
      ctx.drawImage(this.game.pigSpriteImage, 601, 0, 150, 150, this.left - 30, this.top - 35, 150, 150);
      return;
    }

    if (this.velY <= 0 ) {
      ctx.drawImage(this.game.pigSpriteImage, 449, 0, 150, 150, this.left - 30, this.top - 35, 150, 150);
    } else if (this.velY > 0) {
      ctx.drawImage(this.game.pigSpriteImage, 299, 0, 150, 150, this.left - 30, this.top - 35, 150, 150);
    }
  };


  Pig.prototype.collide = function () {
    if ( // the pig is within the pipe gap
        // if the right side of the pig is greater than the obstacle's left
        ((this.left + this.width) >= this.game.obstacles[0].fromLeft) &&
        // the left side of the pig is less than the right side of the obstacle
        (this.left <= this.game.obstacles[0].fromLeft + this.game.obstacles[0].width)
        ) {
      if (this.game.obstacleTop.height < this.top && this.game.obstacleBottom.fromTop > this.top+this.height) {
        // pig is in the pipe gap
      } else {
      // find the empty area
        return true;
      }
    }
  };

  Pig.prototype.isHitGround = function () {
    return (this.top + this.height > this.game.yDim - this.game.yDim * 0.125);
  };

  var Obstacle = FlappyPig.Obstacle = function (game, top, height) {
    this.game = game;
    this.fromLeft = game.xDim;
    this.fromTop = top;
    this.width = 87;
    this.height = height;
  };

  Obstacle.prototype.move = function () {
    this.fromLeft -= 4;
  };

  Obstacle.prototype.render = function (ctx) {
    ctx.fillStyle = "rgba(0, 0, 0, 0)";
    ctx.fillRect(
      this.fromLeft,
      this.fromTop,
      this.width,
      this.height
    );

    // sprite arguments
    // left position of sprite,
    // top post of sprite
    // actual width of sprite
    // height of sprite
    // left pos on canvas
    // top pos on canvas
    // width of sprite (this is the width you want your sprite to stretch/compress to)
    // height of sprite

    ctx.drawImage(this.game.topPipeImage, this.game.obstacles[0].fromLeft, this.game.obstacles[0].height - this.game.yDim, 87*1.6, this.game.yDim);
    ctx.drawImage(this.game.bottomPipeImage, 0, 0, 175, this.game.obstacles[1].height, this.game.obstacles[1].fromLeft, this.game.obstacles[1].fromTop, 87*1.6, this.game.obstacles[1].height);
  };
})();
