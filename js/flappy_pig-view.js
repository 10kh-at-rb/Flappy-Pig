(function () {
  if (typeof FlappyPig === 'undefined') {
    window.FlappyPig = {};
  }

  var View = FlappyPig.View = function ($el) {
    this.$el = $el;
    this.board = new FlappyPig.Board(20);
    this.setupBoard();
    return "here"
  };


  View.prototype.setupBoard = function () {
    for(i = 0; i <= this.dim; i++) {
      var $row = $('<div class="row">');
      for(j = 0; j <= this.dim; j++) {
        $row.append($('<div>').addClass("cell row-" + i + " col-" + j));
      }
      this.$el.append($row);
    }
  };

  View.prototype.render = function () {
    this.$el.html("");
    this.setupBoard();
    $('.row-' + this.board.pig.body.i + '.col-' + this.board.pig.body.j).addClass('pig');
  };
})();
