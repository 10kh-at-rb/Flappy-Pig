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
    this.landingVelY = 0;
    this.landingSpeed = 0.7;
    this.landingTop = 370;
    this.cancelKeys = false;


    this.badingSound = new Audio('https://dl.dropboxusercontent.com/u/2330299/capstone/flappy_pig/sounds/sfx_point.mp3');
    this.flapSound = new Audio('https://dl.dropboxusercontent.com/u/2330299/capstone/flappy_pig/sounds/sfx_wing.mp3');
    this.smackSound = new Audio('https://dl.dropboxusercontent.com/u/2330299/capstone/flappy_pig/sounds/sfx_hit.mp3');
    this.dieSound = new Audio('https://dl.dropboxusercontent.com/u/2330299/capstone/flappy_pig/sounds/sfx_die.mp3');
    this.swooshSound = new Audio('https://dl.dropboxusercontent.com/u/2330299/capstone/flappy_pig/sounds/sfx_swooshing.mp3');
    this.barLeft = 0;

    this.timer1 = window.setInterval(function () {
      this.onLand.call(this);
    }.bind(this));

    $(window).keydown(function (e) {
      if (!this.cancelKeys && e.keyCode === 32) {
        if (this.fired) {
          this.pig.up();
        } else {
          this.clearAllIntervals();

          this.gameOver = false;
          this.newGame();
          this.start();
          this.fired = true;
        }
      }
    }.bind(this));

  };

  Game.prototype.clearAllIntervals = function () {
    window.clearInterval(this.timer1);
    window.clearInterval(this.timer2);
    window.clearInterval(this.timer3);
    window.clearInterval(this.timer4);
  };

  Game.prototype.onLand = function () {
    $('.your-score, .restart-game, .leaderboard-container, form.leaderboard').hide();
    var ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.xDim, this.yDim);
    ctx.drawImage(this.landingImage, 0, 0, this.xDim, this.yDim);

    if (this.landingTop <= 370 && this.landingVelY < this.landingSpeed) {
      this.landingVelY += 0.7;
    }
    if (this.landingTop > 450 && this.landingVelY > -this.landingSpeed) {
      this.landingVelY -= 0.7;
    }
    this.landingTop += this.landingVelY;

    if (this.landingVelY > 0) {
      ctx.drawImage(this.pigSpriteImage, 151, 0, 150, 150, this.pig.left - 15, this.landingTop, 150, 150);
    } else if (this.landingVelY < 0) {
      ctx.drawImage(this.pigSpriteImage, 0, 0, 150, 150, this.pig.left - 15, this.landingTop, 150, 150);
    }
  };

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

    this.pigSpriteImage = new Image();
    this.pigSpriteImage.src = "https://dl.dropboxusercontent.com/u/2330299/capstone/flappy_pig/new_pig_variations2.gif";
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
    if (this.gameOver) {
      this.smackSound.play();
      setTimeout(function () {
        this.dieSound.play();
      }.bind(this), 300)
      setTimeout(function () {
        this.swooshSound.play();
      }.bind(this), 600)
      this.clearAllIntervals();
      this.dead(ctx);
      this.fired = false;
      return;
    }

    ctx.clearRect(0, 0, this.xDim, this.yDim);
    ctx.drawImage(this.bgImage_1, 0, 0, this.xDim, this.yDim);

    this.barLeft -= 4;
    if (this.barLeft < -(1512 - this.xDim)) {
      this.barLeft = 0;
    }
    ctx.drawImage(this.bgImage_bar, this.barLeft, 904, 1512, 15);

    this.obstacles.forEach(function (obstacle) {
      obstacle.render(ctx);
    });

    this.pig.render(ctx);

    ctx.font = "100px flappy";
    ctx.fillStyle = "white";
        ctx.textAlign = 'center';
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#543000";
    ctx.fillText(this.score, this.xDim/2, 150);
    ctx.strokeText(this.score, this.xDim/2, 150);
  };

  Game.prototype.dead = function (ctx) {
    this.cancelKeys = true;

    this.timer4 = window.setInterval(function () {
      ctx.clearRect(0, 0, this.xDim, this.yDim);

      ctx.drawImage(this.bgImage_1, 0, 0, this.xDim, this.yDim);

      this.obstacles.forEach(function (obstacle) {
        obstacle.render(ctx);
      });

      this.movePig();
      this.pig.render(ctx);

      if (this.okayToDisplayLeaderBoard) {
        this.displayLeaderboard(ctx);
      }
    }.bind(this), 10);
  };

  Game.prototype.displayLeaderboard = function (ctx) {
    this.clearAllIntervals();
    $('.your-score, .restart-game, .leaderboard-container, form.leaderboard').show();

    ctx.drawImage(this.leaderBoardImage, 204, 49, 361, 611);

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

      $.ajax({
        type: "GET",
        url: "/",
        dataType: "json",
        data: {
          "query": true
        },
        success: function (response) {
          this.handleRestartSuccess(response);
          $('.errors').html("");
          $('.leaderboard').hide();
          handleSuccess(response);
        }.bind(this),
        error: function (response) {
          $('.errors').html(response.responseJSON[0]);
          $('.submit-button').prop("disabled", false);
        }
      });
    }.bind(this));
  };

  Game.prototype.handleRestartSuccess = function (response) {
    this.okayToDisplayLeaderBoard = false;
    this.clearAllIntervals();
    this.cancelKeys = false;
    this.timer2 = window.setInterval(function () {
      this.onLand.call(this);
    }.bind(this));

    $('#leaderboard-name').val("");
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
    });
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
        this.badingSound.play();
        this.gavePoint = true;
      }
    }
  };

  Game.prototype.generateNewObstacles = function () {
    var heightOfGameSpace = this.yDim - 129;
    var usuablePipeSpace = heightOfGameSpace - 275;
    var maxHeight = usuablePipeSpace * 0.9;
    var minHeight = usuablePipeSpace * 0.1;

    var bottomPipeHeight = Math.floor(Math.random()* (maxHeight - minHeight)) + minHeight;
    this.obstacleBottom = new FlappyPig.Obstacle(this, heightOfGameSpace - bottomPipeHeight, bottomPipeHeight);
    var topPipeHeight = heightOfGameSpace - bottomPipeHeight - 275;
    this.obstacleTop = new FlappyPig.Obstacle(this, 0, topPipeHeight);

    return [this.obstacleTop, this.obstacleBottom];
  };

  Game.prototype.start = function () {
    var ctx = this.canvas.getContext("2d");

    this.clearAllIntervals();
    this.timer3 = window.setInterval(function () {
      this.interval += 1;
      this.movePig();
      if (this.interval > 200) {
        this.moveObstacles();
      }
      this.render(ctx);
    }.bind(this), 10);
  };
})();
