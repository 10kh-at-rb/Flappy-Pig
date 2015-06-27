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
    this.cancelKeys = false;




    this.landingTimer = window.setInterval(function () {
      this.onLand.call(this);
    }.bind(this));



    $(window).keydown(function (e) {
      if (!this.cancelKeys && e.keyCode === 32) {
        if (this.fired) {
          console.log('fired');
          this.pig.up();
          console.log('fired is true')
        } else {
          window.clearInterval(this.landingTimer);
          console.log('not fired');
          this.gameOver = false;

          this.newGame();


          this.start();
          this.fired = true;

        }
      }

    }.bind(this));


  };

  Game.prototype.onLand = function () {
    $('.your-score, .restart-game, .leaderboard-container, form.leaderboard').hide();
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

    this.gameoverImage = new Image();
    this.gameoverImage.src = "https://dl.dropboxusercontent.com/u/2330299/capstone/flappy_pig/bg_gameover.gif";
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
    this.cancelKeys = true;
    $('.your-score, .restart-game, .leaderboard-container, form.leaderboard').show();

    ctx.clearRect(0, 0, this.xDim, this.yDim);
    ctx.drawImage(this.gameoverImage, 0, 0, this.xDim, this.yDim);

    $('#leaderboard-score').val(this.score);

    ctx.font = "24px Silk";
    ctx.textAlign = 'center';
    ctx.fillStyle = "white";

    var score;

    if (String(this.score).length === 3) {
      score = "0" + String(this.score);
    } else if (String(this.score).length === 2) {
      score = "00" + String(this.score);
    } else if (String(this.score).length === 1) {
      score = "000" + String(this.score);
    }

    $('.your-score').html(score);

    $('.restart-game').click(function() {
      this.landingTimer = window.setInterval(function () {
        this.onLand.call(this);
      }.bind(this));

      $.ajax({
        type: "GET",
        url: "/",
        dataType: "json",
        data: {
          "query": true
        },
        success: function (response) {
          this.handleRestartSuccess(response);
          console.log("successful");
          $('.errors').html("");
          $('.leaderboard').hide();
          handleSuccess(response);
        }.bind(this),
        error: function (response) {
          $('.errors').html(response.responseJSON[0]);
          $('.submit-button').prop("disabled", false);
        }
      });

      this.cancelKeys = false;
    }.bind(this))

  };

  Game.prototype.handleRestartSuccess = function (response) {
    $('.leaderboard-name, .leaderboard-score').html("");
    response.forEach(function (user, idx, res) {

      var score;

      if (String(user.score).length === 3) {
        score = "0" + String(user.score);
      } else if (String(user.score).length === 2) {
        score = "00" + String(user.score);
      } else if (String(user.score).length === 1) {
        score = "000" + String(user.score);
      }


      $('.leaderboard-name').append($('<li>').html(user.name));
      $('.leaderboard-score').append($('<li>').html(score));
    })
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
        this.dead(ctx);
        this.fired = false;
        window.clearInterval(this.timerId);
      } else {
        window.clearInterval(this.landingTimer);
        this.interval += 1;
        this.movePig();
        this.moveObstacles();
        this.render(ctx);
      }
    }).bind(this), 10);
  };
})();
