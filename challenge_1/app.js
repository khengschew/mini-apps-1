var board = {
  // MODEL CODE
  players: [
    {char: 'X', color: 'red'},
    {char: 'O', color: 'green'}
  ],
  turnCount: 0,
  checkWin: function() {

  },

  // CONTROLLER CODE
  toggle: function(e) {
    // Update clicked div
    var valueDiv = document.getElementById(e.target.dataset.rowid + e.target.dataset.colid);

    if (valueDiv && valueDiv.innerHTML.trim() === '') {
      // Increment turn
      board.turnCount += 1;
      var currentTurn = board.players[board.turnCount % 2];

      // Add symbol to board
      valueDiv.innerHTML = `<div style="color:${currentTurn.color}; width:80%; height:80%; font-size:80px; display:flex; align-items:center; justify-content:center;">${currentTurn.char}</div>`;
    }
  },

  // VIEW CODE
  initialize: function() {
    console.log('Board is initializing...');

    // Generate Board
    // Loop through row, 0-2:
      // Loop through column, 0-2:
        // Create div with fixed size and width, class = 'grid'
        // Create div, id = 'xo' + row + col

    var gameBoard = '';
    for (var r = 0; r < 3; r++) {
      for (var c = 0; c < 3; c++) {
        gameBoard += `
          <div
            class="grid"
            id="${JSON.stringify(r) + JSON.stringify(c)}"
            data-rowId="${r}"
            data-colId="${c}"
            style="border:solid; border-width:1px; display:flex; align-items:center; justify-content:center;"
            onClick="board.toggle(event)"
          >
          </div>
        `;
      }
    }

    document.getElementById('gameBoard').innerHTML = gameBoard;

    // Add onClick handlers
    document.getElementById('resetButton').onclick = board.initialize;

    console.log('Initialized!');
  }
}
