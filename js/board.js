var board = {
  name: 'Kanban board',
  createColumn: function(column) {
    this.element.append(column.element);
    initSortableCards();
    initSortableColumns();
  },
  element: $('#board .column-container')
};

$('.create-column').click(function () {
  var columnName = prompt('Enter a column name');
  if(columnName) {
    $.ajax({
      url: baseUrl + '/column',
      method: 'POST',
      data: {
        name: columnName
      },
      success: function (response) {
        var column = new Column(response.id, columnName);
        board.createColumn(column);
      }
    });
  }
});

// Sorting cards
function initSortableCards() {
  $('.column-card-list').sortable({
    connectWith: '.column-card-list',
    placeholder: 'card-placeholder'
  }).disableSelection();
}

// Sorting columns
function initSortableColumns() {
  $('.column-container').sortable({
    connectWith: '.column-container',
    placeholder: 'column-placeholder'
  }).disableSelection();
}
