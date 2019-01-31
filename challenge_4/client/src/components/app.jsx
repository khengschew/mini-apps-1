import React from 'react';
import Board from './board.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Board rows={6} cols={7} />
      </div>
    );
  }
}

export default App;

