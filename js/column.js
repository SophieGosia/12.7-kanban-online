import config from './config.js';
import Card from './card.js';

function Column(id, name) {
  var self = this;

  this.id = id;
  this.name = name || 'No name given';
  this.element = createColumn();

  function createColumn() {
    //create new nodes
    var column = $('<div class="column"></div>');
    var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
    var columnCardList = $('<ul class="column-card-list"></ul>');
    var columnDelete = $('<button class="btn delete"></button>');
    var columnAddCard = $('<button class="btn add-card">Dodaj kartę</button>');

    // set actions to nodes
    columnDelete.click(function () {
      self.deleteColumn();
    });

    columnAddCard.click(function (event) {
      var cardName = prompt('Enter the name of the card');
      event.preventDefault();
      $.ajax({
        url: config.BASE_URL + '/card',
        method: 'POST',
        data: {
          name: cardName,
          bootcamp_kanban_column_id: self.id
        },
        success: function(response) {
          var card = new Card(response.id, cardName);
          self.createCard(card);
        }
      });
    });
    // create column element
    column.append(columnTitle)
      .append(columnDelete)
      .append(columnAddCard)
      .append(columnCardList);
    return column;
  }
}
Column.prototype = {
  createCard: function (card) {
    this.element.children('ul').append(card.element);
  },
  deleteColumn: function () {
    var self = this;
    $.ajax({
      url: config.BASE_URL + '/column/' + self.id,
      method: 'DELETE',
      success: function () {
        self.element.remove();
      }
    });
  }
};

export default Column;
