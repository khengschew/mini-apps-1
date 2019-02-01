import React from 'react';

var Square = (props) => {
  return <div name="row" className="square" id={`row${props.x}-${props.y}`} key={`row${props.x}-${props.y}`}>
    <div
      className={`circle ${props.board[props.x][props.y] ? 'p' + props.board[props.x][props.y] : ''}`}
      data-x={props.x}
      data-y={props.y}
      onClick={props.setPiece}></div>
  </div>
}

export default Square;