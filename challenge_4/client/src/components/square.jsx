import React from 'react';

var Square = (props) => (
  <div name="row" className="square" id={`row${props.x}-${props.y}`} key={`row${props.x}-${props.y}`} data-x={props.x} data-y={props.y}>
    <div className="circle"></div>
  </div>
)

export default Square;