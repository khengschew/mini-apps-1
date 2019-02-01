import React from 'react';
import _ from 'underscore';
import Square from './square.jsx';

var Column = (props) => (
  <div name="column" className="col" id={`column${props.y}`} key={`column${props.y}`} data-y={props.y}>
    {
      _.range(props.rows).map(
        (rowNum) => (
          <Square x={rowNum} y={props.y} board={props.board} setPiece={props.setPiece}/>
        )
      )
    }
  </div>
)

export default Column;