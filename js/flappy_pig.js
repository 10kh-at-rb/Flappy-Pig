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
    this.random_i = Math.floor(Math.random(20)); // 5
    this.random_j = Math.floor(Math.random(20)); // 6
    this.body = new Coord(this.random_i, this.random_j);
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
