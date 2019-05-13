import React, { Component } from 'react';
import '../CSS/canvas.css';

class Generative extends Component {
  constructor() {
    super()
    this.state = {
      running: false
    }
  }

  setCanvas(model) {
    this.setState({
      running: true
    });
    this.canvas = document.getElementById('gen');
    this.ctx = this.canvas.getContext("2d");
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0,0,360,360);
    this.drawLines(model);
  }

  drawLines(model) {
    this.x = 10;
    this.y= 10;
    for (let n = 0; n <  1156; n += 1) {
      model === 'new'
      ? this.newLines(n)
      : model === 'old'
        ? this.differentLines(n)
        : model === 'straight'
          ? this.straightLines(n)
          : this.semiCircles(n);
    }
  }

  newLines(n) {
    setTimeout(() => {
      const rand = Math.floor(Math.random() * 6) + 1;
      this.ctx.beginPath();
      this.ctx.strokeStyle = 'white';
      rand <= 3
        ? this.ctx.moveTo(this.x, this.y)
        : this.ctx.moveTo(this.x + 10, this.y);
      rand === 1
        ? this.ctx.lineTo(this.x + 10, this.y)
        : rand === 2
          ? this.ctx.lineTo(this.x + 10, this.y + 10)
          : rand === 3
            ? this.ctx.lineTo(this.x + 10, this.y + 10)
            : rand === 4
              ? this.ctx.lineTo(this.x, this.y)
              : rand === 5
                ? this.ctx.lineTo(this.x, this.y + 10)
                : this.ctx.lineTo(this.x, this.y + 10);
      this.ctx.lineWidth = 3;
      this.ctx.stroke();
      this.x += 10;
      if(this.x === 350) {
        this.x = 10;
        this.y += 10;
      }
      if(n === 1155) {
          this.setState({running: false});
      }
    }, n * 10);
  }

  differentLines(n) {
    setTimeout(() => {
      const rand = Math.floor(Math.random() * 2) + 1;
      this.ctx.beginPath();
      this.ctx.strokeStyle = 'white';
      if(rand === 1) {
        this.ctx.moveTo(this.x, this.y)
        this.ctx.lineTo(this.x + 10, this.y + 10)
      } else {
        this.ctx.moveTo(this.x + 10, this.y);
        this.ctx.lineTo(this.x, this.y + 10);
      }
      this.ctx.lineWidth = 3;
      this.ctx.stroke();
      this.x += 10;
      if(this.x === 350) {
        this.x = 10;
        this.y += 10;
      }
      if(n === 1155) {
          this.setState({running: false});
      }
    }, n * 10);
  }

  straightLines(n) {
    setTimeout(() => {
      const rand = Math.floor(Math.random() * 4) + 1;
      this.ctx.beginPath();
      this.ctx.strokeStyle = 'white';
      rand <= 2
        ? this.ctx.moveTo(this.x, this.y)
        : this.ctx.moveTo(this.x + 10, this.y + 10);
      rand === 1
        ? this.ctx.lineTo(this.x + 10, this.y)
        : rand === 2
          ? this.ctx.lineTo(this.x, this.y + 10)
          : rand === 3
            ? this.ctx.lineTo(this.x, this.y + 10)
            : this.ctx.lineTo(this.x + 10, this.y)
      this.ctx.lineWidth = 3;
      this.ctx.stroke();
      this.x += 10;
      if(this.x === 350) {
        this.x = 10;
        this.y += 10;
      }
      if(n === 1155) {
          this.setState({running: false});
      }
    }, n * 10);
  }

  semiCircles(n) {
    setTimeout(() => {
      const rand = Math.floor((Math.random() * 4) + 1)/2;;
      let radius = 5;
      var startAngle = rand * Math.PI;
      var endAngle = (rand + 1) * Math.PI;
      var counterClockwise = false;
      this.ctx.beginPath();
      this.ctx.arc(this.x,this.y, radius, startAngle, endAngle, counterClockwise);
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = 'white';
      this.ctx.stroke();
      this.x += 10;
      if(this.x === 350) {
        this.x = 10;
        this.y += 10;
      }
      if(n === 1155) {
          this.setState({running: false});
      }
    }, n * 10);
  }


  render() {
    return (
      <div className='genContainer'>
        <canvas id='gen' width='360px' height='360px' />
          {!this.state.running
            ? <div>
                <button className='generativeButton'
                        onClick={() => this.setCanvas('old')}>1</button>
                <button className='generativeButton'
                        onClick={() => this.setCanvas('new')}>2</button>
                <button className='generativeButton'
                        onClick={() => this.setCanvas('straight')}>3</button>
                <button className='generativeButton'
                        onClick={() => this.setCanvas('semiCircles')}>4</button>
              </div>
            : <div style={{height:'43px'}}></div>
          }
      </div>
    )
  };
};

export default Generative;
