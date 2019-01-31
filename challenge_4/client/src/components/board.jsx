import React from 'react';
import _ from 'underscore';
import Column from './column.jsx';

var Board = (props) => (
  <div id="board" className="board">
    {
      _.range(props.cols).map(
        (colNum) => (
          <Column rows={props.rows} y={colNum} />
        )
      )
    }
  </div>
)

export default Board;