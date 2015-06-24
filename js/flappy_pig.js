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
  };


  var Coord = FlappyPig.Coord = function (i, j) {
    this.i = i;
    this.j = j;
  };

  var Board = FlappyPig.Board = function (dim) {
    this.dimensions = dim;
    this.pig = new Pig(this);
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
