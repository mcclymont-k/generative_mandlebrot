import React, { Component } from 'react';
import '../CSS/canvas.css'
import Mandle from './Mandle';
import Julia from './Julia';

class Mandlebrot extends Component {
  render() {
    return(
      <div className='mainContainer'>
        <Mandle />
        <Julia />
      </div>
    )
  }
}

export default Mandlebrot;
