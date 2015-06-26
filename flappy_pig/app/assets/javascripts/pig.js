(function() {
  if (typeof FlappyPig === 'undefined') {
    window.FlappyPig = {};
  }

  var Pig = FlappyPig.Pig = function (game) {
    this.game = game;

    this.velY = 0;
    this.speed = 7;
    this.top = 400;
    this.left = 350;
    this.width = 90;
    this.height = 65;
    this.isUp = false;
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

    this.isUp = true;
    this.countIntervalsBeforeGoingDown = 0;
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

    //



    if (this.velY === this.speed) {
      this.countIntervalsBeforeGoingDown ++;
    }

    if (this.countIntervalsBeforeGoingDown > 20 && this.velY > 0 && this.velY === this.speed) {

      ctx.drawImage(this.game.pigFallImage, this.left - 15, this.top - 15, this.width + 30, this.height + 30);
      return;

    }

    if (this.velY < 0 ) {
      ctx.drawImage(this.game.pigFlyDownImage, this.left - 15, this.top - 15, this.width + 30, this.height + 30);
    } else if (this.velY > 0) {
      ctx.drawImage(this.game.pigFlyImage, this.left - 15, this.top - 15, this.width + 30, this.height + 30);
    }




    // if (this.isUp) {
    //   if (this.game.interval % 6 === 0 || this.game.interval % 7 === 0 || this.game.interval % 8 === 0 || this.game.interval % 9 === 0 || this.game.interval % 10 === 0) {
    //
    //   } else {
    //
    //   }
    //
    // } else if (!this.isUp) {
    //   // debugger;
    //   ctx.drawImage(this.game.pigFallImage, this.left - 15, this.top - 15, this.width + 30, this.height + 30);
    // }

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
    return (this.top + this.height > this.game.yDim - this.game.yDim * 0.125);
  };

  var Obstacle = FlappyPig.Obstacle = function (game, top, height) {
    this.game = game;
    this.speed = 4;
    this.velX = 0;
    this.fromLeft = game.xDim;
    this.fromTop = top;
    this.width = 87;
    this.height = height;
  };

  Obstacle.prototype.move = function () {
    if (this.velX > -this.speed) {
      this.velX--;
    }
    this.fromLeft += this.velX;
  };

  Obstacle.prototype.render = function (ctx) {
    ctx.fillStyle = "rgba(0, 0, 0, 0)";
    ctx.fillRect(
      this.fromLeft,
      this.fromTop,
      this.width,
      this.height
    );

    ctx.drawImage(this.game.topPipeImage, this.game.obstacles[0].fromLeft, this.game.obstacles[0].height - this.game.yDim, 87*1.6, this.game.yDim);
    ctx.drawImage(this.game.bottomPipeImage, this.game.obstacles[1].fromLeft, this.game.obstacles[1].fromTop, 87*1.6, this.game.yDim);
  };
})();