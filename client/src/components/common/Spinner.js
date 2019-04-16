import React, { Component } from 'react';
import spinner from './spinner.gif';

class Spinner extends Component {
  render() {
    return (
      <div>
        <img
          src={spinner}
          style={{ width: '45px', margin: 'auto', display: 'block'}}
          alt="Loading..."
        />
      </div>
    )
  }
}

export default Spinner;
