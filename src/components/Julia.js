import React, { Component } from 'react';
import '../CSS/canvas.css'


class Julia extends Component {
  constructor() {
    super()
    this.state = {
      ca: -1,
      cb: 1,
      timer: [],
      running: false
    }
  }
  componentWillUnmount() {
    this.stopTimers();
  }
  // Updates the canvas
  updateCanvas() {
    this.canvas = document.getElementById('jul');
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
        while (n < 100 ){
          let aa = a * a - b * b;
          let bb = 2 * a * b;
          // This is where the change is made each iteration
          a = aa + this.state.ca;
          b = bb + this.state.cb;

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
  // Move the box with the animation
  selectBox() {
    const box = document.getElementById('selectBox');
    box.style.left= ((this.state.ca + 1) / 2 * 500) + 'px';
    box.style.top = ((this.state.cb + 1) / 2 * 500) + 'px';
  }
  // Function to run on every loop of loopY
  runIteration(x, y) {
    this.setState({timer: [...this.state.timer,
      setTimeout(() => {
        this.updateCanvas();
        this.selectBox();
        this.setState({ca: x, cb: y})
      }, ((y+1) * 10) *500 )
    ]})
  }

  loopX() {
    for(let x = -1; x < 1; x+=0.1) {
      this.loopY(x);
    }
  }

  loopY(x) {
    this.setState({timer: [...this.state.timer, setTimeout(() => {
      for(let y = -1; y < 1; y+=0.01) {
        this.runIteration(x, y);
      }
    }, ((x+1) * 10) *10000 )]
    })
  }

  startAnimation() {
    this.setState({running: true})
    this.loopX();
  }
  // Clears all timers
  stopTimers() {
    for (let i = 0; i <= 1000; i++) {
      window.clearTimeout(i);
    }
    this.setState({running: false});
  }

  render() {
    return (
      <div className='centeredCanvas'>
        <div className='canvasContainer'>
          <canvas id="jul" width="500" height="500"></canvas>
        </div>
        <div className='buttons'>
          {!this.state.running
            ? <button onClick={this.startAnimation.bind(this)}>START</button>
            : <button onClick={() => this.stopTimers()}>STOP</button>
          }
        </div>
      </div>
    )
  }

}

export default Julia
