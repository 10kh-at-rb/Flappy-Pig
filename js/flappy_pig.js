(function () {
  if (typeof FlappyPig === 'undefined') {
    window.FlappyPig = {};
  }

  var Pig = FlappyPig.Pig = function (board) {
    this.body = new Coord(10, 3);
    this.board = board;
    this.dir = "S";
  };

  Pig.prototype.move = function () {
    this.directions = {
      "N": [-1, 0],
      "S": [1, 0]
    };

    var updatePos = this.body.upDown(this.directions[this.dir]);
    this.body = updatePos;
    this.dir = "S";
    return this.body;
  };

  Pig.prototype.fly = function () {
    this.dir = "N";
  };

  var Coord = FlappyPig.Coord = function (i, j) {
    this.i = i;
    this.j = j;
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
    this.random_i = Math.floor(Math.random()*(14 - 6)) + 6; // 5 first num is the max, other is the min
    console.log(this.random_i);
    var horizontalPos = 10;

    this.top = [];
    this.bottom = [];

    var top_start = this.random_i;
    for(i = 0; i < top_start; i++) {
      this.top.push(new Coord(i, horizontalPos));
    }

    var bottom_start = this.random_i + 5;
    for(i = bottom_start; i <= 20; i++) {
      this.bottom.push(new Coord(i, horizontalPos));
    }

    console.log(this.top.concat(this.bottom));
    return this.top.concat(this.bottom);
  };

  var Board = FlappyPig.Board = function (dim) {
    this.dimensions = dim;
    this.pig = new Pig(this);
    this.obstacle = new Obstacle();
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