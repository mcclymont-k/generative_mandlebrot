import React, { Component } from 'react';
import '../CSS/canvas.css'


class Mandle extends Component {

  componentDidMount() {
    this.canvas = document.getElementById('can');
    const ctx = this.canvas.getContext("2d");
    ctx.fillRect(0,0,500,500);
    const pixelData = ctx.getImageData(0,0, 500, 500);
    for(let x = 0; x < 500; x++) {
      for(let y = 0; y < 500; y++) {
        let a = (x / 500 * 4) - 2;
        let b = (y / 500 * 4) - 2;
        let pixNum = (x + y * 500) * 4;
        let brightness = 0;
        let n = 0;
        let ca = a;
        let cb = b;
        while (n < 100 ){
          let aa = a * a - b * b;
          let bb = 2 * a * b;

          a = aa + ca;
          b = bb + cb;

          if (a + b > 4) {
            brightness = n /100 * 255;
            break;
          }
          n++;
        }

        pixelData.data[pixNum] = brightness;
        pixelData.data[pixNum + 1] = brightness;
        pixelData.data[pixNum + 2] = brightness;
        pixelData.data[pixNum+3] = 255;
      }
    }
    ctx.putImageData(pixelData,0,0);
  }

  render() {
    return (
      <div className='centeredCanvas'>
        <div className='canvasContainer'>
          <canvas id="can" width="500" height="500">
          </canvas>
          <div id='selectBox'></div>
        </div>
      </div>
    )
  }

}

export default Mandle
