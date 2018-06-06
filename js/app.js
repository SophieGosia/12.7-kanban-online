import config from './config.js';
import Card from './card.js';
import Column from './column.js';
import board from './board.js';
// import { Pawel, Sophie } from './config.js';
//
// Pawel();
// Sophie();

$.ajaxSetup({
  headers: config.HEADERS
});

$.ajax({
  url: config.BASE_URL + '/board',
  method: 'GET',
  success: function(response) {
    setupColumns(response.columns);
  }
});

function setupColumns(columns) {
  columns.forEach(function(column) {
    var col = new Column(column.id, column.name);
    board.createColumn(col);
    setupCards(col, column.cards);
  });
}

function setupCards(col, cards) {
  cards.forEach(function(card) {
    var a = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
    col.createCard(a);
  });
}
