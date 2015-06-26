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

    this.onLand();
    $(window).keydown(function (e) {
      if (e.keyCode === 32) {
        if (this.fired) {
          this.pig.up();
          console.log('fired is true')
        } else {
          this.gameOver = false;

          this.newGame();


          this.start();
          this.fired = true;
          console.log('start game');
          console.log(this.fired);
        }
      }

    }.bind(this));


    // this.pigReady = false;
    // this.pigImage.onload = function () {
    //   this.pigReady = true;
    // };

  };

  Game.prototype.onLand = function () {
    var ctx = this.canvas.getContext("2d");
    (this.landingImage).onload = function () {
      ctx.drawImage(this.landingImage, 0, 0, this.xDim, this.yDim);
    }.bind(this)
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
    // this.bgImage_2 = new Image();
    // this.bgImage_2.src = "https://dl.dropboxusercontent.com/u/2330299/capstone/flappy_pig/bg_2.gif";
    //
    // this.bgImage_3 = new Image();
    // this.bgImage_3.src = "https://dl.dropboxusercontent.com/u/2330299/capstone/flappy_pig/bg_3.gif";
    //
    // this.bgImage_4 = new Image();
    // this.bgImage_4.src = "https://dl.dropboxusercontent.com/u/2330299/capstone/flappy_pig/bg_4.gif";
    //
    // this.bgImage_5 = new Image();
    // this.bgImage_5.src = "https://dl.dropboxusercontent.com/u/2330299/capstone/flappy_pig/bg_5.gif";
    //
    // this.bgImage_6 = new Image();
    // this.bgImage_6.src = "https://dl.dropboxusercontent.com/u/2330299/capstone/flappy_pig/bg_6.gif";
    //
    // this.bgImage_7 = new Image();
    // this.bgImage_7.src = "https://dl.dropboxusercontent.com/u/2330299/capstone/flappy_pig/bg_7.gif";
    //
    // this.bgImage_8 = new Image();
    // this.bgImage_8.src = "https://dl.dropboxusercontent.com/u/2330299/capstone/flappy_pig/bg_8.gif";
    //
    // this.bgImage_9 = new Image();
    // this.bgImage_9.src = "https://dl.dropboxusercontent.com/u/2330299/capstone/flappy_pig/bg_9.gif";
    //
    // this.bgImage_10 = new Image();
    // this.bgImage_10.src = "https://dl.dropboxusercontent.com/u/2330299/capstone/flappy_pig/bg_10.gif";

    // this.startImage = new Image();
    // this.startImage.src = "https://dl.dropboxusercontent.com/u/2330299/capstone/flappy_pig/start.gif";

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

    // ctx.clearRect(0, 0, this.xDim, this.yDim);
    // ctx.drawImage(this.bgImage_1, 0, 0, this.xDim, this.yDim);
    ctx.font = "100px flappy";
    ctx.textAlign = 'center';
    ctx.fillStyle = "white";
    ctx.lineWidth = 4;
    ctx.strokeStyle = "black";
    ctx.fillText("GAMEOVER", this.xDim/2, 350);
    ctx.strokeText("GAMEOVER", this.xDim/2, 350);


    ctx.drawImage(this.scoreBoardImage, 290, 400, 185, 165);

    ctx.font = "60px flappy";
    ctx.textAlign = 'center';
    ctx.fillStyle = "white";
    ctx.lineWidth = 4;
    ctx.strokeStyle = "black";
    ctx.fillText(this.score, this.xDim/2, 530);
    ctx.strokeText(this.score, this.xDim/2, 530);


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
      // debugger;
      console.log(this.score);
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
