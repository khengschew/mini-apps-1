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
      board: []
    }

    this.state.board = this.generateBoard();

    this.resetBoard = this.resetBoard.bind(this);
    this.setPiece = this.setPiece.bind(this);
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
      board: newBoard
    });
  }

  setPiece(e) {
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

    if (piecePlaced) {
      this.setState({
        board: updateBoard,
        currPlayer: this.state.currPlayer === 1 ? 2 : 1
      });
    }
  }

  checkWin() {
    
  }

  render() {
    return (
      <div>
        <h1>Connect Four <button onClick={this.resetBoard}>New Game</button></h1>
        <Board rows={this.state.rows} cols={this.state.cols} board={this.state.board} setPiece={this.setPiece}/>
      </div>
    );
  }
}

export default App;

