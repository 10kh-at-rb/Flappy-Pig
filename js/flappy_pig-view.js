(function () {
  if (typeof FlappyPig === 'undefined') {
    window.FlappyPig = {};
  }

  var View = FlappyPig.View = function ($el) {
    this.$el = $el;
    this.dim = 20;
    this.board = new FlappyPig.Board(this.dim);
    this.setupBoard();

    $(window).keydown(function (e) {
      if (e.keyCode === 32) {
        this.board.pig.fly();
      }
    }.bind(this));

    this.timer = setInterval(function () {
      this.board.pig.move();
      this.$el.html(this.render.bind(this));
      if (this.board.gameOver) {
        clearInterval(this.timer);
      }
    }.bind(this), 100);
  };


  View.prototype.setupBoard = function () {

    for(i = 0; i <= this.dim; i++) {
      var $row = $('<div class="row">');
      for(j = 0; j <= this.dim; j++) {
        $row.append($('<div>').addClass("cell row-" + j + " col-" + i));
      }
      this.$el.append($row);
    }
  };

  View.prototype.render = function () {
    this.$el.html("");
    this.setupBoard();

    this.board.pig.body.forEach(function (cell) {
      $('.row-' + cell.i + '.col-' + cell.j).addClass('pig');
    });

    // $('.row-' + this.board.pig.body.i + '.col-' + this.board.pig.body.j).addClass('pig');
    this.board.obstacle.forEach(function (cell) {
      $('.row-' + cell.i + '.col-' + cell.j).addClass('obstacle');
    });

  };
})();
