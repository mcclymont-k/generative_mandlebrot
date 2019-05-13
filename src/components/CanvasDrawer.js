import React, { Component } from 'react';
import '../CSS/canvas.css'


var flag = false,
      prevX = 0,
      currX = 0,
      prevY = 0,
      currY = 0,
      dot_flag = false;

var lineColor = 'white',
    y = 10


class Canvas extends Component {
  constructor() {
    super()
    this.state = {}
  }
  findxy(res, e) {
    if (res === 'down') {
      prevX = currX;
      prevY = currY;
      currX = e.clientX - this.canvas.offsetLeft;
      currY = e.clientY - this.canvas.offsetTop;

      flag = true;
      dot_flag = true;
      if (dot_flag) {
        this.ctx.beginPath();
        this.ctx.fillStyle = lineColor;
        this.ctx.fillRect(currX, currY, 2, 2);
        this.ctx.closePath();
        dot_flag = false;
      }
    }
    if (res === 'up' || res === "out") {
      flag = false;
    }
    if (res === 'move') {
      if (flag) {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - this.canvas.offsetLeft;
        currY = e.clientY - this.canvas.offsetTop;
        this.draw();
      }
    }
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(prevX, prevY);
    this.ctx.lineTo(currX, currY);
    this.ctx.strokeStyle = lineColor;
    this.ctx.lineWidth = y;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  pullData() {
    let fullData = this.ctx.getImageData(0, 0, 280, 280)
    let pixelData = []
    let count = 0
    fullData.data.forEach(data => {
      if(count === 3) {
        pixelData.push(data)
        count = 0
      } else {
        count += 1
      }
    })
    this.setState({pixelData: pixelData});
    console.log(this.state.pixelData);
  }

  download() {
    console.log('download');
    var canvasDl = this.canvas.toDataURL('image/jpeg');
    let downloader = document.getElementById('downloader');
    downloader.href = canvasDl
  }

  componentDidMount() {
    this.canvas = document.getElementById('drawer')
    this.ctx = this.canvas.getContext("2d")
    this.w = this.canvas.width
    this.h = this.canvas.height
    this.canvas.addEventListener("mousemove", (e) =>
      this.findxy('move', e)
    , false)
    this.canvas.addEventListener("mousedown", (e) =>
      this.findxy('down', e)
    , false)
    this.canvas.addEventListener("mouseup", (e) =>
      this.findxy('up', e)
    , false)
    this.canvas.addEventListener("mouseout", (e) =>
      this.findxy('out', e)
    , false)
  }

  render() {
    return (
      <div className='canvasDrawingContainer'>
        <canvas id="drawer" width="280" height="280"></canvas>
        <div style={{height:' 90%'}}>
          <button className='mnistButton' onClick={this.clearCanvas.bind(this)}>Clear</button>
          <button className='mnistButton' onClick={this.pullData.bind(this)}>Get Data</button>
          <a className='mnistButton' id='downloader' onClick={this.download.bind(this)} download>Download</a>
        </div>
      </div>
    )
  }

}

export default Canvas
