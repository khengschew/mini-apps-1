var board = {
  // MODEL CODE
  players: [
    {char: 'X', color: 'red'},
    {char: 'O', color: 'green'}
  ],
  winners: {},

  getNames: function() {
    board.players[0].name = prompt('Player One Name', 'Player One');
    board.players[1].name = prompt('Player Two Name', 'Player Two');
  },

  resetData: function() {
    board.turnCount = 0;
    board.winner = [];
    board.setTurnLabel();
  },

  checkWin: function(currentTurn) {
    var isComplete = true;

    // Check row
    for (var i = 0; i < 3; i++) {
      var currentRow = '';
      for (var j = 0; j < 3; j++) {
        var currentVal = document.getElementById(JSON.stringify(i) + JSON.stringify(j) + 'Value');
        if (currentVal !== null) {
          currentVal = currentVal.innerHTML;
        } else {
          isComplete = false;
        }
        currentRow += currentVal;
      }

      if (currentRow === currentTurn.char + currentTurn.char + currentTurn.char) {
        board.setWinner(currentTurn);
        return;
      }
    }

    // Check col
    for (var i = 0; i < 3; i++) {
      var currentCol = '';
      for (var j = 0; j < 3; j++) {
        var currentVal = document.getElementById(JSON.stringify(j) + JSON.stringify(i) + 'Value');
        if (currentVal !== null) {
          currentVal = currentVal.innerHTML;
        }
        currentCol += currentVal;
      }

      if (currentCol === currentTurn.char + currentTurn.char + currentTurn.char) {
        board.setWinner(currentTurn);
        return;
      }
    }

    // Check major diag
    var currentMajDiag = '';
    for (var i = 0; i < 3; i++) {
      var currentVal = document.getElementById(JSON.stringify(i) + JSON.stringify(i) + 'Value');
      if (currentVal !== null) {
        currentVal = currentVal.innerHTML;
      }
      currentMajDiag += currentVal;
    }

    if (currentMajDiag === currentTurn.char + currentTurn.char + currentTurn.char) {
      board.setWinner(currentTurn);
      return;
    }

    // Check minor diag
    var currentMinDiag = '';
    for (var i = 0; i < 3; i++) {
      var currentVal = document.getElementById(JSON.stringify(i) + JSON.stringify(2 - i) + 'Value');
      if (currentVal !== null) {
        currentVal = currentVal.innerHTML;
      }
      currentMinDiag += currentVal;
    }

    if (currentMinDiag === currentTurn.char + currentTurn.char + currentTurn.char) {
      board.setWinner(currentTurn);
      return;
    }

    if (isComplete) {
      board.setWinner('tied');
    }
  },

  setWinner: function(currentTurn) {
    if (currentTurn !== 'tied') {
      board.winner.push(currentTurn);
      
      var playerName = currentTurn.name || currentTurn.char;
      board.winners[playerName] = board.winners[playerName] + 1 || 1;

      // Swap start order if necessary
      if (board.players[0].char !== currentTurn.char) {
        board.players.unshift(board.players.pop());
      }
    }

    board.setWinnerLabel(currentTurn);
    board.setLeaderBoard();
  },

  // CONTROLLER CODE
  addPiece: function(e) {
    if (board.winner.length <= 0) {
      // Update clicked div
      var valueDiv = document.getElementById(e.target.dataset.rowid + e.target.dataset.colid);

      if (valueDiv && valueDiv.innerHTML.trim() === '') {
        board.setTurnLabel();
        var currentTurn = board.players[board.turnCount % 2];

        // Add symbol to board
        valueDiv.innerHTML = `<div id="${e.target.dataset.rowid + e.target.dataset.colid + 'Value'}" class="xo" style="color:${currentTurn.color};">${currentTurn.char}</div>`;

        // Check win
        board.checkWin(currentTurn);
      }
    }
  },

  // VIEW CODE
  initialize: function() {
    console.log('Board is initializing...');

    board.getNames();
    board.reset();

    // Add onClick handlers
    document.getElementById('resetButton').onclick = board.reset;
    document.getElementById('gameBoard').onclick = (event) => board.addPiece(event);
    
    console.log('Initialized!');
  },
  
  reset: function() {
    // Set up game data
    board.resetData();

    // Clear view
    document.getElementById('winner').style.visibility = 'hidden';

    // Set up game board
    var gameBoard = '';
    for (var r = 0; r < 3; r++) {
      for (var c = 0; c < 3; c++) {
        gameBoard += `
          <div
            class="grid"
            id="${JSON.stringify(r) + JSON.stringify(c)}"
            data-rowId="${r}"
            data-colId="${c}"
          >
          </div>
        `;
      }
    }
    document.getElementById('gameBoard').innerHTML = gameBoard;
  },

  setTurnLabel: function() {
    // Set turn label
    var currentLabel = document.getElementById('current');
    var currentPlayer = board.players[board.turnCount % 2];
    currentLabel.innerHTML = currentPlayer.char;
    if (currentPlayer.name) {
      currentLabel.innerHTML = currentLabel.innerHTML + ` (${currentPlayer.name})`;
    }
    currentLabel.style.color = currentPlayer.color;

    // Increment turn
    board.turnCount += 1;
  },

  setWinnerLabel: function(currentTurn) {
    var winnerLabel = document.getElementById('winner');

    if (currentTurn === 'tied') {
      winnerLabel.innerHTML = 'Everybody loses. Ties are for losers.';
      winnerLabel.style.visibility = 'visible';
    } else {
      var winnerName = currentTurn.name || currentTurn.char;
      winnerLabel.innerHTML = `${winnerName} Wins!`;
      winnerLabel.style.color = currentTurn.color;
      winnerLabel.style.visibility = 'visible';
    }
  },

  setLeaderBoard: function() {
    document.getElementById('scoreBoardDiv').style.visibility = 'visible';

    for (var player in board.winners) {
      var newRow = `<tr id="player${player}"><td>${player}</td><td>${board.winners[player]}</td></tr>`;
      var playerScore = document.getElementById('player' + player);
      if (playerScore !== null) {
        document.getElementById('player' + player).outerHTML = newRow;
      } else {
        var blankScore = document.getElementsByClassName('playerScore')[0];
        blankScore.outerHTML = newRow;
      }
    }
  }
}
