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
    var newBoard = generateBoard();

    this.setState({
      board: newBoard
    });
  }

  setPiece(e) {
    var row = e.target.dataset.x;
    var col = e.target.dataset.y;
    console.log(e.target.dataset, ' row ' + row, ' col ' + col);
    var updateBoard = this.state.board;
    updateBoard[row][col] = this.state.currPlayer;
    this.setState({
      board: updateBoard,
      currPlayer: this.state.currPlayer === 1 ? 2 : 1
    });
  }

  render() {
    return (
      <div>
        <h1>Connect Four</h1>
        <Board rows={6} cols={7} board={this.state.board} setPiece={this.setPiece}/>
      </div>
    );
  }
}

export default App;

