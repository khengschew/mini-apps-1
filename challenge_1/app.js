var board = {
  // MODEL CODE
  players: [
    {char: 'X', color: 'red'},
    {char: 'O', color: 'green'}
  ],
  winners: {},

  resetData: function() {
    board.turnCount = 0;
    board.winner = [];
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
      board.winners[currentTurn.char] = board.winners[currentTurn.char] + 1 || 1;
      console.log(board.winners);

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
        valueDiv.innerHTML = `<div id="${e.target.dataset.rowid + e.target.dataset.colid + 'Value'}" style="color:${currentTurn.color}; width:80%; height:80%; font-size:80px; display:flex; align-items:center; justify-content:center;">${currentTurn.char}</div>`;

        // Check win
        board.checkWin(currentTurn);
      }
    }
  },

  // VIEW CODE
  initialize: function() {
    console.log('Board is initializing...');

    // Set up game data
    board.resetData();

    // Clear view
    document.getElementById('winner').style.display = 'none';

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
            style="border:solid; border-width:1px; display:flex; align-items:center; justify-content:center;"
          >
          </div>
        `;
      }
    }
    document.getElementById('gameBoard').innerHTML = gameBoard;
    board.setTurnLabel();

    // Add onClick handlers
    document.getElementById('resetButton').onclick = board.initialize;
    document.getElementById('gameBoard').onclick = (event) => board.addPiece(event);

    console.log('Initialized!');
  },

  setTurnLabel: function() {
    // Set turn label
    var currentLabel = document.getElementById('current');
    currentLabel.innerHTML = board.players[board.turnCount % 2].char;
    currentLabel.style.color = board.players[board.turnCount % 2].color;

    // Increment turn
    board.turnCount += 1;
  },

  setWinnerLabel: function(currentTurn) {
    var winnerLabel = document.getElementById('winner');

    if (currentTurn === 'tied') {
      winnerLabel.innerHTML = 'Everybody loses. Ties are for losers.';
      winnerLabel.style.display = 'inline';
    } else {
      winnerLabel.innerHTML = `Player ${currentTurn.char} Wins!`;
      winnerLabel.style.color = currentTurn.color;
      winnerLabel.style.display = 'inline';
    }
  },

  setLeaderBoard: function() {
    document.getElementById('scoreBoardDiv').style.display = 'block';

    for (var player in board.winners) {
      var newRow = `<tr id="player${player}"><td>${player}</td><td>${board.winners[player]}</td></tr>`;
      var playerScore = document.getElementById('player' + player);
      if (playerScore !== null) {
        document.getElementById('player' + player).outerHTML = newRow;
      } else {
        document.getElementById('scoreBoard').innerHTML = document.getElementById('scoreBoard').innerHTML + newRow;
      }
    }
  }
}
