import React, { Component } from 'react';
import '../CSS/canvas.css';
import CanvasDrawer from './CanvasDrawer';

class MNIST extends Component {

  render() {
    return(
      <div>
        <CanvasDrawer />
      </div>
    )
  }
}

export default MNIST;
