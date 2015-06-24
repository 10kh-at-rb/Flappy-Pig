(function () {
  if (typeof FlappyPig === 'undefined') {
    window.FlappyPig = {};
  }

  var Pig = FlappyPig.Pig = function (board) {
    this.body = [new Coord(10, 3), new Coord(10, 4), new Coord(9, 3), new Coord(9, 4)];
    this.board = board;
    this.dir = "S";
  };

  Pig.prototype.move = function () {
    this.directions = {
      "N": [-2, 0],
      "S": [1, 0],
      "W": [0, -1]
    };

    var updatePos = []
    this.body.forEach(function (item) {
      updatePos.push(item.upDown(this.directions[this.dir]));
    }.bind(this));
    this.body = updatePos;
    this.dir = "S";

    // move obstacles to the left
    this.board.obstacle.forEach(function (obstacle, idx) {
      var oneLeft = obstacle.moveLeft(this.directions["W"]);
      this.board.obstacle[idx] = oneLeft;
    }.bind(this));

    // generate new obstacle
    if (this.board.obstacle[0].j < 0) {
      this.board.newObstacle();
    }

    if (this.isCollide()) {
      this.board.gameOver = true;
    }

    return this.body;
  };

  // checks if pig hits obstacle or hits floor
  Pig.prototype.isCollide = function () {
    var collide = false;
    this.board.obstacle.forEach(function (obstacle) {
      this.board.pig.body.forEach(function (pigPart) {
        if (obstacle.equals(pigPart) || pigPart.i > 20) {
          collide = true;
          return;
        }
      }.bind(this))
    }.bind(this))


    return collide;
  };

  Pig.prototype.fly = function () {
    this.dir = "N";
  };

  var Coord = FlappyPig.Coord = function (i, j) {
    this.i = i;
    this.j = j;
  };

  Coord.prototype.equals = function (other) {
    return (this.i === other.i && this.j === other.j);
  };

  Coord.prototype.moveLeft = function (pair) {
    return new Coord(this.i + pair[0], this.j + pair[1]);
  };

  Coord.prototype.upDown = function (pair) {
    return new Coord(this.i + pair[0], this.j + pair[1]);
  }

  // Coord.prototype.up = function () {
  //   return new Coord(this.i - 1, this.j + 0);
  // }
  // Coord.prototype.gravity = function () {
  //   return new Coord(this.i + 1, this.j + 0);
  // }

  var Obstacle = FlappyPig.Obstacle = function () {
    // needs to take up a bit of space

  };

  var Board = FlappyPig.Board = function (dim) {
    this.dimensions = dim;
    this.pig = new Pig(this);
    this.newObstacle();
    this.gameOver = false;
  };

  Board.prototype.newObstacle = function () {
    random_i = Math.floor(Math.random()*(14 - 6)) + 6; // 5 first num is the max, other is the min
    var horizontalPos = 20;

    this.top = [];
    this.bottom = [];

    var top_start = random_i;
    for(i = 0; i < top_start; i++) {
      this.top.push(new Coord(i, horizontalPos));
      this.top.push(new Coord(i, horizontalPos + 1));
      this.top.push(new Coord(i, horizontalPos + 2));
      this.top.push(new Coord(i, horizontalPos + 3));
    }

    var bottom_start = random_i + 5;
    for(i = bottom_start; i <= 20; i++) {
      this.bottom.push(new Coord(i, horizontalPos));
      this.bottom.push(new Coord(i, horizontalPos + 1));
      this.bottom.push(new Coord(i, horizontalPos + 2));
      this.bottom.push(new Coord(i, horizontalPos + 3));
    }

    this.obstacle = this.top.concat(this.bottom);
    return this.obstacle;
  };

  Board.blankgrid = function (dim) {

    var grid = [];
    for(var i = 0; i < dim; i++) {
      var row = [];
      for(var j = 0; j < dim; j++) {
        row.push('.');
      }
      grid.push(row);
    }
    return grid;
  };

  Board.prototype.print = function (grid) {
    grid.forEach(function (row, idx) {
      console.log(row);
    });
  };

  Board.prototype.render = function () {
    var grid = Board.blankgrid(this.dimensions);
    grid[this.pig.body.i][this.pig.body.j] = "P";
    this.print(grid);
  };
})();
