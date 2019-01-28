var board = {
  // MODEL CODE


  // CONTROLLER CODE


  // VIEW CODE
  // Generate Board
  initialize: function() {
    console.log('Board is initialized!');

    // Loop through row, 0-2:
      // Loop through column, 0-2:
        // Create div with fixed size and width, class = 'grid'
        // Create div, id = 'xo' + row + col

    var gameBoard = '';
    for (var r = 0; r < 3; r++) {
      for (var c = 0; c < 3; c++) {
        gameBoard += `
          <div class="grid" data-row="${r}" data-col="${c}" style="border:solid; border-width:1px;">
            <div class="xo" id="${JSON.stringify(r) + JSON.stringify(c)}">
            </div>
          </div>
        `;
      }
    }

    document.getElementById('gameBoard').innerHTML = gameBoard;
  }
}
