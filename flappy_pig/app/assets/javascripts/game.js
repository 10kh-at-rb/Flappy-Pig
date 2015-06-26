(function () {
  if (typeof FlappyPig === 'undefined') {
    window.FlappyPig = {};
  }

  var Game = FlappyPig.Game = function (canvas) {
    this.canvas = canvas;
    this.xDim = this.canvas.width;
    this.yDim = this.canvas.height;
    this.images();
    this.newGame();
    this.landingInterval = 0;
    this.landingVelY = 0;
    this.landingSpeed = 0.7;
    this.landingTop = 370;




    this.landingTimer = window.setInterval(function () {
      this.onLand.call(this);
    }.bind(this));


    // this.onLand();
    $(window).keydown(function (e) {
      if (e.keyCode === 32) {
        if (this.fired) {

          this.pig.up();
          console.log('fired is true')
        } else {
          window.clearInterval(this.landingTimer);
          this.gameOver = false;

          this.newGame();


          this.start();
          this.fired = true;
          console.log('start game');
          console.log(this.fired);
        }
      }

    }.bind(this));

// var ctx = this.canvas.getContext("2d");


// (this.pigFlyDownImage).onload = function () {
//   ctx.drawImage(this.pigFlyDownImage, this.pig.left - 15, this.landingTop, this.pig.width + 30, this.pig.height + 30);
// }.bind(this)
// ctx.drawImage(this.pigFlyImage, this.pig.left - 15, this.landingTop, this.pig.width + 30, this.pig.height + 30);

  };

  Game.prototype.onLand = function () {
    this.landingInterval += 1;
    var ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.xDim, this.yDim);
    ctx.drawImage(this.landingImage, 0, 0, this.xDim, this.yDim);

    // var image = this.pigFlyImage;
    if (this.landingTop <= 370 && this.landingVelY < this.landingSpeed) {
      this.landingVelY += 0.7;
    }
    if (this.landingTop > 450 && this.landingVelY > -this.landingSpeed) {
      this.landingVelY -= 0.7;
    }
    this.landingTop += this.landingVelY;

    if (this.landingVelY > 0) {
      ctx.drawImage(this.pigFlyImage, this.pig.left - 15, this.landingTop, this.pig.width + 30, this.pig.height + 30);
    } else if (this.landingVelY < 0) {
      ctx.drawImage(this.pigFlyDownImage, this.pig.left - 15, this.landingTop, this.pig.width + 30, this.pig.height + 30);
    }


  //   setTimeout(function () {
  //
  //   ctx.drawImage(this.bgImage_1, 0, 0, this.xDim, this.yDim);
  // }.bind(this), 5000);






  }

  Game.prototype.images = function () {

    this.landingImage = new Image();
    this.landingImage.src = "https://dl.dropboxusercontent.com/u/2330299/capstone/flappy_pig/landing.gif";

    this.bgImage_1 = new Image();
    this.bgImage_1.src = "https://dl.dropboxusercontent.com/u/2330299/capstone/flappy_pig/bg_1.gif";

    this.bgImage_bar = new Image();
    this.bgImage_bar.src = "https://dl.dropboxusercontent.com/u/2330299/capstone/flappy_pig/bg_bar.gif";

    this.pigNormImage = new Image();
    this.pigNormImage.src = "https://dl.dropboxusercontent.com/u/2330299/capstone/flappy_pig/pig.png";

    this.pigFlyImage = new Image();
    this.pigFlyImage.src = "https://dl.dropboxusercontent.com/u/2330299/capstone/flappy_pig/pig_fly.png";

    this.pigFlyDownImage = new Image();
    this.pigFlyDownImage.src = "https://dl.dropboxusercontent.com/u/2330299/capstone/flappy_pig/pig_fly_down.png";

    this.pigFallImage = new Image();
    this.pigFallImage.src = "https://dl.dropboxusercontent.com/u/2330299/capstone/flappy_pig/pig_fall.png";

    this.topPipeImage = new Image();
    this.topPipeImage.src = "https://dl.dropboxusercontent.com/u/2330299/capstone/flappy_pig/pipe_top.png";

    this.bottomPipeImage = new Image();
    this.bottomPipeImage.src = "https://dl.dropboxusercontent.com/u/2330299/capstone/flappy_pig/pipe_bottom.png";

    this.scoreBoardImage = new Image();
    this.scoreBoardImage.src = "https://dl.dropboxusercontent.com/u/2330299/capstone/flappy_pig/score_board.png";

    this.leaderBoardImage = new Image();
    this.leaderBoardImage.src = "https://dl.dropboxusercontent.com/u/2330299/capstone/flappy_pig/leaderboard.gif";
  };

  Game.prototype.newGame = function () {
    this.pig = new FlappyPig.Pig(this);
    this.score = 0;
    this.gameOver = false;
    this.fired = false;
    this.interval = 0;
    this.obstacles = this.generateNewObstacles();
  };

  Game.prototype.render = function (ctx) {
    ctx.clearRect(0, 0, this.xDim, this.yDim);
    ctx.drawImage(this.bgImage_1, 0, 0, this.xDim, this.yDim);
    ctx.drawImage(this.bgImage_bar, (this.obstacles[0].fromLeft - this.xDim), 900, 2250, 28.5);

    this.obstacles.forEach(function (obstacle) {
      obstacle.render(ctx);
    });

    this.pig.render(ctx);

    ctx.font = "100px flappy";
    ctx.fillStyle = "white";
        ctx.textAlign = 'center';
    ctx.lineWidth = 4;
    ctx.strokeStyle = "black";
    ctx.fillText(this.score, this.xDim/2, 150);
    ctx.strokeText(this.score, this.xDim/2, 150);

  };

  Game.prototype.dead = function (ctx) {
    ctx.clearRect(0, 0, this.xDim, this.yDim);
    ctx.drawImage(this.bgImage_1, 0, 0, this.xDim, this.yDim);
    this.obstacles.forEach(function (obstacle) {
      obstacle.render(ctx);
    });
    this.pig.render(ctx);

    ctx.font = "100px flappy";
    ctx.textAlign = 'center';
    ctx.fillStyle = "white";
    ctx.lineWidth = 4;
    ctx.strokeStyle = "black";
    ctx.fillText("GAMEOVER", this.xDim/2, 150);
    ctx.strokeText("GAMEOVER", this.xDim/2, 150);

    ctx.drawImage(this.scoreBoardImage, 290, 200, 185, 165);

    ctx.font = "60px flappy";
    ctx.textAlign = 'center';
    ctx.fillStyle = "white";
    ctx.lineWidth = 4;
    ctx.strokeStyle = "black";
    ctx.fillText(this.score, this.xDim/2, 330);
    ctx.strokeText(this.score, this.xDim/2, 330);

    ctx.drawImage(this.leaderBoardImage, 80, 400, 607, 475);


    // ctx.font = "30px Silk";
    //
    //
    // ctx.fillStyle = "#f0eaa1";
    // ctx.textAlign = 'left';
    // ctx.fillText("Karen", 180, 593);
    // ctx.fillText("Jane", 180, 643);
    // ctx.fillText("Jerry", 180, 693);
    // ctx.fillText("John", 180, 743);
    //
    // ctx.textAlign = 'right';
    // ctx.fillText("100", 580, 593);
    // ctx.fillText("99", 580, 643);
    // ctx.fillText("94", 580, 693);
    // ctx.fillText("10", 580, 743);
    //
    // // left first
    // ctx.fillStyle = "#e86101";
    // ctx.textAlign = 'left';
    // ctx.fillText("Karen", 180, 590);
    // ctx.fillText("Jane", 180, 640);
    // ctx.fillText("Jerry", 180, 690);
    // ctx.fillText("John", 180, 740);
    //
    // ctx.textAlign = 'right';
    // ctx.fillText("100", 580, 590);
    // ctx.fillText("99", 580, 640);
    // ctx.fillText("94", 580, 690);
    // ctx.fillText("10", 580, 740);
    // bg


  }

  Game.prototype.movePig = function () {
    var game = this;
    this.pig.move();
  };

  Game.prototype.moveObstacles = function () {
    var game = this;
    this.obstacles.forEach(function (obstacle) {
      obstacle.move();
    });

    if ((this.obstacleTop.fromLeft + this.obstacleTop.width) <= 0) {
      this.obstacles = this.generateNewObstacles();
      this.gavePoint = false;
    }

    if (this.pig.left > this.obstacleTop.fromLeft + this.obstacleTop.width) {
      if (!this.gavePoint) {
        this.score += 1;
        this.gavePoint = true;
      }
    }
  };

  Game.prototype.generateNewObstacles = function () {
    var bottomPipeHeight =  Math.floor(Math.random()*(0.7*this.yDim - 0.125*this.yDim)) + 0.125*this.yDim; // generates random height
    this.obstacleBottom = new FlappyPig.Obstacle(this, this.yDim - bottomPipeHeight, bottomPipeHeight);
    var topPipeHeight = this.yDim - bottomPipeHeight - 250;
    this.obstacleTop = new FlappyPig.Obstacle(this, 0, topPipeHeight);

    return [this.obstacleTop, this.obstacleBottom];
  };

  Game.prototype.start = function () {
    var ctx = this.canvas.getContext("2d");

    this.timerId = window.setInterval((function () {
      if (this.gameOver) {
        ctx.clearRect(0, 0, this.xDim, this.yDim);
        this.dead(ctx);
        this.fired = false;
        window.clearInterval(this.timerId);
      } else {
        this.interval += 1;
        this.movePig();
        this.moveObstacles();
        this.render(ctx);
      }
    }).bind(this), 10);
  };
})();
