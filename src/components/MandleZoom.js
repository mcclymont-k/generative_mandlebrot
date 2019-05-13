import React, { Component } from 'react';
import '../CSS/canvas.css'

class MandleZoom extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.canvas = document.getElementById('zoom');
    const ctx = this.canvas.getContext("2d");
    ctx.fillRect(0,0,360,360);
    const pixelData = ctx.getImageData(0,0, 360, 360);
    for(let x = 0; x < 360; x++) {
      for(let y = 0; y < 360; y++) {
        let a = (x / 36000 * 4) + 0.35;
        let b = (y / 36000 * 4) + 0.2;
        let pixNum = (x + y * 360) * 4;
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
        pixelData.data[pixNum + 2] = 12;
        pixelData.data[pixNum+3] = 255;
      }
    }
    ctx.putImageData(pixelData,0,0);
  }

  render() {
    return (
      <div className='centeredCanvas'>
        <div className='canvasContainer'>
          <canvas id="zoom" width="360" height="360">
          </canvas>
        </div>
      </div>
    )
  }

}

export default MandleZoom
