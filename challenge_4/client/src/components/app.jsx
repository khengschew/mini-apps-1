import React from 'react';
import _ from 'underscore';
import Board from './board.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currPlayer: 1,
      cols: 7,
      rows: 6,
      win: 4,
      board: [],
      winner: null,
      gameOver: null
    }

    this.state.board = this.generateBoard();

    this.resetBoard = this.resetBoard.bind(this);
    this.setPiece = this.setPiece.bind(this);
    this.checkWin = this.checkWin.bind(this);
  }

  generateBoard() {
    return _.range(this.state.rows).map(() => {
      return _.range(this.state.cols).map(() => {
        return 0;
      })
    });
  }

  resetBoard() {
    var newBoard = this.generateBoard();

    this.setState({
      currPlayer: 1,
      board: newBoard,
      winner: null,
      gameOver: null
    });
  }

  setPiece(e) {
    if (!this.state.gameOver) {
      var col = e.target.dataset.y;
      var piecePlaced = false;

      var updateBoard = this.state.board;
      for (var i = 0; i < this.state.rows; i++) {
        if (updateBoard[i][col] === 0) {
          updateBoard[i][col] = this.state.currPlayer;
          piecePlaced = true;
          break;
        }
      }

      // Can check win as a callback in optional second param to setState
      if (piecePlaced) {
        this.setState({
          board: updateBoard,
          currPlayer: this.state.currPlayer === 1 ? 2 : 1
        },
          this.checkWin
        );
      }
    }
  }

  checkRow(player) {
    var counter = 0;
    for (var i = 0; i < this.state.rows; i++) {
      counter = 0;
      for (var j = 0; j < this.state.cols; j++) {
        if (this.state.board[i][j] === player) {
          counter++;
        } else {
          counter = 0;
        }

        if (counter >= this.state.win) {
          return true;
        }
      }
    }
    return false;
  }

  checkCol(player) {
    var counter = 0;
    for (var i = 0; i < this.state.cols; i++) {
      counter = 0;
      for (var j = 0; j < this.state.rows; j++) {
        if (this.state.board[j][i] === player) {
          counter++;
        } else {
          counter = 0;
        }

        if (counter >= this.state.win) {
          return true;
        }
      }
    }
    return false;
  }

  checkMajDiag(player) {
    var counter = 0;
    for (var i = -this.state.cols; i < this.state.cols; i++) {
      counter = 0;
      for (var j = 0; j < this.state.rows; j++) {
        if ((i + j) >= 0 && this.state.board[j][i + j] === player) {
          counter++;
        } else {
          counter = 0;
        }

        if (counter >= this.state.win) {
          return true;
        }
      }
    }
    return false;
  }

  checkMinDiag(player) {
    var counter = 0;
    for (var i = 0; i < (2 * this.state.cols) - 1; i++) {
      counter = 0;
      for (var j = 0; j < this.state.rows; j++) {
        if ((i - j) >= 0 && this.state.board[j][i - j] === player) {
          counter++;
        } else {
          counter = 0;
        }

        if (counter >= this.state.win) {
          return true;
        }
      }
    } 
    return false;
  }

  checkDraw() {
    for (var i = 0 ; i < this.state.rows; i++) {
      for (var j = 0; j < this.state.cols; j++) {
        if (this.state.board[i][j] === 0) {
          return;
        }
      }
    }

    this.setState({
      gameOver: true
    })
  }

  checkWin() {
    // Check row, col, maj diag, and min diag
    // If any of those returns true
    var player = this.state.currPlayer === 1 ? 2 : 1;
    if (this.checkRow(player) || this.checkCol(player) || this.checkMajDiag(player) || this.checkMinDiag(player)) {
      this.setState({
        winner: player,
        gameOver: true
      });
    }

    // Check draw condition
    // Loop through all values:
      // If no values are 0, then return draw
    this.checkDraw();
  }

  render() {
    return (
      <div>
        <h1 className={this.state.gameOver && this.state.winner ? `p${this.state.winner}` : ''}>{!this.state.gameOver ? 'Connect Four' : this.state.winner ? `Player ${this.state.winner} wins!` : 'Nobody wins. Everybody Loses.'} <button onClick={this.resetBoard}>New Game</button></h1>
        <Board rows={this.state.rows} cols={this.state.cols} board={this.state.board} setPiece={this.setPiece}/>
      </div>
    );
  }
}

export default App;

